var CartView = Backbone.View.extend({
  el: "#cart",
  template: Handlebars.compile($("[data-name=cart]").html()),
  render: function() {
    this.$el.html(this.template({ 
      items: this.collection.toJSON(),
      total_price: this.cartTotal()
    }));
  },
  cartTotal: function() {
    var cartItems = this.collection.toJSON();
    return cartItems.reduce(function(acc, item) {
      return acc + item.price * item.quantity;
    }, 0);
  },
  initialize: function() {
    this.listenTo(this.collection, 'update', this.render);
    this.listenTo(this.collection, 'change', this.render);
  },
});

