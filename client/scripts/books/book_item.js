Template.bookItem.helpers({
	submitted: function() {
		return this.submitted.toDateString();
	},
	borrowed: function() {
		if(this.borrowedBy.username) {
			return this.borrowedBy.username;
		}
	},
	borrowedOn: function() {
		return this.borrowedOn.toDateString();
	},
	isBorrowing: function() {
		if(this.borrowedBy.username) {
			var borrowedBy = this.borrowedBy.username,
				currentUser;

			if(Meteor.user()) {
				currentUser = Meteor.user().username;
			}

			return borrowedBy === currentUser;
		}
	}
});

Template.bookItem.events({
	'click .js-borrow-book': function(e) {
		e.preventDefault();

		var book = Books.findOne({_id: this._id});

		Meteor.call('borrowBook', book, function(error, result) {
			if (result.userNotLoggedIn)
				FlashMessages.sendError('You need to be logged in to borrow a book', { autoHide: true, hideDelay: 5000 });
		});
	},
	'click .js-return-book': function(e) {
		e.preventDefault();
		var book = Books.findOne({_id: this._id});

		Meteor.call('returnBook', book);
	}
});