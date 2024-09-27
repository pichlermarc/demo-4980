import {NodeSDK} from "@opentelemetry/sdk-node";
import {HttpInstrumentation} from "@opentelemetry/instrumentation-http";
import {getRPCMetadata, RPCType} from "@opentelemetry/core";
import {context} from "@opentelemetry/api";
import {ConsoleMetricExporter, PeriodicExportingMetricReader} from "@opentelemetry/sdk-metrics";

new NodeSDK({
        metricReader: new PeriodicExportingMetricReader({
            exportIntervalMillis: 1000,
            exporter: new ConsoleMetricExporter()
        }),
        instrumentations: [new HttpInstrumentation(
            {
                requestHook: (span, request) => {
                    const rpcMetadata = getRPCMetadata(context.active()); // retrieve rpc metadata from the active context
                    if (rpcMetadata?.type === RPCType.HTTP) {
                        rpcMetadata.route = 'my-custom-route'
                    }
                }
            }
        )]
    }
).start();