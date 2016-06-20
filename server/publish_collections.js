Meteor.publish('patientSettings', function() {
    return PatientSettings.find();
});

Meteor.publish("userDirectory", function () {
  return Meteor.users.find({}, {fields: {_id: 1, username: 1, emails: 1, profile: 1, roles: 1}});
});

Meteor.publish('locationLinks', function() {
    return LocationLinks.find();
})
