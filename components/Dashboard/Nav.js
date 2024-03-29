import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "../app/Icon";
import { exitSession } from "../../functions/connectbackend";
import { getLocalStorage } from "../../functions/index";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import StorefrontIcon from "@material-ui/icons/Storefront";
import ExtensionIcon from "@material-ui/icons/Extension";
export default function Nav({ selectNav }) {
  const [nav, setNav] = useState({
    dashboard: false,
    tpv: false,
    client: false,
    products: false,
    ticket: false,
    config: false,
  });
  const [idShop, setIdShop] = useState(0);
  useEffect(() => {
    setNav({ ...nav, [selectNav]: true });
    setIdShop(getLocalStorage("id_Shop"));
  }, []);
  return (
    <nav className="w-24 flex flex-col items-center bg-white dark:bg-gray-800 py-4">
      <div className="cursor-pointer">
        <Link href="/dashboard">
          <img src="/images/icon.png" width="80" height="50" alt="logo" />
        </Link>
        <p className="text-center text-blue-600 font-bold opacity-30">
          {idShop}
        </p>
      </div>

      <ul className="my-auto text-gray-700 dark:text-gray-400 capitalize">
        <li
          className={`mt-3 p-2  dark:text-blue-300 rounded-lg ${
            nav.dashboard ? "text-blue-600" : "hover:text-blue-600"
          }`}
        >
          <Link href="/dashboard">
            <a className=" flex flex-col items-center ">
              <Icon
                icon="dashboard"
                bg={`${nav.dashboard ? "text-blue-600" : ""}`}
              />
              <span className="text-xs mt-2 font-semibold">Dashboard</span>
            </a>
          </Link>
        </li>
        <li
          className={`mt-3 p-2  dark:text-blue-300 rounded-lg ${
            nav.tpv ? "text-blue-600" : "hover:text-blue-600"
          }`}
        >
          <Link href="/tpv">
            <a className=" flex flex-col items-center ">
              <StorefrontIcon bg={`${nav.tpv ? "text-blue-600" : ""}`} />
              <span className="text-xs mt-2 font-semibold">TPV</span>
            </a>
          </Link>
        </li>

        <li
          className={`mt-3 p-2  dark:text-blue-300 rounded-lg ${
            nav.products ? "text-blue-600" : "hover:text-blue-600"
          }`}
        >
          <Link href="/dashboard/products">
            <a className=" flex flex-col items-center">
              <Icon icon="cartPlus" />
              <span className="text-xs mt-2 font-semibold">Productos</span>
            </a>
          </Link>
        </li>
        <li
          className={`mt-3 p-2  dark:text-blue-300 rounded-lg ${
            nav.ticket ? "text-blue-600" : "hover:text-blue-600"
          }`}
        >
          <Link href="/dashboard/ticket">
            <a className=" flex flex-col items-center">
              <ConfirmationNumberIcon className="fill-current h-5 w-5" />
              <span className="text-xs mt-2 font-semibold">Ticket</span>
            </a>
          </Link>
        </li>
      </ul>

      <div
        onClick={exitSession}
        className="mt-auto flex items-center cursor-pointer p-2 text-blue-600 bg-purple-200
dark:text-blue-500 rounded-full"
      >
        <div>
          <ExitToAppIcon className="fill-current h-5 w-5" />
        </div>
      </div>
    </nav>
  );
}
