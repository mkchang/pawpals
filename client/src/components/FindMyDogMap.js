import React from 'react';
import $ from 'jquery';

class FindMyDogMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geolocations: []
    };
    this.getGeolocations = this.getGeolocations.bind(this);    
    this.mapGeolocations = this.mapGeolocations.bind(this);
  }
  componentDidMount() {
    this.getGeolocations();
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.783610, lng: -122.408991},
      zoom: 16
    });
    this.infoWindow = new google.maps.InfoWindow;
  }

  getGeolocations() {
    $.get('/api/walks/track', {walkId: this.props.walkId})
      .then((data) => {
        console.log('SUCCESS getting geolocation ', data);
        this.setState(
          {
            geolocations: data
          },
          () => {
            this.mapGeolocations();
          } 
        );
      })
      .fail((err) => {
        console.log('ERROR getting geolocation ', error);
      });
  }

  mapGeolocations() {
    this.state.geolocations.forEach(geolocation => {
      var latLng = new google.maps.LatLng(Number(geolocation.latitude), Number(geolocation.longitude));
      var marker = new google.maps.Marker({
        position: latLng,
        map: this.map
      });
      // var pos = {
      //   lat: ,
      //   lng: 
      // };

      // this.infoWindow.setPosition(pos);
      // this.infoWindow.setContent('Location found.');
      // this.infoWindow.open(this.map);
      // this.map.setCenter(pos);
    });
  }

  render() {
    // const mapStyle = {
    //   height: '100%'
    // };
    const mapStyle = {
      width: '100%',
      height: 375,
      flex: 1,
      border: '1px solid black',
      alignItems: 'center',
      textAlign: 'center',
    };
    return (
      <div id="map" style={mapStyle} >
        <text>Loading Map...</text>
      </div>
    );
  }
}

export default FindMyDogMap;

//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       };

//       infoWindow.setPosition(pos);
//       infoWindow.setContent('Location found.');
//       infoWindow.open(map);
//       map.setCenter(pos);
//     }, function() {
//       handleLocationError(true, infoWindow, map.getCenter());
//     });
//   } else {
//     // Browser doesn't support Geolocation
//     handleLocationError(false, infoWindow, map.getCenter());
//   }
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(browserHasGeolocation ?
//                         'Error: The Geolocation service failed.' :
//                         'Error: Your browser doesn\'t support geolocation.');
//   infoWindow.open(map);
// }
