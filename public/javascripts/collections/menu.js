var Menu = Backbone.Collection.extend({
  model: MenuItem,
  url: "../data/menu.json",
  initialize: function() {
    this.fetch({
      reset: true
    });
  },
})

