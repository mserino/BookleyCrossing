Comments = new Mongo.Collection('comments');

Meteor.methods({
  addComment: function(commentObject, bookId) {
    var comment = Comments.insert(commentObject);

    var userId = Books.update(bookId, {$push: {stars: commentObject.stars}});

    return {
      _id: comment
    }
  }
})
