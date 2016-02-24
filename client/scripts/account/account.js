var email = AccountsTemplates.removeField('email');
var pwd = AccountsTemplates.removeField('password');

AccountsTemplates.addFields([
    email,
    {
      _id: 'username',
      type: 'text',
      displayName: 'Username',
      required: true
    },
    pwd
]);

var submitAccount = function(error, state){
  if (!error) {
    if (state === "signIn") {
      FlashMessages.sendSuccess('Welcome back', {autoHide: true, hideDelay: 5000 });
    }
    if (state === "signUp") {
      FlashMessages.sendSuccess('Thank you for registering', {autoHide: true, hideDelay: 5000 });
    }
    if (state === 'changePwd') {
      FlashMessages.sendSuccess('Your password has been changed', {autoHide: true, hideDelay: 5000 });
    }
  } else {
    FlashMessages.sendError('Something went wrong, please correct the errors below', {autoHide: true, hideDelay: 5000 });
  }
};

AccountsTemplates.configure({
    onSubmitHook: submitAccount
});