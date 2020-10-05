<template>
  <div id="app">
    <div class="upload">
    <FileControl :label="'Mapping'"/>
    <FileControl :label="'Source Data'"/>
    </div>
    <div class="tables">
      <h1>Table 1</h1>
      <Table></Table>
      <h1>Table 2</h1>
      <Table></Table>
    </div>
    <AddControl></AddControl>
  </div>
</template>

<script>
import Table from "./components/table";
import AddControl from "./components/add-control";
import mapping from "./input/mapping";
import sourceData from "./input/sourceData";
import FileControl from './components/file-control'
import { mapMutations } from "vuex";

export default {
  name: "App",
  components: {
    Table,
    AddControl,
    FileControl
  },
  created() {
    this.setSourceData(sourceData);
    this.setMapping(mapping);
  },
  methods: {
    ...mapMutations(['setSourceData', 'setMapping']),
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
  display: flex;
  flex-direction: column;
  align-items: center;
}


</style>
