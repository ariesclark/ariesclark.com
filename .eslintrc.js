require("@ariesclark/eslint-config/eslint-patch");
process.env["ESLINT_PROJECT_ROOT"] = __dirname;

module.exports = {
	extends: [
		"@ariesclark/eslint-config",
		"@ariesclark/eslint-config/atoms/react",
		"@ariesclark/eslint-config/atoms/tailwindcss",
		"plugin:@next/next/recommended"
	]
};
