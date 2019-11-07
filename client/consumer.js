const {Kafka} = require('kafkajs');
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const config = require('../utils/config');
const router = express.Router();

const kafka = new Kafka({
  clientId: 'kafka-node-app',
  brokers: [config.kafka_host+':'+config.kafka_broker1_port, config.kafka_host+':'+config.kafka_broker2_port,config.kafka_host+':'+config.kafka_broker3_port]
})

const consumer = kafka.consumer({ groupId: 'test-node-express-group' });

router.ws('/', async (ws,req) =>{
    ws.on('message', function(msg) {
      const sub = async (topicName) =>{
        await consumer.connect();
        await consumer.subscribe({topic: topicName, fromBeginning: true});

        await consumer.run({
            eachMessage: async ({topic, partition, message}) => {
              ws.send(message.value.toString());
            }
        });
      }
      sub(msg).catch(console.error);
    })
})

module.exports = router;
