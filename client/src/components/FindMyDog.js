import React from 'react';
import Avatar from 'material-ui/Avatar';
import FindMyDogMap from './FindMyDogMap';

class FindMyDog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walk: {
        id: 201,
        walk_zone_pt: '472 TEHAMA ST, San Francisco, CA 94103',
        walk_zone_radius: 3,
        price: 20,
        session_start: new Date(),
        session_end: new Date((new Date).getTime() + 60 * 60 * 1000),
        walker_id: 201,
        pickup_address: '1648 POST ST, San Francisco, CA 94115',
        walker: {
          id: 17,
          first: 'Katarina',
          last: 'Stoltenberg',
          display: 'Katarina Stoltenberg',
          email: 'Mathew_Hudson@example.org',
          phone: '167-709-9561',
          profile_pic: 'https://s3.amazonaws.com/uifaces/faces/twitter/patrickcoombe/128.jpg',
          about_me: 'Quasi aut dolorem incidunt. Itaque quasi ab nemo. Esse saepe rerum nulla iste eos. Eum architecto tempora eligendi ut quisquam. Nemo ratione perferendis dolorem. Aut error dolorum non.',
          avg_walker_rating: 3.8,
          address: '472 TEHAMA ST, San Francisco, CA 94103',
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
      }
    };
  }

  render() {
    return (
      <div>
        <h2>Walker:</h2>
        <div>
          <Avatar src={this.state.walk.walker.profile_pic} size={100} /> {this.state.walk.walker.display}
        </div>
        <div>
          Call {this.state.walk.walker.first}: {this.state.walk.walker.phone}
        </div>
        <div>
          Walk happening around {this.state.walk.walk_zone_pt}
        </div>
        <FindMyDogMap walkId={this.state.walk.id} />
      </div>
    );
  }
}

export default FindMyDog;
