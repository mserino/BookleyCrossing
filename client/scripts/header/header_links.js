Template.headerLinks.helpers({
	selected: function(routeName) {
	  var curRoute = Router.current().route;
	  return curRoute.getName() === routeName ? 'selected' : '';
	}
});

Template.headerLinks.events({
	'click .js-header-close': function(e) {
		$('.js-header-menu').removeClass('open');
	},
	'click .js-header-list-item': function(e) {
		$('.js-header-menu').removeClass('open');
	}
});