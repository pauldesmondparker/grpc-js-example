
import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './proto/random';

const PORT = 8082;
const PROTO_FILE = './proto/random.proto';

const packageDefinition = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));

const grpcObject = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;

const client = new grpcObject.randomPackage.Random(
  `0.0.0.0:${PORT}`, grpc.credentials.createInsecure()
);

const deadline = Date.now() + 5000;
client.waitForReady(deadline, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('ready');
  onClientReady();
})

function onClientReady() {
  client.PingPong({ message: 'ping' }, (err, response) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(response);
  });
  const numberStream = client.RandomNumbers({ maxValue: 1000, count: 5 });

  numberStream.on('data', (data) => {
    console.log(data);
  });
  numberStream.on('end', () => {
    console.log('Stream ended');
  });
}
