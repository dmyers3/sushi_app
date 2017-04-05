Handlebars.registerHelper("format_price", function(price) {
  return (+price).toFixed(2);
});

var App = {
  init: function() {
    this.fetchMenuItems();
    this.initializeCart();
    this.bindEvents();
  },
  initializeCart: function() {
    this.cart = new Cart();
    this.cartView = new CartView({ collection: this.cart});
  },
  fetchMenuItems: function() {
    var self = this;
    this.menu = new Menu();
    this.menuView = new MenuView({ 
      collection: this.menu
    });
    this.menu.fetch({
      success: function() {
        self.menuView.render();
      }
    });
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    this.listenTo(this.menuView, "item_details", this.showItemDetails);
    this.listenTo(this.menuView, "addItem", this.addItem);
  },
  showItemDetails: function(menuItem) {
    this.itemView = new ItemView({ model: menuItem });
    this.listenTo(this.itemView, "close", this.closeItemView);
    this.listenTo(this.itemView, "addItem", this.addItem);
  },
  closeItemView: function() {
    this.menuView.render();
    this.itemView = undefined;
  },
  addItem: function(menuItem) {
    // checks to see if itemView is present to know what page itemToAdd needs to come from
    console.log(this.itemView);
    var itemToAdd = this.itemView ? this.itemView.model.clone() : menuItem.clone();
    
    var matchingCartItem = this.cart.findWhere({id: itemToAdd.get('id')});
    
    if (matchingCartItem) {
      matchingCartItem.set('quantity', matchingCartItem.get('quantity') + 1);
    } else {
      itemToAdd.set('quantity', 1);
      this.cart.add(itemToAdd);
    }
  }
};

App.init();

