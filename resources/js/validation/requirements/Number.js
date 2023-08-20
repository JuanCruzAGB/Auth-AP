import config from "../conf.json";
import Requirement from "../Requirement.js";

/**
 * * Controls the Number requirement.
 * @export
 * @class Number
 * @extends {Requirement}
 */
export default class Number extends Requirement {
  /**
   * * Creates an instance of Number.
   * @param {object|null} [data]
   * @param {string} [data.lang='es']
   * @param {string|null} [data.message=null]
   * @param {object} [data.params={}]
   * @param {RegExp} [data.params.regexp=/^[0-9]+$/]
   * @memberof Number
   */
  constructor (data = {
    // 
  }) {
    super({
      lang: data.lang ?? config.lang,
      messages: {
        ...Number.messages,
        custom: data.message ?? null,
      },
      name: Number.name,
      params: {
        ...Number.params,
        ...data.params,
      },
    });
  }

  /**
   * * Returns the regexp.
   * @readonly
   * @return {RegExp}
   * @memberof Number
   */
  get regexp () {
    if (typeof this.params.regexp == 'string') {
      if (this.params.regexp.match(/^\//)) {
        let regexp = this.params.regexp.slice(1);

        regexp = regexp.slice(0, -1);

        return new RegExp(regexp);
      }
    }

    return this.params.regexp;
  }

  /**
   * * Validate an Input.
   * @param {Input} input
   * @memberof Number
   */
  validate (input) {
    if (input.required) {
      if (typeof input.model != 'number') {
        if (typeof input.model == 'string') {
          if (input.model.match(this.regexp)) {
            return;
          }
        }

        this.invalidate(input);
      }
    }
  }

  /**
   * * Returns the Requirement messages.
   * @readonly
   * @static
   * @memberof Number
   */
  static get messages () {
    return {
      default: {
        en: 'The field should be a valid number',
        es: 'El campo debe ser un número válido',
      },
    };
  }

  /**
   * * Returns the Requirement name.
   * @readonly
   * @static
   * @memberof Number
   */
  static get name () {
    return "number";
  }

  /**
   * * Returns the Requirement parameters.
   * @readonly
   * @static
   * @memberof Number
   */
  static get params () {
    return {
      regexp: /^[0-9]+$/,
    };
  }
};