var Cart = Backbone.Collection.extend({
  model: MenuItem,
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
});