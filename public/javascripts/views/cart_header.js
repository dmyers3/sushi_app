var CartHeaderView = Backbone.View.extend({
  el: '.cart',
  template: Handlebars.compile($("[data-name=cart_header]").html()),
  events: {
    "click a.cart_header": "stopDefault"
  },
  render: function() {
    this.$el.html(this.template({num_items: this.collection.numItems()}));
    this.delegateEvents();
  },
  stopDefault: function(e) {
    e.preventDefault();
  },
  initialize: function() {
    this.render();
    this.listenTo(this.collection, 'update', this.render);
    this.listenTo(this.collection, 'change', this.render);
    this.listenTo(this.collection, 'reset', this.render);
  },
});