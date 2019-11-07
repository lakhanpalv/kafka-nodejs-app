const WebSocket = require('ws');
const url = 'ws://localhost:3000/consumer';
const connection = new WebSocket(url);


connection.onopen = () => {
  connection.send('Test-express-topic-2');
}

connection.onerror = (error) => {
  console.log(`Web Socket error: ${error}`);
}

connection.onmessage = (e) => {
  console.log(e.data);
}