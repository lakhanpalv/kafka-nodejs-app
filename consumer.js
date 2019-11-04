const {Kafka} = require('kafkajs');
const config = require('./config');

const kafka = new Kafka({
  clientId: 'kafka-node-app',
  brokers: [config.kafka_host+':'+config.kafka_broker1_port, config.kafka_host+':'+config.kafka_broker2_port,config.kafka_host+':'+config.kafka_broker3_port]
  // brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'test-node-group' });

const run = async () =>{
  await consumer.connect();
  await consumer.subscribe({topic: 'my-node-topic'});

  await consumer.run({
    eachMessage: async ({topic, partition, message}) => {
      console.log({
        value:message.value.toString()
      });
    }
  });
}

run().catch(console.error);
