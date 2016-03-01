Meteor.publish('books', function() {
	return Books.find();
});

Meteor.publish('requests', function() {
	return Requests.find();
});