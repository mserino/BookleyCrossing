if (Meteor.isClient) {
	Meteor.subscribe('requests');

	Template.dashboardManage.helpers({
		requests: function() {
			console.log('a: ' + Requests.find({}).count());
			return Requests.find({});
		}
	});
}