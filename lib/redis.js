import { createClient } from 'redis';

const client = createClient({
  host: process.env.UPSTASH_REDIS_HOST || 'inviting-tapir-148586.upstash.io',
  port: process.env.UPSTASH_REDIS_PORT || 37859,
  password: process.env.UPSTASH_REDIS_PASSWORD,
});

client.on('error', (err) => console.log('Redis Client Error', err));

export default client;
