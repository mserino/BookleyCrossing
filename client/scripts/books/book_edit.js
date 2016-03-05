if (Meteor.isClient) {
	Template.editBook.events({
		'submit form': function(e) {
			e.preventDefault();
			var attributes = {
				title: $(e.target).find('.js-edit-book-title').val(),
				author: $(e.target).find('.js-edit-book-author').val(),
				cover: $(e.target).find('.js-edit-book-cover').val(),
				description: $(e.target).find('.js-edit-book-description').val()
			};
			
			var book = this,
					user = Meteor.user();

			Meteor.call('editBook', attributes, book, user, function(error, result) {
				if (error) {
					FlashMessages.sendError(error.reason, { autoHide: false });
					Router.go('editBook');
				} else {
					FlashMessages.sendSuccess('Your changes have been saved', {autoHide: true, hideDelay: 5000 });
				}

				Router.go('bookPage', {_id: result._id});
			});
		}
	});
}