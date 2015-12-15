if (Books.find().count() === 0) {
	Books.insert({
		title: 'A thousand splendid suns',
		author: 'Khaled Hosseini'
	});
	Books.insert({
		title: 'Harry Potter and the Philosopers Stone',
		author: 'Joanne K. Rowling'
	});
	Books.insert({
		title: 'My name is Malala',
		author: 'Malala Yousafzai'
	});
}