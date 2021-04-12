import { OpenBox } from "./connectbackend"
export const setLocalStorage = (name, value, json) => {
    if (localStorage) {
        try {
            if (json) {
                localStorage.setItem(name, JSON.stringify(value));
            } else {
                localStorage.setItem(name, value);
            }
            return true;
        } catch (error) {
            return false;
        }
    }
};
export const getLocalStorage = (name, json) => {
    if (localStorage) {
        try {
            let result;
            if (json) {
                result = localStorage.getItem(name);
                result = JSON.parse(result);
            } else {
                result = localStorage.getItem(name);
            }
            if (result == null) {
                return false;
            }
            return result;
        } catch (error) {
            return false;
        }
    }
};

export const removeLocalStorage = (name) => {
    if (localStorage) {
        try {
            localStorage.removeItem(name);
        } catch (error) {
            return false;
        }
    }
};
const Keys = {
    'KeyO': OpenBox
}
const action = async (code) => {
    const callback = Keys[code]
    if (callback === undefined) {
        return { error: false, data: 'Comando no Existe' }
    }
    try {
        let result = await callback()
        if (result.status != 200) {
            return { error: false, data: 'Error en el Comando' }
        }
        return { error: true, data: "Correcto" }

    } catch (error) {
        return { error: false, data: 'Error en el Comando' }
    }

}
export const KeyPress = async (event, alert) => {
    const code = event.code
    if (event.shiftKey) {
        const accion = await action(code)
        console.log(code, accion)

        if (accion.error === false) {
            alert({
                active: true,
                color: 'warning',
                msg: accion.data,
                time: 6000
            })
            return
        }
        alert({
            active: true,
            color: 'success',
            msg: accion.data,
            time: 6000
        })

    }
}

export const generateCodBarras = (num) => {
    num = num + 2;
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1 = Math.random().toString(36).substring(2, num);

    return result1;
};
