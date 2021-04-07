export const checkPassword = (password) => {
    if (password.length < 8) return false;
    const regxs = {
        "lower": /^[a-z0-9]+$/,
        "upper": /^[A-Z0-9]+$/,
        "upperLower": /^[A-Za-z0-9]+$/,
    }
    if (regxs.lower.test(password)) return false;
    if (regxs.upper.test(password)) return false;
    if (regxs.upperLower.test(password)) return true;

}
export const checkEmail = (email) => {
    const regxs = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-iZ]{2,}))$/;
    return regxs.test(String(email).toLowerCase());
}