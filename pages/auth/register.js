import Link from "next/link"
import { InputEmail, InputPassword, BtnSubmit } from "../../components/app"
import { useState } from "react"
import { checkPassword } from "../../functions/verification"
import { singup } from "../../functions/connectbackend"
import { errorAuth } from "../../functions/menssage"
import { CODE_HTTP } from "../../functions/code"
import { Modal, Icon } from "../../components/app"

export default function Register() {
    const [Credentials, setCredentials] = useState({ email: "", password: "", Cpassword: "", provider: "email" })
    const [error, setError] = useState('')
    const [modal, setModal] = useState(false)
    const [steps, setSteps] = useState({ steps: true, steps1: false, steps2: false })
    const saveCredentials = (e) => {
        setCredentials({ ...Credentials, [e.target.name]: e.target.value })
    }
    const Logging = async (e) => {
        e.preventDefault()
        setError("")
        if (!checkPassword(Credentials.password)) return setError("No Cumple los Requirimientos")
        if (!(Credentials.password === Credentials.Cpassword)) return setError('Contraseñas NO Coinciden')
        const query = await singup(Credentials)
        if (query.statusCode !== CODE_HTTP.SUCCESS) {
            return errorAuth(query.statusCode, setError)
        }
        setModal(true)
        setCredentials({ email: "", password: "", Cpassword: "", provider: "email" })
    }
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="md:w-6/12 w-full px-2 py-12 m-auto bg-white rounded-md shadow-md ">

                    <div className="max-w-md w-full space-y-8 m-auto">
                        <div>
                            <img className="mx-auto h-20 w-auto" src="/images/icon.png" alt="Workflow" />                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Registra tu tienda</h2>
                            <p className="mt-2 text-center text-sm text-gray-600">
                                <p className="font-medium text-blue-600 hover:text-blue-500"> y obtén 1 mes gratis</p>
                                <br />
                                <Link href="/auth">
                                    <a className="font-medium text-blue-600 hover:text-blue-500 mt-5">Si tienes cuenta Inicia Sesión</a>
                                </Link>
                            </p>
                        </div>
                        <form onSubmit={Logging} className="mt-8 space-y-6" action="#" method="POST">

                            <div className="rounded-md shadow-sm -space-y-px">
                                <InputEmail Change={saveCredentials} name="email" value={Credentials.email} placeholder="Correo Electrónico" rounded="t-md" />
                                <InputPassword Change={saveCredentials} name="password" value={Credentials.password} placeholder="Contraseña" rounded={false} />
                                <InputPassword Change={saveCredentials} name="Cpassword" value={Credentials.Cpassword} placeholder="Confirmar Contraseña" rounded="b-md" />
                            </div>
                            <p className=" text-center text-xs text-gray-600">
                                <p className="font-medium text-gray-600">* Utiliza ocho caracteres como mínimo con una combinación de letras, números y símbolos</p>
                            </p>

                            <p className=" text-center text-sm text-gray-600">
                                <p className="font-medium text-red-600 text-center hover:text-red-500">{error}</p>
                            </p>
                            <div>
                            <BtnSubmit icon="lock" bg="blue-600" hoverBg="blue-800" value="Registrar" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Modal active={modal}>
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                        <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                            <Icon icon="success" bg="text-green-700" />
                        </div>
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                Se ha registrado correctamente
            </h3>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500">
                                    Se ha enviado un correo Electrónico, para verificar su cuenta.
              </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button onClick={() => setModal(false)} type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                        Cerrar        </button>

                </div>

            </Modal>
        </>
    )
}
