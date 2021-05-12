import { CardCategory, InputText, InputNumber, Select, BtnSubmit } from "../app"
import { useEffect, useState } from "react"
import { AddProduct } from "../Form"
import { TextField } from "@material-ui/core"
import { GetAllProductShop, GetProductByName } from "../../functions/connectbackend"
import ItemShoppin from "../../components/tpv/ItemShoppin"
import { CODE_HTTP } from "../../functions/code"

const Stoke = ({ setProducts, products }) => {
    const [Listproducts, setListproducts] = useState([])
    const AllProducts = async () => {
        const allProducts = await GetAllProductShop()
        if (allProducts.statusCode === CODE_HTTP.SUCCESS) {
            setListproducts(allProducts.data)
        }
    }
    useEffect(async () => {
        await AllProducts()
    }, [products])
    const addProduct = (data) => {
        data.key = products.length
        setProducts([...products, data])
    }
    const HandlerChangeSearchName = async (element) => {
        const name = element.target.value
        if (name.length < 3) {
            AllProducts()
            return
        }
        const Products = await GetProductByName(name)
        if (Products.statusCode === CODE_HTTP.SUCCESS) {
            setListproducts(Products.data)
        } else {
            setListproducts([])
        }
    }

    return (
        <>
            <div class="flex flex-col rounded-lg overflow-hidden sm:flex-row w-full" >
                <input onChange={HandlerChangeSearchName} class="py-1  px-3 bg-gray-200 text-gray-900 w-full border-gray-300 border-2 outline-none placeholder-gray-500 focus:bg-gray-100" type="text" name="email" placeholder="Buscar Producto/Servicio" />
                <button class="py-3 px-4 bg-gray-900 text-gray-100 font-semibold uppercase hover:bg-gray-600">Buscar</button>
            </div>
            <div className="overflow-auto my-5" style={{ height: 75 + '%' }}>
                {/*<div class="p-5 m-auto  grid grid-cols-1 md:grid-cols-3  xl:grid-cols-4 gap-3 overflow-auto">
                    
                        <CardCategory name="DESCUENTOS" img="/category/descounts.png" />
                        <CardCategory name="hola" img="category/category.png" />
                        <CardCategory name="hola" img="category/category.png" />
                        <CardCategory name="hola" img="category/category.png" />
                    

                </div>*/}
                <div class="m-auto  grid grid-cols-1  gap-2 overflow-y-auto p-2">
                    <ItemShoppin Listproducts={Listproducts} setProducts={addProduct} />
                </div>
            </div>
            <div className="grid grid-cols-12 gap-2  ">

                <AddProduct products={products} setProducts={setProducts} />

            </div>

        </>
    )
}
export default Stoke