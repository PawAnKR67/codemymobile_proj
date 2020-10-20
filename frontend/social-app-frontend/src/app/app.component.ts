import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { JwPaginationComponent } from 'jw-angular-pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./heroes.component.css']
})
export class AppComponent implements OnInit {
  title = 'social-app-frontend';
  public urlPrefix = 'http://localhost:8080';
  public users=[];
  public friends=[];
  public fof=[];
  public isFriendsHidden=true;
  public isFofHidden=true;
  public user_name='';
  public total_users=0;
  public page =1;
  
  pageOfItems: Array<any>;

  constructor(private http : HttpClient){
    
  } 

  ngOnInit(){
    this.getUsers();
  }

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  getUsers(){
    const api_users = this.urlPrefix + "/api/users";
    this.http.get(api_users).subscribe((result : any) => {
      // if (result && !result.message) {
      if (result && result.data) {
        this.total_users=result.data.count;
        this.page=result.page;
        // response.forEach(element => {
        //   element.avatar = this.urlPrefix + "/avatars/" + element.avatar + ".jpg";
        //   console.log(this.urlPrefix);
        // });
        // console.log(result.data.rows);
        this.users = this.users.concat(result.data.rows);
      }
    });
  }
  getFriends(user_id){
    this.friends =[];
    const api_friends = this.urlPrefix + "/api/friends/"+user_id;
    this.http.get(api_friends).subscribe((result) => {
      if (result ) {
        this.isFriendsHidden=false;
        this.isFofHidden=true;
        this.user_name=this.users.find(x => x.id === user_id).firstName;
        this.friends = this.friends.concat(result);
      }
    });
  }
  getFriendOfFriends(user_id){
    const api_fof = this.urlPrefix + "/api/fof/"+user_id;
    this.fof =[];
    this.http.get(api_fof).subscribe((result) => {
      if (result ) {
        this.isFriendsHidden=true;
        this.isFofHidden=false;
        this.user_name=this.users.find(x => x.id === user_id).firstName;
        this.fof = this.fof.concat(result);
      }
    });
  }
}
