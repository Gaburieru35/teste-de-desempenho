import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 200 },
    { duration: '2m', target: 500 },
    { duration: '2m', target: 1000 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.10'],         // aceita até 10% de falhas no estresse
  },
};

export default function () {
  const payload = JSON.stringify({ productId: 1, quantity: 1 });
  const params = { headers: { 'Content-Type': 'application/json' } };

  const res = http.post('http://localhost:3000/checkout/crypto', payload, params);

  check(res, {
    'status 200 ou timeout': (r) => r.status === 200 || r.status === 408,
  });

  sleep(1);
}
