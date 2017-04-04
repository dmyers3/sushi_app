var ItemView = Backbone.View.extend({
  template: Handlebars.compile($("[data-name=item_details]").html()),
  // Need to define what item is below
  render: function() {
    this.$el.html(this.template(this.model.toJSON()))
  },
  events: {
    "click a.close": "close",
    "click a.add_cart": "addToCart",
    "click div.prev": "prevItem",
    "click div.next": "nextItem"
  },
  close: function(e) {
    e.preventDefault();
    this.trigger('close');
  },
  addToCart: function() {
    
  },
  prevItem: function(e) {
    e.preventDefault();
    var currentId = this.currentId();
    var prevId = currentId > 1 ? currentId - 1 : this.model.collection.length;
    console.log(prevId);
  },
  nextItem: function(e) {
    e.preventDefault();
    var currentId = this.currentId();
  },
  currentId: function() {
    return this.model.get('id');
  },
  initialize: function() {
    this.setElement('#content');
    this.render();
  }
})