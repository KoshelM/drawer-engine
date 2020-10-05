<template>
  <div class="new-control">
    <h1>New Control:</h1>
    <div class="wrapper">
      <div class="field">
        <label for="content-type">Control Type</label>
        <div class="field-value-wrapper">
          <select id="content-type" class="field-value" v-model="controlType" :class="{ invalid: $v.controlType.$dirty && !$v.controlType.required }">
            <option v-for="controlType in controlTypes" :key="controlType">
              {{ controlType }}
            </option>
          </select>
          <div class="helper-text invalid" v-if="$v.controlType.$dirty && !$v.controlType.required">
            This field is requireds
          </div>
        </div>
      </div>
      <div class="field">
        <label for="row">Row</label>
        <div class="field-value-wrapper">
          <input id="row" class="field-value" type="text" 
            v-model="rowIndex" 
            :class="{ invalid: $v.rowIndex.$dirty && (!$v.rowIndex.required || !$v.rowIndex.between) }" />
          <div class="helper-text invalid"  v-if="$v.rowIndex.$dirty && !$v.rowIndex.required">
            This field is requireds
          </div>
          <div class="helper-text invalid" v-if="$v.rowIndex.$dirty && !$v.rowIndex.between">
            Must be between {{$v.rowIndex.$params.between.min}} and {{$v.rowIndex.$params.between.max}}
          </div>
        </div>
      </div>
      <div class="field">
        <label for="column">Column</label>
        <div class="field-value-wrapper">
          <input id="column" class="field-value" type="text" 
            v-model="columnIndex" 
            :class="{ invalid: $v.columnIndex.$dirty && (!$v.columnIndex.required || !$v.columnIndex.between) }" />
          <div class="helper-text invalid"  v-if="$v.columnIndex.$dirty && !$v.columnIndex.required">
            This field is requireds
          </div>
          <div class="helper-text invalid" v-if="$v.columnIndex.$dirty && !$v.columnIndex.between">
            Must be between {{$v.columnIndex.$params.between.min}} and {{$v.columnIndex.$params.between.max}}
          </div>
        </div>
      </div>
      <div class="field">
        <label for="fieldToBind">Field to bind</label>
        <div class="field-value-wrapper">
          <select id="content-type" class="field-value" v-model="fieldToBind" :class="{ invalid: $v.fieldToBind.$dirty && !$v.fieldToBind.required}">
            <option v-for="fieldToBind in fieldsToBind" :key="fieldToBind">
              {{ fieldToBind }}
            </option>
          </select>
          <div class="helper-text invalid" v-if="$v.fieldToBind.$dirty && !$v.fieldToBind.required">
            This field is requireds
          </div>
        </div>
      </div>
    </div>
    <button class="add-control-btn" @click="onClick()">Add control</button>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
import { required, between } from "vuelidate/lib/validators";
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
  validations: {
    rowIndex: { required, between: between(1, 1000) },
    columnIndex: { required, between: between(1, 1000) },
    fieldToBind: { required },
    controlType: { required },
  },
  methods: {
    ...mapMutations(["addControl"]),
    onClick() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      this.addControl({
        rowIndex: this.rowIndex,
        columnIndex: this.columnIndex,
        fieldToBind: this.fieldToBind,
        controlType: this.controlType,
      });
    },
  },
  computed: {
    ...mapGetters(["sourceData"]),
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

.field-value-wrapper {
  width: 100%;
}
.field .field-value {
  width: 100%;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
}

.field .field-value.invalid {
  border: 1px solid red;
}

.helper-text.invalid {
  color: red;
  font-size: 12px;
  text-align: left;
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