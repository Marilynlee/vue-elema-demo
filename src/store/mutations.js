import {
    GET_SELLER_INFO, GET_GOODS_INFO
} from './mutationType';

export default {
    [GET_SELLER_INFO](state, {sellerInfo}) {
        state.sellerInfo = sellerInfo;
    },
    [GET_GOODS_INFO](state, {goodsInfo}) {
        state.goods = goodsInfo;
    }
};
