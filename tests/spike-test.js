import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 50 }, // ramp up to normal amount of users
    { duration: '1m', target: 50 }, // stable for a bit
    { duration: '10s', target: 1000 }, // the spike 
    { duration: '2m', target: 1000 }, // sustaining spike
    { duration: '10s', target: 50 }, // quick ramp down
    { duration: '1m', target: 50 }, // stable at normal amount again
    { duration: '10s', target: 0 }, // ramp down to zero
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% of the awnsers should be < 500 ms
    http_req_failed: ['rate<0.01'], // errors below 1%
  },
};

export default function () {
  const res = http.get('http://localhost:3000/fast');

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  // think time
  sleep(1);
}