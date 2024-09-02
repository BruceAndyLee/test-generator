<template>
  <div class="split-screen">
    <div class="column-grouping">
      <div v-for="_, group in columnGroups" :key="group" class="group-inputs">
        <div>{{ group }}</div>
        <input v-model="columnGroups[group]" class="group-input" @input="debouncedUpdate">
        <button :id="`delete-${group}-group`" @click="delete columnGroups[group]">x</button>
      </div>
      <div class="add-grouping-btn-container">
        <button v-if="!add_group_mode" @click="add_group_mode = true">+ column phase group</button>
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
      <textarea v-model="userInput" @input="debouncedUpdate" placeholder="Type here..."></textarea>
    </div>
    <div class="textarea-wrapper">
      <div>Generated tests</div>
      <textarea v-model="generatedCode" readonly placeholder="Mirrored input will appear here..."></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { debounce } from 'lodash'; // Import lodash for debouncing
import { genEdgeSuite } from "./lib";
import { sampleTable } from './data';

export default {
  data() {
    return {
      userInput: sampleTable, // Model for the user's input
      generatedCode: '', // Model for the mirrored (read-only) input
      debouncedUpdate: () => { },
      add_group_mode: false,
      newGroupName: "",
      columnGroups: {
        before: "",
        transition: "",
        after: "",
      },
    };
  },
  created() {
    // Create a debounced version of the updateMirroredInput method
    this.debouncedUpdate = debounce(this.updateGeneratedCode, 300);
    this.debouncedUpdate();
  },
  methods: {
    // Method to update the mirrored input with the user's input
    updateGeneratedCode() {
      try {
        const groupedSets = Object.fromEntries(
          Object
            .entries(this.columnGroups)
            .map(([group, values]) => {
              const trimmed_values = values.split(" ").map((value) => value.trim()).filter(value => !!value)
              return [group, new Set(trimmed_values)];
            })
        );
        this.generatedCode = genEdgeSuite(this.userInput, groupedSets);
      } catch (e) {
        // @ts-ignore
        this.generatedCode = e;
      }
    },
    add_group(confirmed: boolean) {
      if (!confirmed) {
        this.newGroupName = '';
        this.add_group_mode = false;
      } else {
        this.columnGroups = {
          ...this.columnGroups,
          [this.newGroupName]: '',
        };
        this.newGroupName = '';
        this.add_group_mode = false;
      }
    },
  },
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
