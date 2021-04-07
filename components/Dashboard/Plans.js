const Plans = ({ selectShop }) => {
    return (
        <div class="">
            <div class="text-center font-semibold">
                <h1 class="text-5xl">
                    <span>Escoge un </span>
                    <span class="text-blue-700 tracking-wide">PLAN </span>

                </h1>
                <p class="pt-6 text-xl text-gray-400 font-normal w-full px-8 md:w-full">
                    Elija un plan que funcione mejor para usted y <br />
                Su equipo.
</p>
            </div>
            <div class="pt-24 flex flex-row">
                <div class="w-96 p-8 bg-white text-center rounded-3xl pr-16 shadow-xl">
                    <h1 class="text-black font-semibold text-2xl">Basic</h1>
                    <p class="pt-2 tracking-wide">
                        <span class="text-gray-400 align-top">€ </span>
                        <span class="text-3xl font-semibold">29</span>
                        <span class="text-gray-400 font-medium">/ user</span>
                    </p>
                    <hr class="mt-4 border-1" />
                    <div class="pt-8">
                        <p class="font-semibold text-gray-400 text-left">
                            <span class="material-icons align-middle">
                                done
            </span>
                            <span class="pl-2">
                                1 <span class="text-black">Tienda</span>
                            </span>
                        </p>
                        <p class="font-semibold text-gray-400 text-left pt-5">
                            <span class="material-icons align-middle">
                                done
            </span>
                            <span class="pl-2">
                                Máximo de emplados <span class="text-black">2</span>
                            </span>
                        </p>
                        <p class="font-semibold text-gray-400 text-left pt-5">
                            <span class="material-icons align-middle">
                                done
            </span>
                            <span class="pl-2">
                                <span class="text-black">5 TB</span> cloud storage
            </span>
                        </p>

                        <div onClick={() => selectShop({ id: 'price_1Ib5ogCe4fd8DuK2IJ9yQlkG', name: "Basic", price: "29€/mes" })}>
                            <p class="w-full py-4 bg-blue-600 transition transform cursor-pointer hover:scale-105 mt-8 rounded-xl text-center text-white">
                                <span class="font-medium">
                                    Seleccionar Plan
                            </span>

                            </p>
                        </div>
                    </div>
                </div>
                <div class="w-80 p-8 bg-gray-900 text-center rounded-3xl text-white border-4 shadow-xl border-white transform scale-125">
                    <h1 class="text-white font-semibold text-2xl">Startup</h1>
                    <p class="pt-2 tracking-wide">
                        <span class="text-gray-400 align-top">$ </span>
                        <span class="text-3xl font-semibold">49</span>
                        <span class="text-gray-400 font-medium">/ mes</span>
                    </p>
                    <hr class="mt-4 border-1 border-gray-600" />
                    <div class="pt-8">
                        <p class="font-semibold text-gray-400 text-left">
                            <span class="material-icons align-middle">
                                done
            </span>
                            <span class="pl-2">
                                Hasta 2 <span class="text-white">tiendas</span>
                            </span>
                        </p>
                        <p class="font-semibold text-gray-400 text-left pt-5">
                            <span class="material-icons align-middle">
                                done
            </span>
                            <span class="pl-2">
                                Maximo de empleados <span class="text-white">
                                    8
                            </span>
                            </span>
                        </p>
                        <p class="font-semibold text-gray-400 text-left pt-5">
                            <span class="material-icons align-middle">
                                done
            </span>
                            <span class="pl-2">
                                <span class="text-white">15 TB</span> cloud storage
            </span>
                        </p>

                        <div onClick={() => selectShop({ id: 'price_1Ib6IrCe4fd8DuK2STyZEqLn', name: "Medium", price: "49€/mes" })}
                            class="">
                            <p class="w-full py-4 bg-blue-600 transition transform cursor-pointer hover:scale-105 mt-8 rounded-xl text-center text-white">
                                <span class="font-medium">
                                    Seleccionar Plan
                </span>
                            </p>
                        </div>
                    </div>
                    <div class="absolute top-4 right-4">
                        <p class="bg-blue-700 font-semibold px-4 py-1 rounded-full uppercase text-xs">Popular</p>
                    </div>
                </div>
                <div class="w-96 p-8 bg-white text-center rounded-3xl pl-16 shadow-xl">
                    <h1 class="text-black font-semibold text-2xl">Enterprise</h1>
                    <p class="pt-2 tracking-wide">
                        <span class="text-gray-400 align-top">€ </span>
                        <span class="text-3xl font-semibold">69</span>
                        <span class="text-gray-400 font-medium">/ mes</span>
                    </p>
                    <hr class="mt-4 border-1" />
                    <div class="pt-8">
                        <p class="font-semibold text-gray-400 text-left">
                            <span class="material-icons align-middle">
                                done
            </span>
                            <span class="pl-2">
                                Hasta 4 <span class="text-black">Tiendas</span>
                            </span>
                        </p>
                        <p class="font-semibold text-gray-400 text-left pt-5">
                            <span class="material-icons align-middle">
                                done
            </span>
                            <span class="pl-2">
                                Máximo de emplados <span class="text-black">16</span>
                            </span>
                        </p>
                        <p class="font-semibold text-gray-400 text-left pt-5">
                            <span class="material-icons align-middle">
                                done
            </span>
                            <span class="pl-2">
                                <span class="text-black">Unlimited</span> cloud storage
            </span>
                        </p>

                        <a href="#" class="">
                            <p class="w-full py-4 bg-blue-600 transition transform cursor-pointer hover:scale-105 mt-8 rounded-xl text-center text-white">
                                <span class="font-medium">
                                    Seleccionar Plan
                </span>
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Plans