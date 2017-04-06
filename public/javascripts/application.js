Handlebars.registerHelper("format_price", function(price) {
  return (+price).toFixed(2);
});

// Need to fix increment quantity of Checkout
var App = {
  init: function() {
    this.fetchMenuItems();
    this.bindMenuEvents();
    this.initializeCart();
  },
  initializeCart: function() {
    this.cart = new Cart();
    this.cartView = new CartView({ collection: this.cart});
    this.cartHeaderView = new CartHeaderView({ collection: this.cart});
    this.bindCartEvents();
  },
  checkout: function() {
    console.log('app checkout');
    this.checkoutView = new CheckoutView({ collection: this.cart});
    this.bindCheckoutViewEvents();
    this.cartView.remove();
    $('#cart').hide();
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
  bindMenuEvents: function() {
    _.extend(this, Backbone.Events);
    this.listenTo(this.menuView, "item_details", this.showItemDetails);
    this.listenTo(this.menuView, "addItem", this.addItem);
  },
  bindCartEvents: function() {
    this.listenTo(this.cartView, "checkout", this.checkout);
  },
  bindCheckoutViewEvents: function() {
    this.listenTo(this.checkoutView, "addItem", this.addItem);
    this.listenTo(this.checkoutView, "subtractItem", this.subtractItem);
    this.listenTo(this.checkoutView, "cancelOrder", this.cancelOrder);
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
  cancelOrder: function() {
    this.cart.reset();
    this.initializeCart();
    this.checkoutView.remove();
    this.menuView.render();
  },
  addItem: function(menuItem) {
    // checks to see if itemView is present to know where itemToAdd needs to come from
    var itemToAdd = this.itemView ? this.itemView.model.clone() : menuItem.clone();
    var matchingCartItem = this.cart.findWhere({id: itemToAdd.get('id')});
    if (matchingCartItem) {
      matchingCartItem.set('quantity', matchingCartItem.get('quantity') + 1);
    } else {
      itemToAdd.set('quantity', 1);
      this.cart.add(itemToAdd);
      
    }
  },
  subtractItem: function(menuItem) {
    if (menuItem.get('quantity') > 1) {
      menuItem.set('quantity', menuItem.get('quantity') - 1);
    } else {
      this.cart.remove(menuItem);
    }
  }
};

App.init();

