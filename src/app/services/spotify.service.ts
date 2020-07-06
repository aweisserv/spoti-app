import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient ) { 
    console.log("Spotify Service Activado");
  }


  getQuery( query: string ) {

      const url = `https://api.spotify.com/v1/${ query }`;

      const headers = new HttpHeaders({
        'Authorization': 'Bearer BQAfLvN6UWCLy8Gd1PFc7D9Q3KRzm48q84n8HB-Eyv7N8sooIl8jWsNbxoXQ3vknTHRSeVEd5BMWCbLsFs0'
      });

      return this.http.get( url, { headers });

  }


  getNewReleases(){
   
    return this.getQuery('browse/new-releases?limit=30')
             .pipe( map( data => data['albums'].items ) );
        
  }


  getArtista( termino: string ){

    return this.getQuery(`search?query=${ termino }&type=artist&market=US&offset=0&limit=30`)
              .pipe( map( data => data['artists'].items ) );
     
  }


}
