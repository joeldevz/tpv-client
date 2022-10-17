import Head from "next/head";
import { useEffect, useState } from "react";
import { checkPassword } from "../functions/verification";
import { singin } from "../functions/connectbackend";
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from "../functions/index";
import { errorAuth } from "../functions/menssage";
import { CODE_HTTP } from "../functions/code";

export default function Register() {
  const [Credentials, setCredentials] = useState({ email: "", password: "" });
  const [visiblePass, setVisiblePass] = useState(true);
  const [error, setError] = useState("");

  const saveCredentials = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value });
  };
  const loggin = async (e) => {
    setError("");
    e.preventDefault();
    if (!checkPassword(Credentials.password))
      return setError("No Cumple los Requirimientos");
    const query = await singin(Credentials);

    if (query.statusCode !== CODE_HTTP.SUCCESS) {
      return errorAuth(query.statusCode, setError);
    }
    setLocalStorage("token", query.data);
    location.href = "/dashboard/employeer";
  };
  useEffect(() => {
    if (getLocalStorage("token")) {
      removeLocalStorage("token");
      location.href = "/dashboard/employeer";
    }
  }, []);
  return (
    <>
      <Head>
        <title>KOWE.app</title>
      </Head>

      <>
        <div className="bg-blue-600 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-blue-600 bottom-0 leading-5 h-full w-full overflow-hidden"></div>
        <div className="relative   min-h-screen  sm:flex sm:flex-row  justify-center bg-transparent rounded-3xl shadow-xl">
          <div className="hidden flex-col flex  self-center lg:px-14 sm:max-w-4xl xl:max-w-md  z-10">
            <div className="self-start hidden lg:flex flex-col  text-gray-300">
              <h1 className="my-3 font-semibold text-4xl">KOWE TPV</h1>
              <p className="pr-3 text-sm opacity-75">ADMINISTRA TU TIENDA</p>
            </div>
          </div>
          <form
            onSubmit={loggin}
            className="flex justify-center self-center  z-10"
          >
            <div className="p-12 bg-white shadow-lg mx-auto rounded-3xl w-96 ">
              <h2 className="font-semibold text-3xl text-blue-700  text-center mb-4">
                KOWE<small className="text-gray-800 ">.app</small>
              </h2>
              <h4 className="text-center text-red-400">{error}</h4>
              <div className="mb-7">
                <h3 className="font-semibold text-xl text-gray-800 text-center">
                  Sign In{" "}
                </h3>
                <p className="text-gray-400 invisible">
                  Don'thave an account?{" "}
                  <a
                    href="#"
                    className="text-sm text-blue-700 hover:text-blue-700"
                  >
                    Sign Up
                  </a>
                </p>
              </div>
              <div className="space-y-6">
                <div className="">
                  <input
                    className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={saveCredentials}
                    value={Credentials.email}
                  />
                </div>

                <div className="relative">
                  <input
                    placeholder="Password"
                    type={visiblePass ? "password" : "text"}
                    onChange={saveCredentials}
                    name="password"
                    value={Credentials.password}
                    className="text-sm text-gray-700 px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-blue-400"
                  />
                  <div className="flex items-center absolute inset-y-0 right-0 mr-3  text-sm leading-5">
                    {visiblePass ? (
                      <svg
                        className="h-4 text-blue-700 cursor-pointer"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                        onClick={() => setVisiblePass(false)}
                      >
                        <path
                          fill="currentColor"
                          d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="h-4 text-blue-700 cursor-pointer"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                        onClick={() => setVisiblePass(true)}
                      >
                        <path
                          fill="currentColor"
                          d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                        ></path>
                      </svg>
                    )}
                  </div>
                </div>

                <div className="flex items-center  invisible justify-between">
                  <div className="text-sm ml-auto">
                    <a href="#" className="text-blue-700 hover:text-blue-600">
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center bg-blue-800  hover:bg-blue-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                  >
                    Sign in
                  </button>
                </div>
              </div>
              <div className="mt-7 text-center text-gray-600 text-xs">
                <span>
                  Copyright © 2021-2023
                  <a
                    href="https://umibu.io/"
                    rel=""
                    target="_blank"
                    title="Codepen aji"
                    className="text-blue-500 hover:text-blue-600 "
                  >
                    UMIBU
                  </a>
                </span>
              </div>
            </div>
          </form>
        </div>

        <footer className="hidden bg-transparent absolute w-full bottom-0 left-0 z-30">
          <div className="container p-5 mx-auto  flex items-center justify-between ">
            <div className="flex mr-auto">
              <a
                href="https://umibu.io/"
                target="_blank"
                title="codepen aji"
                className="text-center text-gray-700 focus:outline-none"
              >
                <img
                  src="/storage/avatars/njkIbPhyZCftc4g9XbMWwVsa7aGVPajYLRXhEeoo.jpg"
                  alt="aji"
                  className="object-cover mx-auto w-8 h-8 rounded-full w-10 h-10"
                />
                <p className="text-xl">
                  UMIBU<strong>mon</strong>
                </p>{" "}
              </a>
            </div>
          </div>
        </footer>
      </>
    </>
  );
}
