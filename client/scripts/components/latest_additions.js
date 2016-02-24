if(Meteor.isClient) {
	Template.latestAdditions.helpers({
		books: function() {
			return Books.find({}, {sort: {submitted: -1}, limit: 4});
		}
	});
}