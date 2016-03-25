if (Meteor.isClient) {
    console.log("Cliente");
    var img_data = [
        {
            "name": "Fruits",
            "img_src": "fruits.jpg",
            "img_alt": "Some Fruits"
        },
        {
            "name": "Banana",
            "img_src": "banana.jpg",
            "img_alt": "A Banana"
        },
        {
            "name": "Apple",
            "img_src": "apple.jpg",
            "img_alt": "An apple"
        },
        {
            "name": "Orange",
            "img_src": "orange.jpg",
            "img_alt": "An orange"
        }
    ];
    Template.images.helpers({images: img_data});


}

if (Meteor.isServer) {
    console.log("Server");
}