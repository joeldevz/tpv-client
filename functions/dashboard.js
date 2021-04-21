import { CODE_HTTP } from "./code"
import { GetAllTicket } from "./connectbackend"
export const setValuesDashboard = async (setSales, ObjectSetValues) => {
    const Sales = 0;
    const Invoiced = 0
    const { setClient, setSalesOnline, setInvoiced } = ObjectSetValues
    const AllTicket = await GetAllTicket()
    if (AllTicket.statusCode !== CODE_HTTP.SUCCESS) {
        return false
    }
    setSales(AllTicket.data.length)

    /*     AllTicket.data.forEach((ticket) => {
    
        }) */
}