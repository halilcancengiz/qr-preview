import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetMenuBySlugMutation } from '../services/api'
import Loading from '../components/Loading'
import { useDispatch } from 'react-redux'
import { changeTheme } from '../features/themeSlice'
import Theme1Header from './themes/theme1/Theme1Header'
import Theme1Footer from './themes/theme1/Theme1Footer'
import Theme2Header from './themes/theme2/Theme2Header'
import Theme2Footer from './themes/theme2/Theme2Footer'
import Theme1AllCategories from './themes/theme1/Theme1AllCategories'
import Theme2AllCategories from './themes/theme2/Theme2AllCategories'
import type { IGetMenuBySlugResponse } from '../types/allTypes'

const AllCategoriesLayout = () => {

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
  }, [slug])

  useEffect(() => {

  }, [])

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
                  <Theme1AllCategories categories={data.menu} />
                  <Theme1Footer businessInfo={data.business} />
                </div>
              ) : data?.theme === "theme2" ? (
                <div className='flex flex-col h-full'>
                  <Theme2Header />
                  <Theme2AllCategories categories={data.menu} />
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

export default AllCategoriesLayout