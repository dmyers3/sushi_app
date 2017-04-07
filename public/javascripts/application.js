Handlebars.registerHelper("format_price", function(price) {
  return (+price).toFixed(2);
});

// Need to fix prev/next changing web address in item Details
var App = {
  init: function() {
    this.fetchMenuItems();
    this.bindMenuEvents();
    this.initializeCart();
  },
  initializeCart: function() {
    var savedCart = JSON.parse(localStorage.getItem('cart'));
    this.cart = savedCart? new Cart(savedCart) : new Cart();
    this.cartView = new CartView({ collection: this.cart});
    this.cartHeaderView = new CartHeaderView({ collection: this.cart});
    this.bindCartEvents();
  },
  checkout: function() {
    router.navigate('checkout');
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
    // first turn off Listening to make sure App isn't listening multiple times:
    this.stopListening();
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
    router.navigate('menu/' + menuItem.get('id') + '/');
  },
  closeItemView: function() {
    this.menuView.render();
    this.itemView = undefined;
    router.navigate('menu');
  },
  cancelOrder: function() {
    this.cart.reset();
    this.initializeCart();
    this.checkoutView.remove();
    router.navigate('menu');
    this.menuView.render();
  },
  addItem: function(menuItem) {
    // checks to see if menuItem is present to know where itemToAdd needs to come from
    var itemToAdd = menuItem ? menuItem.clone() : this.itemView.model.clone();
    // checks if item is already present in cart
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

