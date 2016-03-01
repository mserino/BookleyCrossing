if(Meteor.isClient) {
	Template.bookAdd.events({
		'submit form': function(e) {
			e.preventDefault();

		var book = {
			title: $(e.target).find('.js-new-book-title').val(),
			author: $(e.target).find('.js-new-book-author').val(),
			cover: $(e.target).find('.js-new-book-cover').val(),
			description: $(e.target).find('.js-new-book-description').val()
		};

			Meteor.call('addBook', book, function(error, result) {
				if (error) {
					FlashMessages.sendError(error.reason, { autoHide: false });
					Router.go('bookAdd');
				}

				if (result.bookExists) {
					FlashMessages.sendWarning('This book has already been posted', { autoHide: true, hideDelay: 5000 });
				}

				if (!result.bookExists) {
					FlashMessages.sendSuccess('Book successfully added to the bookshelf', {autoHide: true, hideDelay: 5000 });
				}

				Router.go('bookPage', {_id: result._id});
			});
		}
	});

	Template.bookAdd.onRendered(function(){
	    $('.js-book-add-form').validate({
	    	rules: {
	    		title: {
	    			required: true,
	    			minlength: 3
	    		},
	    		author: {
	    			required: true,
	    			minlength: 3
	    		},
	    		cover: {
	    			required: true,
	    			minlength: 5
	    		}
	    	}
	    });
	});
}
