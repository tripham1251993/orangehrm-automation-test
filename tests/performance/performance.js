import { check } from 'k6'
import http from 'k6/http'

export const options = {
  scenarios: {
    user_login_load: {
      executor: 'ramping-arrival-rate',
      startRate: 1, // starting arrival rate (iterations per timeUnit)
      timeUnit: '1s', // time unit for the rate
      preAllocatedVUs: 5, // pre-allocate VUs
      maxVUs: 5, // maximum virtual users
      stages: [
        { duration: '5s', target: 5 }, // ramp up to 50 iterations/s
        // { duration: '1m', target: 10 }, // stay at 10 iterations/s
        // { duration: '30s', target: 20 }, // ramp up to 20 iterations/s
        // { duration: '1m', target: 20 }, // stay at 20 iterations/s
        // { duration: '30s', target: 5 }, // ramp down to 5 iterations/s
        // { duration: '30s', target: 0 }, // ramp down to 0 iterations/s
      ],
    },
  },
}

export default function () {
  let loginRes = http.post('https://opensource-demo.orangehrmlive.com/index.php/auth/validateCredentials', {
    'username': 'Admin',
    'password': 'admin123'
  });

  // Check if login redirected successfully (302)
  check(loginRes, {
    'login status is 302': (r) => r.status === 302,
    'response time is less than 1000ms': (r) => r.timings.duration < 1000,
    'response duration is less than 1500ms': (r) => r.timings.duration < 1500,
  });
}


