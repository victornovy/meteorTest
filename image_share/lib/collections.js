/*The files on this directory are executed before all*/
Images = new Mongo.Collection("images");

//set up security on Images collection
Images.allow({
    insert: function(userId, doc) {
        if (Meteor.userId() && userId == doc.createdBy) {
            return true;
        }
        return false;
    },
    remove: function(userId, doc) {
        return true;
    }
});