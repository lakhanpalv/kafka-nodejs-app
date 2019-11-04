const {Kafka} = require('kafkajs');
const config = require('./config');

const kafka = new Kafka({
  clientId: 'kafka-node-app',
  brokers: [config.kafka_host+':'+config.kafka_broker1_port, config.kafka_host+':'+config.kafka_broker2_port,config.kafka_host+':'+config.kafka_broker3_port]
})

const admin = kafka.admin();
//create topic object with basic settings of number of partitions nd replication factor count.
const topic = {
  topic:'my-node-topic',
  numPartition: 1,
  replicationFactor:3
}

const run = async () => {
  await admin.connect();
  //use createTopic API and pass topic object
  let topicCreated = await admin.createTopics({
    waitForLeaders: true,
    topics:[topic]
  });
  if(topicCreated){
    await admin.disconnect();
  }
}

run().catch(console.error);