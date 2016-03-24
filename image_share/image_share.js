if (Meteor.isClient) {
    console.log("Cliente");
    var img_data = [
        {
            "img_src": "fruits.jpg",
            "img_alt": "Some Fruits"
        },
        {
            "img_src": "banana.jpg",
            "img_alt": "A Banana"
        },
        {
            "img_src": "apple.jpg",
            "img_alt": "An apple"
        },
        {
            "img_src": "orange.jpg",
            "img_alt": "An orange"
        }
    ];
    Template.images.helpers({images: img_data});
}

if (Meteor.isServer) {
    console.log("Server");
}