import kafka from 'kafka-node';

const client = new kafka.KafkaClient('localhost:2181');

const topicsToCreate = [{
  topic: 'login',
  partitions: 1,
  replicationFactor: 1,
},
{
  topic: 'user',
  partitions: 1,
  replicationFactor: 1,
},
{
  topic: 'shop',
  partitions: 1,
  replicationFactor: 1,
},
];

client.createTopics(topicsToCreate, (error, result) => {
  // result is an array of any errors if a given topic could not be created
  if (error) {
    console.log(error);
  }
  console.log(result);
});
