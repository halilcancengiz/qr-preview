import { useEffect, useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ICategory, IProduct } from '../../../types/allTypes'
import HeaderLine from '../../../assets/images/headerlines/HeaderLine'

type Props = {
    categories: ICategory[]
}

const Theme1AllCategories = ({ categories }: Props) => {
    const [activeCategory, setActiveCategory] = useState<string>('')
    const [visibleCategories, setVisibleCategories] = useState<ICategory[]>([])
    const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
    const sliderRef = useRef<HTMLDivElement>(null)

    // Görünür kategorileri filtrele
    useEffect(() => {
        if (categories && Array.isArray(categories)) {
            const filtered = categories.filter((category) =>
                category.isVisible === true &&
                category.products &&
                category.products.length > 0 &&
                category.products.some((product) => product.isVisible === true)
            )
            setVisibleCategories(filtered)
            if (filtered.length > 0) {
                setActiveCategory(filtered[0]._id)
            }
        }
    }, [categories])

    // Active category'yi slider'da ortala
    const centerActiveCategory = (categoryId: string) => {
        if (sliderRef.current) {
            const button = sliderRef.current.querySelector<HTMLButtonElement>(`button[data-id="${categoryId}"]`)
            if (button) {
                const container = sliderRef.current
                const buttonCenter = button.offsetLeft + button.offsetWidth / 2
                const containerCenter = container.offsetWidth / 2
                container.scrollTo({
                    left: buttonCenter - containerCenter,
                    behavior: 'smooth'
                })
            }
        }
    }

    // Active category değiştiğinde slider'ı ortala
    useEffect(() => {
        if (activeCategory) {
            centerActiveCategory(activeCategory)
        }
    }, [activeCategory])

    // Geliştirilmiş scroll izleme
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 300 // Offset'i artırdık
            let closestCategory = ''
            let closestDistance = Infinity

            // Tüm kategoriler arasında en yakını bul
            for (const category of visibleCategories) {
                const element = categoryRefs.current[category._id]
                if (element) {
                    const elementTop = element.offsetTop
                    const elementCenter = elementTop + element.offsetHeight / 2
                    const distance = Math.abs(scrollPosition - elementCenter)

                    if (distance < closestDistance) {
                        closestDistance = distance
                        closestCategory = category._id
                    }
                }
            }

            // Sayfa sonuna yaklaşıldığında son kategoriyi aktif yap
            const documentHeight = document.documentElement.scrollHeight
            const windowHeight = window.innerHeight
            const scrollTop = window.scrollY

            if (scrollTop + windowHeight >= documentHeight - 100) {
                closestCategory = visibleCategories[visibleCategories.length - 1]?._id || closestCategory
            }

            if (closestCategory && closestCategory !== activeCategory) {
                setActiveCategory(closestCategory)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [visibleCategories, activeCategory])

    const scrollToCategory = (categoryId: string) => {
        const element = categoryRefs.current[categoryId]

        if (element) {
            const offset = 200
            const top = element.getBoundingClientRect().top + window.scrollY - offset
            window.scrollTo({ top, behavior: 'smooth' })
        }

        // Aktif kategoriyi güncelle ve slider'ı ortala
        setActiveCategory(categoryId)
    }

    const scrollSlider = (direction: 'left' | 'right') => {
        if (sliderRef.current) {
            const scrollAmount = 200
            sliderRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    // Mouse wheel scroll için
    useEffect(() => {
        const slider = sliderRef.current
        if (!slider) return

        const handleWheel = (e: WheelEvent) => {
            // Sadece yatay scroll varsa mouse wheel'i yakala
            if (slider.scrollWidth > slider.clientWidth) {
                e.preventDefault()
                slider.scrollBy({
                    left: e.deltaY,
                    behavior: 'smooth'
                })
            }
        }

        slider.addEventListener('wheel', handleWheel, { passive: false })
        return () => slider.removeEventListener('wheel', handleWheel)
    }, [visibleCategories])

    const getCurrencySymbol = (currency: string) => {
        switch (currency) {
            case 'TRY': return '₺'
            case 'USD': return '$'
            case 'EUR': return '€'
            default: return '₺'
        }
    }

    if (!visibleCategories.length) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500">
                <p>Görüntülenecek kategori bulunamadı.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white mt-[160px]">
            {/* Sticky Category Slider */}
            <div className="fixed w-full flex items-center justify-center top-[80px] z-40">
                <div className="w-full flex items-center justify-center h-full bg-white pt-6">
                    <div className="relative max-w-[1200px] w-full mx-auto">
                        <button
                            onClick={() => scrollSlider('left')}
                            className="absolute left-5 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>

                        <div
                            ref={sliderRef}
                            className="flex gap-3 overflow-x-auto scrollbar-hide px-12 py-2 touch-pan-x"
                            style={{
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                                WebkitOverflowScrolling: 'touch'
                            }}
                        >
                            {visibleCategories.map((category) => (
                                <button
                                    key={category._id}
                                    data-id={category._id}
                                    onClick={() => scrollToCategory(category._id)}
                                    className={`flex-shrink-0 px-6 py-2 rounded-md font-medium transition-all duration-300 transform hover:scale-105 ${activeCategory === category._id
                                        ? 'bg-blue-500 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    <span className="capitalize whitespace-nowrap">{category.name}</span>
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => scrollSlider('right')}
                            className="absolute right-5 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Categories and Products */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {visibleCategories.map((category) => (
                    <div key={category._id}>
                        <div className="my-8" ref={el => { categoryRefs.current[category._id] = el; }}>
                            <HeaderLine color='#00ADB5' type='1' name={category.name} />
                        </div>

                        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 overflow-hidden">
                            {category.products
                                .filter((product: any) => product.isVisible === true)
                                .map((product: IProduct) => (
                                    <div key={product._id} className="col-span-1 rounded-md flex items-start gap-2 border border-gray-200">
                                        <img className='h-40 w-40 min-w-40 min-h-40 object-cover object-center rounded-md' src={`${import.meta.env.VITE_API_URL}/${product.image}`} alt="" />

                                        <div className='flex h-full flex-col justify-between relative p-2 w-full'>
                                            <div className='flex flex-col'>
                                                <div className='font-semibold capitalize text-lg'>{product.name}</div>
                                                <div className='text-sm text-gray-500'>{product.description}</div>
                                            </div>
                                            <div className='w-full flex items-center justify-end'>
                                                <span className='text-lg font-semibold'>{product.price} <span className='text-sm'>{getCurrencySymbol(product.currency)}</span></span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Theme1AllCategories