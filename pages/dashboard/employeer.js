import { useEffect, useState } from "react";
import { DiccionaryAvatar } from "../../config";
import {
  getAllEmployeer,
  LoginEmployer,
  GetAllShop,
} from "../../functions/connectbackend";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "../../functions/index";
import { AlertDialogSlide } from "../../components/app";
import { errorAuth } from "../../functions/menssage";
import { CODE_HTTP } from "../../functions/code";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

export default function employeer() {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: "100%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const [listShop, setListShop] = useState([]);
  const [loginUser, setLoginUser] = useState({
    nickname: "",
    pin: "",
    id_Shop: "",
  });

  const classes = useStyles();
  useEffect(async () => {
    if (!getLocalStorage("token")) {
      removeLocalStorage("token");
      removeLocalStorage("tokenSession");
      location.href = "/";
    }
    const ListShop = await GetAllShop();
    const arrayEmployer = await getAllEmployeer(getLocalStorage("token"));
    if (arrayEmployer.statusCode === CODE_HTTP.NOT_FOUND) {
      return (location.href = "./completeregister");
    }
    if (arrayEmployer.statusCode !== CODE_HTTP.SUCCESS) {
      return (location.href = "./completeregister");
    }
    setUsers(arrayEmployer.data);
    setListShop(ListShop.data);
    setLoginUser({
      ...loginUser,
      id_Shop: getLocalStorage("id_Shop") || undefined,
    });
  }, []);
  const [modal, setModal] = useState(false);
  const [Pin, setPin] = useState({
    code1: "",
    code2: "",
    code3: "",
    code4: "",
  });
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const setNickname = (nickname) => {
    setLoginUser({ ...loginUser, nickname, pin: "" });
    setModal(!modal);
  };
  const setIdShop = (id_Shop) => {
    setLoginUser({ ...loginUser, id_Shop: id_Shop.target.value });
  };
  const closeLoggin = () => {
    setLoginUser({ ...loginUser, nickname: "", pin: "" });
    setModal(!modal);
    setPin({ code1: "", code2: "", code3: "", code4: "" });
  };
  const changeinput = (e) => {
    if (isNaN(e.target.value)) return;
    setPin({
      ...Pin,
      [e.target.name]: e.target.value[0] === undefined ? "" : e.target.value[0],
    });
    if (e.target.nextElementSibling) {
      e.target.nextElementSibling.focus();
    }
    if (e.target.name === "code4") {
      setLoginUser({
        ...loginUser,
        pin: `${Pin.code1}${Pin.code2}${Pin.code3}${e.target.value[0]}`,
      });
    }
  };
  const ExitLogin = () => {
    removeLocalStorage("token");
    location.href = "../";
  };

  useEffect(async () => {
    if (loginUser.nickname.length <= 0 || loginUser.nickname === undefined)
      return;
    if (loginUser.pin.length < 4) return;
    if (loginUser.id_Shop === "" || loginUser.id_Shop === undefined) return;
    const dataEmployer = await LoginEmployer(loginUser);
    if (dataEmployer.statusCode !== CODE_HTTP.SUCCESS) {
      errorAuth(401, setError);
      setPin({ code1: "", code2: "", code3: "", code4: "" });
      setLoginUser({ ...loginUser, pin: "" });
    } else {
      setLocalStorage("tokenSession", dataEmployer.data);
      setLocalStorage("id_Shop", loginUser.id_Shop);
      setLocalStorage("User", loginUser.nickname);
      location.href = "../dashboard";
    }
  }, [loginUser]);
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-900 to-blue-600">
      <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12 w-6/12 m-auto">
        <div
          className={`grid grid-cols-${
            users.length > 5 ? "6" : 2
          } gap-2  m-auto`}
        >
          {users.map((item) => (
            <div
              key={item.nickname}
              onClick={() => setNickname(item.nickname)}
              className="relative py-3 sm:max-w-xl sm:mx-auto  w-6/12  flex flex-col transform hover:scale-105 cursor-pointer"
            >
              <div className="p-3 mx-auto">
                <a
                  href=""
                  className="text-xl uppercase font-bold text-gray-200 "
                ></a>
              </div>
              <div className="w-full">
                <img
                  className="w-10/12 m-auto rounded-full shadow-md"
                  src={DiccionaryAvatar[item.avatar]}
                />
              </div>
              <div className="mt-2 mx-auto font-semibold text-center">
                <p className="font-mono uppercase text-lg text-gray-200">
                  {item.nickname}
                </p>
                <small className="text-gray-400">
                  {item.rol.toUpperCase()}
                </small>
              </div>
            </div>
          ))}
          <AlertDialogSlide active={modal} setActive={setModal}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Selecciona Tienda
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={loginUser.id_Shop}
                      onChange={setIdShop}
                      label="Selecciona Tienda"
                    >
                      {listShop.map((shop) => (
                        <MenuItem key={shop.id_Shop} value={shop.id_Shop}>
                          {shop.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <h3
                    className="text-lg text-center leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Introduzca Pin
                  </h3>
                  <div className="mt-2 w-full">
                    <div className="m-auto p-5">
                      <div className="grid grid-cols-4">
                        <input
                          name="code1"
                          value={Pin.code1}
                          onChange={changeinput}
                          className=" shadow-md w-16 h-20 m-2 rounded leading-3 text-center text-2xl focus:border-indigo-500 border border-black "
                          type="password"
                          min="0"
                          step="1"
                          autoFocus="autofocus"
                        />
                        <input
                          name="code2"
                          value={Pin.code2}
                          onChange={changeinput}
                          className=" shadow-md w-16 h-20 m-2 rounded leading-3 text-center text-2xl focus:border-indigo-500 border border-black"
                          type="password"
                          min="0"
                          step="1"
                        />
                        <input
                          name="code3"
                          value={Pin.code3}
                          onChange={changeinput}
                          className=" shadow-md w-16 h-20 m-2 rounded leading-3 text-center text-2xl focus:border-indigo-500 border border-black"
                          type="password"
                          min="0"
                          step="1"
                        />
                        <input
                          name="code4"
                          value={Pin.code4}
                          onChange={changeinput}
                          className=" shadow-md w-16 h-20 m-2 rounded leading-3 text-center text-2xl focus:border-indigo-500 border border-black"
                          type="password"
                          min="0"
                          step="1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center text-red-600">{error}</div>
            <div className="bg-gray-50 px-4 py-3  text-center ">
              <button
                onClick={closeLoggin}
                type="button"
                className="mt-3   inline-flex justify-center rounded-md border border-red-300 shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                ¿No eres tú? Cerrar
              </button>
            </div>
          </AlertDialogSlide>
        </div>
        <button
          onClick={ExitLogin}
          type="button"
          className="mt-3   inline-flex justify-center rounded-md border border-red-300 shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
