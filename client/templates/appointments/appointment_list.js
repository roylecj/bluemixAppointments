Template.appointmentList.onCreated(function() {
  Session.set("resetAppointments", true);
  Session.setDefault("isLoading", true);
  Session.setDefault("includePast", false);
});

Template.appointmentList.helpers({
  appointmentLoaded: function() {
    if (Session.get("isLoading") === true){
      return false
    } else {
      return true
    }
  },
  loading: function() {
    return Session.get("isLoading")
  },
  isResetAppointments: function() {
    return Session.get("resetAppointments")
  },
  resetAppointments: function() {
    if (Session.get("resetAppointments") === true ) {

    PatientAppointments = new Mongo.Collection(null);
    PatientAppointmentDetails = new Mongo.Collection(null);

    Meteor.call("clearAppointments", Meteor.userId(), function(e, r) {

          pat = PatientSettings.findOne({userId: Meteor.userId()});

          appId = pat.appId;
          patientId = pat.patientId;

          Meteor.call("callBluemix", "https://api.au.apiconnect.ibmcloud.com/nz-health-inc-poc/transfer-of-care/Appointment?patientId=" + patientId, "GET", appId, function(e, result) {

            console.log (JSON.parse(result));
            jsonResult= JSON.parse(result);

            Session.set("fhirResponse", JSON.stringify(jsonResult, null, 2));

            for (i = 0; i < jsonResult.entry.length; i++) {

              var appEntry = PatientAppointments.insert(jsonResult.entry[i]);
            //  PatientAppointments.update({_id: appEntry}, { $set: { userId: Meteor.userId() }});

            }

            Session.set("resetAppointments", false);
            Session.set("isLoading", false);

          });

        });
}
  },
  appointments: function() {

  var nowDate;

  nowDate = new Date();
  var nowDateFormat;

  nowDateFormat = moment(nowDate).format('YYYY-MM-DD');

  if (Session.get("includePast")) {
    return PatientAppointments.find({}, {sort: {"resource.start":-1}})
  } else {
    return PatientAppointments.find({ "resource.start": {$gt: nowDateFormat}}, {sort: {"resource.start":-1}} )
  }
},
appointmentsInThePast: function() {

  var nowDate;

  nowDate = new Date();
  var nowDateFormat;

  nowDateFormat = moment(nowDate).format('YYYY-MM-DD');

  if (PatientAppointments.find({ "resource.start": {$lt: nowDateFormat}}).count() === 0) {
    return false
  } else {
    return true
  }
},
pastAppointments: function() {
  var nowDate;

  nowDate = new Date();
  var nowDateFormat;

  nowDateFormat = moment(nowDate).format('YYYY-MM-DD');

  return PatientAppointments.find({ "resource.start": {$lt: nowDateFormat}}).count()
},
showOrHide: function() {
  if (Session.get("includePast")) {
    return "Hide"
  } else {
    return "Show"
  }
}
});

Template.appointmentList.events({
  'click .btnShowHidePast': function(e, t) {
    Session.set("includePast", ! Session.get("includePast"));
  }
});
