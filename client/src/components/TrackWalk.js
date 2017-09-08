import React from 'react';
import $ from 'jquery';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';

class TrackWalk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walk: {
        walk_zone_pt: '944 Market St, San Francisco, CA 94103',
        walk_zone_radius: 3,
        price: 20,
        session_start: new Date(),
        session_end: new Date((new Date).getTime() + 60 * 60 * 1000),
        walker_id: 201,
        pickup_address: '1648 POST ST, San Francisco, CA 94115',
        owner: {
          first: 'Rory',
          last: 'Upton',
          display: 'Rory Upton',
          email: 'Lemuel_Spinka76@example.net',
          phone: '869-230-5507',
          profile_pic: 'https://s3.amazonaws.com/uifaces/faces/twitter/manigm/128.jpg',
          about_me: 'Necessitatibus eius sed voluptatibus. At necessitatibus reprehenderit quibusdam ea. Quis vero enim repellat consequuntur minus velit vel molestiae qui. Optio perspiciatis quo dicta vitae consequuntur quidem totam. Sed in laboriosam minima ut veritatis. Et deleniti magnam.',
          avg_walker_rating: 4.9,
          address: '1648 POST ST, San Francisco, CA 94115',
        },
        dog: {
          name: 'Madisyn',
          age: 4,
          weight: 124,
          breed: 'Taiwan Dog',
          profile_pic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Formosan_nina.jpg/200px-Formosan_nina.jpg',
          extras: 'Excepturi veritatis harum consequatur dolor nobis. Repudiandae dicta expedita aperiam. Minus ut dolorem eligendi qui excepturi. Ad quam ratione quo laudantium voluptatibus corporis perferendis.',
          avg_rating: 3.7,
          owner_id: 1
        }
      },
      geolocations: [],
      maximumAge: 30000,
      timeout: 10000, // Number.POSITIVE_INFINITY,
      enableHighAccuracy: true,
      watchId: null
    };
    this.handleStart = this.handleStart.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.processGeolocationResult = this.processGeolocationResult.bind(this);
    // this.getCurrentPos = this.getCurrentPos.bind(this);
    this.startWatch = this.startWatch.bind(this);
    this.stopWatch = this.stopWatch.bind(this);
    this.handleGeoError = this.handleGeoError.bind(this);
    this.postGeolocation = this.postGeolocation.bind(this);
  }

  handleStart() {
    // this.getCurrentPos();
    this.startWatch();
  }
  
  handleFinish() {
    this.stopWatch();
  }
  
  processGeolocationResult(position) {
    var geolocation = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      datetime: new Date(position.timestamp),
      accuracy: position.coords.accuracy,
    };
    
    console.log(`SUCCESS latitude:${position.coords.latitude}, longitutde:${position.coords.longitude}, accuracy:${position.coords.accuracy}, datetime:${new Date(position.timestamp)}`);
    this.postGeolocation(geolocation);
    this.setState({
      geolocations: this.state.geolocations.concat(geolocation)
    });
  }

  handleGeoError(error) {
    console.log('ERROR failed to retrieve your location: ' + error);
  }

  // getCurrentPos() {
  //   navigator.geolocation.getCurrentPosition(this.processGeolocationResult, this.handleGeoError, {
  //     maximumAge: this.state.maximumAge,
  //     timeout: this.state.timeout, 
  //     enableHighAccuracy: this.state.enableHighAccuracy
  //   });
  // }

  startWatch() {
    var watchId = navigator.geolocation.watchPosition(this.processGeolocationResult, this.handleGeoError, {
      maximumAge: this.state.maximumAge,
      timeout: this.state.timeout, 
      enableHighAccuracy: this.state.enableHighAccuracy
    });
    
    this.setState({
      watchId: watchId
    });
    console.log('STARTING WALK');
  }

  stopWatch() {
    navigator.geolocation.clearWatch(this.state.watchId);
    this.setState({
      watchId: null
    });
    console.log('STOPPING WALK');
  }

  postGeolocation(geolocation) {
    $.post('/api/walks/track', geolocation)
      .then((data) => {
        console.log('SUCCESS sending geolocation');
      })
      .fail((err) => {
        console.log('ERROR sending geolocation ', error);
      });
  }

  render() {
    return (
      <div>
        <div>
          <Avatar src={this.state.walk.dog.profile_pic} size={100} /> {this.state.walk.dog.name}
        </div>
        <div>
          <Avatar src={this.state.walk.owner.profile_pic} size={70} /> {this.state.walk.owner.display}
        </div>
        <div>
          Call {this.state.walk.owner.first}: {this.state.walk.owner.phone}
        </div>
        <div>
          Pickup {this.state.walk.dog.name} at: {this.state.walk.pickup_address}
        </div>
        <div>
          <RaisedButton label="Start Walk" primary={true} onClick={this.handleStart} />
        </div>
        <div>
          <RaisedButton label="Finish Walk" secondary={true} onClick={this.handleFinish} />
        </div>
        <div>
          <List>
            {this.state.geolocations.map((geolocation) => (
              <ListItem 
                key={geolocation.datetime}
                primaryText={`latitude:${geolocation.latitude}, longitutde:${geolocation.longitude}`} 
                secondaryText={`accuracy:${geolocation.accuracy}, datetime:${geolocation.datetime}`} 
                secondaryTextLines={2} 
              />
            ))}
          </List>
        </div>
      </div>
    );
  }
}

export default TrackWalk;