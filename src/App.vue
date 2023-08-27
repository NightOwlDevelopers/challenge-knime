<script setup lang="ts">
import "./index.css";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="router-wrapper">
    <RouterView />
  </div>
</template>

<style>
.router-wrapper {
  width: 100%;
}
.main {
  max-width: var(--max-width);
  width: 100%;
  padding-top: var;
  margin: 0 auto;
}
</style>
