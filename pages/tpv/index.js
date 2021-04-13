
import Store from "../../components/tpv/Store"
import Stoke from "../../components/tpv/Stoke"
import { Grid, Paper } from '@material-ui/core'
import Layout from "../../components/Dashboard/Layaout"
import { useState, useEffect } from "react"
import { printer, AddTicket } from "../../functions/connectbackend"
import { KeyPress } from "../../functions"
import { CODE_HTTP } from "../../functions/code"
export default function TPV() {
  const [Pay, setPay] = useState(false)
  const [products, setProducts] = useState([
  ])
  const [ticket, setTicket] = useState({
    client: {
      id_client: '',
      nameFull: '',
      address: '',
      mobile: '',
      cp: '',
      province: '',
      country: '',
    },
    products: [],
    priceAll: 0,
    descound: 0,
    methodPay: 'cash',
    currency: '€',
  })
  const SumAllProductPrice = () => {
    let allPrice = 0
    products.forEach(product => {
      allPrice = allPrice + product.price * product.count
    })
    setTicket({ ...ticket, priceAll: allPrice, products: products })
  }
  useEffect(() => {
    SumAllProductPrice()
  }, [products])
  const saveandprinter = async (printer) => {
    const query = await AddTicket(ticket)
    if (query.error && query.statusCode !== CODE_HTTP.SUCCESS) {
      return alert('Hay un Error')
    } if (query.error && query.statusCode === CODE_HTTP.SUCCESS) {
      return alert('No hay sufiente Stock')
    }
    alert("Compra Realizada")
    setProducts([
    ])
    setTicket({
      client: {
        id_client: 'ANONIMO',
        document: "ANONIMO",
        nameFull: 'ANONIMO',
        address: 'ANONIMO',
        mobile: 'ANONIMO',
        cp: 'ANONIMO',
        province: 'ANONIMO',
        country: 'ANONIMO',
      },
      products: [],
      priceAll: 0,
      descound: 0,
      methodPay: 'cash',
      currency: '€',
    })
    setPay(false)
    if (printer) {
      const print = printer(ticket)
      console.log('imprimiendo')
    }
  }

  return (
    < >
      <Layout selectNav='tpv'>
        <div className="h-full" onKeyPress={KeyPress} >
          <Grid container spacing={1} className="h-full" >
            <Grid item xs={12} md={7} className="h-full">
              <Paper className="h-full p-2" ><Store products={products} ticket={ticket} Pay={Pay} setPay={setPay} setTicket={setTicket} setProducts={setProducts} saveandprinter={saveandprinter} /></Paper>
            </Grid>
            <Grid item xs={12} md={5} className="h-full">
              <Paper className="h-full p-2" ><Stoke products={products} setProducts={setProducts} /></Paper>
            </Grid>
          </Grid>
        </div>
      </Layout>
    </>
  )
}
