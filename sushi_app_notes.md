Express
  install express, express-generator with npm install
  start new express app in current directory with command express .
  make sure to run npm install to install dependencies

Bower
  set up bower using init (npm install bower -g if not installed)
    keep most defaults, can change package to private
  bower install dependencies (jquery, backbone, handlebars)

Grunt
  npm install -g grunt-cli
  npm install grunt -D
  npm install -D grunt-bower-concat grunt-contrib-handlebars grunt-contrib-uglify grunt-contrib-watch
  set up Gruntfile.js in root directory
    set up grunt.initConfig with options object
      uglify and bower_concat
    iterate over task names and loadNpmTasks
    grunt.registerTask("default", array of tasks)
    
create models/collections/views folders in public to contain backbone js


model
  menuItem
  
collection
  cart
    menuItems
      add quantity
  menu
    menuItems
    
view
  menu view
    use each menuItem
  
  cart has view
  
  checkout
  
  individual menu item info
  

put initial menu JSON data into data folder under public directory
  any way to access data folder if its outside public? Or is that why we did back-end
  loading wtih Express, using path.resolve and fs.readFileSync?
  

  
* On Item Detail load, background image takes a half second to load. Doesn't happen
  in finished app.

cart
  copy of menuItem
    add quantity to it

to render go over each menuItem
also need cart Total


click on itemDetails header - route goes to /menu/:itemId
  when its exited it goes back to index
  







