const db = require('../');

const Walk = db.Model.extend({
  tableName: 'walks',
  walker: function() {
    return this.belongsTo('Profile', 'walker_id');
  },
  owner: function() {
    return this.belongsTo('Profile', 'owner_id');
  },
  dog: function() {
    return this.belongsTo('Dog', 'dog_id');
  },
  geolocation: function() {
    return this.hasMany('Geolocation', 'walk_id');
  }
});

module.exports = db.model('Walk', Walk);

