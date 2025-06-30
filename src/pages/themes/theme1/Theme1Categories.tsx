
import { NavLink } from 'react-router-dom'

type Props = {
    data: any
    slug: string | undefined
}

const Theme1Categories = ({ data, slug }: Props) => {

    return (
        <div className='flex-1 px-5 py-10 mt-[102px]'>
            <div className='max-w-[1200px] w-full mx-auto grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3'>
                {
                    data && data.map((categories: any) => (
                        <NavLink className="col-span-1 flex items-center h-40 justify-center border rounded-md overflow-hidden relative z-10" to={`/${slug}/all-categories`} key={categories._id}>
                            <img className='absolute w-full h-full top-0 left-0 object-cover' src={`${import.meta.env.VITE_API_URL}/${categories.image}`} alt="" />
                            <div className='absolute bg-gradient-to-l w-full h-full flex items-center justify-center text-white text-xl from-black/40 to-black/40 top-0 left-0 z-20 uppercase font-bold'>
                                {categories.name}
                            </div>
                        </NavLink>
                    ))
                }
            </div>

        </div>
    )
}

export default Theme1Categories