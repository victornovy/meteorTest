Images = new Mongo.Collection("images");

if (Meteor.isClient) {
    console.log("Cliente");

    //.find('filter', sort)
    Template.images.helpers({
        images: Images.find({}, {sort: {rating: -1}})
    });

    Template.images.events({
        'click .js-del-image': function(event) {
            console.log("Id image removed " + this._id);
            $("#" + this._id).hide("slow", function() {
                Images.remove({"_id": this._id})
            });
        },
        'click .js-rate-image': function(event) {
            var rating = $(event.currentTarget).data("userrating");
            var image_id = this.id;

            console.log(rating);
            console.log(image_id);
            Images.update({_id: image_id}, {$set: {rating: rating}});
        }
    });
}