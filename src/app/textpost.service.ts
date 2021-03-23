import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TextPost } from './textpost';

@Injectable({
    providedIn: 'root'
})
export class TextPostService{
    private apiServerURL = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getTextPosts(): Observable<TextPost[]>{
        return this.http.get<TextPost[]>(`${this.apiServerURL}/textpost`);
    }

    public addTextPost(textPost: TextPost): Observable<TextPost> {
        return this.http.post<TextPost>(`${this.apiServerURL}/textpost`, textPost);
    }

    public upvoteTextPost(id: number): Observable<TextPost> {
        return this.http.put<TextPost>(`${this.apiServerURL}/textpost/`+id+`/upvote`,"");
    }    
}