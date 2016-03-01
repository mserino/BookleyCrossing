if(Meteor.isClient) {
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

	Template.dashboardRequest.helpers({
		user: function() {
			return Meteor.users.findOne({_id: this.user});
		},
		book: function() {
			return Books.findOne({_id: this.book});
		}
	});

	Template.dashboardRequest.events({
		'click .js-dashboard-request-approve': function(e) {
			e.preventDefault();

			var book = Books.findOne({_id: this.book}),
				user = Meteor.users.findOne({_id: this.user}),
				request = this;

			Meteor.call('borrowBook', book, user, request);
		},
		'click .js-dashboard-request-decline': function(e) {
			e.preventDefault();

			var book = Books.findOne({_id: this.book}),
				user = Meteor.users.findOne({_id: this.user}),
				request = this;

			Meteor.call('declineRequest', book, user, request);
		}
	});

	Template.dashboardManageBook.helpers({
		borrowed: function() {
			return this.borrowedBy !== '';
		},
		borrowedOn: function() {
			return this.borrowedOn.toDateString();
		}
	});

	Template.dashboardManageBook.events({
		'click .js-dashboard-force-return': function(e) {
			e.preventDefault();
			var book = Books.findOne({_id: this._id});

			Meteor.call('returnBook', book);
		}
	});
}