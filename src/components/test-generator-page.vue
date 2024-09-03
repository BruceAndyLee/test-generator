<template>
  <div class="split-screen">
    <div class="column-grouping">
      <div v-for="group in groupsByGeneratorType[generatorType]" :key="group" class="group-inputs">
        <div>{{ group }}</div>
        <input v-model="columnGroups[group]" class="group-input" @input="debouncedUpdate">
        <button :id="`delete-${group}-group`" @click="delete columnGroups[group]">x</button>
      </div>
      <div class="add-grouping-btn-container">
        <button v-if="!add_group_mode" @click="add_group_mode = true">+ column group</button>
        <div v-else>
          <div>New group: {{ newGroupName }}</div>
          <input v-model="newGroupName" class="group-input">
          <button @click="add_group(true)">✓</button>
          <button @click="add_group(false)"> x </button>
        </div>
      </div>
    </div>

    <div class=" textarea-wrapper">
      <div>your .md table</div>
      <textarea v-model="userInput" @input="debouncedUpdate" placeholder="Type here..." />
    </div>
    <div class="textarea-wrapper">
      <div>Generated tests</div>
      <textarea v-model="generatedCode" readonly placeholder="Mirrored input will appear here..." />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash'; // Import lodash for debouncing
import { genVertexSuite } from "@/lib/gen-vertex-tests";
import { genEdgeSuite } from "@/lib/gen-edge-tests";
import { vertexSampleTable, edgeSampleTable } from './data';
import { inject, ref, onMounted, watch } from 'vue';
import type { Ref } from 'vue';

type GeneratorSetup = { method: (...args: any[]) => string, sampleTable?: string };

const generatorConfigs: Record<string, GeneratorSetup> = {
  vertex: {
    method: genVertexSuite,
    sampleTable: vertexSampleTable
  },
  edge: {
    method: genEdgeSuite,
    sampleTable: edgeSampleTable,
  },
  fixture: {
    method: () => { return ""; },
  },
}

type TestType = "vertex" | "edge" | "fixture";

const generatorType = inject("generatorType") as Ref<TestType>;

const userInput = ref(edgeSampleTable); // Model for the user's input
const generatedCode = ref(''); // Model for the mirrored (read-only) input
const headers = ref<string[]>([])
const debouncedUpdate = ref(() => { });
const add_group_mode = ref(false);
const newGroupName = ref("");
const columnGroups = ref({
  setup: "",
  transition: "",
  gql_spec: "",
  elements: "",
});

const groupsByGeneratorType: Record<TestType, string[]> = {
  vertex: ["setup", "elements"],
  edge: ["setup", "transition", "elements"],
}

onMounted(() => {
  debouncedUpdate.value = debounce(updateGeneratedCode, 300);
  debouncedUpdate.value();
})

watch(
  generatorType,
  () => {
    userInput.value = generatorConfigs[generatorType.value].sampleTable ?? "";
    debouncedUpdate.value();
  },
)

const updateGeneratedCode = () => {
  try {
    const groupedSets: Record<string, Set<string>> = Object.fromEntries(
      Object
        .entries(columnGroups.value)
        .map(([group, values]) => {
          const trimmed_values = values
            .split(" ")
            .map((value: string) => value.trim())
            .filter((value: string) => !!value)
          return [group, new Set(trimmed_values)];
        })
    );
    if (generatorType.value === "edge") {
      [generatedCode.value, headers.value] = genEdgeSuite(userInput.value, groupedSets);

    } else if (generatorType.value === "vertex") {
      [generatedCode.value, headers.value] = genVertexSuite(userInput.value, groupedSets);
    }
    console.log(generatedCode.value);
  } catch (e) {
    // @ts-ignore
    userInput.value = e;
  }
};
const add_group = (confirmed: boolean) => {
  if (!confirmed) {

    newGroupName.value = '';

    add_group_mode.value = false;
  } else {

    columnGroups.value = {
      ...columnGroups.value,
      [newGroupName.value]: '',
    };

    newGroupName.value = '';

    add_group_mode.value = false;
  }
};
</script>

<style scoped>
.split-screen {
  display: flex;
  height: 100vh;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
  align-items: stretch;
  gap: 16px;
}

textarea {
  font-size: 10px !important;
  width: 850px;
  height: 100%;
  border: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
  font-size: 16px;
  resize: none;
}

textarea[readonly] {
  width: 600px;
  background-color: #f9f9f9;
}
</style>
