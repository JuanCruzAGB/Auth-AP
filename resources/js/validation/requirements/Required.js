import config from "../conf.json";
import Requirement from "../Requirement.js";

/**
 * * Controls the Required requirement.
 * @export
 * @class Required
 * @extends {Requirement}
 */
export default class Required extends Requirement {
  /**
   * * Creates an instance of Required.
   * @param {object|null} [data]
   * @param {string} [data.lang='es']
   * @param {string|null} [data.message=null]
   * @memberof Required
   */
  constructor (data = {
    // 
  }) {
    super({
      lang: data.lang ?? config.lang,
      messages: {
        ...Required.messages,
        custom: data.message ?? null,
      },
      name: Required.name,
    });
  }

  /**
   * * Validate an Input.
   * @param {Input} input
   * @memberof Required
   */
  validate (input) {
    input.required = true;

    if (!input.model) {
      this.invalidate(input);
    }
  }

  /**
   * * Returns the Requirement messages.
   * @readonly
   * @static
   * @memberof Required
   */
  static get messages () {
    return {
      default: {
        en: 'The field is required',
        es: 'El campo es obligatorio',
      },
    };
  }

  /**
   * * Returns the Requirement name.
   * @readonly
   * @static
   * @memberof Required
   */
  static get name () {
    return "required";
  }
};