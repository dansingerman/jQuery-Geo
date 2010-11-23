*!
 * jQuery-Geo jQuery plugin v0.0.1
 *
 * Copyright 2010 by Dan Singerman <dansingerman@gmail.com>
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 2 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program; if not, write to the Free Software Foundation, Inc., 51
 * Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 */
 
 (function($){
   
  var methods = {
    locate :function( successCallback, failureCallback ) {
      return this.each(function() {
         if(navigator.geolocation) {
           navigator.geolocation.getCurrentPosition( 
             function(location){
               successCallback( position.coords.latitude,  position.coords.longitude );
             }, 
             function(message){
               failureCallback( message );
             });
         }
         else if(window.google && google.gears) {
           var geo = google.gears.factory.create('beta.geolocation');
           geo.getCurrentPosition(
             function(location){
               successCallback( position.coords.latitude,  position.coords.longitude );
             }, 
             function(message){
               failureCallback( message );
             }); 
         }
         else {
           failureCallback( message );
         }
      });
    }
  };
  
  $.fn.geo = function( method ) {
    
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.geo' );
    }    
  
  };
})(jQuery);