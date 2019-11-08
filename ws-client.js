const WebSocket = require('ws');
const url = 'ws://localhost:3000/consumer';
const connection = new WebSocket(url);


connection.onopen = () => {
  connection.send('test-express-ws-topic');
}

connection.onerror = (error) => {
  console.log(`Web Socket error: ${error}`);
}

connection.onmessage = (e) => {
  console.log(e.data);
}