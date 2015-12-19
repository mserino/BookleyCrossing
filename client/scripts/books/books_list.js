Template.booksList.helpers({
	books: function() {
		return Books.find({}, {sort: {submitted: -1}});
	}
});