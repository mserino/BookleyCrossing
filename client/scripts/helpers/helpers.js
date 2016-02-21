Template.registerHelper('requestsCount', function() {
	return Requests.find({}).count();
});

Template.registerHelper('requestsNotification', function() {
	return Requests.find({}).count() > 0;
});