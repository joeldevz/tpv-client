import { useEffect } from 'react'
import Nav from './Nav'
import { getLocalStorage, removeLocalStorage } from "../../functions/index"
export default function Layout({ children, selectNav }) {
    useEffect(() => {
        if (!getLocalStorage('token')) {
            removeLocalStorage('token')
            removeLocalStorage('tokenSession')
            return location.href = '/auth'
        }
        if (!getLocalStorage('tokenSession')) {
            location.href = '/dashboard/employeer'
        }
    }, [])
    return (
        <>
            <div className=" w-full flex overflow-hidden select-none h-screen"  >
                <Nav selectNav={selectNav} />
                <main
                    className="my-2 pt-1 pb-2 mr-2 px-5 flex-1 bg-gray-50 dark:bg-black rounded-lg  border-gray-300 border-2
		transition duration-500 ease-in-out overflow-y-auto shadow-inner        ">
                    {children}
                </main>

            </div>
        </>
    )
}