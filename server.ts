import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './proto/random';
import { RandomHandlers } from './proto/randomPackage/Random';

const PORT = 8082;
const PROTO_FILE = './proto/random.proto';

const packageDefinition = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));

const grpcObject = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;

const randomPackage = grpcObject.randomPackage;

function main() {
  const server = getServer();

  server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err != null) {
        console.error(err);
        return;
      }
      server.start();
      console.log(`gRPC server running at ${port}`);
    }
  );
}

function getServer() {
  const server = new grpc.Server();

  server.addService(randomPackage.Random.service, {
    "PingPong": (req, res) => {
      console.log("Request: ", req);
      res(null, { message: 'pong' });
    },
    "RandomNumbers": (call) => {
      const { maxValue = 100, count = 10 } = call.request;
      const interval = setInterval(() => {
        const value = Math.floor(Math.random() * maxValue);
        call.write({value});
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
        call.end();
      }, count * 1000); // count seconds
    },
  } as RandomHandlers);

  return server;
}

main();
