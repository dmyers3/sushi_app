Handlebars.registerHelper("format_price", function(price) {
  return (+price).toFixed(2);
});

var App = {
  init: function() {
    this.fetchMenuItems();
    this.bindEvents();
  },
  fetchMenuItems: function() {
    var self = this;
    this.menu = new Menu();
    this.menuView = new MenuView({ collection: this.menu });
    this.menu.fetch({
      success: function() {
        self.menuView.render();
      }
    });
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    this.listenTo(this.menuView, "item_details", this.showItemDetails);
    // this.on("add_to_cart", this.cart.addItem.bind(this.cart));
  },
  showItemDetails: function(itemId) {
    var menuItem = this.menu.findWhere({id: parseInt(itemId)});
    this.itemView = new ItemView({ model: menuItem });
    this.listenTo(this.itemView, "close", this.closeItemView);
  },
  closeItemView: function() {
    this.menuView.render();
  }
};

App.init();

