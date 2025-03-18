const ErrorCodeMapper = require("../utils/error-code-mapper");
const ValidationFunctions = require("../utils/validation-functions");

/**
 * Class representing a refund request.
 */
class CreateRefundRequest {
    constructor() {
        this.container = {};
    }

    /**
     * Gets refund amount
     * @returns {number} - Refund amount
     */
    getRefundAmount() {
        return this.container.Amount;
    }

    /**
     * Sets refund amount
     * @param {number} amount - Amount to be refunded. Should be lesser than or equal to the transaction amount.
     * @returns {CreateRefundRequest} - Returns the instance of the class
     * @throws {Error} if validation fails
     */
    setRefundAmount(amount) {
        ValidationFunctions.emptyCheck(
			amount,
			ErrorCodeMapper.getMessage("SE0018")
		);
		if (isNaN(amount) || amount <= 0) {
			throw ErrorCodeMapper.getMessage("SE0002");
		}

        this.container.Amount = amount;
        return this;
    }

    /**
     * Gets refund remarks
     * @returns {string|null} - Refund remarks
     */
    getRefundRemarks() {
        return this.container.Remarks;
    }

    /**
     * Sets refund remarks
     * @param {string|null} remark - Remarks for the refund. Optional field.
     * @returns {CreateRefundRequest} - Returns the instance of the class
     * @throws {Error} if validation fails
     */
    setRefundRemarks(remark) {
        ValidationFunctions.checkMaxCharLength(
			remark,
			200,
			ErrorCodeMapper.getMessage("SE0007")
		);
        this.container.Remarks = remark;
        return this;
    }

    /**
     * Gets order ID
     * @returns {string} - Order ID
     */
    getOrderId() {
        return this.container.OrderId;
    }

    /**
     * Sets order ID
     * @param {string} orderId - Unique ID to associate the refund with.
     * @returns {CreateRefundRequest} - Returns the instance of the class
     * @throws {Error} if validation fails
     */
    setOrderId(orderId) {
        ValidationFunctions.emptyCheck(
			orderId,
			ErrorCodeMapper.getMessage("SE0006")
		);

        this.container.OrderId = orderId;
        return this;
    }

    /**
     * Converts the object to an associative array.
     * @returns {object} - The container object
     */
    toArray() {
        return this.container;
    }
}

module.exports = CreateRefundRequest;
