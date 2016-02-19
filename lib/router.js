Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() { return Meteor.subscribe('books'); }
});

Router.map(function() {
	this.route('homepage', {
		path: '/',
		yieldTemplates: {
			'homepageBanner': {to: 'banner'}
		}
	});

	this.route('booksList', {path: '/books'});

	this.route('bookPage', {
		path: '/books/:_id',
		data: function() { return Books.findOne(this.params._id);}
	});

	this.route('bookAdd', {path: '/add'});

	this.route('dashboard', {
		path: '/dashboard',
		yieldTemplates: {
		    'dashboard': {to: 'banner'}
	    }
	});

	this.route('signOut', {
		path: '/sign-out',
		onBeforeAction: function() {
			AccountsTemplates.logout();
			this.redirect('/');
		}
	});

	this.route('about', {path: '/about'});
});

Router.onBeforeAction('dataNotFound', {only: 'bookPage'});
Router.onBeforeAction(function() {
	if (!Meteor.user())
		Router.go('/sign-in');
	this.next();
}, {only: ['bookAdd', 'dashboard']});

AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('signIn');
