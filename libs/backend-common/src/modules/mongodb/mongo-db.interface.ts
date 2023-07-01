import { MongoClientOptions } from 'mongodb';

export interface MongoDbClientOptions extends MongoClientOptions {
  uri: string;
}
