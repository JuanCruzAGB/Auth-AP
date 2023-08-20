import config from "../conf.json";
import Requirement from "../Requirement.js";

/**
 * * Controls the Mail requirement.
 * @export
 * @class Mail
 * @extends {Requirement}
 */
export default class Mail extends Requirement {
  /**
   * * Creates an instance of Mail.
   * @param {object|null} [data]
   * @param {string} [data.lang='es']
   * @param {string|null} [data.message=null]
   * @param {object} [data.params={}]
   * @param {RegExp} [data.params.regexp=/^0|15/]
   * @memberof Mail
   */
  constructor (data = {
    // 
  }) {
    super({
      lang: data.lang ?? config.lang,
      messages: {
        ...Mail.messages,
        custom: data.message ?? null,
      },
      name: Mail.name,
      params: {
        ...Mail.params,
        ...data.params,
      },
    });
  }

  /**
   * * Returns the regexp.
   * @readonly
   * @return {RegExp}
   * @memberof Mail
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
   * @memberof Required
   */
  validate (input) {
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

    if (input.required) {
      if (typeof input.model == 'string') {
        if (input.model.match(regex)) {
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
   * @memberof Mail
   */
  static get messages () {
    return {
      default: {
        en: 'The field should be a valid mail',
        es: 'El campo debe ser un mail válido',
      },
    };
  }

  /**
   * * Returns the Requirement name.
   * @readonly
   * @static
   * @memberof Mail
   */
  static get name () {
    return "mail";
  }

  /**
   * * Returns the Requirement parameters.
   * @readonly
   * @static
   * @memberof Mail
   */
  static get params () {
    return {
      regexp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
    };
  }
};