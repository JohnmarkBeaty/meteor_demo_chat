Messages = new Mongo.Collection("messages");

if (Meteor.isClient) {
  
  Template.body.helpers({
    messages: function () {
      return Messages.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
      "submit .new-message": function (event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        var text = event.target.text.value;

        // Insert a message into the collection
       // Meteor.call("addTask", text);
        Messages.insert({
          text: text,
          createdAt: new Date(), // current time
          owner: Meteor.userId(),
          username: Meteor.user().username
        });

        // Clear form
        event.target.text.value = "";
      }
  });
  
  
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
