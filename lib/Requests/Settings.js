/**
 * Settings Class
 *
 * Represents configuration settings related to display, currency, and commission.
 */

class Settings {
	/**
	 * Initializes a new instance of the Settings class.
	 *
	 * @param {boolean} displaySummary - Determines whether to display the summary.
	 */
	constructor(displaySummary) {
		this.displaySummary = displaySummary;
	}

	/**
	 * Converts the Settings instance to a plain JSON object.
	 *
	 * @returns {Object} JSON representation of the settings.
	 */
	toJSON() {
		return {
			displaySummary: this.displaySummary,
		};
	}
}

// Export the Settings class for use in other modules.
module.exports = Settings;
