Meteor.methods({
	addToWishlist: function(book, user) {
		var userWishlist = user.wishlist;

		if(_.contains(userWishlist, book._id)) {
			return {
				bookInWishlist: true
			};
		}

		var userId = Meteor.users.update(user, {$push: {wishlist: book._id}});

		return {
			_id: book._id
		};
	},
	removeFromWishlist: function(book, user) {
		Meteor.users.update(user, {$pull: {wishlist: book._id}});

		return {
			_id: book._id
		};
	}
});