import { Icon } from "../app"
const ItemShoppinCart = ({ Listproducts, setProducts }) => {

    const setCurrency = (coin) => {
        const diccionary = {
            eur: '€',
            dolar: '$'
        }
        return diccionary[coin]
    }
    const coin = setCurrency('eur');
    return (
        <>
            {
                Listproducts.map(product => (
                    <div class="bg-white w-full grid grid-cols-3 p-2 rounded-xl shadow border cursor-pointer" onClick={() => setProducts({ code:product.code, title: product.name, count: 1, price: product.price, category: 'inbox', iva: product.iva })} >
                        <div class="relative flex items-center space-x-4 p-3">
                            <div
                                className="flex items-center justify-center  flex-shrink-0 w-12 h-12 text-white bg-blue-600 rounded-xl">
                                <Icon icon={product.category} />
                            </div>
                            <div class="flex-grow ">
                                <div class="font-semibold text-gray-700">
                                    {product.name}
                                </div>
                                <div class="text-sm text-gray-500">
                                    IVA {product.iva}
                                </div>
                            </div>

                        </div>
                        <div class="flex-grow p-3 text-center">
                            <div class="font-semibold text-gray-700">
                                Total
                            </div>
                            <div class="text-sm text-gray-500">
                                {product.price} {coin}
                            </div>
                        </div>
                        <div class="p-3 text-center">
                            <div class="font-semibold text-gray-700">
                                Stock
                            </div>
                            <div class="text-sm text-gray-500">
                                {product.count}
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
export default ItemShoppinCart