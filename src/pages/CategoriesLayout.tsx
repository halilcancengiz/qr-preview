import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetMenuBySlugMutation } from '../services/api'
import Loading from '../components/Loading'
import { useDispatch } from 'react-redux'
import { changeTheme } from '../features/themeSlice'
import Theme1Header from './themes/theme1/Theme1Header'
import Theme1Categories from './themes/theme1/Theme1Categories'
import Theme1Footer from './themes/theme1/Theme1Footer'
import Theme2Header from './themes/theme2/Theme2Header'
import Theme2Categories from './themes/theme2/Theme2Categories'
import Theme2Footer from './themes/theme2/Theme2Footer'
import type { IGetMenuBySlugResponse } from '../types/allTypes'


const CategoriesLayout = () => {

    const dispatch = useDispatch()
    const { slug } = useParams()
    const [data, setData] = useState<IGetMenuBySlugResponse | undefined>(undefined)
    const [getMenuBySlug, { isLoading }] = useGetMenuBySlugMutation()

    const fetchMenu = async () => {
        try {
            if (!slug) return
            const result = await getMenuBySlug({ slug }).unwrap()
            setData(result.data)
            dispatch(changeTheme(result.data?.theme))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMenu()
        console.log(slug)
    }, [slug])

    useEffect(() => {
        console.log(data)
        console.log("theme", data?.theme)
    }, [data])

    return (
        <div className='flex-1 '>
            {
                isLoading === true ? (
                    <Loading />
                ) : (
                    <div className='h-full'>
                        {
                            data?.theme === "theme1" ? (
                                <div className='flex flex-col h-full'>
                                    <Theme1Header business={data.business} />
                                    <Theme1Categories slug={slug} data={data.menu} />
                                    <Theme1Footer businessInfo={data.business} />
                                </div>
                            ) : data?.theme === "theme2" ? (
                                <div className='flex flex-col h-full'>
                                    <Theme2Header />
                                    <Theme2Categories />
                                    <Theme2Footer />
                                </div>
                            ) : (
                                <div>Bilinmeyen</div>
                            )

                        }
                    </div>
                )
            }
        </div>
    )
}

export default CategoriesLayout