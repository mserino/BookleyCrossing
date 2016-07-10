if(Meteor.isClient) {
	Template.registerHelper('requestsCount', function() {
		return Requests.find({}).count();
	});

	Template.registerHelper('requestsNotification', function() {
		return Requests.find({}).count() > 0;
	});

	Template.registerHelper('status', function() {
		var status;

		if (isNew(this.submitted)) {
			status = 'new';
		}
		if (this.requestedBy) {
			status = 'requested';
		}
		if (this.borrowedBy) {
			status = 'borrowed';
		}
		return status;
	});

	Template.registerHelper('convertDate', function(timestamp) {
    	return moment(timestamp).format('Do MMMM YYYY');
	});

	Handlebars.registerHelper('trim', function(passedString, startstring, endstring) {
		 var theString = passedString.substring( startstring, endstring );
		 return new Handlebars.SafeString(theString) + "...";
	});

	Handlebars.registerHelper('empty', function(array) {
		return _.size(array) === 0;
	});

	Template.registerHelper('starRating', function(book) {
		var stars = book.stars;
		if (stars) {
			var reduced = stars.reduce(function(total, num){return total + num }, 0);
			var average = reduced/stars.length;
			return parseFloat(average).toFixed(1);
		}
	});

	var isNew = function(date) {
		var today = new Date(),
			timeDiff = Math.floor((today - date) / (1000*60*60*24));

		if (timeDiff < 3) {
			return true;
		}
		return false;
	};
}
