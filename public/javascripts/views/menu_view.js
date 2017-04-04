var MenuView = Backbone.View.extend({
  template: Handlebars.compile($("[data-name=menu]").html()),
  render: function() {
    this.$el.html(this.template({menu: this.collection.toJSON()}))
  },
  initialize: function() {
    this.$el = $('#items');
    // this.render();
  }
})