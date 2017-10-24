import app from 'server';
//var server = require('http').createServer(app);
//var io = require('socket.io')(server);

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

/*io.on('connection', function(client) {
	console.log('USER' + client + 'CONNECTED')
});
*/
app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);