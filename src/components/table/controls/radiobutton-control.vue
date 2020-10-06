<template>
  <div>
    <div v-for="option in value.options" :key="option.value">
      <input type="radio" v-bind:value="option.value" v-model="value.selected" />
      <label >{{option.label}}</label>
    </div>
  </div>
</template>>

<script>
import ControlMixin from "./control.mixin";
export default {
  mixins: [ControlMixin]
};
</script>