import config from "./conf.json";
import Requirement from "./Requirement.js";
import Exists from "./requirements/Exists.js";
import Length from "./requirements/Length.js";
import Mail from "./requirements/Mail.js";
import Max from "./requirements/Max.js";
import Min from "./requirements/Min.js";
import Nullable from "./requirements/Nullable.js";
import Number from "./requirements/Number.js";
import Phone from "./requirements/Phone.js";
import RegEx from "./requirements/RegEx.js";
import Required from "./requirements/Required.js";

/**
 * * Creates a Requirement.
 * @param {string} requirement
 * @param {Input} input
 * @return {Requirement}
 */
function createRequirement (requirement, input) {
  let name = requirement.split(':')[0]
    .toLowerCase();

  let aux = requirement.split(':')[1] ?? '';

  if (aux) {
    aux = aux.split(',');
  }

  let params = {
    // 
  };

  switch (name) {
    case 'exists':
      return new Exists({
        lang: input.lang,
        message: input.messages[name] ?? null,
        options: input.options,
      });

    case 'length':
      params = {
        ...Length.params,
      };

      if (aux) {
        Object.keys(params)
          .map((name, key) => {
            params[name] = aux[key];
          });
      }

      return new Length({
        lang: input.lang,
        params,
        message: input.messages[name] ?? null,
      });

    case 'mail':
      params = {
        ...Mail.params,
      };

      if (aux) {
        Object.keys(params)
          .map((name, key) => {
            params[name] = aux[key];
          });
      }

      return new Mail({
        lang: input.lang,
        params,
        message: input.messages[name] ?? null,
      });

    case 'max':
      params = {
        ...Max.params,
      };

      if (aux) {
        Object.keys(params)
          .map((name, key) => {
            params[name] = aux[key];
          });
      }

      return new Max({
        lang: input.lang,
        params,
        message: input.messages[name] ?? null,
      });

    case 'min':
      params = {
        ...Min.params,
      };

      if (aux) {
        Object.keys(params)
          .map((name, key) => {
            params[name] = aux[key];
          });
      }

      return new Min({
        lang: input.lang,
        params,
        message: input.messages[name] ?? null,
      });

    case 'nullable':
      return new Nullable();

    case 'number':
      params = {
        ...Number.params,
      };

      if (aux) {
        Object.keys(params)
          .map((name, key) => {
            params[name] = aux[key];
          });
      }

      return new Number({
        lang: input.lang,
        params,
        message: input.messages[name] ?? null,
      });

    case 'phone':
      params = {
        ...Phone.params,
      };

      if (aux) {
        Object.keys(params)
          .map((name, key) => {
            params[name] = aux[key];
          });
      }

      return new Phone({
        lang: input.lang,
        message: input.messages[name] ?? null,
        params,
      });

    case 'regex':
    case 'regexp':
      params = {
        ...RegEx.params,
      };

      if (aux) {
        Object.keys(params)
          .map((name, key) => {
            params[name] = aux[key];
          });
      }

      return new RegEx({
        lang: input.lang,
        message: input.messages[name] ?? null,
        params,
      });

    case 'required':
      return new Required({
        lang: input.lang,
        message: input.messages[name] ?? null,
      });

    default:
      console.warn(`The Requirement "${ name }" does not exists yet`);

      break;
  }
}

/**
 * * Controls the Input.
 * @export
 * @class Input
 */
export default class Input {
  /**
   * * Creates an instance of Input.
   * @param {object|null} [data]
   * @param {string|null} [data.error=null]
   * @param {string|true} [data.invalid=true]
   * @param {string} [data.lang='es']
   * @param {array} [data.messages=[]]
   * @param {*} [data.model=null]
   * @param {boolean} [data.required=true]
   * @param {array|string} [data.requirements=[]]
   * @memberof Input
   */
  constructor (data = {
    // 
  }) {
    let props = {
      ...Input.props,
      ...data,
    };

    for (const key in props) {
      if (Object.hasOwnProperty.call(props, key)) {
        const value = props[key];

        this[key] = value;
      }
    }

    if (this.model) {
      this.validate();
    }
  }

  /**
   * * Saves the Input Requirements.
   * @memberof Input
   */
  set requirements (string) {
    if (string) {
      if (!this._requirements) {
        this._requirements = {
          // 
        };
      }

      string.split('|')
        .map(requirement => {
          if (!this.model && requirement == Nullable.name) {
            this.error = null;

            this.invalid = false;
          }

          let name = requirement.split(':')[0]
            .toLowerCase();

          this._requirements[name] = createRequirement(requirement, this);
        });
    }
  }

  /**
   * * Validates the Input.
   * @memberof Input
   */
  validate () {
    this.error = null;

    this.invalid = false;

    Object.values(this._requirements)
      .map(requirement => {
        if (!this.invalid) {
          requirement.validate(this);
        }
      });
  }

  /**
   * * Returns the default properties.
   * @readonly
   * @static
   * @memberof Input
   */
  static get props () {
    return {
      error: null,
      invalid: true,
      lang: config.lang,
      messages: [
        // 
      ],
      model: null,
      required: true,
      requirements: [
        // 
      ],
    };
  }
};