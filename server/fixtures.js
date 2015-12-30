if (Books.find().count() === 0) {
	Books.insert({
		title: 'A thousand splendid suns',
		author: 'Khaled Hosseini',
		cover: 'http://ecx.images-amazon.com/images/I/713ZoQHz4mL.jpg'
	});
	Books.insert({
		title: 'Harry Potter and the Philosopers Stone',
		author: 'Joanne K. Rowling',
		cover: 'http://ecx.images-amazon.com/images/I/A1to2wtnOHL.jpg'
	});
	Books.insert({
		title: 'My name is Malala',
		author: 'Malala Yousafzai',
		cover: 'http://ecx.images-amazon.com/images/I/51Mn6IUJI%2BL.jpg'
	});
}