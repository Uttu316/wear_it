import {Component, OnInit, ViewContainerRef ,ChangeDetectorRef} from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { NavigationCancel,
        Event,
        NavigationEnd,
        NavigationError,
        NavigationStart,
        Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public sevenDays;
  ngOnInit() 
  {

      const GetDays = (d,todatDate,Mention_today=false)=>{
      //Mention today mean the array will have today date 
      var DateArray = [];
      var days=d;
      for(var i=0;i<days;i++){
      if(!Mention_today && i==0){i=0;days+=1}
      var date = todatDate;
      //console.log(date);
      var last = new Date(date.getTime() + (i * 24 * 60 * 60 * 1000));
      var day =last.getDate();
      var month=last.getMonth()+1;
      var year=last.getFullYear();
      const fulld = Number(day)+'-'+Number(month)+'-'+(Number(year)); // Format date as you like
      var obj = {
        id:i+1,
        date: fulld
      }
      DateArray.push(obj);
      }
      return DateArray;
    }
   this.sevenDays = GetDays(6,new Date());

   



  }

  title = 'angular8tutorial';
  constructor(private loadingBar: SlimLoadingBarService, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this.loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this.loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this.loadingBar.stop();
    }
  }
}
