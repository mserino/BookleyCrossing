Template.bookAdd.events({
	'submit form': function(e) {
		e.preventDefault();

		var book = {
			title: $(e.target).find('.js-new-book-title').val(),
			author: $(e.target).find('.js-new-book-author').val()
		};

		//calling method in collections/books.js
		Meteor.call('bookAdd', book, function(error, result) {
			if (error)
				return alert(error.reason);

			if (result.bookExists)
				alert('This book has already been posted');
			
			Router.go('bookPage', {_id: result._id});
		});
	}
});