'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

export const useQueryParams = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )
    const createQueryStrings =
        (params: Record<string, any>) => {
            const paramsRaw = new URLSearchParams(searchParams.toString())
            Object.entries(params).forEach(([name, value]) =>
                paramsRaw.set(name, value)
            )

            return paramsRaw.toString()
        }

    const getParam = (key: string) => searchParams.get(key)
    const setParam = (key: string, value: string) => router.push(`${pathname}?${createQueryString(key, value)}`)
    const setParams = (params) => {
        return router.push(`${pathname}?${createQueryStrings(params)}`)
    }


    return { getParam, setParam, setParams }
}