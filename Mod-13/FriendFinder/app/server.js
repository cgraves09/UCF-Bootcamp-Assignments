let express = require('express');

let app = express();
let PORT = process.env.port || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

require('./routing/apiRoutes')(app);
require('./routing/htmlRoutes')(app);

app.listen(PORT, function(){
    console.log('App listening on PORT: ' + PORT);
});