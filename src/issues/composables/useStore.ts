import { useIssuesStore } from "@/stores/issues"
import { storeToRefs } from "pinia"

const useStore = () =>{

    const issuesStore = useIssuesStore()
    const {labels,state} = storeToRefs(issuesStore)


    return {
        //Reactive properties
        labels,
        state,

        //Getters (computed)

        //Actions Methods
        


    }
}

export default useStore
