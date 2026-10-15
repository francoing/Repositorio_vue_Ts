
import { noop, useQuery, useQueryClient } from "@tanstack/vue-query"
import type { Issue } from "../interfaces/issue"
import { githubApi } from "@/api/gitHubApi"

//const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve,ms))


const getIssue = async (issueNumber : number) => {

    //await sleep(2000)
    const {data} = await githubApi.get<Issue>(`/issues/${issueNumber}`)
    return data
    
}

const getComments = async (issueNumber : number) => {

    //await sleep(2000)
    const {data} = await githubApi.get<Issue[]>(`/issues/${issueNumber}/comments`)
    return data
    
}

interface Options {
    autoload?:boolean
}

const useIssue = (issueNumber : number, options?:Options) => {

    

    const {autoload = true} = options || {}
    
    const queryClient = useQueryClient()
    
    const issueQuery = useQuery({

        queryKey: ["issue", issueNumber],
        queryFn: () => getIssue(issueNumber),
        staleTime: 1000 * 60 * 5,
        enabled: autoload
    })

    const commentsQuery = useQuery({
        queryKey: ["issue", issueNumber,"comments"],
        // queryFn: () => getComments(issueNumber),
        queryFn : () => getComments(issueQuery.data.value?.number || 0),
        // enabled: computed(()=>!!issueQuery.data.value),
        staleTime: 1000 * 15,
        enabled: autoload //evita que se dispare constantemente cuando hago el prefetch
    })

    const prefetchIssue = (issueNumber : number) =>{

        queryClient.query({
            queryKey: ["issue", issueNumber],
            queryFn: () => getIssue(issueNumber),
            staleTime: 1000 * 60 * 5
        }).catch(noop)

        queryClient.query({
            queryKey: ["issue", issueNumber,"comments"],
            queryFn: () => getComments(issueNumber),
            staleTime: 1000 * 15
        }).catch(noop)

    }
    const setIssueCacheData = (issue:Issue) =>{

        queryClient.setQueryData(
            ["issue", issue.number],
            issue
        )
        
    }

    
    
    return{
        issueQuery,
        commentsQuery,

        // Methods 

        prefetchIssue,
        setIssueCacheData,
    }
}

export default useIssue