<template>
  <div class="new-control">
    <h1>New Control:</h1>
    <div class="wrapper">
      <div class="field">
        <label for="content-type">Control Type</label>
        <select id="content-type" class="field-value" v-model="controlType">
          <option v-for="controlType in controlTypes" :key="controlType">
            {{ controlType }}
          </option>
        </select>
      </div>
      <div class="field">
        <label for="row">Row</label>
        <input id="row" class="field-value" type="text" v-model="rowIndex" />
      </div>
      <div class="field">
        <label for="column">Column</label>
        <input
          id="column"
          class="field-value"
          type="text"
          v-model="columnIndex"
        />
      </div>
      <div class="field">
        <label for="fieldToBind">Field to bind</label>
        <select class="field-value" v-model="fieldToBind">
          <option
            v-for="option in fieldsToBind"
            v-bind:value="option"
            :key="option"
          >
            {{ option }}
          </option>
        </select>
      </div>
    </div>
    <button
      class="add-control-btn"
      @click="addControl({ rowIndex, columnIndex, fieldToBind, controlType })"
    >
      Add control
    </button>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      rowIndex: null,
      columnIndex: null,
      fieldToBind: null,
      fieldsToBind: [],
      controlType: null,
      controlTypes: ["textbox", "radiobutton", "combobox"],
    };
  },
  methods: {
    ...mapMutations(['addControl']),
  },
  computed: {
    ...mapGetters(['sourceData']),
  },
  watch: {
    controlType(val) {
      let fields = {
        complexField: [],
        simpleFields: [],
      };
      for (let dataKey in this.sourceData) {
        const dataValue = this.sourceData[dataKey];
        if (dataValue.options) {
          fields.complexField.push(dataKey);
        } else {
          fields.simpleFields.push(dataKey);
        }
      }

      switch (val) {
        case "radiobutton":
        case "combobox":
          this.fieldsToBind = fields.complexField;
          break;
        default:
          this.fieldsToBind = fields.simpleFields;
          break;
      }
    },
  },
};
</script>
<style scoped>
.new-control {
  width: 500px;
  display: flex;
  flex-direction: column;
}

.wrapper .field {
  display: flex;
  padding-bottom: 5px;
}

.field .field-value {
  width: 100%;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
}

.field label {
  width: 150px;
  flex-shrink: 0;
  text-align: start;
}

.add-control-btn {
  width: 100px;
  align-self: flex-end;
  margin-top: 10px;
}
</style>