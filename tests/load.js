import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 10000 },   // ramp-up
    { duration: '2m', target: 10000 },   // platô
    { duration: '30s', target: 0 },   // ramp-down
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],           // <1% de erros
    http_req_duration: ['p(95)<500'],         // p95 < 500 ms
  },
};

export default function () {
  const payload = JSON.stringify({ productId: 1, quantity: 1 });
  const params = { headers: { 'Content-Type': 'application/json' } };

  const res = http.post('http://localhost:3000/checkout/simple', payload, params);

  check(res, {
    'status 200': (r) => r.status === 200,
  });

  sleep(1);
}
