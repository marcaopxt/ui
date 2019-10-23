module.exports = {
	collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/node_modules/**', '!**/__snapshots__/**'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	moduleNameMapper: {
		'^.+\\.(css|scss)$': '<rootDir>/test/styleMock.js',
	},
	roots: ['<rootDir>/src'],
	setupFilesAfterEnv: ['<rootDir>/test/test-setup.js', '<rootDir>/test/setupEnzyme.ts'],
	snapshotSerializers: ['enzyme-to-json/serializer'],
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
};
