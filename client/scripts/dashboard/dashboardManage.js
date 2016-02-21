if (Meteor.isClient) {
	Meteor.subscribe('requests');

	Template.dashboardManage.helpers({
		requests: function() {
			return Requests.find({});
		},
		notEmpty: function() {
			return Requests.find({}).count() > 0;
		}
	});

	Template.dashboardRequest.events({
		'click .js-dashboard-request-approve': function(e) {
			e.preventDefault();

			var book = this.book,
					user = this.user,
					request = this;

			Meteor.call('borrowBook', book, user, request, function(error, result) {
				$('.js-dashboard-request').text('Request approved').addClass('approved');
			});
		}
	});
}