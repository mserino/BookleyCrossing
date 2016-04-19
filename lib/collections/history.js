History = new Mongo.Collection('history');

if (Meteor.isServer) {
    Meteor.methods({
        recordHistory: function(book, user) {
            var record = {
                bookId: book._id,
                userId: user._id,
                from: book.borrowedOn,
                to: new Date()
            }

            var recordId = History.insert(record);
            return {
                _id: recordId
            }
        }
    });
}
