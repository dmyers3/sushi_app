var CheckoutView = Backbone.View.extend({
  // el: '#content',
  template: Handlebars.compile($("[data-name=checkout]").html()),
  events: {
    "click i.fa-minus": "decrementQuantity",
    "click i.fa-plus": "incrementQuantity",
    "click a.cancel": "cancelOrder",
    "submit form": "cancelOrder"
  },
  render: function() {
    this.$el.html(this.template({
      items: this.collection.toJSON(),
      total_price: this.collection.total(),
    }));
    $('#content').html(this.$el);
    this.delegateEvents();
  },
  decrementQuantity: function(e) {
    e.preventDefault();
    this.trigger('subtractItem', this.clickedItem(e));
    this.render();
  },
  incrementQuantity: function(e) {
    e.preventDefault();
    this.trigger('addItem', this.clickedItem(e));
    this.render();
  },
  cancelOrder: function(e) {
    e.preventDefault();
    this.trigger('cancelOrder');
  },
  clickedItem: function(e) {
    var clickedItemId = parseInt($(e.target).closest('tr').attr('data-id'));
    return this.collection.findWhere({id: clickedItemId});
  },
  initialize: function() {
    this.render();
  },
})