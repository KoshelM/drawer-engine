import { mapGetters, mapMutations } from 'vuex'
export default {
    props: ['fieldToBind'],
    computed: {
        ...mapGetters(['getFieldValue']),
        value: {
            get(){
                return this.getFieldValue(this.fieldToBind)
            },
            set(newValue){
                this.setFieldValue({fieldToBind: this.fieldToBind, newValue})
            }
        }
    },
    methods: {
        ...mapMutations(['setFieldValue'])
    },
}