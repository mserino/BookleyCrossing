if(Meteor.isClient) {
	Meteor.subscribe('books');
	Meteor.subscribe('userData');
  Template.bookItem.events({
    'click .js-book-tabs-comment-add': function(e) {
      e.preventDefault();
      $('.js-book-tabs-comment-add').hide();
      $('.js-book-tabs-comment-add-container').show();
    },
    'click .js-book-tabs-comment-add-close': function(e) {
      e.preventDefault();
      $('.js-book-tabs-comment-add').show();
      $('.js-book-tabs-comment-add-container').hide();
    },
    'click .js-book-tabs-comment-submit': function(e) {
      console.log($('#rating').data('userrating'));
    }
  });

	Template.bookTabsComments.helpers({
		records: function() {
			var records = History.find({bookId: this._id}).fetch();
			return records;
		},
		recordUser: function(userId) {
			if (userId) {
				return Meteor.users.findOne({_id: userId});
			}
		},
		difference: function() {
			var firstDay = this.from,
				lastDay = this.to;
			return moment(lastDay).diff(moment(firstDay), 'days');
		}
	});
}
