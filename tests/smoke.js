import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate==0'],     // 0% de erros permitidos
  },
};

export default function () {
  const res = http.get('http://localhost:3000/health');

  check(res, {
    'status 200': (r) => r.status === 200,
  });

  sleep(1);
}
