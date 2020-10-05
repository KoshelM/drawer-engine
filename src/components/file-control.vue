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
export default {
  props: {
    label: String,
  },
  mounted() {
    let inputfile = this.$refs.inputfile;
    let self = this;
    inputfile.addEventListener("change", function () {
      var fr = new FileReader();
      let file = this.files[0];

      fr.onload = () => {
        if (file.type === "text/xml") {
          var XmlNode = new DOMParser().parseFromString(fr.result, "text/xml");

          console.log(self.xmlToJson(XmlNode));
        } else {
          console.log(fr.result);
        }
      };

      fr.readAsText(file);
    });
  },
  methods: {
    xmlToJson(xml) {
      // Create the return object
      var obj = {};

      if (xml.nodeType == 1) {
        // element
        // do attributes
        if (xml.attributes.length > 0) {
          obj["@attributes"] = {};
          for (var j = 0; j < xml.attributes.length; j++) {
            var attribute = xml.attributes.item(j);
            obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
          }
        }
      } else if (xml.nodeType == 3) {
        // text
        obj = xml.nodeValue;
      }

      // do children
      // If all text nodes inside, get concatenated text from them.
      var textNodes = [].slice.call(xml.childNodes).filter(function (node) {
        return node.nodeType === 3;
      });
      if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
        obj = [].slice.call(xml.childNodes).reduce(function (text, node) {
          return text + node.nodeValue;
        }, "");
      } else if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
          var item = xml.childNodes.item(i);
          var nodeName = item.nodeName;
          if (typeof obj[nodeName] == "undefined") {
            obj[nodeName] = this.xmlToJson(item);
          } else {
            if (typeof obj[nodeName].push == "undefined") {
              var old = obj[nodeName];
              obj[nodeName] = [];
              obj[nodeName].push(old);
            }
            obj[nodeName].push(this.xmlToJson(item));
          }
        }
      }
      return obj;
    },
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