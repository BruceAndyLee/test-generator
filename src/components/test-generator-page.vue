<template>
  <div class="split-screen">
    <div class="column-grouping">
      <div v-for="group in groupsByGeneratorType[generatorType]" :key="group" class="group-inputs">
        {{ group }}
        <!-- <div class="group-content-input">
          <div>{{ group }}</div>
          <input v-model="columnGroups[group]" class="group-input" @input="debouncedUpdate">
          <button :id="`delete-${group}-group`" @click="delete columnGroups[group]">x</button>
        </div> -->
        <div class="header-options">
          <input type="checkbox" v-model="columnGroups[group].all" @input="debouncedUpdate"
            @update:model-value="on_toggle_all(group)"> all
          <div class="header-option" v-for="header of columns" :key="`${group}-${header}`">
            <input type="checkbox" v-model="columnGroups[group][header]" @input="debouncedUpdate"> {{ header }}
          </div>
        </div>
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

type GeneratorSetup = { method?: (...args: any[]) => string, sampleTable?: string };

const generatorConfigs: Record<string, GeneratorSetup> = {
  vertex: {
    sampleTable: vertexSampleTable
  },
  edge: {
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
const columns = ref<string[]>([]);

const debouncedUpdate = ref(() => { });
const add_group_mode = ref(false);
const newGroupName = ref("");

const DEFAULT_GROUPS = {
  setup: {
    all: false,
  },
  transition: {
    all: false,
  },
  edge: {
    all: false,
  },
  gql_spec: {
    all: false,
  },
  elements: {
    all: false,
  },
  "v-A": {
    all: false,
  },
  "v-B": {
    all: false,
  },
};
const columnGroups = ref(DEFAULT_GROUPS);

const groupsByGeneratorType: Record<TestType, (keyof typeof DEFAULT_GROUPS)[]> = {
  vertex: ["setup", "elements"],
  edge: ["v-A", "edge", "v-B"],
  fixture: [],
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

const addColumnKeys = () => {
  for (const group in columnGroups.value) {
    for (const column of columns.value) {
      if (column in columnGroups.value[group]) continue;
      columnGroups.value[group] = {
        ...columnGroups.value[group],
        [column]: false,
      }
    }
  }
};

const getEnabledColumnGroups = (): Record<string, Set<string>> => {
  return Object.fromEntries(
    Object
      .entries(columnGroups.value)
      .map(([group, values]) => {
        const trimmed_values = Object.entries(values)
          .filter(([, value]) => !!value)
          .map(([header]) => (header as string).trim().replaceAll(" ", "_").replaceAll("-", "_"))
        return [group, new Set(trimmed_values)];
      })
  );
};

const updateGeneratedCode = () => {
  const enabledColumnGroups = getEnabledColumnGroups();
  try {
    const generator = generatorType.value === "edge" ? genEdgeSuite : genVertexSuite;
    console.log("enabledColumnGroups", enabledColumnGroups);
    [generatedCode.value, columns.value] = generator(userInput.value, enabledColumnGroups);
    addColumnKeys();
    // console.log(generatedCode.value);
  } catch (e) {
    // @ts-ignore
    userInput.value = e;
  }
};

const on_toggle_all = (group) => {
  console.log("toggling group", group);
  console.log("groups", columnGroups.value);
  const value_for_group = columnGroups.value[group].all;

  for (const header in columnGroups.value[group]) {
    columnGroups.value[group][header] = value_for_group;
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
