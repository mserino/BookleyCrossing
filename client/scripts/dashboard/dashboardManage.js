if (Meteor.isClient) {
	Meteor.subscribe('requests');
	Meteor.subscribe('books');

	Template.dashboardManage.helpers({
		requests: function() {
			return Requests.find({});
		},
		requestsNotEmpty: function() {
			return Requests.find({}).count() > 0;
		},
		books: function() {
			return Books.find({});
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

	Template.dashboardBook.helpers({
		borrowed: function() {
			return this.borrowedBy !== '';
		},
		borrowedOn: function() {
			return this.borrowedOn.toDateString();
		}
	});

	Template.dashboardBook.events({
		'click .js-dashboard-force-return': function(e) {
			e.preventDefault();
			var book = Books.findOne({_id: this._id});

			Meteor.call('returnBook', book);
		}
	});
}