Books = new Mongo.Collection('books');

Meteor.methods({
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
			borrowedBy: ''
		});

		var bookId = Books.insert(book);

		return {
			_id: bookId
		};
	},

	borrowBook: function(book) {
		var user = Meteor.user();

		if(user === null) {
			return {
				userNotLoggedIn: true
			};
		}
		var bookId = Books.update(book, {$set: {borrowedBy: user}}),
			userId = Meteor.users.update(user, {$set: {borrowing: book}});

		return {
			_id: bookId
		};
	},

	returnBook: function(book) {
		var user = book.borrowedBy;

		Books.update(book, {$set: {borrowedBy: ''}});
		Meteor.users.update(user, {$set: {borrowing: ''}});
	}
});