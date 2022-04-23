import kafka from 'kafka-node';

export class ConnectionProvider {
  constructor() {
    this.getConsumer = (topicName) => {
      // if (!this.kafkaConsumerConnection) {
      this.client = new kafka.KafkaClient('localhost:2181');
      this.kafkaConsumerConnection = new kafka.Consumer(this.client, [
        { topic: topicName, partition: 0 },
      ]);
      this.client.on('ready', () => {
        console.log('client ready!');
      });
      // }
      return this.kafkaConsumerConnection;
    };

    // Code will be executed when we start Producer
    this.getProducer = () => {
      if (!this.kafkaProducerConnection) {
        this.client = new kafka.KafkaClient('localhost:2181');
        const HighLevelProducer = kafka.HighLevelProducer;
        this.kafkaProducerConnection = new HighLevelProducer(this.client);
        console.log('producer ready');
      }
      return this.kafkaProducerConnection;
    };
  }
}
