var ItemView = Backbone.View.extend({
  id: 'item_details',
  template: Handlebars.compile($("[data-name=item_details]").html()),
  // Need to define what item is below
  render: function() {
    this.$el.html(this.template(this.model.toJSON()))
    $('#content').html(this.$el);
  },
  events: {
    "click a.close": "close",
    "click a.add_cart.item": "addToCart",
    "click div.prev": "prevItem",
    "click div.next": "nextItem"
  },
  close: function(e) {
    e.preventDefault();
    this.trigger('close');
  },
  addToCart: function(e) {
    e.preventDefault();
    this.trigger('addItem');
  },
  prevItem: function(e) {
    e.preventDefault();
    var currentId = this.currentId();
    var prevId = currentId > 1 ? currentId - 1 : this.model.collection.length;
    this.updateModelInView(prevId);
  },
  nextItem: function(e) {
    e.preventDefault();
    var currentId = this.currentId();
    var nextId = currentId === this.model.collection.length ? 1 : currentId + 1;
    this.updateModelInView(nextId);
  },
  updateModelInView: function(newId) {
    var newModel = this.model.collection.findWhere({id: newId});
    this.model = newModel;
    this.render();
    router.navigate('menu/' + newId );
    this.delegateEvents();
  },
  currentId: function() {
    return this.model.get('id');
  },
  initialize: function() {
    this.render();
  }
})