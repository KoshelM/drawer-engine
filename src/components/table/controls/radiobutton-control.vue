<template>
  <div>
    <div v-for="option in value.options" :key="option.value">
      <input type="radio" v-bind:id="option.value + id" v-bind:value="option.value" v-model="value.selected" />
      <label v-bind:for="option.value + id">{{option.label}}</label>
    </div>
  </div>
</template>>

<script>
import ControlMixin from "./control.mixin";
export default {
  mixins: [ControlMixin],
  created(){
      this.id = Math.random();
  }
};
</script>