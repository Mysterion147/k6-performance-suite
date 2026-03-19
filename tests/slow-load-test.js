import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 }, // ramp up
    { duration: '1m', target: 10 }, // stable
    { duration: '30s', target: 0 }, // ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of the awnsers should be < 500 ms
  },
};

export default function () {
  const res = http.get('http://localhost:3000/slow'); // using the slow route

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time ok': (r) => r.timings.duration < 500,
  });

  // think time
  sleep(1); 
}