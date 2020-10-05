<template>
  <div>
    <label class="upload-label" for="inputfile">{{ label }}</label>
    <input
      type="file"
      name="inputfile"
      ref="inputfile"
      id="inputfile"
      accept="text/xml, application/json"
    />
    <pre id="output"></pre>
  </div>
</template>
<script>
import xmlToJson from "../utils/xmlToJson";
export default {
  props: {
    label: String,
    prepareResults: Function
  },
  mounted() {
    let inputfile = this.$refs.inputfile;
    let self = this;
    inputfile.addEventListener("change", function () {
      let fr = new FileReader();
      let file = this.files[0];

      fr.onload = () => {
        let jsonResult = null;
        if (file.type === "text/xml") {
          let xmlNode = new DOMParser().parseFromString(fr.result, "text/xml");
          jsonResult= xmlToJson(xmlNode).root
          
        } else {
          jsonResult = JSON.parse(fr.result);
        }
        if(self.prepareResults){
          jsonResult = self.prepareResults(jsonResult)
        }

        self.$emit("onFileSelect", jsonResult);
      };

      fr.readAsText(file);
    });
  },
};
</script>
<style scoped>
.upload-label {
  padding-right: 5px;
  width: 150px;
  text-align: start;
  padding-right: 5px;
  width: 100px;
  display: inline-block;
}
</style>