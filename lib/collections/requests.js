Meteor.methods({
	requestBook: function(book, user) {
		if (!user) {
			return {
				userNotLoggedIn: true
			};
		}

		if (user.borrowing !== '' || user.requesting !== '') {
			return {
				userAlreadyBorrowing: true
			};
		}
		var request = {
			book: book._id,
			user: user._id
		};

		var requestId = Requests.insert(request);

		Books.update(book, {$set: {requestedBy: user._id}});
		Meteor.users.update(user, {$set: {requesting: book._id}});

		return {
			_id: requestId
		};
	},
	declineRequest: function(book, user, request) {
		var bookId = book,
			userId = user;

		Books.update(bookId, {$set: {requestedBy: ''}});
		Meteor.users.update(userId, {$set: {requesting: ''}});

		Requests.remove({_id: request._id});
	}
});