"use strict";

/**
 * ValidationFunctions Class
 *
 * Provides static methods for common validation checks such as empty checks,
 * special character validation, maximum character length checks, and regex validation.
 */

class ValidationFunctions {
	/**
	 * Checks if a value is empty.
	 *
	 * @param {string} value - The value to be checked.
	 * @param {string} errorMessage - The error message to throw if the value is empty.
	 * @throws Will throw an error if the value is empty.
	 */
	static emptyCheck(value, errorMessage) {
		if (!value || value.trim().length === 0) {
			throw errorMessage;
		}
	}

	/**
	 * Validates if the value contains any special characters as per the provided regex.
	 *
	 * @param {string} value - The value to be validated.
	 * @param {RegExp} regex - The regular expression to test against the value.
	 * @param {string} errorMessage - The error message to throw if validation fails.
	 * @throws Will throw an error if the value contains special characters.
	 */
	static validateSpecialChar(value, regex, errorMessage) {
		if (regex.test(value)) {
			throw errorMessage;
		}
	}

	/**
	 * Checks if the value exceeds the maximum allowed character length.
	 *
	 * @param {string} value - The value to be checked.
	 * @param {number} maxLength - The maximum allowed length.
	 * @param {string} errorMessage - The error message to throw if the value exceeds the limit.
	 * @throws Will throw an error if the value exceeds the maximum character length.
	 */
	static checkMaxCharLength(value, maxLength, errorMessage) {
		if (value && value.length > maxLength) {
			throw errorMessage;
		}
	}

	/**
	 * Validates the value against a given regular expression.
	 *
	 * @param {string} value - The value to be validated.
	 * @param {RegExp} regex - The regular expression to validate against.
	 * @param {string} errorMessage - The error message to throw if validation fails.
	 * @throws Will throw an error if the value does not match the regular expression.
	 */
	static regexValidator(value, regex, errorMessage) {
		if (!regex.test(value)) {
			throw errorMessage;
		}
	}
}

// Export the ValidationFunctions class for use in other modules.
module.exports = ValidationFunctions;
