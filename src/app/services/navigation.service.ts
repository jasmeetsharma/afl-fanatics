import { DataService } from './data.service';
import { Game } from './../models/game';
import { Injectable } from '@angular/core';
import { Location } from './../models/location';
import { Observable,of,interval } from 'rxjs';
import { catchError, map, tap,filter,switchMap, mergeMap,take, shareReplay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  //venue:Set<Location> = new Set<Location>();
  venue:Location[];
  currentLoc:Location;
  upcomingGames : Game[];

  constructor(private dataService : DataService,private http:HttpClient) { }

   // logic below this comment is to get the nearest game venue to User's current location
  // getNearestGame() is the entry point for this logic . it will be called during app loading
  // which will calculate the distance for each venue.
  // getNearestLocation() will be called later to get the nearest game by sorting the venues
  // based on the distance calculated above.

   /**
   * Entry point for the nearest venue Calculation Flow
   */
  getNearestGame() {
    this.currentLoc = new Location();
    window.navigator.geolocation.getCurrentPosition((pos) => {
      //this.currentLoc.lat = -30.000233;
      this.currentLoc.lat = pos.coords.latitude;
      //this.currentLoc.lng = 138.6007;
      this.currentLoc.lng = pos.coords.longitude;
    })
    let updatedVenues = [];
    this.dataService.getGameDetails().subscribe(res => {
      this.upcomingGames = res.filter(i => i.round > 19);
     this.venue= res.map(r => {
        let l: Location = new Location();
        l.name = r['venue'];
        //this.venue.add(l);
        return l;
      })
      let a = false;
      for (let i = 0; i < this.venue.length; i++) {
        for (let j = 0; j < updatedVenues.length; j++) {
          if (this.venue[i].name == updatedVenues[j].name) {
            a = true;
            break;
          }
        }
        if (a == false) {
          updatedVenues.push(this.venue[i]);
        }
        a = false;
      }
      this.venue = updatedVenues;
      let v =localStorage.getItem('venues');
      if(v != undefined && v!= ""){
        this.venue = JSON.parse(v);
      }else{
        this.venueLocations();
      }
    })
  }

  /**
 * Set all the venues of the season in a venue array along with distance from the current User Position
 */
  venueLocations() {
    const numbers = interval(500);
    const numberOfVenues = numbers.pipe(take(this.venue.length));
    numberOfVenues.subscribe(x => {
      this.getLocation(this.venue[x].name).subscribe(res => {
        this.venue[x].lat = res.lat;
        this.venue[x].lng = res.lng;
        this.venue[x].distance = this.getDistanceFromCurrentPos(this.currentLoc, this.venue[x]);
        localStorage.setItem('venues',JSON.stringify(this.venue));
      })
    });
  }
  getVenues(): Observable<Location[]>{
    return of(this.venue);
  }
  /**
   * 
   * @param address 
   *returns Longitude and Latitude from Address 
   *
   */
  getLocation(address: string): Observable<Location> {
    let apiUrl='https://nominatim.openstreetmap.org/search/' ;
    if(address == "Jiangwan Stadium" ){
      apiUrl += address.replace('.','')+',China?format=jsonv2';
    }else if(address == "Riverway Stadium" ){
      apiUrl += 'Sporting Dr,Queensland,Australia?format=jsonv2';
    }else{
      apiUrl += address.replace(/\./g,'')+',Australia?format=jsonv2';
    }
    return this.http.get<Location>(apiUrl)
      .pipe(map((res) => {
        let l: Location = new Location();
        l.lat = res[0]['lat'];
        l.lng = res[0]['lon'];
        l.name = res[0]['display_name'];
        return l;
      }),shareReplay(1));
  }

  /**
   * 
   * @param location1 
   * @param location2 
   * 
   * calculate the distance between 2 coordiantes in KMS
   */

  getDistanceFromCurrentPos(location1: Location, location2: Location): number {

    const lat1 = location1.lat;
    const lat2 = location2.lat;
    const lon1 = location1.lng;
    const lon2 = location2.lng;

    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    } else {
      let radlat1 = Math.PI * lat1 / 180;
      let radlat2 = Math.PI * lat2 / 180;
      let theta = lon1 - lon2;
      let radtheta = Math.PI * theta / 180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 0.8684;
      dist = dist * 1.609344;
      return Math.floor(dist);
    }
  }
  
  /**
   * 
   * @param location 
   * returns address from longitude and latitude
   */
  getAddress(location : Location) : Observable<Location>{
    let apiUrl='https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat='+location.lat+'&lon='+location.lng;
    return this.http.get<Location>(apiUrl)
    .pipe(map((res)=>{
      let l:Location = new Location();
      l.lat=res['lat'];
      l.lng=res['lon'];
      l.name=res['display_name'];
      return l;
    }));
  }

  /**
   * Sorting the venues on the basis of distance from the user 
   * return the nearest Game.
   */
  getNearestLocation():Game[]{
    let a ;
    let w = [];
    this.venue.forEach(val=>w.push(Object.assign({},val)));
    a=this.upcomingGames.filter(i=>i.venue==w[0].name).sort((a,b)=>Date.parse(a.date) - Date.parse(b.date));
    return a;
  }

}
