import { useState } from "react"
import Link from "next/link"

export const Nav = () => {
    const [profile, setProfile] = useState(false)

    return (
        <nav className="bg-gray-900 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto  sm:px-7 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="hidden sm:block sm:m-auto">
                            <div className="flex space-x-4">
                                <Link href="./dashboard">
                                    <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Inicio</a>
                                </Link>
                                <a href="#" className="text-gray-300 border-b-2 border-transparent hover:border-gray-900 hover:text-white px-3 py-2  text-sm font-medium">TPV</a>
                                <a href="#" className="text-gray-300 border-b-2 border-transparent hover:border-gray-900 hover:text-white px-3 py-2  text-sm font-medium">Servicios</a>
                                <a href="#" className="text-gray-300 border-b-2 border-transparent hover:border-gray-900 hover:text-white px-3 py-2  text-sm font-medium">Configuracion</a>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">View notifications</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokelinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>

                        <div className="ml-3 relative">
                            <div>
                                <button type="button" onClick={() => { setProfile(!profile) }} className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-expanded="false" aria-haspopup="true">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                </button>
                            </div>


                            <div className={`${profile ? 'show' : 'hidden'} origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                <Link href="#">
                                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Mi Perfil</a>
                                </Link>
                                <Link href="#">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Configuración</a>
                                </Link>
                                <Link href="#">
                                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Cerrar Sesión</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    )
}