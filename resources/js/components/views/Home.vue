<template>
  <main class="home view">
    <div class="view-body">
      <div class="view-container">
        <form action="/in"
          method="POST"
          @submit.prevent="submit">
          <input name="_token"
            type="hidden"
            :value="inputs.csrf_token.model" />

          <input name="_method"
            type="hidden"
            :value="inputs.method.model" />

          <Input :input="inputs.email"
            name="email"
            placeholder="Correo"
            type="text" />

          <Input :input="inputs.password"
            name="password"
            placeholder="Contraseña"
            type="password" />

          <div class="flex justify-center">
            <button class="btn btn-solid btn-maroon"
              :disabled="!valid">
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
  import { mapGetters, } from "vuex";

  import Input from "../Input.vue";

  export default {
    name: 'Home',
    components: {
      Input,
    },
    data () {
      return {
        inputs: {
          csrf_token: new this._provided.objects
            .input({
              requirements: 'required',
            }),
          email: new this._provided.objects
            .input({
              requirements: 'required|mail',
            }),
          method: new this._provided.objects
            .input({
              model: 'POST',
              requirements: 'required',
            }),
          password: new this._provided.objects
            .input({
              requirements: 'required',
            }),
        },
      };
    },
    computed: {
      ...mapGetters([ 'errors', ]),
      formData () {
        let formData = [
          // 
        ];

        Object.values(this.inputs)
          .map(input => {
            formData.push(input.model);
          });

        return formData;
      },
      valid () {
        return !Object.values(this.inputs)
          .some(input => input.invalid);
      },
    },
    methods: {
      submit (event) {
        if (this.valid) {
          event.target.submit();
        }
      },
    },
    beforeMount () {
      this.inputs.csrf_token.model = document.querySelector('meta[name=csrf_token]').content;

      this.inputs.csrf_token.validate();

      if (Object.keys(errors).length) {
        Object.keys(errors)
          .map(name => {
            this.inputs[name].invalid = true;

            this.inputs[name].error = errors[name].pop();
          });
      }
    },
  }
</script>

<style lang="scss" scoped>
  .home.view {
    .view-body {
      .view-container {
        form {
          display: grid;
          gap: 2rem;
          padding-inline: 2rem;
          @media (min-width: 1024px) {
            padding-inline: 0;
          }
        }
      }
    }
  }
</style>