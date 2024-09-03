<script setup lang="ts">
import { onMounted, provide, ref } from 'vue';
import TestGeneratorPage from './components/test-generator-page.vue';
const selectedGeneratorType = ref("edge");

const LOCAL_STORAGE_ITEM_KEY = "last-generator-type";

onMounted(() => {
  selectedGeneratorType.value = localStorage.getItem(LOCAL_STORAGE_ITEM_KEY) ?? "vertex";
})

const generatorTypes = [
  { name: "Vertex tests", value: "vertex" },
  { name: "Edge tests", value: "edge" },
  { name: "Fixture trees", value: "fixture", disabled: true },
]

const onSelectGeneratorType = (val: string) => {
  selectedGeneratorType.value = val;
  localStorage.setItem(LOCAL_STORAGE_ITEM_KEY, val);
};

provide("generatorType", selectedGeneratorType);
</script>

<template>
  <header>
    <div v-for="generatorType of generatorTypes" :key="generatorType.value"
      @click="onSelectGeneratorType(generatorType.value)" class="generator-type"
      :class="{ active: selectedGeneratorType === generatorType.value }" :disabled="!!generatorType.disabled">
      {{ generatorType.name }}
    </div>
  </header>
  <main>
    <TestGeneratorPage />
  </main>
</template>

<style scoped>
header {
  background-color: #1278d2;
  height: 48px;
  padding: 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  gap: 32px;
}

.generator-type {
  padding: 0 6px;
  border-radius: 4px;
  transition: all .1s ease-in-out;
  cursor: pointer;
}

.generator-type:hover {
  background-color: #f5f5f522;
}

.generator-type.active {
  background-color: #f5f5f5;
  color: black;
}

main {
  padding: 2rem;
}
</style>
