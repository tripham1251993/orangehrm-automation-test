# OrangeHRM Automation Test

A comprehensive automation testing framework for OrangeHRM Human Resource Management system. This project includes UI automation, API testing, and performance testing capabilities.

## Project Overview

This framework provides a complete solution for testing the OrangeHRM application through:

- **End-to-End UI Testing**: Automated browser-based tests using Playwright
- **API Testing**: Backend endpoint verification
- **Performance Testing**: Load and stress testing with K6

## Project Structure

```
orangehrm-automation-test/
├── README.md                 # Main project documentation
├── performance-tests/        # K6 performance testing suite
│   ├── k6-results.json       # Performance test results
│   ├── package.json          # Performance testing dependencies
│   ├── performance.js        # K6 test scripts
│   └── README.md             # Performance testing documentation
└── tests/                    # Main test directory
    ├── cookies.json          # Saved authentication cookies
    ├── eslint.config.mjs     # ESLint configuration
    ├── k6-results.json       # API performance test results
    ├── package.json          # Test dependencies
    ├── playwright.config.ts  # Playwright configuration
    ├── README.md             # Testing documentation
    ├── results.xml           # JUnit test results
    ├── allure-results/       # Allure reporting artifacts
    ├── pageObjects/          # Page Object Models
    │   └── globalMenu.ts     # Global menu interactions
    ├── playwright-report/    # HTML test reports
    ├── test-results/         # Test execution artifacts
    ├── tests/                # Test implementation files
    └── util/                 # Helper utilities
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/tripham1251993/orangehrm-automation-test.git
cd orangehrm-automation-test
```

2. Install test dependencies:

```bash
cd tests
npm install
npx playwright install
```

3. For performance testing:

```bash
cd ../performance-tests
npm install
```

## Running Tests

### UI Tests

```bash
cd tests
# Run in headed mode (visible browser)
npm run test:e2e-chromium
npm run test:e2e-firefox

# Run in headless mode (for CI)
npm run test:e2e-chromium:ci
npm run test:e2e-firefox:ci

# Run specific test suites using tags
npm run test:e2e-chromium -- -g "@login"
```

### API Tests

```bash
cd tests
npm run test:api

# Run specific API test tags
npm run test:api -- -g "@api-employees"
```

### Performance Tests

```bash
cd performance-tests
npm run test:performance
```

## Reporting

After test execution, reports are available:

- **Allure Reports**: `npm run serve-report` (in the tests directory)
- **Playwright HTML Report**: Available in the `tests/playwright-report` directory
- **Performance Test Results**: JSON results in both directories

## Continuous Integration

Tests are configured to run automatically in GitHub Actions when:
- Changes are pushed to main/master branch affecting test files
- PRs are created or updated
- Manual triggers via GitHub Actions

## Project Maintenance

### Code Quality

```bash
# In the tests directory
npm run format:check  # Check formatting
npm run format:fix    # Fix formatting issues
npm run lint:check    # Check linting
npm run lint:fix      # Fix linting issues
```

## Contact

For questions or support, please create an issue in the GitHub repository.