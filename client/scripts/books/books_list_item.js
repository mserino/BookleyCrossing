if(Meteor.isClient) {
	Template.booksListItem.helpers({
		status: function() {
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
		}
	});

	var isNew = function(date) {
		var today = new Date(),
				timeDiff = Math.floor((today - date) / (1000*60*60*24));

		if (timeDiff < 10) {
			return true;
		}
		return false;
	};
}
