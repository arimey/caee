


var SimplePeer = require('simple-peer');
var socket = io();

navigator.getMedia = (navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia);

navigator.getMedia({ audio: true }, gotMedia, function(){});




function gotMedia (stream) {
	var Peer = require('simple-peer')
	var p = new Peer({ initiator: location.hash === '#1', trickle: false, stream: stream});

	p.on('error', function (err) { console.log('error: ', err) })

	p.on('signal', function (data) {
	  console.log('SIGNAL', JSON.stringify(data))
	  document.getElementById('yourId').value = JSON.stringify(data);
	})

	document.getElementById('connect').addEventListener('click', function () {
	  var otherId = JSON.parse(document.getElementById('otherId').value);
	  p.signal(otherId)
	})

	document.getElementById('send').addEventListener('click', function() {
		var yourMessage = document.getElementById('yourMessage').value;
		var nombre = document.getElementById('nickLabel').value;
		document.getElementById('messages').textContent += nombre + ": " + yourMessage + '\n';
		$("#yourMessage").val("");
		p.send(nombre + ": " + yourMessage + '\n');
	})

	document.getElementById('botonNick').addEventListener('click', function() {
		$("#nickLabel").attr("disabled", true);
	})

	p.on('data', function(data) {
		document.getElementById('messages').textContent += data;
	})

	p.on('stream', function (stream) {
		var audio = document.createElement('audio');
		document.body.appendChild(audio);
		audio.src = window.URL.createObjectURL(stream);
		audio.play();
	})

	p.on('connect', function () {
	  console.log('CONNECT')
	  p.send('CONECTADOS\n')
	})

}


