import React, { useEffect, useState } from "react";
import { Clock, Link, MapPin, Menu, Phone, X, Instagram, Facebook } from "lucide-react";

type Props = {
    business: any
};

const Navbar = ({ business }: Props) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Menü açıkken body scroll kapatma
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isMobileMenuOpen]);

    // Resize olunca menüyü kapat
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav className="w-full fixed top-0 z-50">
            <div style={{ clipPath: "polygon(50% 100%, 0% 80%, 0% 0%, 100% 0%, 100% 80%, 50% 100%)" }} className="w-full shadow-md px-4 py-3 flex justify-center items-center relative bg-[#00ADB5]">
                <div className="flex items-center gap-10 text-white capitalize">
                    <img src={`${import.meta.env.VITE_API_URL}/${business.image}`} alt="QR Menu Logo" className="h-20 object-contain" />
                </div>

                <div className="md:hidden absolute right-5">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 focus:outline-none ">
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden fixed top-0 left-0 w-full h-full bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)} />
            )}

            {/* Modern İçerik Kısmı */}
            <div
                className={`md:hidden fixed top-0 left-0 w-[320px] h-full bg-white shadow-2xl flex flex-col z-90 transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Modern Header */}
                <div className="relative bg-black text-white p-6">
                    <div className="flex items-center justify-between">
                        <img
                            src={`${import.meta.env.VITE_API_URL}/${business.image}`}
                            alt="QR Menu Logo"
                            className="h-12 object-contain filter brightness-0 invert"
                        />
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Modern Content Area */}
                <div className="flex-1 p-5 overflow-y-auto">
                    <div className="space-y-2">
                        {/* Business Info Cards */}
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <MapPin size={18} className="text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-600 text-xs  ">
                                        <span className="capitalize">{business.businessAddress.street}</span>, <span className="capitalize pr-1">{business.businessAddress.district}</span>
                                        <span className="uppercase">{business.businessAddress.city}</span> / <span className="uppercase">{business.businessAddress.country}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <Clock size={18} className="text-green-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-600 text-xs">{business.openingHours}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <Phone size={18} className="text-purple-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-600 text-xs">{business.businessPhoneNumber}</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Media Section */}
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <div className="flex justify-center gap-3">
                                <a
                                    href="#"
                                    className="p-3 rounded-xl transition-all duration-200 hover:scale-105"
                                >
                                    <Facebook size={20} className="text-blue-600" />
                                </a>
                                <a
                                    href="#"
                                    className="p-3 rounded-xl transition-all duration-200 hover:scale-105"
                                >
                                    <Instagram size={20} className="text-pink-600" />
                                </a>
                                <a
                                    href="#"
                                    className="p-3 rounded-xl transition-all duration-200 hover:scale-105"
                                >
                                    <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="p-3 rounded-xl transition-all duration-200 hover:scale-105"
                                >
                                    <Link size={20} className="text-purple-600" />
                                </a>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Modern Footer */}
                <div className="p-4 bg-white border-t border-gray-200">
                    <div className="text-center">
                        <p className="text-xs text-gray-500">© 2024 QR Menu</p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;