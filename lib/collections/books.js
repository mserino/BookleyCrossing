Books = new Mongo.Collection('books');
Requests = new Mongo.Collection('requests');

Meteor.methods({
	requestBook: function(book) {
		var user = Meteor.user();

		if(!user) {
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
			book: book,
			user: user
		};

		var requestId = Requests.insert(request);

		Books.update(book, {$set: {requestedBy: user}});
		Meteor.users.update(user, {$set: {requesting: book}});

		return {
			_id: requestId
		};
	},

	addBook: function(bookAttributes) {
		check(bookAttributes, {
			title: String,
			author: String,
			cover: String,
			description: String
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
			borrowedOn: '',
			requestedBy: ''
		});

		var bookId = Books.insert(book);

		return {
			_id: bookId
		};
	},

	returnBook: function(book, user) {
		var user = Meteor.user();

		Books.update(book, {$set: {borrowedBy: ''}});
		Meteor.users.update(user, {$set: {borrowing: ''}});
	}
});