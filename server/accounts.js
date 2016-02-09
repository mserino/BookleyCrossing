Accounts.onCreateUser(function(options, user) {
  user.borrowing = '';
	if (options.profile)
		user.profile = options.profile;

  return user;
});

Meteor.publish('userData', function() {
  return Meteor.users.find();
});