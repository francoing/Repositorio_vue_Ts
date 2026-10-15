import { defineStore } from "pinia";
import { ref } from "vue";
import { State } from "@/issues/interfaces/issue";

export const useIssuesStore = defineStore('issues', () => {

    const state = ref<State>(State.All)
    const labels = ref<string[]>([])

    return {
        //state
        state,
        labels,

        //getters
        

        //actions
         toggleLabel(labelName:string){

            if(labels.value.includes(labelName)){
                labels.value = labels.value.filter(label => label !== labelName)
                return
            }

            labels.value.push(labelName)
        }
    }
})