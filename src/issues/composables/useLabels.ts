import { githubApi } from "@/api/gitHubApi"
import { useQuery } from "@tanstack/vue-query"
import type { Label } from "@/issues/interfaces/labels"
import { useIssuesStore } from "@/stores/issues"
import { computed } from "vue"

const useLabels = () => {

    const getLabels = async():Promise<Label[]> => {
        
        const { data } = await githubApi.get<Label[]>('/labels?per_page=100')
        return data;
    }

    const issuesStore = useIssuesStore()

    const labelsQuery = useQuery({

        queryKey: ['labels'],
        queryFn: getLabels,
        staleTime:1000*60*60
    })



    return {
        labelsQuery,


        selectedLabels:computed(()=> issuesStore.labels),

        //Methods
        toggleLabel: issuesStore.toggleLabel
    }
}

export default useLabels