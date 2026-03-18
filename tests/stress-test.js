import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 50 },  // ramp up
    { duration: '5m', target: 50 },  // stable
    { duration: '2m', target: 100 }, // ramp up again
    { duration: '5m', target: 100 }, // stable at max
    { duration: '2m', target: 0 },   // ramp down to zero
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% of the awnsers should be < 500 ms
    http_req_failed: ['rate<0.01'], // errors below 1%
  },
};

export default function () {
  const res = http.get('https://restful-booker.herokuapp.com/booking');

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  // think time
  sleep(1);
}