# Demo for https://github.com/open-telemetry/opentelemetry-js/issues/4890

## How to run

- `npm ci`
- `npm run start`
- go to http://127.0.0.1:3000
- wait 1 sec
- look at output, custom `http.route` attribute is attached to `http.server.duration` metric

**Relevant output**

```
{
  descriptor: {
    name: 'http.server.duration',
    type: 'HISTOGRAM',
    description: 'Measures the duration of inbound HTTP requests.',
    unit: 'ms',
    valueType: 1,
    advice: {}
  },
  dataPointType: 0,
  dataPoints: [
    {
      attributes: {
        'http.scheme': 'http',
        'http.method': 'GET',
        'net.host.name': '127.0.0.1',
        'http.flavor': '1.1',
        'http.status_code': 200,
        'net.host.port': 3000,
        'http.route': 'my-custom-route'
      },
      startTime: [ 1727431410, 152000000 ],
      endTime: [ 1727431417, 125000000 ],
      value: {
        min: 6.567139,
        max: 6.567139,
        sum: 6.567139,
        buckets: {
          boundaries: [
               0,    5,    10,   25,
              50,   75,   100,  250,
             500,  750,  1000, 2500,
            5000, 7500, 10000
          ],
          counts: [
            0, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0
          ]
        },
        count: 1
      }
    }
  ]
}

```