Template.bookItem.helpers({
	submitted: function() {
		return this.submitted.toDateString();
	}
});

Template.bookItem.events({
	'click .js-borrow-book': function(e) {
		e.preventDefault();

		var book = Books.findOne({_id: this._id});
		
		Meteor.call('borrowBook', book, function(error, result) {
			
			if (error)
				FlashMessages.sendError(error.reason, { autoHide: false });
				console.log(error);

			console.log('a', result);
		});
	}
});