import { configureStore } from '@reduxjs/toolkit';

import productsListSlice from './reducers/productsListReducer';
import productDetailSlice from './reducers/productDetailReducer';
import productDeleteSlice from './reducers/productDeleteReducer';
import productCreateSlice from './reducers/productCreateReducer';
import productUpdateSlice from './reducers/productUpdateReducer';
import reviewCreateSlice from './reducers/reviewCreateReducer';
import topProductsListSlice from './reducers/topProductsReducer';

import categorySlice from './reducers/categoryReducer';

import userLoginSlice from './reducers/userLoginReducer';
import userRegisterSlice from './reducers/userRegisterReducer';
import userDetailsSlice from './reducers/userDetailReducer';
import userUpdateSlice from './reducers/updateUserReducer';
import usersListSlice from './reducers/usersListReducer';
import userDeleteSlice from './reducers/userDeleteReducer';
import userDetailsByAdminSlice from './reducers/userDetailsByAdminReducer';
import userUpdateByAdminSlice from './reducers/updateUserByAdminReducer';

import paymentSlice from './reducers/paymentReducer';
import cartItemsSlice from './reducers/cartReducer';


import orderSlice from './reducers/orderReducer';
import orderDetailsSlice from './reducers/orderDetailsReducer';
import orderPaySlice from './reducers/orderPayReducer';
import ordersUserListSlice from './reducers/ordersUserListReducer';
import ordersAdminListSlice from './reducers/ordersAdminListReducer';
import orderDeliverSlice from './reducers/orderDeliverReducer';

const store = configureStore({
	reducer: {
		products: productsListSlice.reducer,
		product: productDetailSlice.reducer,
		productDelete: productDeleteSlice.reducer,
		productCreate: productCreateSlice.reducer,
		productUpdate: productUpdateSlice.reducer,
		reviewCreate: reviewCreateSlice.reducer,
		topProducts: topProductsListSlice.reducer,

		category: categorySlice.reducer,

		cart: cartItemsSlice.reducer,
		payment: paymentSlice.reducer,


		order: orderSlice.reducer,
		orderDetails: orderDetailsSlice.reducer,
		orderPay: orderPaySlice.reducer,
		orderDeliver: orderDeliverSlice.reducer,
		ordersUserList: ordersUserListSlice.reducer,
		ordersAdminList: ordersAdminListSlice.reducer,

		userLogin: userLoginSlice.reducer,
		userRegister: userRegisterSlice.reducer,
		userDetails: userDetailsSlice.reducer,
		userUpdate: userUpdateSlice.reducer,
		usersList: usersListSlice.reducer,
		userDelete: userDeleteSlice.reducer,
		userDetailsByAdmin: userDetailsByAdminSlice.reducer,
		userUpdateByAdmin: userUpdateByAdminSlice.reducer,
	},
});
export const productsListActions = productsListSlice.actions;
export const productDetailActions = productDetailSlice.actions;
export const productDeleteActions = productDeleteSlice.actions;
export const productCreateActions = productCreateSlice.actions;
export const productUpdateActions = productUpdateSlice.actions;
export const reviewCreateActions = reviewCreateSlice.actions;
export const topProductsListActions = topProductsListSlice.actions;

export const categoryActions = categorySlice.actions;

export const cartActions = cartItemsSlice.actions;
export const paymentActions = paymentSlice.actions;

export const orderActions = orderSlice.actions;
export const orderDetailsActions = orderDetailsSlice.actions;
export const orderPayActions = orderPaySlice.actions;
export const orderDeliverActions = orderDeliverSlice.actions;
export const ordersUserListActions = ordersUserListSlice.actions;
export const ordersAdminListActions = ordersAdminListSlice.actions;

export const userLoginActions = userLoginSlice.actions;
export const userRegisterActions = userRegisterSlice.actions;
export const userDetailsActions = userDetailsSlice.actions;
export const userUpdateActions = userUpdateSlice.actions;
export const usersListActions = usersListSlice.actions;
export const userDeleteActions = userDeleteSlice.actions;
export const userDetailsByAdminActions = userDetailsByAdminSlice.actions;
export const userUpdateByAdminActions = userUpdateByAdminSlice.actions;

export default store;
