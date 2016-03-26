Images = new Mongo.Collection("images");

if (Meteor.isClient) {
    console.log("Cliente");

    Template.images.helpers({images: Images.find()});

    Template.images.events({
        'click .js-del-image': function(event) {
            console.log("Id image removed " + this._id);
            $("#" + this._id).hide("slow", function() {
                Images.remove({"_id": this._id})
            });
        }
    });
}