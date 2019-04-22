import {
  GET_SELLER_INFO, GET_GOODS_INFO
} from './mutationType';
import { request } from '../api';
const ERR_OK = 0;

export default {
  async getSellerInfo({commit}) {
    const result = await request('/api/seller');
    if (result.errno === ERR_OK) {
      const sellerInfo = result.data;
      commit(GET_SELLER_INFO, {sellerInfo});
    }
  },
  async getGoodsInfo({commit}) {
    const result = await request('/api/goods');
    if (result.errno === ERR_OK) {
      const goodsInfo = result.data;
      commit(GET_GOODS_INFO, {goodsInfo});
    }
  }
};
