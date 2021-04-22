import { CODE_HTTP } from "./code"
import { GetAllTicket } from "./connectbackend"
export const setValuesDashboard = async (ObjectSetValues) => {
    const Sales = 0;
    let Invoiced = 0
    const { setSales, setClient, setSalesOnline, setInvoiced } = ObjectSetValues
    const AllTicket = await GetAllTicket()
    if (AllTicket.statusCode !== CODE_HTTP.SUCCESS) {
        return false
    }
    setSales(AllTicket.data.length)
    AllTicket.data.forEach((ticket) => {
        Invoiced = Invoiced + ticket.priceAll
    })

    console.log(Invoiced)
    setInvoiced(Invoiced)
}