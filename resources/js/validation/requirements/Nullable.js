import config from "../conf.json";
import Requirement from "../Requirement.js";

/**
 * * Controls the Nullable requirement.
 * @export
 * @class Nullable
 * @extends {Requirement}
 */
export default class Nullable extends Requirement {
  /**
   * * Creates an instance of Nullable.
   * @memberof Nullable
   */
  constructor () {
    super({
      messages: null,
      name: Nullable.name,
    });
  }

  /**
   * * Validate an Input.
   * @param {Input} input
   * @memberof Nullable
   */
  validate (input) {
    if (!input.model) {
      input.required = false;
    } else {
      input.error = null;

      input.invalid = false;

      input.required = true;
    }
  }

  /**
   * * Returns the Requirement name.
   * @readonly
   * @static
   * @memberof Nullable
   */
  static get name () {
    return "nullable";
  }
};