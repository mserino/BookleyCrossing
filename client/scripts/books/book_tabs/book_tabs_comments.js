if(Meteor.isClient) {
	Meteor.subscribe('books');
	Meteor.subscribe('userData');
	Meteor.subscribe('comments');

  Template.bookTabsComments.events({
    'click .js-book-tabs-comment-add': function(e) {
      e.preventDefault();
      $('.js-book-tabs-comment-add').hide();
      $('.js-book-tabs-comment-add-form').show();
    },
    'click .js-book-tabs-comment-add-close': function(e) {
      e.preventDefault();
      $('.js-book-tabs-comment-add').show();
      $('.js-book-tabs-comment-add-form').hide();
    },
    'submit .js-book-tabs-comment-add-form': function(e) {
			e.preventDefault();
			var bookId = this._id;

			var commentObject = {
				bookId: bookId,
				userId: Meteor.user()._id,
				stars: $('#rating').data('userrating'),
				comment: $('.js-book-comments-text').val(),
				submitted: new Date()
			}

			Meteor.call('addComment', commentObject, bookId, function() {
				FlashMessages.sendSuccess('Comment successfully added', {autoHide: true, hideDelay: 5000});
			});
    }
  });

	Template.bookTabsComments.helpers({
		comments: function() {
			return Comments.find({bookId: this._id}).fetch();
		},
		commentUser: function(userId) {
			if (userId) {
				return Meteor.users.findOne({_id: userId});
			}
		},
		userHasNotCommented: function() {
			var user = Meteor.user();
			if (user) {
				var comments = Comments.find({$and: [{bookId: this._id}, {userId: user._id}]}).fetch();
				return comments.length < 1;
			}
		}
	});

	Template.bookTabsComments.onRendered(function(){
	    $('.js-book-tabs-comment-add-form').validate({
	    	rules: {
	    		name: {
	    			required: true,
	    			minlength: 3
	    		}
	    	}
	    });
	});
}
