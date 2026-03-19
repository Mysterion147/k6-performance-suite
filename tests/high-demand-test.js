import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
  stages: [
    { duration: '30s', target: 100 }, // ramp up of 100 customers
    { duration: '2m', target: 100 },  // stable
    { duration: '30s', target: 0 },   // ramp down back to 0
  ],
  thresholds: {
    http_req_duration: ['p(95)<600'], // 600 because of static 100ms delay
  },
};

export default function () {
  const url = 'http://localhost:3000/order';

  // dynamic data
  const payload = JSON.stringify({
    userId: randomIntBetween(1, 10000), // random customer ids
    productId: `PROD-${randomIntBetween(1, 50)}`, // 50 different products
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 201': (r) => r.status === 201,
    'order created successfully': (r) => r.json().status === 'Order created',
  });

  sleep(randomIntBetween(0.5, 3));
}