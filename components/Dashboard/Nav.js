import Link from 'next/link'
import { useEffect, useState } from "react"
import { Icon } from '../app/Icon'

export default function Nav({ selectNav }) {
    const [nav, setNav] = useState({
        dashboard: false,
        tpv: false,

    })
    useEffect(() => {
        setNav({ ...nav, [selectNav]: true })
    }, [])
    return (<nav className="w-24 flex flex-col items-center bg-white dark:bg-gray-800 py-4">

        <div className="cursor-pointer">
            <Link href="/dashboard">
                <img src="/images/icon.png" width="80" height="50" alt="logo" />
            </Link>
        </div>

        <ul className="mt-2 text-gray-700 dark:text-gray-400 capitalize">

            <li className={`mt-3 p-2  dark:text-blue-300 rounded-lg ${nav.dashboard ? 'text-blue-600' : 'hover:text-blue-600'}`}>
                <Link href="/dashboard">
                    <a className=" flex flex-col items-center ">
                        <Icon icon="dashboard" bg={`${nav.dashboard ? 'text-blue-600' : ''}`} />
                        <span className="text-xs mt-2">Dashboard</span>
                    </a>
                </Link>
            </li>
            <li className={`mt-3 p-2  dark:text-blue-300 rounded-lg ${nav.tpv ? 'text-blue-600' : 'hover:text-blue-600'}`}>
                <Link href="/tpv">
                    <a className=" flex flex-col items-center ">
                        <Icon icon="tpv" bg={`${nav.tpv ? 'text-blue-600' : ''}`} />
                        <span className="text-xs mt-2">TPV</span>
                    </a>
                </Link>
            </li>


            <li className="mt-3 p-2 hover:text-blue-600 dark-hover:text-blue-300 rounded-lg" >
                <Link href="/config">
                    <a className=" flex flex-col items-center">
                        <Icon icon="setting" />
                        <span className="text-xs mt-2">Configuración</span>
                    </a>
                </Link>
            </li>
        </ul>

        <div
            className="mt-auto flex items-center p-2 text-blue-600 bg-purple-200
dark:text-blue-500 rounded-full">
            <div >
                <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
                    <path
                        d="M12 1c-5 0-9 4-9 9v7a3 3 0 003 3h3v-8H5v-2a7 7 0 017-7
            7 7 0 017 7v2h-4v8h4v1h-7v2h6a3 3 0
            003-3V10c0-5-4.03-9-9-9z"></path>
                </svg>
            </div>
        </div>
    </nav >
    )
}
