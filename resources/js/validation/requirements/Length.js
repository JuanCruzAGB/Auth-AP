import config from "../conf.json";
import Requirement from "../Requirement.js";

/**
 * * Controls the Length requirement.
 * @export
 * @class Length
 * @extends {Requirement}
 */
export default class Length extends Requirement {
  /**
   * * Creates an instance of Length.
   * @param {object|null} [data]
   * @param {string} [data.lang='es']
   * @param {string|null} [data.message=null]
   * @param {object} [data.params={}]
   * @param {number} [data.params.length=1]
   * @memberof Length
   */
  constructor (data = {
    // 
  }) {
    super({
      lang: data.lang ?? config.lang,
      messages: {
        ...Length.messages,
        custom: data.message ?? null,
      },
      name: Length.name,
      params: {
        ...Length.params,
        ...data.params,
      },
    });
  }

  /**
   * * Returns the length.
   * @readonly
   * @return {number}
   * @memberof Length
   */
  get length () {
    return this.params.length;
  }

  /**
   * * Returns the Requirement message.
   * @readonly
   * @return {string|null}
   * @memberof Length
   */
  get message () {
    let regex = /:length/

    if (this.messages.custom) {
      return this.messages.custom.replace(regex, this.length);
    }

    return this.messages.default.replace(regex, this.length);
  }

  /**
   * * Validate an Input.
   * @param {Input} input
   * @memberof Length
   */
  validate (input) {
    if (input.required) {
      switch (typeof input.model) {
        case 'number':
          this.validateNumber(input);

          break;

        case 'object':
          this.validateObject(input);

          break;

        case 'string':
          this.validateString(input);

          break;
      }
    }
  }

  /**
   * * Validate an Input number.
   * @param {Input} input
   * @memberof Length
   */
  validateNumber (input) {
    if (input.model < this.length || input.model > this.length) {
      this.invalidate(input);
    }
  }

  /**
   * * Validate an Input object.
   * @param {Input} input
   * @memberof Length
   */
  validateObject (input) {
    if (Array.isArray(input.model)) {
      if (input.model.length < this.length || input.model.length > this.length) {
        this.invalidate(input);
      }
    }
  }

  /**
   * * Validate an Input string.
   * @param {Input} input
   * @memberof Length
   */
  validateString (input) {
    if (input.model.length < this.length || input.model.length > this.length) {
      this.invalidate(input);
    }
  }

  /**
   * * Returns the Requirement messages.
   * @readonly
   * @static
   * @memberof Length
   */
  static get messages () {
    return {
      default: {
        en: 'The field should have :max characters length',
        es: 'El campo debe tener :max carácteres',
      },
    };
  }

  /**
   * * Returns the Requirement name.
   * @readonly
   * @static
   * @memberof Length
   */
  static get name () {
    return "length";
  }

  /**
   * * Returns the Requirement parameters.
   * @readonly
   * @static
   * @memberof Length
   */
  static get params () {
    return {
      length: 1,
    };
  }
};