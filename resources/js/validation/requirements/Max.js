import config from "../conf.json";
import Requirement from "../Requirement.js";

/**
 * * Controls the Max requirement.
 * @export
 * @class Max
 * @extends {Requirement}
 */
export default class Max extends Requirement {
  /**
   * * Creates an instance of Max.
   * @param {object|null} [data]
   * @param {string} [data.lang='es']
   * @param {string|null} [data.message=null]
   * @param {object} [data.params={}]
   * @param {number} [data.params.length=1]
   * @memberof Max
   */
  constructor (data = {
    // 
  }) {
    super({
      lang: data.lang ?? config.lang,
      messages: {
        ...Max.messages,
        custom: data.message ?? null,
      },
      name: Max.name,
      params: {
        ...Max.params,
        ...data.params,
      },
    });
  }

  /**
   * * Returns the length.
   * @readonly
   * @return {number}
   * @memberof Max
   */
  get length () {
    return this.params.length;
  }

  /**
   * * Returns the Requirement message.
   * @readonly
   * @return {string|null}
   * @memberof Max
   */
  get message () {
    let regex = /:max/

    if (this.messages.custom) {
      return this.messages.custom.replace(regex, this.length);
    }

    return this.messages.default.replace(regex, this.length);
  }

  /**
   * * Validate an Input.
   * @param {Input} input
   * @memberof Required
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
   * @memberof Required
   */
  validateNumber (input) {
    if (input.model > this.length) {
      this.invalidate(input);
    }
  }

  /**
   * * Validate an Input object.
   * @param {Input} input
   * @memberof Required
   */
  validateObject (input) {
    if (Array.isArray(input.model)) {
      if (input.model.length > this.length) {
        this.invalidate(input);
      }
    }
  }

  /**
   * * Validate an Input string.
   * @param {Input} input
   * @memberof Required
   */
  validateString (input) {
    if (input.model.length > this.length) {
      this.invalidate(input);
    }
  }

  /**
   * * Returns the Requirement messages.
   * @readonly
   * @static
   * @memberof Max
   */
  static get messages () {
    return {
      default: {
        en: 'The field should have maximum :max characters length',
        es: 'El campo debe tener máximo :max carácteres',
      },
    };
  }

  /**
   * * Returns the Requirement name.
   * @readonly
   * @static
   * @memberof Max
   */
  static get name () {
    return "max";
  }

  /**
   * * Returns the Requirement parameters.
   * @readonly
   * @static
   * @memberof Max
   */
  static get params () {
    return {
      length: 1,
    };
  }
};