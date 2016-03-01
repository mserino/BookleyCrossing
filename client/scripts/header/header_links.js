if(Meteor.isClient) {
	Template.headerLinks.helpers({
		selected: function(routeName) {
		  var curRoute = Router.current().route;
		  return curRoute.getName() === routeName ? 'selected' : '';
		}
	});

	Template.headerLinks.events({
		'click .js-header-close': function(e) {
			closeMenu();
		},
		'click .js-header-list-item': function(e) {
			closeMenu();
		},
		'click .js-header-overlay.open': function(e) {
			closeMenu();
		}
	});

	var closeMenu = function() {
		$('.js-header-menu').removeClass('open');
		$('.js-header-hamburger').removeClass('hidden');
		$('.js-header-overlay').removeClass('open');
	};
}