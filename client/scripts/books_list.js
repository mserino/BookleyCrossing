var booksData = [
	{
		title: 'A thousand splendid suns',
		author: 'Khaled Hosseni'
	},
	{
		title: 'Harry Potter and the Philosopher Stone',
		author: 'Joanne K. Rowling'
	}
];

Template.booksList.helpers({
	books: booksData
});