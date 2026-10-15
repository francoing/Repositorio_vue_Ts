import { useQuery } from "@tanstack/vue-query"
import { githubApi } from "@/api/gitHubApi"
import type { Issue, State } from "../interfaces/issue"
import { storeToRefs } from "pinia"
import { useIssuesStore } from "@/stores/issues"


const getIssues = async(labels:string[], state:State):Promise<Issue[]> =>{


    const params = new URLSearchParams()

    if(state) {
        params.append('state',state)
    }

    if(labels.length > 0 ){
        const labelString = labels.join(',')
        params.append('labels',labelString)
    }

    params.append('per_page','10')

    const { data } = await githubApi.get<Issue[]>('/issues',{params})

    return data
}



const useIssues = () =>{

    const store = useIssuesStore()
    const {labels,state} = storeToRefs(store)

    const issuesQuery = useQuery({
        queryKey: ['issues',{labels,state}],
        queryFn: () => getIssues(labels.value, state.value),
    })

    return{
        issuesQuery
    }
}
export default useIssues