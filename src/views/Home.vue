<template>
  <section class="home hero is-fullheight-with-navbar">
    <div class="hero-body columns is-centered">
      <div class="column is-half">
        <div class="buttons">
          <router-link
            to="/game"
            class="button is-primary is-large is-rounded is-fullwidth"
          >
            <strong>Start Game</strong>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";

@Options({
  components: {},
})
export default class Home extends Vue {}
</script>

<style scoped></style>
