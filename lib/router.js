Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() { return Meteor.subscribe('books'); }
});

Router.map(function() {
	this.route('homepage', {
		path: '/'
	});

	this.route('booksList', {path: '/books'});

	this.route('bookPage', {
		path: '/books/:_id',
		data: function() { return Books.findOne(this.params._id);}
	});

	this.route('bookAdd', {path: '/add'});

	this.route('editBook', {
		path: '/edit/:_id',
		data: function() { return Books.findOne(this.params._id);},
		waitOn: function () {
      return [ Meteor.subscribe('roles') ];
    },
    onBeforeAction: function () {
      if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      	history.back();
      	FlashMessages.sendError('Sorry, you don\'t have the permissions to perform this action', {autoHide: true, hideDelay: 5000});
      } else {
        this.next();
      }
    }
	});

	this.route('dashboard', {
		path: '/dashboard',
		data: function() { return Requests.find();}
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
	if (!Meteor.user()) {
		FlashMessages.sendError('Please login to continue', {autoHide: true, hideDelay: 5000});
		Router.go('/sign-in');
	}
	this.next();
}, {only: ['bookAdd', 'dashboard', 'editBook']});

// Options
AccountsTemplates.configure({
    enablePasswordChange: true,
    showForgotPasswordLink: true,
    confirmPassword: true,
    overrideLoginErrors: true
});

AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('changePwd');