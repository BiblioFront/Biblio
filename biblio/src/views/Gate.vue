<template>
  <div class="container">
    <Nav />
  </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";
import Nav from "@/components/Nav.vue";

@Options({
  components: {
    Nav,
  },
})
export default class Home extends Vue {}
</script>

<style>
@import "../assets/css/global.css";
@import "../assets/css/gate.css";
</style>
