<template>
  <div>
    <table>
      <tbody>
        <tr v-for="rowIndex in dataBoundary.maxRowIndex" :key="rowIndex">
          <td
            v-for="columnIndex in dataBoundary.maxColumnIndex"
            :key="columnIndex"
          >
            <ControlWrapper :control="getFieldMapping(rowIndex, columnIndex)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import ControlWrapper from "../components/controls/controlWrapper";
import { mapGetters } from "vuex";

export default {
  components: {
    ControlWrapper,
  },
  computed: {
    ...mapGetters(['getFieldMapping', 'dataBoundary']),
  },
};
</script>
<style scoped>
table {
  margin: 0 auto;
}
td {
  border: 1px solid red;
}
</style>