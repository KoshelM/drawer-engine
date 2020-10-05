<template>
  <div id="app">
    <div
      class="upload"
      v-if="!Object.keys(sourceData).length || !Object.keys(mapping).length"
    >
      <FileControl @onFileSelect="setMapping" :prepareResults="prepareResults" :label="'Mapping'" />
      <FileControl @onFileSelect="setSourceData" :prepareResults="prepareResults" :label="'Source Data'" />
    </div>
    <div class="content" v-else>
      <div class="tables">
        <h1>Table 1</h1>
        <Table></Table>
        <h1>Table 2</h1>
        <Table></Table>
      </div>
      <AddControl></AddControl>
    </div>
  </div>
</template>

<script>
import Table from "./components/table/table";
import AddControl from "./components/add-control";
import FileControl from "./components/file-control";
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Table,
    AddControl,
    FileControl,
  },
  computed: {
    ...mapGetters(["sourceData", "mapping"]),
  },
  methods: {
    ...mapMutations(["setSourceData", "setMapping"]),
    prepareResults(jsonResult) {
      delete jsonResult["#text"];
      return jsonResult.element || jsonResult;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
