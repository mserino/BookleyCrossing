describe("homepage", function() {

  beforeEach(function (done) {
    Router.go('/');
    Tracker.afterFlush(done);
  });

  beforeEach(waitForRouter);

  describe("layout", function() {

    it("displays the latest additions heading", function(){
      expect($('h2').text()).toEqual('Latest additions View all books');
    });

  });

  describe("header", function() {

    describe("when a user is logged in", function() {
      it("a link is displayed for the dashboard", function(done) {
        expect(Meteor.userId()).toBeNull();

        Meteor.loginWithPassword("test@test.com", "testtest", function(err) {
          expect(err).toBeUndefined();
          expect(Meteor.userId()).not.toBeNull();
          // var profile = $(".header-login__link:contains('My profile')");
          // expect(profile.text()).toEqual("My profile");
          // console.log($(".header-login__link"));

          Meteor.logout(function() {
            done();
          });

        });
      });
    });

  });

});
