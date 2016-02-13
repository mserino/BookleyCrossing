// /* globals Book: false, Song: false */
//
// describe('Book', function() {
//   var book;
//
//   beforeEach(function() {
//     book = new Books();
//   });
//
//   it('can add a book', function() {
//     book.;
//     expect(book.title).toEqual("stuff");
//
//     //demonstrates use of custom matcher
//     // expect(book).toBePlaying(song);
//   });
//
//   describe('when song has been paused', function() {
//     beforeEach(function() {
//       player.play(song);
//       player.pause();
//     });
//
//     xit('should indicate that the song is currently paused', function() {
//       expect(player.isPlaying).toBeFalsy();
//
//       // demonstrates use of 'not' with a custom matcher
//       expect(player).not.toBePlaying(song);
//     });
//
//     xit('should be possible to resume', function() {
//       player.resume();
//       expect(player.isPlaying).toBeTruthy();
//       expect(player.currentlyPlayingSong).toEqual(song);
//     });
//   });
//
//   // demonstrates use of spies to intercept and test method calls
//   xit('tells the current song if the user has made it a favorite', function() {
//     spyOn(song, 'persistFavoriteStatus');
//
//     player.play(song);
//     player.makeFavorite();
//
//     expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
//   });
// });
