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

