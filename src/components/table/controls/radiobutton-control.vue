<template>
  <div>
    <div v-for="option in value.options" :key="option.value">
      <input type="radio" v-bind:id="option.value" v-bind:value="option.value" v-model="value.selected" />
      <label v-bind:for="option.value">{{option.label}}</label>
    </div>
  </div>
</template>>

<script>
import ControlMixin from "./control.mixin";
export default {
  mixins: [ControlMixin]
};
</script>