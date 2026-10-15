import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { State, type Issue } from "../interfaces/issue"
import { githubApi } from "@/api/gitHubApi"


interface Args {
    title : string,
    body : string,
    labels : string[]
}

interface IssuesFilters {
    labels : string[],
    state : State
}

// GitHub filtra la lista por estado y por TODAS las labels seleccionadas
const matchesFilters = (issue: Issue, { labels, state }: IssuesFilters) =>
    state !== State.Closed &&
    labels.every(label => issue.labels.some(issueLabel => issueLabel.name === label))



const addIssue = async({title,body = '',labels=[]}: Args): Promise<Issue> => {

    const newIssueData = { title, body, labels }

    const {data} = await githubApi.post<Issue>('/issues' , newIssueData)

    console.log('Issue creada:' , data)

    return data
}



const useIssueMutation = () => {

    const queryClient = useQueryClient()

    const issueMutation = useMutation({

        mutationFn : addIssue,

        onSuccess : async (issue) => {
            // misma key que useIssue ("issue" en singular), así el detalle ya está en cache
            queryClient.setQueryData(["issue", issue.number], issue)

            // GitHub tarda unos segundos en incluir la nueva issue en GET /issues, así que un
            // refetch inmediato trae la lista vieja: la agregamos a mano con lo que devolvió el POST
            queryClient.getQueriesData<Issue[]>({ queryKey: ['issues'] }).forEach(([queryKey, issues]) => {
                const [, filters] = queryKey as [string, IssuesFilters]
                if (!Array.isArray(issues) || !matchesFilters(issue, filters)) return

                queryClient.setQueryData<Issue[]>(queryKey, [issue, ...issues])
            })

            // las marca como desactualizadas sin refetchear ahora (pisaría lo agregado);
            // se recargan desde GitHub la próxima vez que se usen
            await queryClient.invalidateQueries({
                queryKey : ['issues'],
                refetchType : 'none',
            })
        },
        onSettled:() => {  
        }
          
    })


    return{
        issueMutation
    }
}    


export default useIssueMutation   