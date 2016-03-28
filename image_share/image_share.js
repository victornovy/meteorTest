Images = new Mongo.Collection("images");

if (Meteor.isClient) {
    console.log("Cliente");

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_AND_EMAIL"
    });

    //.find('filter', 'sort')
    Template.images.helpers({
        images: Images.find({}, {sort: {createdOn: -1, rating: -1}}),
        getUser: function(createdBy) {
            var user = Meteor.users.findOne({_id: createdBy});
            if (!user)
                return "Anonymous";
            return user.username;
        }
    });

    Template.body.helpers({
        'username': function() {
            if (!Meteor.user())
                return "Guy";
            return Meteor.user().username;
            //return Meteor.user().emails[0].address;
        }
    });

    Template.images.events({
        'click .js-del-image': function(event) {
            console.log("Id image removed " + this._id);
            var image_id = this._id;
            $("#" + image_id).hide("slow", function() {
                Images.remove({"_id": image_id})
            });
        },
        'click .js-rate-image': function(event) {
            var rating = $(event.currentTarget).data("userrating");
            var image_id = this.id;

            Images.update({_id: image_id}, {$set: {rating: rating}});
        },
        'click .js-show-image-form': function(event) {
            $("#image_form_modal").modal("show");
        }
    });

    Template.images_add_form.events({
        'submit .js-add-image': function(event) {
            var img_src, img_alt;
            img_src = event.currentTarget.img_src.value;
            img_alt = event.currentTarget.img_alt.value;

            if (!!Meteor.user()) {
                Images.insert({
                    "img_src": img_src,
                    "img_alt": img_alt,
                    "createdOn": new Date(),
                    "createdBy": Meteor.userId()
                });
            }
            $("#image_form_modal").modal("hide");

            return false;
        }
    });
}