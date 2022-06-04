require("@ariesclark/eslint-config/eslint-patch");

module.exports = {
	extends: [
		"@ariesclark/eslint-config",
		"@ariesclark/eslint-config/dist/atoms/react",
		"@ariesclark/eslint-config/dist/atoms/tailwindcss"
	],
	parserOptions: {
		project: "./tsconfig.json",
		tsconfigRootDir: __dirname
	}
};
