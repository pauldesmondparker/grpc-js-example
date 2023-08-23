#!/usr/bin/env bash

pnpm proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=proto/ proto/*.proto
