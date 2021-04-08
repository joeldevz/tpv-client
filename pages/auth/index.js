import Link from "next/link"
import Head from "next/head"
import { useState } from "react"
import { InputEmail, InputPassword, BtnSubmit } from "../../components/app"
import { checkPassword } from "../../functions/verification"
import { singin } from "../../functions/connectbackend"
import { setLocalStorage } from "../../functions/index"
import { errorAuth } from "../../functions/menssage"
import { CODE_HTTP } from "../../functions/code"

export default function Register() {
    const [Credentials, setCredentials] = useState({ email: "", password: "" })
    const [error, setError] = useState('')

    const saveCredentials = (e) => {
        setCredentials({ ...Credentials, [e.target.name]: e.target.value })
    }
    const loggin = async (e) => {
        setError("")
        e.preventDefault()
        if (!checkPassword(Credentials.password)) return setError("No Cumple los Requirimientos")
        const query = await singin(Credentials)

        if (query.statusCode !== CODE_HTTP.SUCCESS) {
            return errorAuth(query.statusCode, setError)
        }
        setLocalStorage('token', query.data)
        location.href = "/dashboard/employeer"
    }
    return (
        <>
            <Head>
            </Head>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="md:w-6/12 w-full px-2 py-12 m-auto bg-white rounded-md shadow-md ">
                    <div className="max-w-md w-full space-y-8 m-auto">
                        <div>
                            <img className="mx-auto h-20 w-auto" src="/images/icon.png" alt="Workflow" />
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Inicio Sesion</h2>
                            <p className="mt-2 text-center text-sm text-gray-600">
                                <Link href="auth/register">
                                    <a className="font-medium text-blue-600 hover:text-blue-500"> o Registrate y obten 1 mes gratis</a></Link>
                            </p>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={loggin} action="#" method="POST">
                            <div className="rounded-md shadow-sm -space-y-px">
                                <InputEmail Change={saveCredentials} name="email" value={Credentials.email} placeholder="Correo Electrónico" rounded="t-md" />
                                <InputPassword Change={saveCredentials} name="password" value={Credentials.password} placeholder="Contraseña" rounded="b-md" />
                            </div>
                            <p className=" text-center text-sm text-gray-600">
                                <p className="font-medium text-red-600 hover:text-red-500">{error}</p>
                            </p>
                            <div>
                                <BtnSubmit icon="lock" bg="blue-600" hoverBg="blue-800" value="Iniciar Sesión" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
