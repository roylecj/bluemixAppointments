Template.appointmentItem.onCreated(function() {
  Session.setDefault("PageToShow", "1" );
  Session.setDefault("currentRecord", this._id);
  Session.setDefault("MapShown", false);
});
Template.appointmentItem.helpers({
  detailAvailable: function() {
    if (PatientAppointmentDetails.find({"appointmentInTheContextOfAUser.appointment.id": this.id}).count() === 0) {
        return false
    }   else {
      return true
    }
  },
  siteFound: function() {
    if (!this.resource.participant[2].actor.display) {
      return false
    } else {
      return true
    }
  },
  statusCode: function() {
    return this.resource.status
  },
  appointmentNotes: function() {
    return this.resource.text
  },
  duration: function() {
    return this.resource.minutesDuration
  },
  phoneFound: function() {
    if (PatientAppointmentDetails.find({"appointmentInTheContextOfAUser.appointment.id": this.id}).count() === 0) {
      return false
    }

    detailRecord = PatientAppointmentDetails.findOne({"appointmentInTheContextOfAUser.appointment.id": this.id});
//  detailRecord = Session.get("appointmentDetails_" + this._id);

    var sitePhoneNumber;

    sitePhoneNumber = detailRecord.appointmentInTheContextOfAUser.appointment.site.phones[0].number;

    if (!sitePhoneNumber) {
      return false
    } else {
      return true
    }
  },
  instructionsFound: function() {
    if (PatientAppointmentDetails.find({"appointmentInTheContextOfAUser.appointment.id": this.id}).count() === 0) {
      return false
    }

    detailRecord = PatientAppointmentDetails.findOne({"appointmentInTheContextOfAUser.appointment.id": this.id});

    var instructList;
    var myInstructions = "";

    instructList = detailRecord.appointmentInTheContextOfAUser.appointment.instructions;

    if (instructList.length === 0) {
      return false
    } else {
      return true
    }

  },
  pageShown: function(pageNum) {

    if (Session.get("currentRecord") === this._id) {
      currValue = Session.get("PageToShow");
    } else {
      currValue = "1";
    }

    return (currValue === pageNum)
  },
  mapShown: function() {
    if (Session.get("currentRecord") === this._id) {
      return Session.get("MapShown")
    } else {
      return false
    }
  },
  isCurrentRecord: function() {
    if (Session.get("currentRecord") === this._id) {
      return true
    } else {
      return false
    }
  },
  appointmentDateTime: function() {
    appTime = moment(this.resource.start);

    detailRecord = PatientAppointmentDetails.findOne({"appointmentInTheContextOfAUser.appointment.id": this.id});
//    Session.set("appointmentDetails_" + this._id,  detailRecord);

    return appTime.format("dddd, MMMM Do YYYY, h:mm a");
  },
  appointmentTypeName: function() {
    return this.resource.reason.text
  },
  departmentName: function() {
    return this.departmentName
  },
  siteName: function() {
    return this.siteName
  },
  daysAway: function() {
    appTime = moment(this.resource.start);

    return appTime.fromNow();
  },
  instructions: function() {

    if (PatientAppointmentDetails.find({"appointmentInTheContextOfAUser.appointment.id": this.id}).count() === 0) {
      return "";
    }

    detailRecord = PatientAppointmentDetails.findOne({"appointmentInTheContextOfAUser.appointment.id": this.id});

    // detailRecord = Session.get("appointmentDetails_" + this._id);
    var instructList;
    var myInstructions = "";

    instructList = detailRecord.appointmentInTheContextOfAUser.appointment.instructions;

    for (i = 0; i < instructList.length; i++ ) {
      if (instructList[i].isForPatient === true) {
        myInstructions = myInstructions + instructList[i].text;
      }
    }

    return myInstructions
  },
  canCancel: function() {

    if (PatientAppointmentDetails.find({"appointmentInTheContextOfAUser.appointment.id": this.id}).count() === 0) {
      return false
    }

    detailRecord = PatientAppointmentDetails.findOne({"appointmentInTheContextOfAUser.appointment.id": this.id});
//  detailRecord = Session.get("appointmentDetails_" + this._id);
    var canCancelAppt;

    canCancelAppt = detailRecord.appointmentInTheContextOfAUser.userCanCancelAppointment;

    if (canCancelAppt === true) {
      return true
    } else {
      return false
    }
  },
  sitePhone: function() {

    if (PatientAppointmentDetails.find({"appointmentInTheContextOfAUser.appointment.id": this.id}).count() === 0) {
      return ""
    }

    detailRecord = PatientAppointmentDetails.findOne({"appointmentInTheContextOfAUser.appointment.id": this.id});
//  detailRecord = Session.get("appointmentDetails_" + this._id);

    var sitePhoneNumber;

    sitePhoneNumber = detailRecord.appointmentInTheContextOfAUser.appointment.site.phones[0].number;

    return sitePhoneNumber
  },
  address: function() {


    if (PatientAppointmentDetails.find({"appointmentInTheContextOfAUser.appointment.id": this.id}).count() === 0) {
      return ""
    }
//    detailRecord = Session.get("appointmentDetails_" + this._id);
  detailRecord = PatientAppointmentDetails.findOne({"appointmentInTheContextOfAUser.appointment.id": this.id, userId: Meteor.userId()});
    var dur = detailRecord.appointmentInTheContextOfAUser.appointment.location.description;

    return dur
  },
  fhirMessage: function() {
    return Session.get("fhirResponse")
  },
  clinician: function() {
    return this.resource.participant[1].actor.display
  },
  location: function() {
    return this.resource.participant[2].actor.display
  },
  addressLine2: function() {


    if (PatientAppointmentDetails.find({"appointmentInTheContextOfAUser.appointment.id": this.id}).count() === 0) {
      return ""
    }

//    detailRecord = Session.get("appointmentDetails_" + this._id);
  detailRecord = PatientAppointmentDetails.findOne({"appointmentInTheContextOfAUser.appointment.id": this.id, userId: Meteor.userId()});
    var dur = ""
    dur = detailRecord.appointmentInTheContextOfAUser.appointment.site.address.street1 + " " + detailRecord.appointmentInTheContextOfAUser.appointment.site.address.street2 + " " + detailRecord.appointmentInTheContextOfAUser.appointment.site.address.city + " " + detailRecord.appointmentInTheContextOfAUser.appointment.site.address.state + " " + detailRecord.appointmentInTheContextOfAUser.appointment.site.address.zipCode;

    return dur
  },
  resourceName: function() {


        if (PatientAppointmentDetails.find({"appointmentInTheContextOfAUser.appointment.id": this.id}).count() === 0) {
          return ""
      }

//    detailRecord = Session.get("appointmentDetails_" + this._id);
  detailRecord = PatientAppointmentDetails.findOne({"appointmentInTheContextOfAUser.appointment.id": this.id, userId: Meteor.userId()});
    var value = ""
    value = detailRecord.appointmentInTheContextOfAUser.appointment.resource.name;

    return value
  },
  onlineBookingCode: function() {


        if (PatientAppointmentDetails.find({"appointmentInTheContextOfAUser.appointment.id": this.id}).count() === 0) {
          return ""
        }
//    detailRecord = Session.get("appointmentDetails_" + this._id);
  detailRecord = PatientAppointmentDetails.findOne({"appointmentInTheContextOfAUser.appointment.id": this.id, userId: Meteor.userId()});
    var bookingCode = detailRecord.appointmentInTheContextOfAUser.appointment.patient.onlineBookingCode;

    return bookingCode
  },
  exampleMapOptions: function() {
  // Make sure the maps API has loaded

debugger

  var thisLat;
  var thisLong;
/*
      if (PatientAppointmentDetails.find({"appointmentInTheContextOfAUser.appointment.id": this.id}).count() === 0) {
        return {centre: new google.maps.LatLng("-27.5130292","153.0442283"),
        zoom: 17}
      }
*/
// debugger
//  detailRecord = Session.get("appointmentDetails_" + this._id);
  locationRecord = LocationLinks.findOne({name: this.resource.participant[2].actor.display})

  thisLat = locationRecord.lat;
  thisLong = locationRecord.long;

  if (GoogleMaps.loaded()) {
    // Map initialization options
    return {
      center: new google.maps.LatLng(thisLat, thisLong),
      zoom: 17
    };
  }
}
});

Template.appointmentItem.events({
  'click .cancelAppointment': function(e, t) {
    var thisLink;

    thisLink = this.links[2].href;
    thisLink = thisLink.replace("http://10.1.1.63/", "https://schedulingdemo.healthhost.net/");

    // So we have the cancel appointment link

    var deviceId;
    var secretValue;

    pat = PatientSettings.findOne({userId: Meteor.userId()});

    deviceId = pat.deviceId;
    secretValue = pat.secret;

    thisId = this._id;

    Meteor.call("callUGBroka", thisLink,"POST", deviceId, secretValue, function(e, result) {
      PatientAppointments.remove({_id: thisId});
      // Session.set("resetAppointments", true);

      sAlert.success("Appointment Cancelled!");
    });
  },
  'click .btnNextPage': function(e, t) {
    if (Session.get("currentRecord") === this._id) {
      if (Session.get("PageToShow") === "1") {
        Session.set("PageToShow", "2")
      } else {
        Session.set("PageToShow", "3")
      }
    } else {
      Session.set("currentRecord", this._id);
      Session.set("PageToShow", "2");
      }

  },
  'click .btnPrevPage': function(e, t) {
    if (Session.get("currentRecord") === this._id) {
      if (Session.get("PageToShow") === "2") {
        Session.set("PageToShow", "1")
      } else {
        Session.set("PageToShow", "2")
      }
    } else {
      Session.set("currentRecord", this._id);
      Session.set("PageToShow", "2");
      }

  },
  'click .mapItem': function(e, t) {
    if (Session.get("currentRecord") === this._id) {
      Session.set("MapShown", ! Session.get("MapShown"));
    } else {
      Session.set("currentRecord", this._id);
      Session.set("MapShown", true);
    }
  }
});
