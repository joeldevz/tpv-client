import { Icon } from "../app"
const ItemShoppinCart = ({ products, setProducts }) => {

    const setCurrency = (coin) => {
        const diccionary = {
            eur: '€',
            dolar: '$'
        }
        return diccionary[coin]
    }
    const coin = setCurrency('eur')
    function decrement(e) {
        let input = document.getElementById(e)
        let value = Number(input.value);
        if (value <= 1) {
            return input.value = 1;
        }
        value--;
        for (let index = 0; index < products.length; index++) {
            if (products[index].key == e) {
                setProducts((currentItem) => currentItem.map(x => x.key === e ? {
                    ...x,
                    count: value
                } : x))
            }
        }
        input.value = value;

    }
    function remove(e) {
        const nuevo = products.filter((v) => (v.key != e))
        setProducts(nuevo)
    }
    function increment(e) {
        let input = document.getElementById(e)
        let value = Number(input.value);
        if (value < 0) {
            return input.value = 0;
        }
        value++;
        for (let index = 0; index < products.length; index++) {
            if (products[index].key == e) {
                setProducts((currentItem) => currentItem.map(x => x.key === e ? {
                    ...x,
                    count: value
                } : x))
            }
        }
        input.value = value;
    }

    return (
        <>
            {
                products.map(v => (

                    <div class="bg-white w-full grid grid-cols-3 p-2 rounded-xl shadow border">
                        <div class="relative flex items-center space-x-4 p-3">
                            <div
                                className="flex items-center justify-center  flex-shrink-0 w-12 h-12 text-white bg-blue-600 rounded-xl">
                                <Icon icon={v.category} />
                            </div>
                            <div class="flex-grow ">
                                <div class="font-semibold text-gray-700">
                                    {v.title}
                                </div>
                                <div class="text-sm text-gray-500">
                                    {v.price} {coin}
                                </div>
                            </div>

                        </div>
                        <div class="flex-grow p-3 text-center">
                            <div class="font-semibold text-gray-700">
                                Total
                            </div>
                            <div className=" font-bold" id={v.id}> {(v.price * v.count).toFixed(2)}€</div>
                        </div>
                        <div class="p-2">
                            <div className="custom-number-input h-10 w-32 ml-auto">
                                <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                                    <button key={v.key} onClick={() => remove(v.key)}
                                        className=" bg-red-300 mr-1 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-48 rounded cursor-pointer outline-none">
                                        <span className="m-auto text-2xl font-thin" >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash m-auto" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                            </svg>
                                        </span>
                                    </button>

                                    <button data-action="decrement" onClick={() => decrement(v.key)}
                                        className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-48 rounded-l cursor-pointer outline-none">
                                        <span className="m-auto text-2xl font-thin"> - </span>
                                    </button>

                                    <input type="number" disabled onChange={() => countChange(v.key)}
                                        className="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                                        name="custom-input-number" defaultValue={v.count} id={v.key}></input>
                                    <button data-action="increment" onClick={() => increment(v.key)}
                                        className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-48 rounded-r cursor-pointer">
                                        <span className="m-auto text-2xl font-thin">+</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
export default ItemShoppinCart