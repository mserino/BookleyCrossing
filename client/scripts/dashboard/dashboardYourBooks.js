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
		'click .js-dashboard-return': function() {
			var book = this;
			Meteor.call('returnBook', book, function(error, result) {
				FlashMessages.sendSuccess('Thank you, your book has been returned', {autoHide: true, hideDelay: 5000})
			});
		}
	});
}