import {
  GET_SELLER_INFO
} from './mutationType';

export default {
  getSellerInfo({
      commit
    }, {
      sellerInfo
    }) {
    this.commit(GET_SELLER_INFO, {
      sellerInfo
    });
  }
};
