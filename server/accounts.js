Accounts.onCreateUser(function(options, user) {
  user.borrowing = '';
  user.requesting = '';
  user.wishlist = [];
  user.roles = ['user'];

	if (options.profile)
		user.profile = options.profile;

  return user;
});

Meteor.publish('userData', function() {
	return Meteor.users.find({}, 
		{fields: 
			{'_id': 1, 'username': 1, 'borrowing': 1, 'requesting': 1, 'wishlist': 1}
		});
});