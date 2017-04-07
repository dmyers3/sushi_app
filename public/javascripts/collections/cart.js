var Cart = Backbone.Collection.extend({
  model: MenuItem,
  url: "../data/cart.json",
  numItems: function() {
    var cartItems = this.toJSON();
    return cartItems.reduce(function(acc, item) {
      return acc + item.quantity;
    }, 0);
  },
  total: function() {
    var cartItems = this.toJSON();
    return cartItems.reduce(function(acc, item) {
      return acc + item.price * item.quantity;
    }, 0);
  },
  save: function() {
    localStorage.setItem('cart', JSON.stringify(this.toJSON()));
  },
  initialize: function() {
    this.listenTo(this, 'update', this.save);
    this.listenTo(this, 'change', this.save);
    this.listenTo(this, 'reset', this.save);
  },
});