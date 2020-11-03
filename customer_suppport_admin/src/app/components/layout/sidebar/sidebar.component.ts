import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, AfterViewInit } from '@angular/core';
import * as service from '../../../api-service/service/index';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
declare const $: any;
declare const AOS: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  public profileimage;
  public otptw; public security_flag;
  public dashboard = {};
  public localstoragedata;
  constructor(private authService: service.CommonAuthService, private api: service.CallApiService,
    public common: service.CommonService,
    private _tokenExpService: service.CanTokenRemoveService, private tokenService: service.CanTokenSaveService, public toastr: ToastrManager) {
  }

  ngOnInit() {

     this.localstoragedata = JSON.parse(localStorage.getItem('currentUser'));
     console.log(this.localstoragedata.is_superuser);

    $('body').removeClass('custom-bg');
    

    $('.profile_toggle').on('click', function () {
      $(this).next('.dropdown-menu').toggleClass('show');
    });
    $('.slide').on('click', function () {
      
      if ($(this).hasClass('is-expanded')) {
        $('.slide').removeClass('is-expanded');
      } else {
        $('.slide').removeClass('is-expanded');
        $(this).addClass('is-expanded');
      }
    });
    $('.slide-item').on('click', function () {
      $('body').removeClass('sidenav-toggled');
      if ($(this).parent('li').parent('li').hasClass('is-expanded')) {
        $('.slide').removeClass('is-expanded');
      } else {
        $('.slide').removeClass('is-expanded');
        $(this).addClass('is-expanded');
      }
    });
    $('.app-sidebar__toggle').on('click', function () {

      if ($('body').hasClass('sidenav-toggled')) {
        $('body').removeClass('sidenav-toggled');
      } else {
        $('body').addClass('sidenav-toggled');
      }
    });



    // if(screen.width <= 768){
    //     $('.single-menu a').on('click', function() {
    //       $('#wrapper').removeClass('toggled');
    //     });
    //     $('.user-setting-menu a').on('click', function() {
    //       $('#wrapper').removeClass('toggled');
    //     }); 
    //     $('.sidebar-submenu a').on('click', function() {
    //       $('#wrapper').removeClass('toggled');
    //     }); 
    //  }

    // $('.sidebar-menu li a').on('click', function(e) {
    // if ($(this).next().hasClass('sidebar-submenu') === false) {
    //   var parent = $(this).parent().parent();
    //   parent.find('li.active').children('.sidebar-submenu').children('.arrow').removeClass('active');
    //   parent.find('li.active').removeClass('active');
    //   parent.find('ul.menu-open').removeClass('menu-open');
    //   parent.find('ul').slideUp();
    //   $(this).parent('li').addClass('active');
    // } 
    // });
    // $.sidebarMenu($('.sidebar-menu'));


    //  setTimeout(() => {   
    //     this.common.commonMemberid = this.common.allsecuremedata.memberid;
    //     this.common.allsecuremedata = this.common.allsecuremedata;
    //     this.common.commonPrifilePic = this.common.commonPrifilePic;

    //  }, 1500);

  }

  public removeSidebar(){
    $('body').removeClass('sidenav-toggled');

  }
  public onLogout() {
    this.authService.onLogout();
  }


}
