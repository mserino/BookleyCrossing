if(Meteor.isClient) {
	Template.registerHelper('requestsCount', function() {
		return Requests.find({}).count();
	});

	Template.registerHelper('requestsNotification', function() {
		return Requests.find({}).count() > 0;
	});

	Handlebars.registerHelper('trim', function(passedString, startstring, endstring) {
		 var theString = passedString.substring( startstring, endstring );
		 return new Handlebars.SafeString(theString) + "..."
	});
}
