var mapApp=angular.module('mapApp',[]);
mapApp.controller('mapController',function($scope,$http){

var myLatlng = {lat: 33.363, lng: -84.044};
       var map = new google.maps.Map(document.getElementById('map'), {
         zoom: 4,
         center: myLatlng
       });
       

       var markers=[];




       function createMarker(city){
       	console.log(city);
       	var cityLatlng={lat:city.lat, lng:city.lon};
       	 var marker = new google.maps.Marker(
       	 {
          position:cityLatlng,
          map: map,
          title: city.city


        });


	var infoWindow=new google.maps.InfoWindow({
		content:city.city
	})

	google.maps.event.addListener(marker,'click',function(){
		infoWindow.open(map,marker);
	});
	 markers.push(marker);
       } //END CREATEMARKER


       $scope.triggerClick=function(index){
       		google.maps.event.trigger(markers[index],"click")
       	
       }


      
	$scope.cities=cities;
	for(var i=0; i<$scope.cities.length; i++){
		createMarker($scope.cities[i]);
	}

});