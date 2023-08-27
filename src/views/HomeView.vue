<script setup lang="ts">
import Workflow from "../components/Workflow.vue";
import SearchBar from "../components/SearchBar.vue";
import { Ref, onMounted, ref } from "vue";
import { WorkflowBlock } from "../types/dataTypes";
import { useStore } from "vuex";
import { workflowBlocksMock } from "../dataMock";

onMounted(() => {
  workflowBlocks.value = workflowBlocksMock;
});

const workflowBlocks: Ref<WorkflowBlock[]> = ref([]);
const store = useStore();

const addBlockHandler = (block: WorkflowBlock) => {
  store.dispatch("workflow/addBlock", block);
};
</script>
<template>
  <main class="main">
    <SearchBar :flowBlockList="workflowBlocks" @add-block="addBlockHandler" />
    <Workflow />
  </main>
</template>

<style scoped>
.main {
  padding: 0 1rem 1rem 1rem;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
</style>
