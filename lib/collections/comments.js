Comments = new Mongo.Collection('comments');

Meteor.methods({
  addComment: function(commentObject, bookId) {
    var comment = Comments.insert(commentObject);

    var userId = Books.update(bookId, {$push: {stars: commentObject.stars}});

    return {
      _id: comment
    }
  },
  deleteComment: function(comment, user) {
    var book = Books.findOne({_id: comment.bookId});

    Books.update(book, {$pull: {stars: comment.stars}});
    Comments.remove({_id: comment._id});
  }
})
