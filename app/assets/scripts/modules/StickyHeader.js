import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smothScroll from 'jquery-smooth-scroll';

class StickyHeader {
  constructor() {
    this.lazyImages = $(".lazyload");
    this.siteHeader = $(".site-header");
    this.headerTriggerElement = $(".large-hero__title");
    this.createHeaderWaypoint();
    this.pageSections = $(".page-section");
    this.headerLinks = $(".primary_nav a")
    this.createPageSectionWaypoints();
    this.addSmoothScrolling();
    this.refreshWaypoints();
  }

  refreshWaypoints(){
    this.lazyImages.on('load', function() {
      Waypoint.refreshAll();
    });
  }

  addSmoothScrolling() {
    this.headerLinks.smoothScroll();
  }

  createHeaderWaypoint(){
    var that = this; /* Waypoint detroys the class' "this keyword", therefore
                          the keyword has to be saved in the beginning of the function in a variable "that"*/
    new Waypoint({
      element: this.headerTriggerElement[0],/*Waypoint expects a javascript DOM element and not a Jquery object,
      first element in the jquery object is a pointer to a the javascript DOM element*/
      handler: function(direction) {
        //console.log(this);
        if(direction == "down"){
        that.siteHeader.addClass("site-header--dark");
        }else {
        that.siteHeader.removeClass("site-header--dark");
      }
      }
    });
  }

createPageSectionWaypoints(){
  var that = this;
  this.pageSections.each(function(){
  var currentPageSection = this;
    new Waypoint({
      element: currentPageSection,
      handler: function(direction){
        if(direction == "down"){
          var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
          that.headerLinks.removeClass("is-current-link");
          $(matchingHeaderLink).addClass("is-current-link");
        }
      },
        offset: "18%"
    });
    new Waypoint({
      element: currentPageSection,
      handler: function(direction){
        if(direction == "up"){
          var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
          that.headerLinks.removeClass("is-current-link");
          $(matchingHeaderLink).addClass("is-current-link");
        }
      },
        offset: "-40%"
    });
  });
}
}

export default StickyHeader;
