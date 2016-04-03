console.log("Cliente");

//routing
Router.configure({
    layoutTemplate: 'applicationLayout'
});

Router.route('/', function() {
    this.render('welcome', {
        to: 'main'
    });
});

Router.route('/images', function() {
    this.render('navbar', {
        to: 'navbar'
    });
    this.render('images', {
        to: 'main'
    });
});

Router.route('/image/:_id', function() {
    this.render('navbar', {
        to: 'navbar'
    });
    this.render('image', {
        to: 'main',
        data: function() {
            return Images.findOne({_id: this.params._id});
        }
    });
});


//infinite scroll
Session.set("imageLimit", 8);
lastScrollTop = 0;
$(window).scroll(function(event) {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 120) {
        var scrollTop = $(this).scrollTop();
        if (scrollTop > lastScrollTop)
            Session.set("imageLimit", Session.get("imageLimit") + 4);
        lastScrollTop = scrollTop;
    }
});

//accounts config
Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
});

//templates helpers
//.find('filter', 'sort')
Template.images.helpers({
    images: function() {
        var userFilter, filter, sort;
        userFilter = Session.get("userFilter");
        filter = {};
        sort = {sort: {createdOn: -1, rating: -1}, limit: Session.get("imageLimit")};
        if (!!userFilter)
            filter.createdBy = userFilter;

        return Images.find(filter, sort);
    },
    getUser: function(createdBy) {
        var user = Meteor.users.findOne({_id: createdBy});
        if (!user)
            return "Anonymous";
        return user.username;
    },
    isFilteringImages: function() {
        return !!Session.get("userFilter");
    },
    getUserFiltered: function() {
        var user = Meteor.users.findOne({_id: Session.get("userFilter")});
        if (!user)
            return "Anonymous";
        return user.username;
    }
});

Template.body.helpers({
    'getUsername': function() {
        if (!Meteor.user())
            return "Guy";
        return Meteor.user().username;
        //return Meteor.user().emails[0].address;
    }
});

//templates events
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
    },
    'click .js-set-image-filter': function(event) {
        Session.set("userFilter", this.createdBy);
    },
    'click .js-unset-image-filter': function(event) {
        Session.set("userFilter", undefined);
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