import {
	productsListActions,
	productDetailActions,
	productDeleteActions,
} from '../store';
import axios from 'axios';

export const productsFetching = () => {
	return (dispatch) => {
		const fetchProducts = async () => {
			try {
				dispatch(productsListActions.productsListRequest());
				const res = await axios.get('/api/products');
				dispatch(productsListActions.productsListSuccess(res.data));
			} catch (error) {
				dispatch(
					productsListActions.productsListFail(
						error.response && error.response.data.message
							? error.response.data.message
							: error.message
					)
				);
			}
		};

		fetchProducts();
	};
};
export const productDetails = (id) => {
	return (dispatch) => {
		const sendRequest = async () => {
			try {
				dispatch(productDetailActions.productDetailRequest());
				const res = await axios.get(`/api/products/${id}`);
				dispatch(productDetailActions.productDetailSuccess(res.data));
			} catch (error) {
				dispatch(
					productDetailActions.productDetailFail(
						error.response && error.response.data.message
							? error.response.data.message
							: error.message
					)
				);
			}
		};
		sendRequest();
	};
};
export const productDeleteById = (id) => {
	return (dispatch, getState) => {
		const sendRequest = async () => {
			try {
				dispatch(productDeleteActions.productDeleteRequest());

				const {
					userLogin: { userDetailsInfo },
				} = getState();

				const config = {
					headers: {
						Authorization: `Bearer ${userDetailsInfo.token}`,
					},
				};

				await axios.delete(`/api/products/${id}`, config);
				dispatch(productDeleteActions.productDeleteSuccess());
			} catch (error) {
				dispatch(
					productDeleteActions.productDeleteFail(
						error.response && error.response.data.message
							? error.response.data.message
							: error.message
					)
				);
			}
		};
		sendRequest();
	};
};
