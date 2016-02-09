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
	}
});

Template.bookItem.events({
	'click .js-borrow-book': function(e) {
		e.preventDefault();

		var book = Books.findOne({_id: this._id});

		Meteor.call('borrowBook', book, function(error, result) {

			if (result.userNotLoggedIn) {
				FlashMessages.sendError('You need to be logged in to borrow a book', { autoHide: true, hideDelay: 5000 });
				Router.go('/sign-in');
			}

			if (result.userAlreadyBorrowing) {
				$('.js-borrow-errors').text('Oops! You can\'t borrow more than one book at the time. Please return the book you\'re reading before borrowing a new one.');
				FlashMessages.sendError('It looks like you are already borrowing a book. Please return it before borrowing a new one', { autoHide: true, hideDelay: 5000 });
			} else {
				FlashMessages.sendSuccess('Book successfully borrowed!', {autoHide: true, hideDelay: 5000});
			}
		});
	},
	'click .js-return-book': function(e) {
		e.preventDefault();
		var book = Books.findOne({_id: this._id});

		Meteor.call('returnBook', book, function(error, result) {
			FlashMessages.sendSuccess('Thank you!', {autoHide: true, hideDelay: 5000});
		});
	}
});