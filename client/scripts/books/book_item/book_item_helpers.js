if(Meteor.isClient) {
	Meteor.subscribe('books');
	Meteor.subscribe('userData');

	Template.bookItem.helpers({
		submitted: function() {
			return this.submitted.toDateString();
		},
		borrowed: function() {
			if (this.borrowedBy.username) {
				return this.borrowedBy.username;
			}
		},
		borrowedOn: function() {
			return this.borrowedOn.toDateString();
		},
		isBorrowing: function() {
			if (this.borrowedBy.username) {
				var borrowedBy = this.borrowedBy.username,
					currentUser;

				if (Meteor.user()) {
					currentUser = Meteor.user().username;
				}

				return borrowedBy === currentUser;
			}
		},
		requested: function() {
			if (this.requestedBy !== '') {
				return true;
			}
		},
		isRequesting: function() {
			if (this.requestedBy !== '') {
				if (Meteor.user()) {
					var userId = this.requestedBy,
						currentUserId = Meteor.user()._id;

					return userId === currentUserId;
				}
			}
		},
		inWishlist: function() {
			if (Meteor.user()) {
			var wishlist = Meteor.user().wishlist;
				var bookId = this._id;

				if(_.contains(wishlist, bookId)) {
					return true;
				}
			}
		}
	});
}