// /* globals
//    resetDatabase: true,
//    loadDefaultFixtures: true,
// */

// var Future = Npm.require('fibers/future');

// resetDatabase = function () {
//   console.log('Resetting database');

//   // safety check
//   if (!process.env.IS_MIRROR) {
//     console.error('velocityReset is not allowed outside of a mirror. Something has gone wrong.');
//     return false;
//   }

//   var fut = new Future();

//   var collectionsRemoved = 0;
//   var db = Meteor.users.find()._mongo.db;
//   db.collections(function (err, collections) {

//     var appCollections = _.reject(collections, function (col) {
//       return col.collectionName.indexOf('velocity') === 0 ||
//         col.collectionName === 'system.indexes';
//     });

//     _.each(appCollections, function (appCollection) {
//       appCollection.remove(function (e) {
//         if (e) {
//           console.error('Failed removing collection', e);
//           fut.return('fail: ' + e);
//         }
//         collectionsRemoved++;
//         console.log('Removed collection');
//         if (appCollections.length === collectionsRemoved) {
//           console.log('Finished resetting database');
//           fut['return']('success');
//         }
//       });
//     });

//   });

//   return fut.wait();
// };

// loadDefaultFixtures = function () {
//   console.log('Loading default fixtures');

//   var ownerId = Accounts.createUser({email: 'test1@test.com', password: 'testing'});

//   // var teams = [
//   //   {name: 'Barcelona', ownerId: ownerId},
//   //   {name: 'Manchester City', ownerId: ownerId}
//   // ];

//   // teams.forEach(function(data){
//   //   Teams.insert(data);
//   // });

//   // var game = {
//   //   completed: false,
//   //   created_at: new Date(),
//   //   teams: [
//   //     {name: 'Barcelona', id: "1", score: 0, ownerId: ownerId},
//   //     {name: 'Manchester City', id: "2", score: 0, ownerId: ownerId}
//   //   ]
//   // };

//   // Games.insert(game);

//   console.log('Finished loading default fixtures');
// };

// if (process.env.IS_MIRROR) {
//   resetDatabase();
//   loadDefaultFixtures();
// }