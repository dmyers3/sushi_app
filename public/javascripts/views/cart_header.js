var CartHeaderView = Backbone.View.extend({
  el: '.cart',
  template: Handlebars.compile($("[data-name=cart_header]").html()), 
  render: function() {
    this.$el.html(this.template({num_items: this.collection.numItems()}));
    // this.$el.html({num_items: 10});
  },
  initialize: function() {
    this.render();
    this.listenTo(this.collection, 'update', this.render);
    this.listenTo(this.collection, 'change', this.render);
    this.listenTo(this.collection, 'reset', this.render);
  },
});