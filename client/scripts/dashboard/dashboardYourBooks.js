if(Meteor.isClient) {
	Meteor.subscribe('books');
	Meteor.subscribe('userData');

	Template.dashboardYourBooks.helpers({
		book: function() {
			var user = Meteor.user();
			return user.borrowing;
		}
	});

	Template.dashboardYourBooks.events({
		'click .js-dashboard-return': function(e) {
			e.preventDefault();
			var book = Books.findOne({_id: this._id});

			Meteor.call('returnBook', book, function(error, result) {
				FlashMessages.sendSuccess('Thank you, your book has been returned', {autoHide: true, hideDelay: 5000});
			});
		}
	});
}