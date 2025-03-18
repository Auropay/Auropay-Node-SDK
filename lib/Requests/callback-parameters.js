/**
 * CallbackParameters Class
 *
 * Represents the parameters required for API callbacks, including the API URL and reference number.
 */

class CallbackParameters {
	/**
	 * Initializes a new instance of the CallbackParameters class.
	 *
	 * @param {string} CallbackApiUrl - The URL to which the callback should be sent.
	 * @param {string} ReferenceNo - A unique reference number associated with the callback.
	 */
	constructor(CallbackApiUrl, ReferenceNo) {
		this.CallbackApiUrl = CallbackApiUrl;
		this.ReferenceNo = ReferenceNo;
	}

	/**
	 * Converts the CallbackParameters instance to a plain JSON object.
	 *
	 * @returns {Object} JSON representation of the callback parameters.
	 */
	toJSON() {
		return {
			CallbackApiUrl: this.CallbackApiUrl.trim(),
			ReferenceNo: this.ReferenceNo.trim(),
		};
	}
}

// Export the CallbackParameters class for use in other modules.
module.exports = CallbackParameters;
