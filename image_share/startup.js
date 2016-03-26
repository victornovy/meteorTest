if (Meteor.isServer) {
    console.log("###### Server ######");

    Meteor.startup(function() {
        if (Images.find().count() === 0) {
            Images.insert(
                {
                    "name": "Fruits",
                    "img_src": "fruits.jpg",
                    "img_alt": "Some Fruits"
                }
            );
            Images.insert(
                {
                    "name": "Banana",
                    "img_src": "banana.jpg",
                    "img_alt": "A Banana"
                }
            );
            Images.insert(
                {
                    "name": "Apple",
                    "img_src": "apple.jpg",
                    "img_alt": "An apple"
                }
            );
            Images.insert(
                {
                    "name": "Orange",
                    "img_src": "orange.jpg",
                    "img_alt": "An orange"
                }
            );
        }
    });
}