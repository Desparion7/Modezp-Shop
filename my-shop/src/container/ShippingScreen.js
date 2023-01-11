import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Checkout from '../components/Checkout';
import { updateUserProfile, getUserDetails } from '../actions/usersActions';
import './ShippingScreen.css';

const ShippingScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [addressName, setAddressName] = useState('');
	const [surname, setSurname] = useState('');
	const [street, setStreet] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [city, setCity] = useState('');
	const [phone, setPhone] = useState('');
	const [delivery, setDelivery] = useState('Poczta list polecony 0 zł');
	const [deliveryPrice, setDeliveryPrice] = useState(0);

	const userInfo = useSelector((state) => state.userLogin);
	const { userDetailsInfo } = userInfo;

	const userDetails = useSelector((state) => state.userDetails);
	const { user: userDetailsInformation } = userDetails;

	const cartItems = useSelector((state) => state.cart.cartItems);
	const fullPrice = cartItems
		.reduce((acc, item) => acc + item.qty * item.price, 0)
		.toFixed(2);
	const FullPriceWithDelivery = (+fullPrice + deliveryPrice).toFixed(2);
	useEffect(() => {
		if (!userDetailsInfo) {
			navigate('/login');
		}
		if (
			!userDetailsInformation._id ||
			userDetailsInformation._id !== userDetailsInfo._id
		) {
			dispatch(getUserDetails('profile'));
		}
		if (userDetailsInformation.addressName) {
			setAddressName(userDetailsInformation.addressName);
			setSurname(userDetailsInformation.surname);
			setStreet(userDetailsInformation.street);
			setPostalCode(userDetailsInformation.postalCode);
			setCity(userDetailsInformation.city);
			setPhone(userDetailsInformation.phone);
		}
	}, [dispatch, navigate, userDetailsInfo, userDetailsInformation]);

	useEffect(() => {}, [dispatch]);

	const deliverHandler = (e) => {
		if (e.target.value === 'Poczta list polecony 0 zł') {
			setDelivery(e.target.value);
			setDeliveryPrice(0);
		}
		if (e.target.value === 'Poczta paczka 12,99 zł') {
			setDelivery(e.target.value);
			setDeliveryPrice(12.99);
		}
		if (e.target.value === 'Kurier DPD 14,99 zł') {
			setDelivery(e.target.value);
			setDeliveryPrice(14.99);
		}
		if (e.target.value === 'Kurier Inpost 14,99 zł') {
			setDelivery(e.target.value);
			setDeliveryPrice(14.99);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateUserProfile({
				id: userDetailsInfo._id,
				addressName,
				surname,
				street,
				postalCode,
				city,
				phone,
			})
		);
		dispatch(getUserDetails('profile'));
		navigate('/payment');
	};

	return (
		<div className='shipping margin-section'>
			<div className='shipping-box'>
				<Checkout step2 />
				<div>
					<div className='address-form-title'>Dane odbiorcy przesyłki:</div>
					<form
						className='address-form box-shadow'
						id='form-address'
						onSubmit={(e) => {
							submitHandler(e);
						}}
					>
						<label>Imię:</label>
						<input
							type='text'
							value={addressName}
							required
							onChange={(e) => setAddressName(e.target.value)}
						></input>
						<label>Nazwisko:</label>
						<input
							type='text'
							value={surname}
							required
							onChange={(e) => setSurname(e.target.value)}
						></input>
						<label>Ulica i numer domu:</label>
						<input
							type='text'
							value={street}
							required
							onChange={(e) => setStreet(e.target.value)}
						></input>
						<label>Kod pocztowy:</label>
						<input
							type='text'
							value={postalCode}
							required
							onChange={(e) => setPostalCode(e.target.value)}
						></input>
						<label>Miejscowość:</label>
						<input
							type='text'
							value={city}
							required
							onChange={(e) => setCity(e.target.value)}
						></input>
						<label>Telefon:</label>
						<input
							type='number'
							value={phone}
							required
							onChange={(e) => setPhone(e.target.value)}
						></input>
						<label>Forma dostawy:</label>
						<select
							onChange={(e) => {
								deliverHandler(e);
							}}
							defaultValue='Poczta list polecony 0 zł'
						>
							<option value='Poczta list polecony 0 zł'>
								Poczta Polska list polecony 0 zł
							</option>
							<option value='Poczta paczka 12,99 zł'>
								Poczta Polska paczka 12,99 zł
							</option>
							<option value='Kurier DPD 14,99 zł'>Kurier DPD 14,99 zł</option>
							<option value='Kurier Inpost 14,99 zł'>
								Kurier Inpost 14,99 zł
							</option>
						</select>
					</form>
				</div>
				<div className='summary-box'>
					<div className='summary-amount'>
						Razem <span>{fullPrice} zł</span>
					</div>
				</div>
			</div>

			<div className='second-summary-box'>
				<div className='box-shadow'>
					<div>Wartość produktów: {fullPrice} zł</div>
					<div>Dostawa: {delivery}</div>
					<div>
						Razem z dostawą:{' '}
						<span className='full-price'> {FullPriceWithDelivery}</span> zł
					</div>
					<button
						type='submit'
						form='form-address'
						className='btn btn-shipping-screen'
					>
						Wybierz formę płatności
					</button>
				</div>
			</div>
		</div>
	);
};

export default ShippingScreen;
