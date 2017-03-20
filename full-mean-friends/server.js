var mongoose = require( 'mongoose' ),
    express  = require( 'express' ),
    bp       = require('body-parser'),
    path     = require( 'path' ),
    root     = __dirname,
    port     = process.env.PORT || 8000,
    app      = express();
app.use( express.static( path.join( root, 'client' )));
app.use( express.static( path.join( root, 'node_modules')));
app.use(bp.json())
app.use(bp.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('views', path.join(__dirname, './client'));
app.set('view engine', 'ejs');
require('./server/config/mongoose.js')
require('./server/config/routes.js')(app)
// var routes_setter = require('./server/config/routes.js');
// routes_setter(app);

app.listen( port, function() {
  console.log( `server running on port ${ port }` );
});
