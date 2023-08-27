<script setup lang="ts">
import type { PropType } from "vue";
import { Ref, computed, ref } from "vue";
import { WorkflowBlock } from "../types/dataTypes";

const props = defineProps({
  flowBlockList: {
    type: Object as PropType<WorkflowBlock[]>,
    default: [],
  },
});

const emit = defineEmits<{
  (e: "add-block", block: WorkflowBlock): void;
}>();

const searchQuery: Ref<string> = ref("");

const addBlock = (block: WorkflowBlock) => {
  emit("add-block", block);
};

const searchNodes = computed(() => {
  if (searchQuery.value) {
    const regExpQuery = new RegExp(searchQuery.value, "i");
    console.log(props.flowBlockList);
    return props.flowBlockList.filter(
      (node) => regExpQuery.test(node.name) || regExpQuery.test(node.name)
    );
  }
  return props.flowBlockList;
});
</script>

<template>
  <div class="search-bar">
    <div class="search-bar__wrapper">
      <input
        class="search-bar__input"
        v-model="searchQuery"
        type="text"
        placeholder="Add new node..."
      />
      <ul class="search-bar__items-list">
        <li
          class="search-bar__list_item"
          v-for="node in searchNodes"
          :key="node.name"
          :value="node.name"
          @mousedown="addBlock(node)"
        >
          <div>{{ node.name }}</div>
          <img :src="node.image" alt="" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  width: 100%;
  background-color: var(--vt-c-white);
  overflow: hidden;
  display: flex;
  justify-content: center;
  overflow: visible;
  padding: 2rem;
}

.search-bar__wrapper {
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.search-bar__input {
  font-size: 1rem;
  height: 2rem;
  width: 100%;
  border: 1px solid;
  padding: 0.25rem;
  border-radius: 5px;
}
.search-bar__wrapper:focus-within .search-bar__items-list {
  visibility: visible;
}

.search-bar__items-list {
  list-style: none;
  margin: 0;
  width: 100%;
  background-color: var(--vt-c-white);
  display: block;
  position: absolute;
  top: 100%;
  visibility: hidden;
  z-index: 100;
  max-height: 200px;
}

.search-bar__items-list:hover {
  cursor: pointer;
}

.search-bar__list_item {
  font-size: 1rem;
  border: 1px solid var(--vt-c-white-mute);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1px;
  z-index: 100;
}

img {
  height: 40px;
  width: 40px;
}
</style>
