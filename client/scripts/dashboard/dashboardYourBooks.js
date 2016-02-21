if(Meteor.isClient) {
	Meteor.subscribe('books');

	Template.dashboardYourBooks.helpers({
		borrowedBook: function() {
			var user = Meteor.user();
			console.log(user);
			return user.borrowing;
		}		
	});
}