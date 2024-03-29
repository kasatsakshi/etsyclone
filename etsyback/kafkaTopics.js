import kafka from 'kafka-node';

const client = new kafka.KafkaClient('localhost:2181');

const topicsToCreate = [{
  topic: 'response_topic',
  partitions: 1,
  replicationFactor: 1,
},
{
  topic: 'login',
  partitions: 1,
  replicationFactor: 1,
},
{
  topic: 'signup',
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
{
  topic: 'product',
  partitions: 1,
  replicationFactor: 1,
},
{
  topic: 'favorite',
  partitions: 1,
  replicationFactor: 1,
},
{
  topic: 'order',
  partitions: 1,
  replicationFactor: 1,
},
{
  topic: 'category',
  partitions: 1,
  replicationFactor: 1,
},
{
  topic: 'productSearch',
  partitions: 1,
  replicationFactor: 1,
},
{
  topic: 'updateCurrency',
  partitions: 1,
  replicationFactor: 1,
},
{
  topic: 'favoriteProduct',
  partitions: 1,
  replicationFactor: 1,
},
{
  topic: 'deleteFavoriteProduct',
  partitions: 1,
  replicationFactor: 1,
},
{
  topic: 'createOrder',
  partitions: 1,
  replicationFactor: 1,
},
{
  topic: 'isShopNameAvailable',
  partitions: 1,
  replicationFactor: 1,
},
{
  topic: 'createShop',
  partitions: 1,
  replicationFactor: 1,
},
{
  topic: 'createShopProduct',
  partitions: 1,
  replicationFactor: 1,
},
{
  topic: 'updateShopProduct',
  partitions: 1,
  replicationFactor: 1,
},
{
  topic: 'updateUser',
  partitions: 1,
  replicationFactor: 1,
},
{
  topic: 'upload',
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
