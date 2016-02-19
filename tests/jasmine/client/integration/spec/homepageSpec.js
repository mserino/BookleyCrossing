describe("homepage", function() {

  beforeEach(function (done) {
    Meteor.loginWithPassword("test1@test.com", "testing", function(err){
      Router.go('/');
      Tracker.afterFlush(done);
    });
  });

  beforeEach(waitForRouter);

  afterEach(function(done) {
    Meteor.logout(function() {
      done();
    });
  });

  describe("layout", function() {

    it("displays the latest additions heading", function(){
      expect($('h2').text()).toEqual('Latest additions View all books');
    });

  });

  describe("header", function() {

    describe("when a user is logged in", function() {

      it("a link is displayed for the dashboard", function(done) {
        var profile = $(".header-login__link:contains('My profile')");
        expect(profile.text()).toEqual("My profile");
      });

    });
  });
});
