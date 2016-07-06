var app = require('./server.js');

app.listen(app.get('port'));

console.log('Server now listening on port ' + app.get('port'));
