Meteor.methods({
	borrowBook: function(book, user, request) {
		var bookId = book._id,
				userId = user._id;

		Books.update(bookId, {$set: {borrowedBy: user, borrowedOn: new Date(), requestedBy: ''}});
		Meteor.users.update(userId, {$set: {borrowing: book, requesting: ''}});

	    Requests.remove({_id: request._id});

	    return {
	    	_id: bookId
	    };
	},
	declineRequest: function(book, user, request) {
		console.log('decline request called');
		var bookId = book._id,
			userId = user._id;

		Books.update(bookId, {$set: {requestedBy: ''}});
		Meteor.users.update(userId, {$set: {requesting: ''}});

		Requests.remove({_id: request._id});
	}
});