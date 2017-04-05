var CartView = Backbone.View.extend({
  el: "#cart",
  template: Handlebars.compile($("[data-name=cart]").html()),
  render: function() {
    this.$el.html(this.template({ 
      items: this.collection.toJSON(),
      total_price: this.collection.total()
    }));
  },
  events: {
    "click a.empty_cart": "emptyCart",
    "click a.checkout": "checkout",
  },
  emptyCart: function(e) {
    e.preventDefault();
    this.collection.reset();
    $('#cart').slideUp();
  },
  checkout: function(e) {
    e.preventDefault();
    this.trigger("checkout");
  },
  initialize: function() {
    this.listenTo(this.collection, 'update', this.render);
    this.listenTo(this.collection, 'change', this.render);
    this.listenTo(this.collection, 'reset', this.render);
  },
});

