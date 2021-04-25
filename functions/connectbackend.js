import { URI } from '../config'
import { getLocalStorage, setLocalStorage, removeLocalStorage } from "./index"
import { CODE_HTTP } from "./code"
export const exitSession = () => {
    removeLocalStorage('tokenSession')
    location.href = '/dashboard/employeer'
}
export const singin = async (body) => {
    return fetch(`${URI}/singin`,
        {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(body)
        })
        .then((res) => res.json())
        .then((res) => {
            return res
        })
        .catch((err) => {
            console.log(err)
        })

}
export const singup = async (body) => {
    return fetch(`${URI}/singup`,
        {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(body)

        })
        .then((res) => res.json())
        .then((res) => {
            return res
        })
        .catch((err) => {
            console.log(err)
        })
}
export const getAllEmployeer = async () => {
    return fetch(`${URI}/employee/all`,
        {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + getLocalStorage('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then((res) => res.json())
        .then((res) => {
            return res
        })
        .catch((err) => {
            console.log(err)
        })

}
export const GetAllClient = () => {
    return [{
        name: "christopher",
        lastName: "zambrano",
        document: "09824082t",
        email: "cjmz89@gmail.com"
    }]
}
export const LoginEmployer = async (body) => {
    return await fetch(`${URI}/employee/singin`,
        {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + getLocalStorage('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(body)
        })
        .then((res) => res.json())
        .then((res) => {
            return res
        })
        .catch((err) => {
            console.log(err)
        })
}
export const getStatics = () => {

}
export const Sendprinter = async (params) => {
    console.log(params)
    let iva21 = 0;
    let iva10 = 0;
    let iva4 = 0;
    /*         { text: "", align: "LEFT", width: 0.25 },
        { text: "", align: "LEFT", width: 0.25 },
        { text: "TOTAL", align: "RIGHT", width: 0.25 },
        { text: "11000.64", align: "RIGHT", width: 0.25 }, */
    const setIva21 = (priceAll) => {
        iva21 = iva21 + priceAll * 0.21
    }
    const setIva10 = (priceAll) => {
        iva10 = iva10 + priceAll * 0.10
    }
    const setIva4 = (priceAll) => {
        iva4 = iva4 + priceAll * 0.04

    }
    const IvaDiccionary = {
        '21': setIva21,
        '10': setIva10,
        '4': setIva4
    }
    function formatoFecha(fecha, formato) {
        const map = {
            dd: fecha.getDate(),
            mm: fecha.getMonth() + 1,
            yy: fecha.getFullYear().toString().slice(-2),
            yyyy: fecha.getFullYear()
        }
        return formato.replace(/dd|mm|yyyy/gi, matched => map[matched])
    }
    let option = {
        business: {
            name: 'TECNOSERVICES',
            logo: '',
            url: "https://tecnoservices.es",
            info: [
                { text: "Gerardo Diego,8 local 8,", align: "CENTER", width: 1, bold: false },
                { text: "28806 Alcalá de Henares", align: "CENTER", width: 1, bold: false },
                /*  { text: "NIE: 0000000T", align: "CENTER", width: 1, bold: true }, */
                { text: `FECHA: ${formatoFecha(new Date, 'dd/mm/yyyy')}`, align: "CENTER", width: 1, bold: false },
                { text: `Atendido ${getLocalStorage('User')}`, align: "CENTER", width: 1, bold: false },
            ],
        },
        NTicket: `Nº Ticket ${params.Nticket}`,
        products: [],
        price: [],
        printer: {
            interface: 'tcp://192.168.1.100',
            width: 48
        }
    }
    params.products.forEach(product => {
        let labelname;
        if (!product.label) {
            labelname = product.title || product.name
            if (labelname.length > 18) {
                labelname = product.title.slice(0, 18) + '..'
            }
        } else {
            labelname = product.label
        }

        //"ORDENADOR MSI ..."
        option.products.push({ text: product.count, align: "LEFT", width: 0.125 },
            { text: labelname, align: "LEFT", width: 0.445 },
            { text: (product.price).toFixed(2), align: "RIGHT", width: 0.20 },
            { text: (product.price * product.count).toFixed(2), align: "RIGHT", width: 0.20 })
        IvaDiccionary[`${product.iva}`](product.price * product.count)
    });
    const endTicket = () => {
        if (iva21 > 0) {
            option.price.push(
                { text: "", align: "LEFT", width: 0.25 },
                { text: "", align: "LEFT", width: 0.25 },
                { text: "IVA-21%", align: "RIGHT", width: 0.25 },
                { text: iva21 + '€', align: "RIGHT", width: 0.25 },
            )
        }
        if (iva10 > 0) {
            option.price.push(
                { text: "", align: "LEFT", width: 0.25 },
                { text: "", align: "LEFT", width: 0.25 },
                { text: "IVA-10%", align: "RIGHT", width: 0.25 },
                { text: iva10 + '€', align: "RIGHT", width: 0.25 },
            )
        }
        if (iva4 > 0) {
            option.price.push(
                { text: "", align: "LEFT", width: 0.25 },
                { text: "", align: "LEFT", width: 0.25 },
                { text: "IVA-4%", align: "RIGHT", width: 0.25 },
                { text: iva4 + '€', align: "RIGHT", width: 0.25 },
            )
        }
        option.price.push(
            { text: "", align: "LEFT", width: 0.25 },
            { text: "", align: "LEFT", width: 0.25 },
            { text: "TOTAL", align: "RIGHT", width: 0.25 },
            { text: params.priceAll + '€', align: "RIGHT", width: 0.25 },
        )
    }
    endTicket()
    return fetch(`http://localhost:4000/printer`,
        {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(option)
        })
        .then((res) => res.json())
        .then((res) => {
            return res
        })
        .catch((err) => {
            console.log(err)
        })
}
export const OpenBox = async () => {
    let option = {
        printer: {
            interface: 'tcp://192.168.1.100',
            width: 48
        }
    }
    return fetch(`http://localhost:4000/open`,
        {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(option)

        })
        .then((res) => res.json())
        .then((res) => {
            return res
        })
        .catch((err) => {
            console.log(err)
        })
}
export const GetAllProductShop = async () => {
    return fetch(`${URI}/product/allByShop?id=${getLocalStorage('id_Shop')}`,
        {
            method: 'get', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${getLocalStorage('tokenSession')}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then((res) => res.json())
        .then((res) => {
            return res
        })
        .catch((err) => {
            console.log(err)
        })
}
export const GetProductShop = async (code) => {
    return fetch(`${URI}/product/code?id=${code}`,
        {
            method: 'get', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${getLocalStorage('tokenSession')}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then((res) => res.json())
        .then((res) => {
            return res
        })
        .catch((err) => {
            console.log(err)
        })
}
export const AddProductShop = async (params) => {
    const template = {
        id_Shop: getLocalStorage('id_Shop'),
        ...params
    }
    return fetch(`${URI}/product/create`,
        {
            method: 'post', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${getLocalStorage('tokenSession')}`
                // 'Content-Type': 'application/x-www-form-urlencoded',

            },
            body: JSON.stringify(template)
        })
        .then((res) => res.json())
        .then((res) => {
            return res
        })
        .catch((err) => {
            console.log(err)
        })
}
export const UpdateProductShop = async (params) => {
    const template = {
        id_Shop: getLocalStorage('id_Shop'),
        ...params
    }
    console.log(template)
    return fetch(`${URI}/product/update`,
        {
            method: 'put', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${getLocalStorage('tokenSession')}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(template)
        })
        .then((res) => res.json())
        .then((res) => {
            return res
        })
        .catch((err) => {
            console.log(err)
        })
}
export const DeleteProductShop = async (params) => {
    const template = {
        id_Shop: getLocalStorage('id_Shop'),
        ...params
    }
    console.log(template)
    return fetch(`${URI}/product/remove`,
        {
            method: 'put', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${getLocalStorage('tokenSession')}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(template)
        })
        .then((res) => res.json())
        .then((res) => {
            return res
        })
        .catch((err) => {
            console.log(err)
        })
}
export const AddTicket = async (params) => {
    const template = {
        id_Shop: getLocalStorage('id_Shop'),
        employee: getLocalStorage('User'),
        ...params
    }
    return fetch(`${URI}/ticket/create`,
        {
            method: 'post', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${getLocalStorage('tokenSession')}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(template)
        })
        .then((res) => res.json())
        .then((res) => {
            return res
        })
        .catch((err) => {
            console.log(err)
        })
}

export const GetAllTicket = async (params) => {
    const template = {
        id_Shop: getLocalStorage('id_Shop'),
        employee: getLocalStorage('User'),
        ...params
    }
    return fetch(`${URI}/ticket/allByShop?id=${getLocalStorage('id_Shop')}`,
        {
            method: 'post', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${getLocalStorage('tokenSession')}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(template)
        })
        .then((res) => res.json())
        .then((res) => {
            return res
        })
        .catch((err) => {
            console.log(err)
        })
}
export const GetOneTicket = async (Nticket) => {

    return fetch(`${URI}/ticket/code?id=${Nticket}`,
        {
            method: 'get', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${getLocalStorage('tokenSession')}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then((res) => res.json())
        .then((res) => {
            return res
        })
        .catch((err) => {
            console.log(err)
        })
}
export const GetAllShop = async () => {

    return fetch(`${URI}/shop/all`,
        {
            method: 'get', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${getLocalStorage('token')}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then((res) => res.json())
        .then((res) => {
            return res
        })
        .catch((err) => {
            console.log(err)
        })
}