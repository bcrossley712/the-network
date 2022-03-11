import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class BillboardsService {
  async getBillboards() {
    const res = await api.get('api/ads')
    logger.log('[getBillboards]', res.data)
    AppState.billboards = res.data
  }
}
export const billboardsService = new BillboardsService()