if(Meteor.isClient) {
	Meteor.subscribe('userData');
	Meteor.subscribe('books');

	Template.dashboardWishlist.helpers({
		wishlist: function() {
			var userWishlistId = Meteor.user().wishlist,
				userWishListBooks = [];

			_.forEach(userWishlistId, function(item) {
				var book = Books.findOne({_id: item});
				userWishListBooks.push(book);
			});

			return userWishListBooks;
		}
	});

	Template.dashboardWishlistBook.events({
		'click .js-wishlist-remove': function(e) {
			e.preventDefault();
			var user = Meteor.user(),
				book = this;

			Meteor.call('removeFromWishlist', book, user);
		},
		'click .js-wishlist-request': function(e) {
			e.preventDefault();
			var user = Meteor.user(),
				book = this;

			Meteor.call('requestBook', book, user, function(error, result) {
				if (result.userAlreadyBorrowing) {
					FlashMessages.sendError('It looks like you are already borrowing or requesting a book. Please return it before borrowing a new one', { autoHide: true, hideDelay: 5000 });
				} else {
					FlashMessages.sendSuccess('Thank you, your request has been sent', {autoHide: true, hideDelay: 5000});
					Router.go('bookPage', {_id: book._id});
				}
			});
		}
	});

	Template.dashboardWishlistBook.helpers({
		isRequestingOrBorrowing: function() {
			var user = Meteor.user();

			return user.borrowing !== '' || user.requesting !== '';
		},
		requestingThis: function() {
			var user = Meteor.user();
			return (user.requesting === this._id);
		}
	});
}