if(Meteor.isClient) {
	Meteor.subscribe('books');
	Meteor.subscribe('userData');

	Template.bookItem.helpers({
		user: function() {
			var addedBy = this.addedBy;
			var user = Meteor.users.findOne({_id: addedBy});
			return user;
		},
		borrowed: function() {
			if (this.borrowedBy) {
				var user = Meteor.users.findOne({_id: this.borrowedBy});
				return user;
			}
		},
		isBorrowing: function() {
			if (this.borrowedBy) {
				var currentUserId;

				if (Meteor.user()) {
					currentUserId = Meteor.user()._id;
				}

				return this.borrowedBy === currentUserId;
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
		},
		records: function() {
			var records = History.find({bookId: this._id}).fetch();
			return records;
		},
		recordUser: function(userId) {
			if (userId) {
				return Meteor.users.findOne({_id: userId});
			}
		},
		difference: function() {
			var firstDay = this.from,
				lastDay = this.to;
			return moment(lastDay).diff(moment(firstDay), 'days');
		}
	});
}
