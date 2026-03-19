import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "2m", target: 400 }, // ramp up to considerable load
    { duration: "10m", target: 400 }, // stable for 10 min
    { duration: "2m", target: 0 }, // slow ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<1000"], // 95% of the awnsers should be < 500 ms
    http_req_failed: ["rate<0.01"], // errors below 1%
  },
};

export default function () {
  const res = http.get("http://localhost:3000/fast");

  check(res, {
    "status is 200": (r) => r.status === 200,
  });

  // think time
  sleep(1);
}
