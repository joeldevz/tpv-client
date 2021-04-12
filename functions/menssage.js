const Auth = {
    404: 'USUARIO NO ENCONTRADO',
    401: "CREDENCIALES INCORRECTAS",
    409: "EL CORREO YA ESTÁ EN USO"
};
const ShopError = {
    name: "Escriba un Nombre",
    address: "Escriba una Dirección",
    city: "Seleccione una ciudad",
    province: "Seleccione una provincia",
    cp: "Introduzca un CP valido",
    category: "Elige una Categoria",
    description: "Escriba una breve descripción",
    count: "Escriba una cantidad",
}
const CreateEmployeer = {
    pin: "Introduzca un Pin de 4 dígitos",
    pinverify: "Los Pin no coinciden "
}
export const errorFormShop = (ERROR) => {
    return ShopError[ERROR] + ' para continuar...'
}
export const errorAuth = (CODE, callback) => {
    return callback(Auth[CODE])
}
export const errorCreateEmployeer = (Code) => {
    return CreateEmployeer[Code]
}