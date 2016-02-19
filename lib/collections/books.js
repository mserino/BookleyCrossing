Books = new Mongo.Collection('books');
Requests = new Mongo.Collection('requests');

Meteor.methods({
	requestBook: function(book) {
		var user = Meteor.user();

		var requestedBook = _.extend(book, {
			requested: true
		});

		var request = {
			book: requestedBook,
			user: user
		};

		var requestId = Requests.insert(request);

		if(!user) {
			return {
				userNotLoggedIn: true
			};
		}

		return {
			_id: requestId
		};
	},

	bookAdd: function(bookAttributes) {
		check(bookAttributes, {
			title: String,
			author: String,
			cover: String
		});

		var bookWithSameTitle = Books.findOne({title: bookAttributes.title}),
				bookWithSameAuthor = Books.findOne({author: bookAttributes.author}),
				user = Meteor.user();

		if (bookWithSameAuthor && bookWithSameTitle) {
			return {
				bookExists: true,
				_id: bookWithSameTitle._id
			};
		}

		if (!user)
			throw new Meteor.Error(401, 'You need to login to add a new book');

		var book = _.extend(bookAttributes, {
			addedBy: user,
			submitted: new Date(),
			borrowedBy: '',
			borrowedOn: ''
		});

		var bookId = Books.insert(book);

		return {
			_id: bookId
		};
	},

	borrowBook: function(book) {
		var user = Meteor.user();

		if (user === null) {
			return {
				userNotLoggedIn: true
			};
		}

		if (user.borrowing !== '') {
			return {
				userAlreadyBorrowing: true
			};
		}

		var bookId = Books.update(book, {$set: {borrowedBy: user, borrowedOn: new Date()}}),
			userId = Meteor.users.update(user, {$set: {borrowing: book}});

		return {
			_id: bookId
		};
	},

	returnBook: function(book) {
		var user = Meteor.user();

		Books.update(book, {$set: {borrowedBy: ''}});
		Meteor.users.update(user, {$set: {borrowing: ''}});
	}
});