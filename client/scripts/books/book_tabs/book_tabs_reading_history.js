if(Meteor.isClient) {
	Meteor.subscribe('books');
	Meteor.subscribe('userData');

	Template.bookTabsReadingHistory.helpers({
		records: function() {
			var records = History.find({bookId: this._id}, {sort: {submitted: -1}}).fetch();
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
