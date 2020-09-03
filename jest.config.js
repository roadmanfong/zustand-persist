module.exports = {
  testPathIgnorePatterns: ['/node_modules/', 'jest', 'scripts'],
  coverageDirectory: './coverage/',
  collectCoverage: true,
  coverageReporters: ['json', 'html', 'text', 'text-summary'],
  collectCoverageFrom: ['src/**/*.{js,ts,tsx}', 'tests/**/*.{js,ts,tsx}'],
}
