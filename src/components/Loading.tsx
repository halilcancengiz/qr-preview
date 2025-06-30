
const Loading = () => {


    // QR Code Icon SVG
    const QRIcon = () => (
        <svg className="w-12 h-12 text-[hsla(240, 4%, 16%, 0.334)]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM19 19h2v2h-2zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM15 19h2v2h-2zM17 17h2v2h-2zM17 13h2v2h-2zM19 15h2v2h-2z" />
        </svg>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
            <div className='flex flex-col items-center gap-5'>

                <div className="relative flex size-40 items-center justify-center rounded-full">
                    <div className="relative ">
                        {/* Center QR Icon */}
                        <div className="relative z-10 w-20 h-20 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-blue-100">
                            <QRIcon />
                        </div>
                    </div>

                    <div id="circle-1" className="absolute top-1/2 left-1/2 flex size-7 -translate-x-1/2 -translate-y-[85px] origin-[50%_85px] rotate-[0deg] items-center justify-center"></div>

                    <div id="circle-2" className="absolute top-1/2 left-1/2 flex size-7 -translate-x-1/2 -translate-y-[85px] origin-[50%_85px] rotate-[60deg] items-center justify-center"></div>

                    <div id="circle-3" className="absolute top-1/2 left-1/2 flex size-7 -translate-x-1/2 -translate-y-[85px] origin-[50%_85px] rotate-[120deg] items-center justify-center"></div>

                    <div id="circle-4" className="absolute top-1/2 left-1/2 flex size-7 -translate-x-1/2 -translate-y-[85px] origin-[50%_85px] rotate-[180deg] items-center justify-center"></div>

                    <div id="circle-5" className="absolute top-1/2 left-1/2 flex size-7 -translate-x-1/2 -translate-y-[85px] origin-[50%_85px] rotate-[240deg] items-center justify-center"></div>

                    <div id="circle-6" className="absolute top-1/2 left-1/2 flex size-7 -translate-x-1/2 -translate-y-[85px] origin-[50%_85px] rotate-[300deg] items-center justify-center"></div>
                </div>


                <div className='text-center'>
                    <h1 className="text-2xl font-semibold text-zinc-800 mb-2">
                        Menü hazırlanıyor.
                    </h1>
                    <p className="text-gray-600 text-sm">
                        Lütfen bekleyin...
                    </p>
                </div>
            </div>


        </div>
    );
};

export default Loading;