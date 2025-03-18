class ErrorCodeMapper {
	/**
	 * @var {Object} errorMap An object mapping error codes to messages.
	 */
	static errorMap = {
		SE0001:
			"The expiration date and time must be in the format: DD-MM-YYYY hh:mm:ss.",
		SE0002: "The amount must be a positive number.",
		SE0003: "The title field cannot be left blank or empty.",
		SE0004: "The payment description cannot exceed 1000 characters.",
		SE0005:
			"The callback parameters are missing required fields, such as the API URL and reference number.",
		SE0006:
			"The order ID is required and must be a valid identifier (a non-empty string).",
		SE0007: "Remarks cannot exceed 200 characters in length.",
		SE0008:
			"The transaction ID is required and must be a valid identifier (a non-empty string).",
		SE0009: "The invoice number should not exceed 50 characters if provided.",
		SE0010: "Customer first name field cannot be left blank or empty.",
		SE0011: "Customer last name field cannot be left blank or empty.",
		SE0012: "Customer phone must be a valid number with 10 to 15 digits.",
		SE0013: "Customer email must be a valid email address.",
		SE0014: "Callback API URL must be a valid URL.",
		SE0015:
			"The reference ID is required and must be a valid identifier (a non-empty string).",
		SE0016:
			"Missing the required parameter $data when calling createPaymentLink",
		SE0017:
			"Missing the required parameter $data when calling createPaymentQRCode.",
		SE0018: "Amount Mandatory",
		SE0019: "Title should be less than 50 characters",
		SE0020: "Title should not contain special characters",
		SE0021: "Description should be less than 1000 characters.",
		SE0022: "Description should not contain special characters",
		SE0023: "Payment Description should not contain special characters.",
		SE0024: "Expire on should not be past date.",
		SE0025: "Invoice number should not contain special characters.",
		SE0026: "Email cannot be more than 320 characters.",
		SE0027: "Email is mandatory. Cannot be empty.",
		SE0028: "Phone is mandatory. Cannot be empty.",
		SE0029: "ReferenceNo should be less then 50 characters.",
		SE0030: "URL should be less than 2048 characters.",
		SE0031: "URL is Mandatory. Cannot be empty.",
		SE0032:
			"The customer details must be an array containing valid information such as first name, last name, phone, and email.",
		SE0033:
			"The Settings must be an array containing valid information such as displaySummary",
		SE0034:
			"Customer first name must be a valid name.",
		SE0035:
			"Customer last name must be a valid name.",
	};

	/**
	 * Retrieves the error message for a given error code.
	 *
	 * @param {string} errorCode The error code to look up.
	 * @returns {Object} An object containing the error code and corresponding message.
	 */
	static getMessage(errorCode) {
		const message = this.errorMap[errorCode] || "An unknown error occurred.";
		return {
			error_code: errorCode,
			message: message,
		};
	}
}

module.exports = ErrorCodeMapper;
