import { POKEAPI_ENDPOINT, } from "~/constants"

export function fetcher<TData, TVariables>(
    query: string,
    variables?: TVariables
) {
    return async (): Promise<TData> => {
        const res = await fetch(POKEAPI_ENDPOINT, {
            method: "POST",
            body: JSON.stringify({ query, variables, }),
        })

        const json = await res.json()

        if (json.errors) {
            const { message, } = json.errors[0]

            throw new Error(message)
        }

        return json?.data?.data || json?.data
    }
}
