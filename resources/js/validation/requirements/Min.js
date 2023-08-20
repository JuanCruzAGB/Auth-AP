import config from "../conf.json";
import Requirement from "../Requirement.js";

/**
 * * Controls the Min requirement.
 * @export
 * @class Min
 * @extends {Requirement}
 */
export default class Min extends Requirement {
  /**
   * * Creates an instance of Min.
   * @param {object|null} [data]
   * @param {string} [data.lang='es']
   * @param {string|null} [data.message=null]
   * @param {object} [data.params={}]
   * @param {number} [data.params.length=1]
   * @memberof Min
   */
  constructor (data = {
    // 
  }) {
    super({
      lang: data.lang ?? config.lang,
      messages: {
        ...Min.messages,
        custom: data.message ?? null,
      },
      name: Min.name,
      params: {
        ...Min.params,
        ...data.params,
      },
    });
  }

  /**
   * * Returns the length.
   * @readonly
   * @return {number}
   * @memberof Min
   */
  get length () {
    return this.params.length;
  }

  /**
   * * Returns the Requirement message.
   * @readonly
   * @return {string|null}
   * @memberof Min
   */
  get message () {
    let regex = /:min/

    if (this.messages.custom) {
      return this.messages.custom.replace(regex, this.length);
    }

    return this.messages.default.replace(regex, this.length);
  }

  /**
   * * Validate an Input.
   * @param {Input} input
   * @memberof Min
   */
  validate (input) {
    if (input.required) {
      switch (typeof input.model) {
        case 'number':
          this.validateMin(input);

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
   * @memberof Min
   */
  validateMin (input) {
    if (input.model < this.length) {
      this.invalidate(input);
    }
  }

  /**
   * * Validate an Input object.
   * @param {Input} input
   * @memberof Min
   */
  validateObject (input) {
    if (Array.isArray(input.model)) {
      if (input.model.length < this.length) {
        this.invalidate(input);
      }
    }
  }

  /**
   * * Validate an Input string.
   * @param {Input} input
   * @memberof Min
   */
  validateString (input) {
    if (input.model.length < this.length) {
      this.invalidate(input);
    }
  }

  /**
   * * Returns the Requirement messages.
   * @readonly
   * @static
   * @memberof Min
   */
  static get messages () {
    return {
      default: {
        en: 'The field should have minimum :min characters length',
        es: 'El campo debe tener mínimo :min carácteres',
      },
    };
  }

  /**
   * * Returns the Requirement name.
   * @readonly
   * @static
   * @memberof Min
   */
  static get name () {
    return "min";
  }

  /**
   * * Returns the Requirement parameters.
   * @readonly
   * @static
   * @memberof Min
   */
  static get params () {
    return {
      length: 1,
    };
  }
};