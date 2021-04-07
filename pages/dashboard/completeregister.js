import Plans from "../../components/Dashboard/Plans"
import { useState, useEffect } from "react"
import { Modal, AlertDialogSlide } from "../../components/app"
import Suscription from "../../components/stripe/Suscription"
import CssBaseline from '@material-ui/core/CssBaseline';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FormCreateShop, FormCreateAdmin } from "../../components/Form"
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import { CircularProgress } from "@material-ui/core"
import { getAllEmployeer } from "../../functions/connectbackend"
import { getLocalStorage } from "../../functions/index"
import { CODE_HTTP } from "../../functions/code"
const stripePromise = loadStripe('pk_test_51IaPbsCe4fd8DuK2vNvDUeiMuvFTixv3WvZwmu5YFyjjsIKda4sUCsFhog5thuBtviDJ9L92F0aEzZY6GSOSf7kK00fbHUeTBH');
const CompleteRegister = () => {
    const [modal, setModal] = useState(false)
    const [shop, setShop] = useState({})
    const [DataShop, setDataShop] = useState({})
    const [DataAdmin, setDataAdmin] = useState({})
    const [querys, setQuery] = useState({
        createShop: false,
        createAdmin: false,
    })
    const [verifypay, setVerifypay] = useState(0)
    const [step, setStep] = useState(0)
    const selectShop = (object) => {
        setShop(object)
        setModal(!modal)
    }
    useEffect(() => {
        if (verifypay === true) {
            alert('pagado')
            setStep(3)
        }
    }, [verifypay])
    useEffect(async () => {
        const arrayEmployer = await getAllEmployeer(getLocalStorage('token'))
        if (arrayEmployer.statusCode !== CODE_HTTP.NOT_FOUND) {
            location.href = './employeer'
        }
    }, [])
    const CreateShop = () => {

    }
    return (
        <>
            <Elements stripe={stripePromise}>
                <CssBaseline />
                <div className="font-sans bg-gray-100 ">
                    <div class="min-h-screen flex justify-center items-center">

                        <Plans selectShop={selectShop} />
                        <AlertDialogSlide active={modal} setActive={setModal}
                        >
                            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div class="sm:flex sm:items-start">

                                    <div class="w-full">
                                        <h1 class="text-xl text-center font-semibold mb-3">
                                            <span className="mr-1">Plan Seleccionado: <span class="text-blue-700 tracking-wide">{shop.name}</span></span>
|
                                            <span className="ml-1">Coste:  <span class="text-blue-700 tracking-wide"> {shop.price}</span> </span>
                                        </h1>
                                        {
                                            step === 0 ? <FormCreateShop setStep={setStep} setDataShop={setDataShop} /> : step === 1 ? <FormCreateAdmin setStep={setStep} setDataAdmin={setDataAdmin} /> : step === 2 ? < Suscription id_price={shop.id} verifypay={setVerifypay} /> : (
                                                <List component="nav" aria-label="main mailbox folders">
                                                    <ListItem >
                                                        <ListItemIcon>
                                                            {
                                                                querys.createShop ? '' : <CircularProgress size={30} />
                                                            }

                                                        </ListItemIcon>
                                                        <ListItemText primary="Creando tu primera Tienda" />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemIcon>
                                                            {
                                                                querys.createAdmin ? '' : <CircularProgress size={30} />
                                                            }
                                                        </ListItemIcon>
                                                        <ListItemText primary="Creando tu Usuario Admin" />
                                                    </ListItem>
                                                </List>
                                            )
                                        }


                                    </div>
                                </div>
                            </div>
                            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                {
                                    step > 1 ? '' : <button onClick={() => setModal(false)} type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                        Cambiar Plan        </button>
                                }


                            </div>

                        </AlertDialogSlide>
{/*                         <Modal active={modal} setActive={setModal}>


                        </Modal> */}
                    </div>
                </div>
            </Elements>
        </>
    )
}
export default CompleteRegister