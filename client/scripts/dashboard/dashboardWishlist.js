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
		}
	});
}