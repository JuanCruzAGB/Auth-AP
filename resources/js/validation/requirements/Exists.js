import config from "../conf.json";
import Requirement from "../Requirement.js";

/**
 * * Controls the Exists requirement.
 * @export
 * @class Exists
 * @extends {Requirement}
 */
export default class Exists extends Requirement {
  /**
   * * Creates an instance of Exists.
   * @param {object|null} [data]
   * @param {string} [data.lang='es']
   * @param {string|null} [data.message=null]
   * @param {array} [data.options=[]]
   * @memberof Exists
   */
  constructor (data = {
    // 
  }) {
    super({
      lang: data.lang ?? config.lang,
      messages: {
        ...Exists.messages,
        custom: data.message ?? null,
      },
      name: Exists.name,
      options: data.options ?? [],
    });
  }

  /**
   * * Validate an Input.
   * @param {Input} input
   * @memberof Exists
   */
  validate (input) {
    if (input.required) {
      if (input.options && input.options.lenght && !input.options.includes(input.model)) {
        this.invalidate(input);
      }
    }
  }

  /**
   * * Returns the Requirement messages.
   * @readonly
   * @static
   * @memberof Exists
   */
  static get messages () {
    return {
      default: {
        en: 'The field should be an existing option',
        es: 'El campo debe ser una opción válida',
      },
    };
  }

  /**
   * * Returns the Requirement name.
   * @readonly
   * @static
   * @memberof Exists
   */
  static get name () {
    return "required";
  }
};