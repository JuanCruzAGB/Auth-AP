import config from "../conf.json";
import Requirement from "../Requirement.js";

/**
 * * Controls the Phone requirement.
 * @export
 * @class Phone
 * @extends {Requirement}
 */
export default class Phone extends Requirement {
  /**
   * * Creates an instance of Phone.
   * @param {object|null} [data]
   * @param {string} [data.lang='es']
   * @param {string|null} [data.message=null]
   * @param {object} [data.params={}]
   * @param {RegExp} [data.params.regexp=/^0|15/]
   * @memberof Phone
   */
  constructor (data = {
    // 
  }) {
    super({
      lang: data.lang ?? config.lang,
      messages: {
        ...Phone.messages,
        custom: data.message ?? null,
      },
      name: Phone.name,
      params: {
        ...Phone.params,
        ...data.params,
      },
    });
  }

  /**
   * * Returns the regexp.
   * @readonly
   * @return {RegExp}
   * @memberof Phone
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
   * @memberof Phone
   */
  validate (input) {
    if (input.required) {
      if (typeof input.model == 'string') {
        if (!input.model.match(this.regexp)) {
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
   * @memberof Phone
   */
  static get messages () {
    return {
      default: {
        en: 'The field should not start with 0 or 15',
        es: 'El campo no debe empezar ni con 0, ni con 15',
      },
    };
  }

  /**
   * * Returns the Requirement name.
   * @readonly
   * @static
   * @memberof Phone
   */
  static get name () {
    return "phone";
  }

  /**
   * * Returns the Requirement parameters.
   * @readonly
   * @static
   * @memberof Phone
   */
  static get params () {
    return {
      regexp: /^0|15/,
    };
  }
};