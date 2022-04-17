'use strict';

export default {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/etsyclone',
    connectionOptions : { maxPoolSize: 1, useNewUrlParser: true, useUnifiedTopology: true }
  }
}