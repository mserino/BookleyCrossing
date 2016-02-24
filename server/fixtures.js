if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
        username: 'test',
        email: 'test@test.com',
        password: 'testtest',
        borrowing: '',
        requesting: ''
    });

    Accounts.createUser({
    	username: 'admin',
    	email: 'admin@bookleycrossing.com',
    	password: 'admintest',
    	borrowing: '',
    	requesting: ''
    });
    var adminId = Meteor.users.findOne({username: 'admin'})._id;
    var testId = Meteor.users.findOne({username: 'test'})._id;
    Roles.addUsersToRoles(adminId, ['admin', 'user']);
    Roles.addUsersToRoles(testId, ['user']);
}

if (Books.find().count() === 0) {
	Books.insert({
		title: 'A thousand splendid suns',
		author: 'Khaled Hosseini',
		cover: 'http://ecx.images-amazon.com/images/I/713ZoQHz4mL.jpg',
		submitted: new Date(),
		borrowedBy: '',
		borrowedOn: new Date('February 8, 2016 03:24:00'),
		requestedBy: ''
	});
	Books.insert({
		title: 'Harry Potter and the Philosopers Stone',
		author: 'Joanne K. Rowling',
		cover: 'http://ecx.images-amazon.com/images/I/A1to2wtnOHL.jpg',
		submitted: new Date(),
		borrowedBy: '',
		borrowedOn: '',
		requestedBy: ''
	});
	Books.insert({
		title: 'My name is Malala',
		author: 'Malala Yousafzai',
		cover: 'http://ecx.images-amazon.com/images/I/51Mn6IUJI%2BL.jpg',
		submitted: new Date(),
		borrowedBy: '',
		borrowedOn: '',
		requestedBy: ''
	});
	Books.insert({
		title: 'The Japanese Lover',
		author: 'Isabelle Allende',
		cover: 'http://ecx.images-amazon.com/images/I/41oGAdM1sOL.jpg',
		submitted: new Date('January 1, 2016 03:24:00'),
		borrowedBy: '',
		borrowedOn: '',
		requestedBy: ''
	});
	Books.insert({
		title: 'Norwegian Wood',
		author: 'Haruki Murakami',
		cover: 'http://ecx.images-amazon.com/images/I/41rw1DHW2FL.jpg',
		submitted: new Date(),
		borrowedBy: '',
		borrowedOn: '',
		requestedBy: ''
	});
	Books.insert({
		title: 'All the light we cannot see',
		author: 'Anthony Doerr',
		cover: 'http://ecx.images-amazon.com/images/I/511qpsWcTyL.jpg',
		submitted: new Date('January 7, 2016 00:00:00'),
		borrowedBy: '',
		borrowedOn: '',
		requestedBy: ''
	});
}