import config from "./conf.json";
import Input from "./Input.js";

/**
 * * Controls the Requirement.
 * @export
 * @class Requirement
 */
export default class Requirement {
  /**
   * * Creates an instance of Requirement.
   * @param {object|null} [data]
   * @param {string} [data.lang='es']
   * @param {object|null} [data.messages=null]
   * @param {string} [data.name='required']
   * @param {array} [data.params={}]
   * @memberof Requirement
   */
  constructor (data = {
    // 
  }) {
    let props = {
      ...Requirement.props,
      ...data,
    };

    for (const key in props) {
      if (Object.hasOwnProperty.call(props, key)) {
        const value = props[key];

        this[key] = value;
      }
    }
  }

  /**
   * * Returns the Requirement message.
   * @readonly
   * @return {string|null}
   * @memberof Requirement
   */
  get message () {
    if (this.messages) {
      if (this.messages.custom) {
        return this.messages.custom;
      }

      if (this.messages.default) {
        return this.messages.default[this.lang];
      }
    }

    return null;
  }

  /**
   * * Invalidate an Input.
   * @param {Input} input
   * @memberof Requirement
   */
  invalidate (input) {
    input.invalid = this.name;

    input.error = this.message;
  }

  /**
   * * Returns the default properties.
   * @readonly
   * @static
   * @memberof Requirement
   */
  static get props () {
    return {
      lang: config.lang,
      messages: null,
      name: 'required',
      params: {
        // 
      },
    };
  }
};