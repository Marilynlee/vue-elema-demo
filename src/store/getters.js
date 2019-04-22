export default {
  selectFoods(state) {
    let foods = [];
    state.goods.forEach(good => {
      good.foods.forEach(food => {
        if (food.count) {
          foods.push(food);
        }
      });
    });
    return foods;
  },
  totalPrice(state, getters) {
    let total = 0;
    getters.selectFoods.forEach((food) => {
      total += food.price * food.count;
    });
    return total;
  },
  totalCount(state, getters) {
    let count = 0;
    getters.selectFoods.forEach((food) => {
      count += food.count;
    });
    return count;
  }
};
