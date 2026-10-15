import axios from "axios";


export const githubApi = axios.create({
    baseURL: `https://api.github.com/repos/${import.meta.env.QCLI_GITHUB_USER}/${import.meta.env.QCLI_GITHUB_REPO}`,
    headers: {
        Authorization: `token ${import.meta.env.QCLI_GITHUB_TOKEN}`
    },
    // GitHub responde con "Cache-Control: max-age=60" y el navegador reusaría la
    // respuesta vieja al refetchear; 'no-cache' obliga a revalidar con GitHub
    // (TanStack Query ya se encarga del cache de la app)
    adapter: 'fetch',
    fetchOptions: { cache: 'no-cache' },
})