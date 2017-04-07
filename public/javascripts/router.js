// don't need Router Constructor so use IIFE
var router = new (Backbone.Router.extend({
  routes: {
    "menu": "menu",
    "menu/:id": "itemDetail",
    "checkout": "checkout"
  //   "/menu/:itemId": App.itemView,
  //   "/checkout": App.checkout
  //   // can't use "/" for index route because routes already assumes "/". also need
  //   // to account for instances where there is no ending forward slash (because index
  //   // can have slash or no slash)
  },
  menu: function() { 
    router.navigate('menu');
    App.init();
  },
  itemDetail: function() {
    App.showItemDetails(App.itemView.model);
  },
  checkout: function() {
    App.checkout();
  },
  initialize: function() {
    this.route(/^\/?$/, "menu");
  }
}))();

Backbone.history.start({
  pushState: true
});

// $(document).on("click", "a[href^='/']", function(e) {
//   e.preventDefault();
//   router.navigate($(e.currentTarget).attr("href").replace(/^\//, ""), { trigger: true});
// });