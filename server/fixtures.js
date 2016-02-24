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
    description: 'Mariam is only fifteen when she is sent to Kabul to marry Rasheed. Nearly two decades later, a friendship grows between Mariam and a local teenager, Laila, as strong as the ties between mother and daughter. When the Taliban take over, life becomes a desperate struggle against starvation, brutality and fear. Yet love can move a person to act in unexpected ways, and lead them to overcome the most daunting obstacles with a startling heroism.' ,
		submitted: new Date(),
		borrowedBy: '',
		borrowedOn: new Date('February 8, 2016 03:24:00'),
		requestedBy: ''
	});
	Books.insert({
		title: 'Harry Potter and the Philosopers Stone',
		author: 'Joanne K. Rowling',
		cover: 'http://ecx.images-amazon.com/images/I/A1to2wtnOHL.jpg',
    description: 'Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry's eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!'',
		submitted: new Date(),
		borrowedBy: '',
		borrowedOn: '',
		requestedBy: ''
	});
	Books.insert({
		title: 'My name is Malala',
		author: 'Malala Yousafzai',
    description: 'When the Taliban took control of the Swat Valley, one girl fought for her right to an education. On Tuesday, 9 October 2012, she almost paid the ultimate price when she was shot in the head at point-blank range. Malala Yousafzai's extraordinary journey has taken her from a remote valley in northern Pakistan to the halls of the United Nations. She has become a global symbol of peaceful protest and is the youngest ever winner of the Nobel Peace Prize. I Am Malala will make you believe in the power of one person's voice to inspire change in the world.',
		cover: 'http://ecx.images-amazon.com/images/I/51Mn6IUJI%2BL.jpg',
		submitted: new Date(),
		borrowedBy: '',
		borrowedOn: '',
		requestedBy: ''
	});
	Books.insert({
		title: 'The Japanese Lover',
		author: 'Isabelle Allende',
    description: 'In 1939, as Poland falls under the shadow of the Nazis and the world goes to war, young Alma Belasco's parents send her overseas to live with an aunt and uncle in their opulent San Francisco mansion. There she meets Ichimei Fukuda, the son of the family's Japanese gardener, and between them a tender love blossoms, but following Pearl Harbor the two are cruelly pulled apart. Throughout their lifetimes, Alma and Ichimei reunite again and again, but theirs is a love they are forever forced to hide from the world. Decades later, Alma is nearing the end of her long and eventful life. Irina Bazili, a care worker struggling to reconcile her own troubled past, meets the older woman and her grandson, Seth, at Lark House nursing home. As Irina and Seth forge a friendship, they become intrigued by a series of mysterious gifts and letters sent to Alma, and learn about Ichimei and this extraordinary secret passion that has endured for nearly seventy years.',
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
    description: 'When he hears her favourite Beatles song, Toru Watanabe recalls his first love Naoko, the girlfriend of his best friend Kizuki. Immediately he is transported back almost twenty years to his student days in Tokyo, adrift in a world of uneasy friendships, casual sex, passion, loss and desire - to a time when an impetuous young woman called Midori marches into his life and he has to choose between the future and the past.',
		submitted: new Date(),
		borrowedBy: '',
		borrowedOn: '',
		requestedBy: ''
	});
	Books.insert({
		title: 'All the light we cannot see',
		author: 'Anthony Doerr',
		cover: 'http://ecx.images-amazon.com/images/I/511qpsWcTyL.jpg',
    description:'A beautiful, stunningly ambitious novel about a blind French girl and a German boy whose paths collide in occupied France as both try to survive the devastation of World War II Open your eyes and see what you can with them before they close forever.’ For Marie-Laure, blind since the age of six, the world is full of mazes. The miniature of a Paris neighbourhood, made by her father to teach her the way home. The microscopic layers within the invaluable diamond that her father guards in the Museum of Natural History. The walled city by the sea, where father and daughter take refuge when the Nazis invade Paris. And a future which draws her ever closer to Werner, a German orphan, destined to labour in the mines until a broken radio fills his life with possibility and brings him to the notice of the Hitler Youth. In this magnificent, deeply moving novel, the stories of Marie-Laure and Werner illuminate the ways, against all odds, people try to be good to one another.',
		submitted: new Date('January 7, 2016 00:00:00'),
		borrowedBy: '',
		borrowedOn: '',
		requestedBy: ''
	});
}
