export const InputEmail = ({ Change, value, placeholder, rounded, color, name }) => {
    color = color === undefined ? 'indigo' : color
    rounded = rounded === undefined ? 'md' : rounded === false ? '' : rounded
    return (
        <div>
            <label htmlFor="password" className="sr-only">Correo</label>
            <input id="password" name={name} type="email" autoComplete="current-password" value={value} onChange={Change} required className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-${rounded} focus:outline-none focus:ring-${color}-500 focus:border-${color}-500 focus:z-10 sm:text-sm`} placeholder={placeholder} />
        </div>
    )
}
export const InputPassword = ({ Change, value, placeholder, rounded, color, name }) => {
    color = color === undefined ? 'indigo' : color
    rounded = rounded === undefined ? 'md' : rounded === false ? '' : rounded
    return (
        <div>
            <label htmlFor="password" className="sr-only">Confirmar Password</label>
            <input id="password" name={name} type="password" autoComplete="current-password" value={value} onChange={Change} required className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-${rounded} focus:outline-none focus:ring-${color}-500 focus:border-${color}-500 focus:z-10 sm:text-sm`} placeholder={placeholder} />
        </div>
    )
}
export const InputText = ({ Change, value, placeholder, rounded, color, name, className }) => {
    color = color === undefined ? 'indigo' : color
    rounded = rounded === undefined ? 'md' : rounded === false ? '' : rounded
    return (
        <div className={`${className}`}>
            <label className="sr-only">Confirmar Password</label>
            <input name={name} type="text" autoComplete="current-password" value={value} onChange={Change} required className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-${rounded} focus:outline-none focus:ring-${color}-500 focus:border-${color}-500 focus:z-10 sm:text-sm `} placeholder={placeholder} />
        </div>
    )
}
export const InputNumber = ({ Change, value, placeholder, rounded, color, name, className }) => {
    color = color === undefined ? 'indigo' : color
    rounded = rounded === undefined ? 'md' : rounded === false ? '' : rounded
    return (
        <div className={`${className}`}>
            <label className="sr-only">Confirmar Password</label>
            <input name={name} type="number" autoComplete="current-password" value={value} onChange={Change} required className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-${rounded} focus:outline-none focus:ring-${color}-500 focus:border-${color}-500 focus:z-10 sm:text-sm `} placeholder={placeholder} />
        </div>
    )
}

export const Select = ({ Change, value, placeholder, rounded, color, name, className, children }) => {
    color = color === undefined ? 'indigo' : color
    rounded = rounded === undefined ? 'md' : rounded === false ? '' : rounded
    return (
        <div className={`${className}`}>
            <select name={name} value={value} onChange={Change} required className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-${rounded} focus:outline-none focus:ring-${color}-500 focus:border-${color}-500 focus:z-10 sm:text-sm `}>
                {children}
            </select>
        </div>
    )
}
export const InputText2 = ({ Change, value, placeholder, rounded, color, name, className, text }) => {
    return (
        <div >
            <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-400">{text}</label>
            <input type="text" name={name} placeholder={placeholder} required className={`w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500`} />
        </div>
    )
}
export const InputNumber2 = ({ Change, value, placeholder, rounded, color, name, className, text, disabled }) => {
    return (
        <div >
            <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-400">{text}</label>
            <input type="Number" name={name} value={value} placeholder={placeholder} disabled={disabled} required className={`w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500`} />
        </div>
    )
}
export const InputBtn = ({ btnValue, placeholder, disabled, Click }) => {
    return (
        <>
            <div className="flex justify-center ">
                <div className="bg-white rounded-lg w-full">
                    <div className="flex flex-wrap justify-between md:flex-row">
                        <input type="email" className="m-1 p-2 appearance-none text-gray-700 text-sm focus:outline-none w-9/12" disabled={disabled} placeholder={placeholder} />
                        <button className="w-full m-1 p-2 text-sm bg-gray-800 text-white rounded-lg font-semibold uppercase lg:w-auto"  onClick={Click}>{btnValue}</button>
                    </div>
                </div>
            </div>
        </>
    )
}
