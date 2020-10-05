<template>
  <select v-model="value.selected">
    <option
      v-for="option in value.options"
      v-bind:value="option.value"
      :key="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>
<script>
import ControlMixin from "./control.mixin";
export default {
  mixins: [ControlMixin]
};
</script>
<style scoped>
    select {
        width: 100%;
    }
</style>