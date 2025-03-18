const ErrorCodeMapper = require("../utils/error-code-mapper");
const Customer = require("./customer");
const CallbackParameters = require("./callback-parameters");
const Settings = require("./settings");
const ValidationFunctions = require("../utils/validation-functions");

// Define the regular expression constant
const SPECIAL_CHAR_REGEX = /[^a-zA-Z0-9 ]/;
const NAME_REGEX = /^[a-zA-Z\s]{1,70}$/
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^\d{10,15}$/;
const DATE_REGEX = /^(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2}):(\d{2})$/;
const CALLBACK_API_URL_REGEX = /^(https?:\/\/)(www\.)?[a-zA-Z0-9@:%._\+~#?&/=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%._\+~#?&/=]*)$/;


/**
 * Class representing a payment request.
 */
class CreatePaymentRequest {
	constructor() {
		/**
		 * @private
		 * @type {Object}
		 */
		this.container = {}; // Initialize the container for storing values
	}

	/**
	 * Sets the payment title.
	 * @param {string} title - The title of the payment.
	 * @returns {CreatePaymentRequest} - Returns the instance for chaining.
	 */
	setTitle(title) {
		ValidationFunctions.emptyCheck(title, ErrorCodeMapper.getMessage("SE0003"));
		ValidationFunctions.validateSpecialChar(
			title,
			SPECIAL_CHAR_REGEX,
			ErrorCodeMapper.getMessage("SE0020")
		);
		ValidationFunctions.checkMaxCharLength(
			title,
			50,
			ErrorCodeMapper.getMessage("SE0019")
		);
		this.container["title"] = title.trim();
		return this;
	}

	/**
	 * Gets the payment title.
	 * @returns {string|null} - The title or null if not set.
	 */
	getTitle() {
		return this.container["title"] || null;
	}

	/**
	 * Sets the payment amount.
	 * @param {number} amount - The payment amount.
	 * @returns {CreatePaymentRequest} - Returns the instance for chaining.
	 * @throws Will throw an error if the amount is invalid.
	 */
	setAmount(amount) {
		ValidationFunctions.emptyCheck(
			amount,
			ErrorCodeMapper.getMessage("SE0018")
		);
		if (isNaN(amount) || amount <= 0) {
			throw ErrorCodeMapper.getMessage("SE0002");
		}
		this.container["amount"] = amount;
		return this;
	}

	/**
	 * Gets the payment amount.
	 * @returns {number|null} - The amount or null if not set.
	 */
	getAmount() {
		return this.container["amount"] || null;
	}

	/**
	 * Sets the short description for the payment.
	 * @param {string} shortDescription - The short description.
	 * @returns {CreatePaymentRequest} - Returns the instance for chaining.
	 */
	setShortDescription(shortDescription) {
		ValidationFunctions.checkMaxCharLength(
			shortDescription,
			1000,
			ErrorCodeMapper.getMessage("SE0021")
		);
		ValidationFunctions.validateSpecialChar(
			shortDescription,
			SPECIAL_CHAR_REGEX,
			ErrorCodeMapper.getMessage("SE0022")
		);
		this.container["shortDescription"] = shortDescription.trim();
		return this;
	}

	/**
	 * Gets the short description.
	 * @returns {string|null} - The short description or null if not set.
	 */
	getShortDescription() {
		return this.container["shortDescription"] || null;
	}

	/**
	 * Sets the payment description.
	 * @param {string} paymentDescription - The payment description.
	 * @returns {CreatePaymentRequest} - Returns the instance for chaining.
	 */
	setPaymentDescription(paymentDescription) {
		ValidationFunctions.checkMaxCharLength(
			paymentDescription,
			1000,
			ErrorCodeMapper.getMessage("SE0004")
		);
		ValidationFunctions.validateSpecialChar(
			paymentDescription,
			SPECIAL_CHAR_REGEX,
			ErrorCodeMapper.getMessage("SE0023")
		);
		this.container["paymentDescription"] = paymentDescription.trim();
		return this;
	}

	/**
	 * Gets the payment description.
	 * @returns {string|null} - The payment description or null if not set.
	 */
	getPaymentDescription() {
		return this.container["paymentDescription"] || null;
	}

	/**
	 * Enables or disables partial payments.
	 * @param {boolean} enablePartialPayment - Flag to enable or disable partial payments.
	 * @returns {CreatePaymentRequest} - Returns the instance for chaining.
	 */
	setEnablePartialPayment(enablePartialPayment) {
		this.container["enablePartialPayment"] = enablePartialPayment;
		return this;
	}

	/**
	 * Gets the status of partial payment option.
	 * @returns {boolean} - True if enabled, false otherwise.
	 */
	getEnablePartialPayment() {
		return this.container["enablePartialPayment"] || false;
	}

	/**
	 * Enables or disables multiple payments.
	 * @param {boolean} enableMultiplePayment - Flag to enable or disable multiple payments.
	 * @returns {CreatePaymentRequest} - Returns the instance for chaining.
	 */
	setEnableMultiplePayment(enableMultiplePayment) {
		this.container["enableMultiplePayment"] = enableMultiplePayment;
		return this;
	}

	/**
	 * Gets the status of multiple payment option.
	 * @returns {boolean} - True if enabled, false otherwise.
	 */
	getEnableMultiplePayment() {
		return this.container["enableMultiplePayment"] || false;
	}

	/**
	 * Enables or disables receipt display.
	 * @param {boolean} displayReceipt - Flag to display receipt.
	 * @returns {CreatePaymentRequest} - Returns the instance for chaining.
	 */
	setDisplayReceipt(displayReceipt) {
		this.container["displayReceipt"] = displayReceipt;
		return this;
	}

	/**
	 * Gets the status of receipt display option.
	 * @returns {boolean} - True if enabled, false otherwise.
	 */
	getDisplayReceipt() {
		return this.container["displayReceipt"] || false;
	}

	/**
	 * Sets the expiry date and time for the payment.
	 * @param {string} expireOn - Expiry date in 'DD-MM-YYYY HH:MM:SS' format.
	 * @returns {CreatePaymentRequest} - Returns the instance for chaining.
	 */
	setExpireOn(expireOn) {
		ValidationFunctions.regexValidator(
			expireOn,
			DATE_REGEX,
			ErrorCodeMapper.getMessage("SE0001")
		);

		const currentDate = new Date();

		// Reformat date from 'DD-MM-YYYY' to 'YYYY-MM-DD'
		const [day, month, yearAndTime] = expireOn.split("-");
		const [year, time] = yearAndTime.split(" ");
		const formattedInputDateStr = `${year}-${month}-${day} ${time}`;

		const inputDate = new Date(formattedInputDateStr);

		if (inputDate < currentDate) {
			throw ErrorCodeMapper.getMessage("SE0024");
		}

		this.container["expireOn"] = expireOn;
		return this;
	}

	/**
	 * Gets the expiry date and time.
	 * @returns {string|null} - Expiry date or null if not set.
	 */
	getExpireOn() {
		return this.container["expireOn"] || null;
	}

	/**
	 * Sets customer details.
	 * @param {Customer|Array} customerDetails - Single Customer object or array of customer details.
	 * @returns {CreatePaymentRequest} - Returns the instance for chaining.
	 * @throws Will throw an error if validation fails.
	 */
	setCustomers(customerDetails) {
		if (!customerDetails || customerDetails.length === 0) {
			throw ErrorCodeMapper.getMessage("SE0032");
		}

		if (customerDetails instanceof Customer) {
			customerDetails = [customerDetails.toJSON()];
		}

		if (!Array.isArray(customerDetails)) {
			throw ErrorCodeMapper.getMessage("SE0032");
		}

		customerDetails.forEach((customer) => {
			ValidationFunctions.emptyCheck(
				customer.firstName,
				ErrorCodeMapper.getMessage("SE0010")
			);
			
			ValidationFunctions.regexValidator(
				customer.firstName,
				NAME_REGEX,
				ErrorCodeMapper.getMessage("SE0034")
			);
			ValidationFunctions.emptyCheck(
				customer.lastName,
				ErrorCodeMapper.getMessage("SE0011")
			);

			ValidationFunctions.regexValidator(
				customer.lastName,
				NAME_REGEX,
				ErrorCodeMapper.getMessage("SE0035")
			);

			ValidationFunctions.emptyCheck(
				customer.phone,
				ErrorCodeMapper.getMessage("SE0028")
			);
			ValidationFunctions.regexValidator(
				customer.phone,
				PHONE_REGEX,
				ErrorCodeMapper.getMessage("SE0012")
			);
			ValidationFunctions.emptyCheck(
				customer.email,
				ErrorCodeMapper.getMessage("SE0027")
			);
			ValidationFunctions.checkMaxCharLength(
				customer.email,
				320,
				ErrorCodeMapper.getMessage("SE0026")
			);
			ValidationFunctions.regexValidator(
				customer.email,
				EMAIL_REGEX,
				ErrorCodeMapper.getMessage("SE0013")
			);
		});

		console.log(customerDetails)
		this.container["Customers"] = customerDetails;
		return this;
	}

	/**
	 * Gets customer details.
	 * @returns {Array} - Array of customer details or an empty array if not set.
	 */
	getCustomers() {
		return this.container["Customers"] || [];
	}

	/**
	 * Sets callback parameters.
	 * @param {CallbackParameters} callbackParameters - The callback parameters object.
	 * @returns {CreatePaymentRequest} - Returns the instance for chaining.
	 */
	setCallbackParameters(callbackParameters) {
		if (!callbackParameters || callbackParameters.length === 0) {
			throw ErrorCodeMapper.getMessage("SE0005");
		}

		if (callbackParameters instanceof CallbackParameters) {
			callbackParameters = callbackParameters.toJSON();
		}

		ValidationFunctions.emptyCheck(
			callbackParameters.CallbackApiUrl,
			ErrorCodeMapper.getMessage("SE0031")
		);
		ValidationFunctions.regexValidator(
			callbackParameters.CallbackApiUrl,
			CALLBACK_API_URL_REGEX,
			ErrorCodeMapper.getMessage("SE0014")
		);
		ValidationFunctions.checkMaxCharLength(
			callbackParameters.CallbackApiUrl,
			2048,
			ErrorCodeMapper.getMessage("SE0030")
		);

		ValidationFunctions.checkMaxCharLength(
			callbackParameters.referenceNumber,
			50,
			ErrorCodeMapper.getMessage("SE0029")
		);

		this.container["CallbackParameters"] = callbackParameters;
		return this;
	}

	/**
	 * Gets callback parameters.
	 * @returns {Object|Array} - Callback parameters or an empty array if not set.
	 */
	getCallbackParameters() {
		return this.container["CallbackParameters"] || [];
	}

	/**
	 * Sets additional settings.
	 * @param {Settings} settings - The settings object.
	 * @returns {CreatePaymentRequest} - Returns the instance for chaining.
	 */
	setSettings(settings) {
		if (!settings || settings.length === 0) {
			throw ErrorCodeMapper.getMessage("SE0005");
		}

		if (settings instanceof Settings) {
			settings = settings.toJSON();
		}

		this.container["Settings"] = settings;
		return this;
	}

	/**
	 * Gets additional settings.
	 * @returns {Object|Array} - Settings object or an empty array if not set.
	 */
	getSettings() {
		return this.container["Settings"] || [];
	}

	/**
	 * Converts the payment request object to a plain object.
	 * @returns {Object} - The plain object representation of the payment request.
	 */
	toArray() {
		return this.container;
	}
}

module.exports = CreatePaymentRequest;
