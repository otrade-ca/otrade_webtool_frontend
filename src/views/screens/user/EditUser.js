import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	updateUserProfile,
	getUserDetails,
} from '../../../application/actions/userActions';
import { USER_PROFILE_UPDATE_RESET } from '../../../application/constants/userConstants';
import {
	Message,
	Loader,
	CardContainer,
} from '../../components/HelperComponents';
import { setAlert } from '../../../application/actions/alertActions';
import { useTranslation } from 'react-i18next';

const EditUser = ({ match }) => {
	const userId = match.params.id;
	const { t } = useTranslation();

	const dispatch = useDispatch();
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	//get success from user update
	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success: successUpdate } = userUpdateProfile;

	//define states
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [telephone, setTelephone] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	useEffect(() => {
		if (successUpdate) {
			dispatch(getUserDetails(userId));
			dispatch({ type: USER_PROFILE_UPDATE_RESET });
			setPassword('');
			setConfirmPassword('');
		} else {
			setFirstName(user.firstName);
			setLastName(user.lastName);
			setTelephone(user.telephone);
			setEmail(user.email);
		}
	}, [dispatch, userId, user, successUpdate]);

	const submitHandler = (e) => {
		e.preventDefault();
		//check password against confirmPassword
		if (password !== confirmPassword) {
			//set new message if not matched
			dispatch(setAlert('Passwords do not match', 'danger'));
		} else {
			//otherwise, dispatch
			dispatch(
				updateUserProfile({
					id: user._id,
					firstName,
					lastName,
					email,
					telephone,
					password,
				})
			);
		}
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<CardContainer title={'Update User'}>
					<Form onSubmit={submitHandler}>
						<Row>
							<Col md={6}>
								<Form.Group controlId="firstName">
									<Form.Label>{t('user.firstName.label')}</Form.Label>
									<Form.Control
										type="text"
										placeholder={t('user.firstName.placeholder')}
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group controlId="lastName">
									<Form.Label>{t('user.lastName.label')}</Form.Label>
									<Form.Control
										type="text"
										placeholder={t('user.lastName.placeholder')}
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col md={8}>
								<Form.Group controlId="email">
									<Form.Label>{t('user.email.label')}</Form.Label>
									<Form.Control
										type="email"
										placeholder={t('user.email.placeholder')}
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
							<Col md={4}>
								<Form.Group controlId="telephone">
									<Form.Label>{t('user.telephone.label')}</Form.Label>
									<Form.Control
										type="text"
										placeholder={t('user.telephone.placeholder')}
										value={telephone}
										onChange={(e) => setTelephone(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>
						<hr className="my-4" />
						<Row>
							<Col md={6}>
								<Form.Group controlId="password">
									<Form.Label>{t('user.password.label')}</Form.Label>
									<Form.Control
										type="password"
										placeholder={t('user.password.placeholder')}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group controlId="confirmPassword">
									<Form.Label>{t('user.conPassword.label')}</Form.Label>
									<Form.Control
										type="password"
										placeholder={t('user.conPassword.placeholder')}
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>
						<hr />
						<Row>
							<Col>
								<Button type="submit" variant="primary" className="px-5 mt-3">
									{t('action.update')}
								</Button>
							</Col>
						</Row>
					</Form>
				</CardContainer>
			)}
		</>
	);
};

export default EditUser;
