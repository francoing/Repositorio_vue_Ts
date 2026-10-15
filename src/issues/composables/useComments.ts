import { githubApi } from "@/api/gitHubApi"
import { useQuery, useQueryClient } from "@tanstack/vue-query"
import useIssue from "./useIssue"
import { noop } from "quasar"
import type { Comment } from "../interfaces/comments"



const getComments = async (issueNumber : number) => {

    const {data} = await githubApi.get<Comment[]>(`/issues/${issueNumber}/comments`)
    return data
    
}

interface Options {
    autoload?:boolean
}

const useComment = (issueNumber : number, options?:Options) => {

    const {autoload = true} = options || {}

    const {issueQuery} = useIssue(issueNumber)
    
    const queryClient = useQueryClient()

    const commentsQuery = useQuery({

        queryKey: ["issue", issueNumber,"comments"],
        queryFn : () => getComments(issueQuery.data.value?.number || 0),
        staleTime: 1000 * 15,
        enabled: autoload //evita que se dispare constantemente cuando hago el prefetch
        
    })

    const prefetchComments = (issueNumber : number) =>{

        queryClient.query({
            queryKey: ["issue", issueNumber,"comments"],
            queryFn: () => getComments(issueNumber),
            staleTime: 1000 * 15
        }).catch(noop)

    }

    
    
    return{
        commentsQuery,
        // Methods 
        prefetchComments,
    }
}

export default useComment
