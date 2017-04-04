var testMenu = new Menu({
  
});

var testView = new MenuView({ collection: testMenu });

Handlebars.registerHelper("format_price", function(price) {
  return (+price).toFixed(2);
});