const {Kafka, Partitioners} = require('kafkajs');
const config = require('./config');

const kafka = new Kafka({
  clientId: 'kafka-node-app',
  brokers: [config.kafka_host+':'+config.kafka_broker1_port, config.kafka_host+':'+config.kafka_broker2_port,config.kafka_host+':'+config.kafka_broker3_port]
})

const producer = kafka.producer();

const run = async () =>{
  await producer.connect();
  await producer.send({
    topic: 'my-node-topic',
    messages: [
      { key: 'key3', value: 'hello world 3'},
      { key: 'key4', value: 'hey hey 4!'}    
    ]
  });
}

run().catch(console.error);