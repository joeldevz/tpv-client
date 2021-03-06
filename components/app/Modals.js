export const Modal = ({ active, setActive, children, className }) => {
    return (
        <div className={`${active ? 'show' : 'hidden'}  fixed z-10 inset-0 overflow-y-auto `}>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className={`${active ? 'show' : 'hide'}fixed inset-0 transition-opacity`} aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className={`${active ? 'show' : 'hide'}  inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full ${className}`} role="dialog" aria-modal="true" aria-labelledby="modal-headline">

                    {children}

                </div>
            </div>
        </div>

    )
}
