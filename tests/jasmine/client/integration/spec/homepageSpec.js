describe("homepage", function() {

    beforeEach(function (done) {
      Meteor.loginWithPassword("test@test.com", "testing", function(err) {
        Router.go('/');
        Tracker.afterFlush(done);
      });
    });

    // beforeEach(waitForRouter);

    afterEach(function(done){
      Meteor.logout(function() {
        done();
      });
    });

  describe("header", function(){

    describe("when a user is logged in", function(){
      // it("a link is displayed for the dashboard ", function() {
        // expect(Meteor.user()).toBeNull();
        // expect(Meteor.userId()).not.toBeNull()
        // var profile = $(".header-login__link:contains(My profile)");
        // expect(profile.text()).toEqual("My profile");
        // console.log(profile);
      // });
    });

  });

  describe("latest additions", function(){
    it("shows 'Latest additions' heading", function(){
      expect($('h2').text()).toEqual('Latest additions View all books');
    });
  });

});
