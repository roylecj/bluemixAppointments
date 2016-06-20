
 if (Meteor.users.find().count() === 0) {

   // This is the base environment when we first start out...
   // we need a login that we can use, and some roles, and that's about it
   // From there, the user can login, and setup the users that they need, and the mapping tables
   // and any tasks that they want to assign.

    var thisid;
    var userId = Accounts.createUser({
      username: 'croyle',
      password: 'password',
      email: 'croyle3@csc.com',
      profile: { name: 'Chris Royle'}
    });

    PatientSettings.insert({
      userId: userId,
      appId: "f9162320-245b-4071-b47f-5b4e38308027",
      patientId: "0000|RND3443"
    });

    LocationLinks.insert({
      name: "GREE",
      lat: "-27.5130292",
      long: "153.0442283"
    });

    LocationLinks.insert({
      name: "WES",
      lat: "-27.4781422",
      long: "152.9957604"
    });

    LocationLinks.insert({
      name: "Outpatient Clinic",
      lat: "-36.8605048",
      long: "174.7681428"
    })
}
