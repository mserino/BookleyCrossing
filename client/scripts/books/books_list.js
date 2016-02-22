if(Meteor.isClient) {
	Template.booksList.helpers({
		books: function() {
			return Books.find({}, {sort: {submitted: -1}});
		}
	});

	Handlebars.registerHelper('trim', function(passedString, startstring, endstring) {
	   var theString = passedString.substring( startstring, endstring );
	   return new Handlebars.SafeString(theString) + "..."
	});
}
