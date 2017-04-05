var CheckoutView = Backbone.View.extend({
  el: '#content',
  template: Handlebars.compile($("[data-name=checkout]").html()),
  events: {
    "click i.fa-minus": "decrementQuantity",
    "click i.fa-plus": "incrementQuantity"
  },
  render: function() {
    this.$el.html(this.template({
      items: this.collection.toJSON(),
      total_price: this.collection.total(),
    }));
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
  clickedItem: function(e) {
    var clickedItemId = parseInt($(e.target).closest('tr').attr('data-id'));
    return this.collection.findWhere({id: clickedItemId});
  },
  initialize: function() {
    this.render();
  },
})