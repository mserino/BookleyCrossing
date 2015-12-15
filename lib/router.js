Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return Meteor.subscribe('books'); }
});

Router.route('/', {name: 'booksList'});
Router.route('/books/:_id', {
	name: 'bookPage',
	data: function() { return Books.findOne(this.params._id); }
});