import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  scenarios: {
    load_test: {
      executor: 'ramping-vus',
      stages: [
        { duration: '30s', target: 10 },
        { duration: '1m', target: 10 },
        { duration: '30s', target: 0 },
      ],
      exec: 'loadTest',
    },
    stress_test: {
      executor: 'ramping-vus',
      stages: [
        { duration: '2m', target: 50 },
        { duration: '5m', target: 50 },
        { duration: '2m', target: 100 },
        { duration: '5m', target: 100 },
        { duration: '2m', target: 0 },
      ],
      exec: 'stressTest',
    },
    spike_test: {
      executor: 'ramping-vus',
      stages: [
        { duration: '10s', target: 50 },
        { duration: '1m', target: 50 },
        { duration: '10s', target: 1000 },
        { duration: '2m', target: 1000 },
        { duration: '10s', target: 50 },
        { duration: '1m', target: 50 },
        { duration: '10s', target: 0 },
      ],
      exec: 'spikeTest',
    },
    soak_test: {
      executor: 'ramping-vus',
      stages: [
        { duration: '2m', target: 400 },
        { duration: '10m', target: 400 },
        { duration: '2m', target: 0 },
      ],
      exec: 'soakTest',
    },
    unstable_test: {
      executor: 'ramping-vus',
      stages: [
        { duration: '30s', target: 10 },
        { duration: '1m', target: 10 },
        { duration: '30s', target: 0 },
      ],
      exec: 'unstableTest',
    },
    slow_load_test: {
      executor: 'ramping-vus',
      stages: [
        { duration: '30s', target: 10 },
        { duration: '1m', target: 10 },
        { duration: '30s', target: 0 },
      ],
      exec: 'slowLoadTest',
    },
    high_demand_post: {
      executor: 'ramping-vus',
      stages: [
        { duration: '30s', target: 100 },
        { duration: '2m', target: 100 },
        { duration: '30s', target: 0 },
      ],
      exec: 'highDemandPost',
    },
  },
  thresholds: {
    'http_req_duration{scenario:load_test}': ['p(95)<500'],
    'http_req_duration{scenario:stress_test}': ['p(95)<1000'],
    'http_req_duration{scenario:spike_test}': ['p(95)<1000'],
    'http_req_duration{scenario:soak_test}': ['p(95)<1000'],
    'http_req_duration{scenario:unstable_test}': ['p(95)<500'],
    'http_req_duration{scenario:slow_load_test}': ['p(95)<500'],
    'http_req_duration{scenario:high_demand_post}': ['p(95)<600'],
    'http_req_failed': ['rate<0.01'],
  },
};

// functions

export function loadTest() {
  group('Load Test - Fast Route', function () {
    const res = http.get('http://localhost:3000/fast');
    check(res, { 'status is 200': (r) => r.status === 200, 'time ok': (r) => r.timings.duration < 500 });
    sleep(1);
  });
}

export function stressTest() {
  group('Stress Test - Fast Route', function () {
    const res = http.get('http://localhost:3000/fast');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
  });
}

export function spikeTest() {
  group('Spike Test - Fast Route', function () {
    const res = http.get('http://localhost:3000/fast');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
  });
}

export function soakTest() {
  group('Soak Test - Fast Route', function () {
    const res = http.get('http://localhost:3000/fast');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
  });
}

export function unstableTest() {
  group('Unstable Route Test', function () {
    const res = http.get('http://localhost:3000/unstable');
    check(res, { 'status is 200': (r) => r.status === 200, 'time ok': (r) => r.timings.duration < 500 });
    sleep(1);
  });
}

export function slowLoadTest() {
  group('Slow Route Test', function () {
    const res = http.get('http://localhost:3000/slow');
    check(res, { 'status is 200': (r) => r.status === 200, 'time ok': (r) => r.timings.duration < 500 });
    sleep(1);
  });
}

export function highDemandPost() {
  group('High Demand POST - Order Route', function () {
    const payload = JSON.stringify({
      userId: randomIntBetween(1, 10000),
      productId: `PROD-${randomIntBetween(1, 50)}`,
    });
    const params = { headers: { 'Content-Type': 'application/json' } };
    const res = http.post('http://localhost:3000/order', payload, params);
    check(res, {
      'status is 201': (r) => r.status === 201,
      'order created': (r) => r.json().status === 'Order created',
    });
    sleep(randomIntBetween(0.5, 3));
  });
}

// report
export function handleSummary(data) {
  return {
    "complete-suite-report.html": htmlReport(data),
  };
}