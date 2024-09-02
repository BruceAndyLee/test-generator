<script setup lang="ts">
import { provide, ref } from 'vue';
import TestGeneratorPage from './components/test-generator-page.vue';
const selectedGeneratorType = ref("edge");

const generatorTypes = [
  { name: "Vertex tests", value: "vertex" },
  { name: "Edge tests", value: "edge" },
  { name: "Fixture trees", value: "fixture" },
]

provide("generatorType", selectedGeneratorType)
</script>

<template>
  <header>
    <div v-for="generatorType of generatorTypes" :key="generatorType.value"
      @click="selectedGeneratorType = generatorType.value" class="generator-type"
      :class="{ active: selectedGeneratorType === generatorType.value }">
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
