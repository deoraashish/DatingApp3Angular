import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[];

  constructor(private http: HttpClient) { }

  getMembers() {
    if (this.members !== undefined) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
      map(m => {
        this.members = m;
        return m;
      })
      );
  }

  getMember(username: string) {
    const member = this.members.find(m => m.username === username);
    if(member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        var index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }
}
