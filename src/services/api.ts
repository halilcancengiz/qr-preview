import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import type { BaseResponse, IGetMenuBySlugRequest, IGetMenuBySlugResponse } from '../types/allTypes'


export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}/api`,
        credentials: 'include',
    }),
    tagTypes: ['Menu'],
    endpoints: () => ({}),
})



const menuApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMenuBySlug: builder.mutation<BaseResponse<IGetMenuBySlugResponse>, IGetMenuBySlugRequest>({
            query: (userId) => ({
                url: '/public/getMenuBySlug',
                method: 'POST',
                body: userId,
                headers: {
                    'x-api-key': import.meta.env.VITE_SECRET_KEY
                },
            }),
            invalidatesTags: ['Menu'],
        }),
    }),
})


export const {
    useGetMenuBySlugMutation,
} = menuApi

