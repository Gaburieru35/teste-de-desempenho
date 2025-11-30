import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },    // baseline
    { duration: '10s', target: 300 },   // pico abrupto
    { duration: '1m', target: 300 },    // sustentação
    { duration: '10s', target: 10 },    // queda
  ],
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
