const axios = require("axios");
const Constants = require("./lib/config/constants");
const ErrorCodeMapper = require("./lib/utils/error-code-mapper");

/**
 * Auropay SDK for handling payment-related operations.
 */
class Auropay {
	// Static variables for client configuration
	static clientAccessKey = "";
	static clientSecretKey = "";
	static clientEnvironment = "DEV";

	// Mapping of API versions to services
	static apiVersionsMapping = {
		paymentlink: "1.0",
		paymentqrcodes: "1.0",
		refunds: "1.0",
		statusbyrefid: "1.0",
		statusbytransid: "1.0",
	};

	/**
	 * Constructor initializes the API base URL and Axios client based on the environment.
	 */
	constructor() {
		// Check if Auropay.clientEnvironment is not set or is not one of the valid values
		if (!Auropay.clientEnvironment || !['DEV', 'UAT', 'PROD'].includes(Auropay.clientEnvironment)) {
			
			const clientEnvError = {
				"error_code": "400",
				"message": "Invalid or missing value for Auropay.clientEnvironment. It should be 'DEV', 'UAT', or 'PROD'."
			  };
			throw clientEnvError;
		}
		
		switch (Auropay.clientEnvironment) {
			case 'PROD':
				this.apiBaseUrl = Constants.PRODUCTION_URL;
				break;
			case 'UAT':
				this.apiBaseUrl = Constants.UAT_URL;
				break;
			default:
				this.apiBaseUrl = Constants.SANDBOX_URL; // Default to DEV if it's neither PROD nor UAT
				break;
		}

		this.client = axios.create({
			baseURL: this.apiBaseUrl,
		});
	}

	/**
	 * Retrieves the API version for a given service.
	 * @param {string} service - The name of the service.
	 * @returns {string} The API version.
	 */
	getApiVersionForService(service) {
		return Auropay.apiVersionsMapping[service] || "1.0";
	}

	/**
	 * Creates a payment link.
	 * @param {Object} data - The payment link data.
	 * @returns {Promise<Object>} The API response.
	 */
	async createPaymentLink(data) {
		if (!data) {
			throw ErrorCodeMapper.getMessage("SE0016");
		}

		const requestArr = data.toArray();
		const apiVersion = this.getApiVersionForService("paymentlink");

		this.addDefaultSettings(requestArr);
		return await this.connect(
			apiVersion,
			"POST",
			Constants.PAYMENTLINK_API,
			requestArr
		);
	}

	/**
	 * Creates a refund request.
	 * @param {Object} data - The refund data.
	 * @returns {Promise<Object>} The API response.
	 */
	async createRefund(data) {
		if (!data) {
			throw ErrorCodeMapper.getMessage("SE0029");
		}

		const apiVersion = this.getApiVersionForService("refunds");
		const requestArr = data.toArray();
		requestArr.UserType = 1;

		return await this.connect(
			apiVersion,
			"POST",
			Constants.REFUND_API,
			requestArr
		);
	}

	/**
	 * Retrieves payment status by transaction ID.
	 * @param {string} transactionId - The transaction ID.
	 * @returns {Promise<Object>} The API response.
	 */
	async getPaymentStatusByTransactionId(transactionId) {
		if (!transactionId || transactionId.trim() === "") {
			throw ErrorCodeMapper.getMessage("SE0008");
		}

		const apiVersion = this.getApiVersionForService("statusbytransid");
		return await this.connect(
			apiVersion,
			"GET",
			`${Constants.PAYMENT_BY_TRANSACTION_ID}${transactionId}`
		);
	}

	/**
	 * Retrieves payment status by reference ID.
	 * @param {string} referenceId - The reference ID.
	 * @returns {Promise<Object>} The API response.
	 */
	async getPaymentStatusByReferenceId(referenceId) {
		if (!referenceId || referenceId.trim() === "") {
			throw ErrorCodeMapper.getMessage("SE0015");
		}

		const apiVersion = this.getApiVersionForService("statusbyrefid");
		return await this.connect(
			apiVersion,
			"GET",
			`${Constants.PAYMENT_BY_REFNO}${referenceId}`
		);
	}

	/**
	 * Creates a payment QR code.
	 * @param {Object} data - The QR code data.
	 * @returns {Promise<Object>} The API response.
	 */
	async createPaymentQRCode(data) {
		if (!data) {
			throw ErrorCodeMapper.getMessage("SE0017");
		}

		const apiVersion = this.getApiVersionForService("paymentqrcodes");
		const requestArr = data.toArray();

		this.addDefaultSettings(requestArr);
		return await this.connect(
			apiVersion,
			"POST",
			Constants.PAYMENTQRCODE_API,
			requestArr
		);
	}

	/**
	 * Adds default settings to the request data.
	 * @param {Object} requestData - The request data object.
	 */
	addDefaultSettings(requestData) {
		requestData.ResponseType = 1;
		requestData.enableProtection = false;
	}

	/**
	 * Connects to the API with the provided settings.
	 * @param {string} apiVersion - The API version.
	 * @param {string} method - The HTTP method (GET, POST).
	 * @param {string} endpoint - The API endpoint.
	 * @param {Object} [data=null] - The request data.
	 * @returns {Promise<Object>} The API response.
	 */
	async connect(apiVersion, method, endpoint, data = null) {
		const headers = {
			"Content-Type": "application/json",
			"x-version": apiVersion,
		};

		if (Auropay.clientAccessKey) {
			headers["x-access-key"] = Auropay.clientAccessKey;
		}

		if (Auropay.clientSecretKey) {
			headers["x-secret-key"] = Auropay.clientSecretKey;
		}

		const options = {
			method,
			url: endpoint,
			headers,
		};

		if (method === "POST" && data) {
			options.data = data;
		} else if (method === "GET" && data) {
			options.params = data;
		}

		try {
			const response = await this.client.request(options);
			return response.data;
		} catch (error) {
			const errorDetails = {
				error_message: error.message,
				error_code: error.status,
				request_url: `${this.apiBaseUrl}${endpoint}`,
				request_method: method,
				request_data: JSON.stringify(data),
				response_body: error.response?.data,
			};
			console.log(errorDetails);

			return {
				error_code: error.status,
				message: error.response?.data?.message || "Not Found",
			};
		}
	}
}

module.exports = Auropay;
