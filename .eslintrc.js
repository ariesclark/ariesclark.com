require("@ariesclark/eslint-config/eslint-patch");

module.exports = {
	extends: [
		"@ariesclark/eslint-config",
		"@ariesclark/eslint-config/dist/atoms/react",
		"@ariesclark/eslint-config/dist/atoms/tailwindcss",
		"plugin:@next/next/recommended"
	],
	parserOptions: {
		project: "./tsconfig.json",
		tsconfigRootDir: __dirname
	},
	rules: {
		"no-mixed-operators": "off"
	}
};
