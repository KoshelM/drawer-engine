import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        mapping: [],
        sourceData: {}
    },
    mutations: {
        setMapping(state, mapping) {
            state.mapping = mapping;
        },
        setSourceData(state, data) {
            state.sourceData = data;
        },
        addControl(state, { rowIndex, columnIndex, controlType, fieldToBind }) {
            rowIndex = Number(rowIndex)
            columnIndex = Number(columnIndex)

            const newColumn = {
                rowIndex: rowIndex,
                columnIndex: columnIndex,
                controlType,
                fieldToBind
            }

            const column = state.mapping.find(x => x.rowIndex === rowIndex && x.columnIndex === columnIndex)

            if (column)
                Object.assign(column, newColumn)
            else
                state.mapping.push(newColumn)
        },
        setFieldValue(state, {fieldToBind, newValue}){
            state.sourceData[fieldToBind] = newValue
        }
    },
    getters: {
        sourceData(state) {
            return state.sourceData
        },
        mapping(state) {
            return state.mapping
        },
        getFieldValue: (state) => (fieldToBind) => {
            return state.sourceData[fieldToBind]
        },
        dataBoundary(state) {
            let maxRowIndex = 0
            let maxColumnIndex = 0

            state.mapping && state.mapping.length && state.mapping.map(m => {
                if (m.rowIndex > maxRowIndex)
                    maxRowIndex = Number(m.rowIndex)
                if (m.columnIndex > maxColumnIndex)
                    maxColumnIndex = Number(m.columnIndex)
            })

            return {
                maxRowIndex,
                maxColumnIndex
            }
        },
        getFieldMapping(state) {
            return (rowIndex, columnIndex) => {
                return state.mapping.find(x => { return Number(x.rowIndex) === rowIndex && Number(x.columnIndex) === columnIndex })
            }
        }
    }
})