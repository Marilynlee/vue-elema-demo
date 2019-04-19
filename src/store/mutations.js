import {
    GET_SELLER_INFO
} from './mutationType';

export default {
    [GET_SELLER_INFO](state, {sellerInfo}) {
        state.sellerInfo = sellerInfo;
    }
};
