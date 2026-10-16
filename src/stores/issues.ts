import { defineStore } from "pinia";
import {  ref } from "vue";
import { State } from "@/issues/interfaces/issue";


export const useIssuesStore = defineStore('issues', () => {

    const state = ref<State>(State.All)
    const labels = ref<string[]>([])
    const currentPage = ref<number>(1)

    return {
        //state
        state,
        labels,
        currentPage,
    
        //getters

        setPage(page: number) {
            if (page<1) return
            currentPage.value = page
        },
        

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