
import notFoundImage from '../assets/images/notfound.jpg'
import { NavLink } from 'react-router-dom'


const NotFound = () => {
    return (
        <div className='min-h-screen w-full bg-white flex flex-col items-center justify-center p-5'>

            <div className='mb-8'>
                <img className='max-w-[400px] w-full' src={notFoundImage} alt="" />
            </div>

            <div className='mb-8 space-y-2 text-center'>
                <h2 className='text-2xl md:text-3xl font-semibold text-zinc-700'>
                    Sayfa bulunamadı
                </h2>
                <p className='text-lg text-zinc-500 leading-relaxed'>
                    Aradığınız sayfa mevcut değil veya kaldırılmış olabilir.
                </p>
                <NavLink to='/' >
                    <button className='px-4 py-2 bg-[#1b2e35] text-white rounded-md cursor-pointer hover:bg-[#1b3035e7] transition-all duration-300'>Ana sayfaya dön</button>
                </NavLink>
            </div>

        </div>
    )
}

export default NotFound