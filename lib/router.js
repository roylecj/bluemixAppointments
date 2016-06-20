Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [
      Meteor.subscribe('patientSettings'),
      Meteor.subscribe("userDirectory"),
      Meteor.subscribe("locationLinks")
    ];
  }
});

Router.route('/', {name: 'login'});
Router.route('/appointmentList', {name: 'appointmentList'});
Router.route('/appointment/:_id', {name: 'appointmentItem'});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
    this.render('accessDenied');
  }
  }
  else {
    this.next();
  }
};

// Make sure that you are logged in before we start doing this...
Router.onBeforeAction(requireLogin, {except: ['login']});
