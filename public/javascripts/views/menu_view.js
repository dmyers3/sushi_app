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
    this.trigger('addItem', this.clickedItem(e));
  },
  displayItemDetails: function(e) {
    e.preventDefault();
    this.trigger('item_details', this.clickedItem(e));
  },
  clickedItem: function(e) {
    var clickedItemId = parseInt($(e.target).closest('li').attr('data-id'));
    return this.collection.findWhere({id: clickedItemId});
  },
});