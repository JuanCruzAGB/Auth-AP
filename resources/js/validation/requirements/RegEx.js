import config from "../conf.json";
import Requirement from "../Requirement.js";

/**
 * * Controls the RegEx requirement.
 * @export
 * @class RegEx
 * @extends {Requirement}
 */
export default class RegEx extends Requirement {
  /**
   * * Creates an instance of RegEx.
   * @param {object|null} [data]
   * @param {string} [data.lang='es']
   * @param {string|null} [data.message=null]
   * @param {object} [data.params={}]
   * @param {RegEx} [data.params.regexp=/^0|15/]
   * @memberof RegEx
   */
  constructor (data = {
    // 
  }) {
    super({
      lang: data.lang ?? config.lang,
      messages: {
        ...RegEx.messages,
        custom: data.message ?? null,
      },
      name: RegEx.name,
      params: {
        ...RegEx.params,
        ...data.params,
      },
    });
  }

  /**
   * * Returns the regexp.
   * @readonly
   * @return {RegEx}
   * @memberof RegEx
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
   * @memberof RegEx
   */
  validate (input) {
    if (input.required) {
      if (typeof input.model == 'string') {
        if (input.model.match(this.regexp)) {
          return;
        }
      }

      this.invalidate(input);
    }
  }

  /**
   * * Returns the Requirement messages.
   * @readonly
   * @static
   * @memberof RegEx
   */
  static get messages () {
    return {
      default: {
        en: 'The field should is not valid',
        es: 'El campo no es válido',
      },
    };
  }

  /**
   * * Returns the Requirement name.
   * @readonly
   * @static
   * @memberof RegEx
   */
  static get name () {
    return "regexp";
  }

  /**
   * * Returns the Requirement parameters.
   * @readonly
   * @static
   * @memberof RegEx
   */
  static get params () {
    return {
      regexp: null,
    };
  }
};