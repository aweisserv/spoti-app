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
        'Authorization': 'Bearer BQAif38pwOuooKy6RH2QIkeUPvUIg7vahG4MLNf4A2aPXrVFgtUeGx0vyLU4JcR_sEkgCW0LRikij0vXhvs'
      });

      return this.http.get( url, { headers });

  }


  getNewReleases(){
   
    return this.getQuery('browse/new-releases?limit=30')
             .pipe( map( data => data['albums'].items ) );
        
  }


  getArtistas( termino: string ){

    return this.getQuery(`search?query=${ termino }&type=artist&market=US&offset=0&limit=30`)
              .pipe( map( data => data['artists'].items ) );
     
  }


  getArtista( id: string ){

    return this.getQuery(`artists/${ id }`);
     
  }


  getTopTracks( id: string ){

    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
              .pipe( map( data => data['tracks'] ) );
  }




}
