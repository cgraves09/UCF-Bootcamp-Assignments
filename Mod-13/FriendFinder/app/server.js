let express = require('express');
let path = require('path');

let app = express();
let PORT = process.env.port || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routing/apiRoutes')(app);
require('./routing/htmlRoutes')(app);

app.listen(PORT, function(){
    console.log('App listening on PORT: ' + PORT);
});