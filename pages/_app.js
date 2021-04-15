
import "../styles/index.css"
import { KeyPress } from "../functions/index"
import { useEffect, useState } from "react"
import { Alert } from "../components/app"

function MyApp({ Component, pageProps }) {
  const [Error, setError] = useState({
    active: false,
    color: '',
    msg: '',
    time: 6000
  })
  useEffect(() => {
    /*window.addEventListener('keypress', (event) => {
      KeyPress(event, setError)
    }, []);*/
  })
  return <>
    <Alert option={{ Alert: Error, setAlert: setError }} />
    <Component {...pageProps} />
  </>
}
export default MyApp
