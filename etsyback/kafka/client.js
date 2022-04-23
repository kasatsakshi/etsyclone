import { KafkaRPC } from './kafkarpc';

// Make request to kafka
export const makeRequest = (topicName, message, callback) => {
  const rpc = new KafkaRPC();
  rpc.makeRequest(topicName, message, (err, response) => {
    if (err) {
      console.error(err);
    } else {
      callback(null, response);
    }
  });
};
