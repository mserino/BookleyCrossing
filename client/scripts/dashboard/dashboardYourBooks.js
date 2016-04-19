if(Meteor.isClient) {
	Meteor.subscribe('books');
	Meteor.subscribe('userData');
	Meteor.subscribe('history');

	Template.dashboardYourBooks.helpers({
		book: function() {
			var user = Meteor.user();
			return Books.findOne({_id: user.borrowing});
		},
		request: function() {
			var user = Meteor.user();
			return Requests.findOne({user: user._id});
		},
		requestBook: function(request) {
			if (request) {
				return Books.findOne({_id: request.book});
			}
		},
		records: function() {
			var user = Meteor.user(),
				records = History.find({userId: user._id}).fetch();
			return records;
		},
		recordBook: function(bookId) {
			if (bookId) {
				return Books.findOne({_id: bookId});
			}
		}
	});

	Template.dashboardYourBooks.events({
		'click .js-dashboard-return': function(e) {
			e.preventDefault();
			var book = Books.findOne({_id: this._id});

			Meteor.call('returnBook', book, function(error, result) {
				FlashMessages.sendSuccess('Thank you, your book has been returned', {autoHide: true, hideDelay: 5000});
			});
		},
		'click .js-dashboard-request-cancel': function(e) {
			e.preventDefault();

			var book = Books.findOne({_id: this.book}),
				user = Meteor.user(),
				request = this;

			Meteor.call('declineRequest', book, user, request);
		}
	});
}
