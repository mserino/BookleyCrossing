Template.booksList.helpers({
	books: function() {
		return Books.find();
	}
});