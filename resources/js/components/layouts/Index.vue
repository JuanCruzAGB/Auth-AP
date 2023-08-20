<template>
  <div class="index layout">
    <Header />

    <FloatMenu v-if="showFlags">
      <ul class="list grid gap-2">
        <li class="item">
          <EnvFlag />
        </li>
      </ul>
    </FloatMenu>

    <RouterView />
  </div>
</template>

<script>
  import { mapGetters, } from "vuex";

  import Header from "../Header.vue";
  import EnvFlag from "../flags/Env.vue";
  import FloatMenu from "../menus/Float.vue";

  export default {
    name: 'Index',
    components: {
      EnvFlag,
      FloatMenu,
      Header,
    },
    computed: {
      ...mapGetters([ 'env', ]),
      showFlags () {
        return [ 'development', 'local' ].includes(this.env);
      },
    },
  }
</script>

<style lang="scss" scoped>
  .index.layout {
    display: grid;
    gap: 2rem;

    .float.menu {
      padding: .5rem 0;
      z-index: 2;
    }

    .view {
      @media (min-width: 1024px) {
        width: 25%;
        margin: auto;
      }
    }
  }
</style>