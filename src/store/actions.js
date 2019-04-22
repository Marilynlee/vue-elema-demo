import {
  GET_SELLER_INFO, GET_GOODS_INFO, GET_RATINGS_INFO
} from './mutationType';
import { request } from '../api';
const ERR_OK = 0;

export default {
  async getSellerInfo({commit}) {
    const result = await request('/api/seller');
    if (result.errno === ERR_OK) {
      const seller = result.data;
      commit(GET_SELLER_INFO, {seller});
    }
  },
  async getGoodsInfo({commit}) {
    const result = await request('/api/goods');
    if (result.errno === ERR_OK) {
      const goods = result.data;
      commit(GET_GOODS_INFO, {goods});
    }
  },
  async getRatingsInfo({commit}) {
    const result = await request('/api/ratings');
    if (result.errno === ERR_OK) {
      const ratings = result.data;
      commit(GET_RATINGS_INFO, {ratings});
    }
  }
};
