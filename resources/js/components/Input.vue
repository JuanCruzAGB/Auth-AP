<template>
  <label class="form-group"
    :class="{
      focus,
      invalid: input.error,
    }">
    <div v-if="showLabel || label">
      {{ labelText }}:

      <span v-if="required"
        class="required">
        *
      </span>
    </div>

    <div class="form-input">
      <input class="input"
        :disabled="disabled"
        :name="name"
        :placeholder="placeholder"
        :readonly="readonly"
        :type="symbolicType"
        v-model="input.model"
        @blur="onBlur"
        @focus="onFocus"
        @input="onInput" />

      <template v-if="type == 'password'">
        <button class="btn btn-icon btn-maroon"
          @click.prevent="changeType">
          <i v-if="symbolicType == 'password'"
            class="fa-solid fa-eye"></i>

          <i v-else
            class="fa-solid fa-eye-slash"></i>
        </button>
      </template>
    </div>

    <div v-if="input.error && typeof input.error == 'string'"
      class="error">
      {{ input.error }}
    </div>
  </label>
</template>

<script>
  export default {
    name: 'Input',
    props: {
      disabled: {
        default: false,
        required: false,
      },
      input: {
        required: true,
      },
      label: {
        default: false,
        required: false,
      },
      name: {
        required: true,
        type: String,
      },
      placeholder: {
        default: false,
        required: false,
      },
      readonly: {
        default: false,
        required: false,
      },
      showLabel: {
        default: false,
        required: false,
      },
      type: {
        default: 'text',
        required: false,
        type: String,
      },
    },
    data () {
      return {
        focus: false,
        symbolicType: this.type,
      };
    },
    computed: {
      labelText () {
        if (this.showLabel || this.label) {
          if (this.label)
            return this.label;

          if (this.placeholder)
            return this.placeholder;
        }

        return '';
      },
      required () {
        return Object.keys(this.input._requirements)
          .includes('required');
      },
      valid () {
        return !this.input.invalid;
      },
    },
    methods: {
      changeType () {
        switch (this.symbolicType) {
          case 'password':
            this.symbolicType = 'text';

            break;

          default:
            this.symbolicType = 'password';

            break;
        }
      },
      onBlur () {
        this.focus = false;

        this.$emit('blur');

        this.input.validate();
      },
      onChange () {
        this.$emit('change');

        this.input.validate();
      },
      onClose () {
        this.$emit('close');
      },
      onFocus () {
        this.focus = true;

        this.$emit('focus');
      },
      onInput () {
        this.$emit('input', this.input.model);
      },
      onOpen () {
        this.$emit('open');
      },
    },
    watch: {
      type () {
        this.symbolicType = this.type;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .form-group {
    display: grid;
    gap: 1rem;

    .required {
      color: var(--maroon, maroon);
    }

    .form-input {
      display: flex;
      align-items: center;
      width: 100%;
      border-radius: .25rem;
      border: 2px solid var(--lightgrey, lightgrey);
      background-color: var(--lightgrey, lightgrey);

      .input {
        width: 100%;
        min-height: 3rem;
        padding: .5rem 1rem;
        background-color: transparent;
        border: none;
        color: var(--black, black);
        font-family: var(--work-sans, sans-serif);
        &:focus {
          outline: none;
        }

        &::placeholder {
          color: var(--grey, grey);
          font-family: var(--work-sans, sans-serif);
        }
      }
    }
    &.focus {
      .form-input {
        border-color: var(--maroon, maroon);
      }
    }

    &.invalid {
      .form-input {
        border-color: var(--red, red);
      }
    }

    .error {
      color: var(--red, red);
    }
  }
</style>