Books = new Mongo.Collection('books');

// TODO: remove commented out lines when user will be implemented

Meteor.methods({
	bookAdd: function(bookAttributes) {
		//check(Meteor.userId(), String);
		check(bookAttributes, {
			title: String,
			author: String
		});

		var bookWithSameTitle = Books.findOne({title: bookAttributes.title});
		var bookWithSameAuthor = Books.findOne({author: bookAttributes.author});

		if (bookWithSameAuthor && bookWithSameTitle) {
			return {
				bookExists: true,
				_id: bookWithSameTitle._id
			}
		}

		//var user = Meteor.user();
		var book = _.extend(bookAttributes, {
			// userId: user._id,
			// addedBy: user.username,
			submitted: new Date()
		});

		var bookId = Books.insert(book);

		return {
			_id: bookId
		};
	}
});