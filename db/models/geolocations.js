const db = require('../');

const Geolocation = db.Model.extend({
  tableName: 'geolocations',
  walk: function() {
    return this.belongsTo('Walk', 'walk_id');
  }
});

module.exports = db.model('Geolocation', Geolocation);