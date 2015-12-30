Books = new Mongo.Collection('books');

// TODO: remove commented out lines when user will be implemented

Meteor.methods({
	bookAdd: function(bookAttributes) {
		check(bookAttributes, {
			title: String,
			author: String
		});

		var bookWithSameTitle = Books.findOne({title: bookAttributes.title}),
				bookWithSameAuthor = Books.findOne({author: bookAttributes.author}),
				user = Meteor.user();

		if (bookWithSameAuthor && bookWithSameTitle) {
			return {
				bookExists: true,
				_id: bookWithSameTitle._id
			}
		}

		if (!user)
			throw new Meteor.Error(401, 'You need to login to add a new book');
		
		var book = _.extend(bookAttributes, {
			addedBy: user,
			submitted: new Date()
		});

		var bookId = Books.insert(book);

		return {
			_id: bookId
		};
	}
});