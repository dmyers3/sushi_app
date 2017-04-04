var MenuView = Backbone.View.extend({
  tagName: 'ul',
  id: 'items',
  template: Handlebars.compile($("[data-name=menu]").html()),
  events: {
    "click a": "addToCart",
    "click header": "displayItemDetails"
  },
  render: function() {
    this.$el.html(this.template({menu: this.collection.toJSON()}));
    $('#content').html(this.$el);
    this.delegateEvents();
  },
  addToCart: function(e) {
    e.preventDefault();

  },
  displayItemDetails: function(e) {
    e.preventDefault();
    var itemId = $(e.target).closest('li').attr('data-id');
    this.trigger("item_details", itemId);
  },
  initialize: function() {
  
  },
});