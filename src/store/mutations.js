import {
    GET_SELLER_INFO, GET_GOODS_INFO, GET_RATINGS_INFO
} from './mutationType';

export default {
    [GET_SELLER_INFO](state, {seller}) {
        state.seller = seller;
    },
    [GET_GOODS_INFO](state, {goods}) {
        state.goods = goods;
    },
    [GET_RATINGS_INFO](state, {ratings}) {
        state.ratings = ratings;
    }
};
