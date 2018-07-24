import Vue from "vue";
import principal from "./components/principal";
import rotas from "./routes";

Vue.component("principal", principal);

// eslint-disable-next-line no-new
new Vue({
  el: "#app",
  rotas,
  components: principal
});
