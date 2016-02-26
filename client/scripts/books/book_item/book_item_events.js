if(Meteor.isClient) {
	Template.bookItem.events({
		'click .js-borrow-book': function(e) {
			e.preventDefault();

			var book = Books.findOne({_id: this._id});

			Meteor.call('requestBook', book, function(error, result) {
				if(error) {
					FlashMessages.sendError(error.reason, {autohide: false});
					Router.go('bookAdd');
				} else if (result.userNotLoggedIn) {
					FlashMessages.sendError('You need to be logged in to request a book', {autoHide: true, hideDelay: 5000});
					Router.go('/sign-in');
				} else if (result.userAlreadyBorrowing) {
					$('.js-borrow-notifications').text('Oops! You can\'t borrow or request more than one book at a time. Please return the book you\'re reading before borrowing a new one.');
					FlashMessages.sendError('It looks like you are already borrowing or requesting a book. Please return it before borrowing a new one', { autoHide: true, hideDelay: 5000 });
				} else {
					$('.js-borrow-notifications').text('Thank you for requesting this book. Come collect it from the library.');
					FlashMessages.sendSuccess('Thank you, your request has been sent', {autoHide: true, hideDelay: 5000})
				}
			});
		},

		'click .js-return-book': function(e) {
			e.preventDefault();
			var book = Books.findOne({_id: this._id});

			Meteor.call('returnBook', book, function(error, result) {
				FlashMessages.sendSuccess('Thank you!', {autoHide: true, hideDelay: 5000});
			});
		},

		'click .js-wishlist-add': function(e) {
			e.preventDefault();
			var book = this,
				user = Meteor.user();
			if(user) {
				Meteor.call('addToWishlist', book, user, function(error, result) {
					if(result.bookInWishlist) {
						FlashMessages.sendError('You have already added this book to your wishlist', {autoHide: true, hideDelay: 5000});
					} else {
						FlashMessages.sendSuccess('Book added to your wishlist', {autoHide: true, hideDelay: 5000});
					}
				});
			}
		}
	});
}