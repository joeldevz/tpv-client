import { Children } from "react"
import { Icon } from "./Icon"
export const BtnSubmit = ({ value, bg, icon, hoverBg }) => {
    bg = bg === undefined ? 'indigo-600' : bg
    hoverBg = hoverBg === undefined ? 'indigo-700' : hoverBg
    return (
        <button type="submit"
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-${bg} hover:bg-${hoverBg} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${bg}`}>
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {
                    icon === undefined ? '' : <Icon icon={icon} />
                }
            </span>
            {value}
        </button>
    )
}
export const Btn = ({ value, bg, onClick, icon, className }) => {

    return (
        <button onClick={onClick}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${bg} ${className}`}>
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {
                    icon === undefined ? '' : <Icon icon={icon} />
                }
            </span>
            {value}
        </button>
    )
}
export const Btn2 = ({ value, children, onClick, className, }) => {
    return (
        <div onClick={onClick} className={`flex items-center p-4 rounded-lg transform hover:scale-105 shadow-xs border-2 font-bold cursor-pointer ${className}`}>
            {children}
            <div>
                <p className="text-sm font-medium ml-2 ">
                    {value}</p>

            </div>
        </div>)
}