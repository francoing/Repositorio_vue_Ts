import { useQuery } from "@tanstack/vue-query"
import { githubApi } from "@/api/gitHubApi"
import type { Issue, State, IssuesPage } from "../interfaces/issue"
import { storeToRefs } from "pinia"
import { useIssuesStore } from "@/stores/issues"
import { computed } from "vue"

const PER_PAGE = import.meta.env.QCLI_PER_PAGE || '10'


interface SearchIssuesResponse {
    total_count: number
    incomplete_results: boolean
    items: Issue[]
}


const getIssues = async (labels: string[], state: State, page: number): Promise<IssuesPage> => {

    const query = [
        `repo:${import.meta.env.QCLI_GITHUB_USER}/${import.meta.env.QCLI_GITHUB_REPO}`,
        'is:issue',
    ]

    if (state) query.push(`state:${state}`)

    labels.forEach(label => query.push(`label:"${label}"`))

    const { data } = await githubApi.get<SearchIssuesResponse>('https://api.github.com/search/issues', {
        params: {
            q: query.join(' '),
            per_page: PER_PAGE,
            page,
            sort: 'created',
            order: 'desc',
        },
    })

    return {
        issues: data.items,
        totalCount: data.total_count,
    }
}


const useIssues = () =>{

    const store = useIssuesStore()
    const {labels,state,currentPage} = storeToRefs(store)
   
    const issuesQuery = useQuery({
        queryKey: ['issues',{labels,state,currentPage}],
        queryFn: () => getIssues(labels.value, state.value ,currentPage.value),
    })

    const totalPages = computed<number>(() => issuesQuery.data?.value?.totalCount 
                                            ? Math.ceil(issuesQuery.data?.value.totalCount / Number(PER_PAGE)) 
                                            : 0)

    return{
        issuesQuery,
        // totalPag,
        currentPage,

        getPage: (page: number) => store.setPage(page),

        totalPages,
        totalPageNumbers: computed(() => [...new Array(totalPages.value)].map((v, i) => i + 1)),

    }
}
export default useIssues