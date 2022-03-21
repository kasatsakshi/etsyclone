import { addCartSuccess, addCartFailure } from "./cartRedux";

export const addToCart = async (dispatch, order) => {
  try {
    await dispatch(addCartSuccess(order));
  } catch (err) {
    console.log(err);
     dispatch(addCartFailure());
  }
}
