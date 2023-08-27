import Vue from "vue";
import Vuex, { createStore } from "vuex";
import workflow from "./modules/workflow";

export const store = createStore({
  modules: {
    workflow,
  },
});
