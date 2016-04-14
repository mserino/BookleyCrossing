// Recommended filename: Given_I_am_logged_in.js
module.exports = function() {
  this.Before(function() {
    this.logout();
  });

  this.Given(/^I am logged in$/, function () {
    // Write the automation code here
    browser.url(process.env.ROOT_URL);
    browser.waitForExist('body *');
    browser.click('#login-sign-in');
    browser.setValue('#at-field-username_and_email', 'test@test.com');
    browser.setValue('#at-field-password', 'testtest');
    browser.click('.at-btn.submit');
  });

  this.Given(/^I have borrowed a book$/, function () {
    var book = Books.findOne(),
        user = Meteor.user();
    this.server.call('borrowBook', book, user);
  });

  this.When(/^I return a book$/, function () {
    // Write the automation code here
    pending();
  });

  this.When(/^I view "([^"]*)" page$/, function (arg1) {
    // Write the automation code here
    pending();
  });

  this.Then(/^I see a list of the books I borrowed$/, function () {
    // Write the automation code here
    pending();
  });
};
