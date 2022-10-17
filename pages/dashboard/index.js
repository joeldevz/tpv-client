import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../../components/Dashboard/Layaout";
import { setValuesDashboard } from "../../functions/dashboard";
import { Temperature } from "../../components/app/Widget";
import {
  CardIconLabel,
  CardShopIconLabel,
  CardAdd,
} from "../../components/app";
import { Grid } from "@material-ui/core";
import { PeopleOutline } from "@material-ui/icons";
import StorefrontIcon from "@material-ui/icons/Storefront";
import ReceiptIcon from "@material-ui/icons/Receipt";
import DescriptionIcon from "@material-ui/icons/Description";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
export default function Dashboard() {
  const [Sales, setSales] = useState(0);
  const [Client, setClient] = useState(0);
  const [SalesOnline, setSalesOnline] = useState(0);
  const [Invoiced, setInvoiced] = useState(0);
  useEffect(async () => {
    await setValuesDashboard({
      setSales,
      setClient,
      setSalesOnline,
      setInvoiced,
    });
  }, []);
  console.log(Sales);
  return (
    <>
      <Layout selectNav="dashboard">
        <Temperature />
        <div className="w-full py-4 ">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-6 md:col-span-3  transition    duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">
              <a
                href="#"
                className="flex flex-row p-4 bg-gray-50 rounded shadow-lg dark:bg-primary-black"
              >
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-blue-500 bg-blue-100 rounded-xl">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col flex-grow ml-4">
                  <div className="font-semibold text-gray-600 dark:text-gray-100 text-md">
                    Clientes
                  </div>
                  <div className="text-lg font-bold">{Client}</div>
                </div>
              </a>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-3   transition    duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">
              <div className="flex flex-row p-4 bg-gray-50 rounded shadow-lg dark:bg-primary-black">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-green-500 bg-green-100 rounded-xl">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col flex-grow ml-4">
                  <div className="font-semibold text-gray-600 dark:text-gray-100 text-md">
                    Ventas Físicas
                  </div>
                  <div className="text-lg font-bold">{Sales}</div>
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-3  transition    duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">
              <div className="flex flex-row p-4 bg-gray-50 rounded shadow-lg dark:bg-primary-black">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-yellow-500 bg-yellow-50 rounded-xl">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col flex-grow ml-4">
                  <div className="font-semibold text-gray-600 dark:text-gray-100 text-md">
                    Venta Online
                  </div>
                  <div className="text-lg font-bold">{SalesOnline}</div>
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-3  transition    duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">
              <div className="flex flex-row p-4 bg-gray-50 rounded shadow-lg dark:bg-primary-black">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-red-500 bg-red-100 rounded-xl">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col flex-grow ml-4">
                  <div className="font-semibold text-gray-600 dark:text-gray-100 text-md">
                    Facturado
                  </div>
                  <div className="text-lg font-bold">{Invoiced} €</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <div className="p-2">
              <h2 className="m-2 font-bold text-center text-xl bg-white text-blue-900 rounded-md shadow-md p-2">
                <ShoppingBasketIcon className="mr-3" />
                TPV
              </h2>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <CardIconLabel
                    icon={<PeopleOutline />}
                    uri="/dashboard/client"
                    color="blue"
                    label="Clientes"
                  />
                  <CardIconLabel
                    icon={<LocalOfferIcon />}
                    uri="/dashboard/products"
                    color="blue"
                    label="Productos"
                  />
                  <CardIconLabel
                    icon={<AccountBalanceWalletIcon />}
                    uri="/dashboard/box"
                    color="red"
                    label="Cierre de Caja"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CardIconLabel
                    icon={<ReceiptIcon />}
                    uri="/dashboard/ticket"
                    color="green"
                    label="Tickets"
                  />
                  <CardIconLabel
                    icon={<DescriptionIcon />}
                    color="green"
                    label="Facturas"
                  />
                  <CardIconLabel
                    icon={<AccountBalanceWalletIcon />}
                    uri="/dashboard/box/history"
                    color="red"
                    label="Historia de Caja"
                  />
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Grid item xs={12} md={3}>
            <div className="p-2">
              <h2 className="m-2 font-bold text-center text-xl bg-white text-blue-900 rounded-md shadow-md p-2">
                <LocalMallIcon className="mr-3" />
                Pedidos
              </h2>
              <CardAdd />
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <CardAdd />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}
