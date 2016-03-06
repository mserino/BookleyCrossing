Books = new Mongo.Collection('books');
Requests = new Mongo.Collection('requests');

Meteor.methods({
	addBook: function(bookAttributes, user) {
		check(bookAttributes, {
			title: String,
			author: String,
			cover: String,
			description: String
		});

		var bookWithSameTitle = Books.findOne({title: bookAttributes.title}),
				bookWithSameAuthor = Books.findOne({author: bookAttributes.author});

		if (bookWithSameAuthor && bookWithSameTitle) {
			return {
				bookExists: true,
				_id: bookWithSameTitle._id
			};
		}

		if(!user)
			throw new Meteor.Error(401, 'You need to login to add a new book');

		var book = _.extend(bookAttributes, {
			addedBy: user._id,
			submitted: new Date(),
			borrowedBy: '',
			borrowedOn: '',
			requestedBy: ''
		});

		var bookId = Books.insert(book);

		return {
			_id: bookId
		};
	},

	editBook: function(bookAttributes, book, user) {
		check(bookAttributes, {
			title: String,
			author: String,
			cover: String,
			description: String
		});

		var editedBook = Books.findOne({_id: book._id});

		var bookId = Books.update(editedBook, {$set: {
			title: bookAttributes.title,
			author: bookAttributes.author,
			cover: bookAttributes.cover,
			description: bookAttributes.description
		}});

		return {
			_id: book._id
		};
	},

	borrowBook: function(book, user, request) {
		var bookId = book._id,
			userId = user._id;

		Books.update(bookId, {$set: {borrowedBy: userId, borrowedOn: new Date(), requestedBy: ''}});
		Meteor.users.update(userId, {$set: {borrowing: bookId, requesting: ''}});

    Requests.remove({_id: request._id});

    return {
    	_id: bookId
    };
	},

	returnBook: function(book, user) {
		var user = Meteor.user();

		Books.update(book, {$set: {borrowedBy: ''}});
		Meteor.users.update(user, {$set: {borrowing: ''}});
	},

	deleteBook: function(book) {
		if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
			var requestWithBook = Requests.findOne({book: book._id}),
					userWithRequestedBook = Meteor.users.findOne({requesting: book._id}),
					userWithBorrowedBook = Meteor.users.findOne({borrowing: book._id});

			Books.remove({_id: book._id});

			if (userWithBorrowedBook) {
				Meteor.users.update(userWithBorrowedBook, {$set: {borrowing: ''}});
			} else if (userWithRequestedBook) {
				Meteor.users.update(userWithRequestedBook, {$set: {requesting: ''}});
				Requests.remove({_id: requestWithBook._id});
			}

			return true;
		} else {
			throw new Meteor.Error(401, 'You don\'t have the permissions to perform this action');
		}
	}
});