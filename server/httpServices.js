process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

Meteor.methods({
    callBluemix: function (url, verbType, thisAppId) {
      this.unblock();

      try {
        var result = HTTP.call(verbType, url,
        {
          headers: {"X-IBM-Client-Id": thisAppId},
          followRedirects: true
        })
        return result.content;
      } catch (e) {
        console.log(e);
      };

    },
    removeUser: function(userName) {
      var userId;

      userId = Meteor.users.findOne({username: userName});

      Meteor.users.remove({_id: userId._id});
    },
    createAppUser: function(deviceId, userName, passwordText, activationCode, deviceName, personName) {

      var userId = Accounts.createUser({
        username: userName,
        password: passwordText,
        profile: { name: personName}
      });

      // Activation Code is hte patient's PAS ID.

      PatientSettings.insert({
        userId: userId,
        appId: "",
        patientId: activationCode
      });
    }
  });
