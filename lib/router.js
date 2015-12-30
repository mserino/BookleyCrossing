Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() { return Meteor.subscribe('books'); }
});

Router.map(function() {
	this.route('homepage', {path: '/'});

	this.route('booksList', {path: '/books'});

	this.route('bookPage', {
		path: '/books/:_id',
		data: function() { return Books.findOne(this.params._id);}
	});

	this.route('bookAdd', {path: '/add'});

	this.route('signOut', {
		path: '/sign-out',
		onBeforeAction: function() {
			AccountsTemplates.logout();
			this.redirect('/');
		}
	});
});

Router.onBeforeAction('dataNotFound', {only: 'bookPage'});
Router.onBeforeAction(function() {
	if (!Meteor.user())
		Router.go('/sign-in');
	this.next();
}, {only: 'bookAdd'});

AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('signIn');
