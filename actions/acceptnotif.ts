import axios from 'axios'
import { ENDPOINTS } from '@/urls'

export const getRefuseNotification = async (id : string) => {
    const response = await axios.get(ENDPOINTS.acceptswapRequest(id))
    return response.data
}
