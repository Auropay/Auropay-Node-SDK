/**
 * Customer Class
 *
 * Represents a customer with personal contact details.
 */

class Customer {
	/**
	 * Initializes a new instance of the Customer class.
	 *
	 * @param {string} firstName - Customer's first name.
	 * @param {string} lastName - Customer's last name.
	 * @param {string} phone - Customer's phone number.
	 * @param {string} email - Customer's email address.
	 */
	constructor(firstName, lastName, phone, email) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.phone = phone;
		this.email = email;
	}

	/**
	 * Converts the Customer instance to a plain JSON object.
	 *
	 * @returns {Object} JSON representation of the customer.
	 */
	toJSON() {
		return {
			firstName: this.firstName.trim(),
			lastName: this.lastName.trim(),
			phone: this.phone.trim(),
			email: this.email.trim(),
		};
	}
}

// Export the Customer class for use in other modules.
module.exports = Customer;
