import { CardCategory, InputText, InputNumber, Select, BtnSubmit } from "../app"
import { useState } from "react"
import { AddProduct } from "../Form"
import { TextField } from "@material-ui/core"

const Stoke = ({ setProducts, products }) => {


    return (
        <>
            <div class="flex flex-col rounded-lg overflow-hidden sm:flex-row w-full" >
                <input class="py-1  px-3 bg-gray-200 text-gray-900 w-full border-gray-300 border-2 outline-none placeholder-gray-500 focus:bg-gray-100" type="text" name="email" placeholder="Buscar Producto/Servicio" />
                <button class="py-3 px-4 bg-gray-900 text-gray-100 font-semibold uppercase hover:bg-gray-600">Buscar</button>
            </div>
            <div className="overflow-auto my-5" style={{ height: 75 + '%' }}>
                <div class="p-5 m-auto  grid grid-cols-1 md:grid-cols-3  xl:grid-cols-4 gap-3 overflow-auto">
                    <CardCategory name="DESCUENTOS" img="/category/descounts.png" />
                    <CardCategory name="hola" img="category/category.png" />
                    <CardCategory name="hola" img="category/category.png" />
                    <CardCategory name="hola" img="category/category.png" />

                </div>
            </div>
            <div className="grid grid-cols-12 gap-2  ">
                <TextField type="number" id="price" label="Código" className="w-full col-span-2" variant="outlined" />

                <AddProduct  products={products} setProducts={setProducts} />

            </div>

        </>
    )
}
export default Stoke