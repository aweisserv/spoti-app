import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
        'Authorization': 'Bearer BQCgUz4HzRAqZ-onb2QB06DMvvqcHSm1-exRS5527glqfDCElU6MMwQSOAoYqBz_JyML0B7AOnKtAVEd_qg'
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
