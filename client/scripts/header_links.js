Template.headerLinks.helpers({
	selected: function(routeName) {
	  var curRoute = Router.current().route;
	  return curRoute.getName() === routeName ? 'selected' : '';
	}
});