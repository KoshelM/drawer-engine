<template>
  <component
    v-if="control"
    :is="control.controlType + '-control'"
    :fieldToBind="control.fieldToBind"
  ></component>
</template>


<script>
import TextboxControl from "./textbox-control"
import RadiobuttonControl from "./radiobutton-control"
import ComboboxControl from "./combobox-control"

export default {
  components: {
    TextboxControl,
    RadiobuttonControl,
    ComboboxControl
  },
  props: ['control']
};
</script>