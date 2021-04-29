import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../application/actions/userActions';
import {
	ProfileContainer,
	Loader,
	Message,
} from '../../components/HelperComponents';
import { useTranslation } from 'react-i18next';

const UserAddScreen = ({ history }) => {
	const { t } = useTranslation();

	//define states
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [telephone, setTelephone] = useState('');
	const [email, setEmail] = useState('');
	const [status, setStatus] = useState('');
	const [role, setRole] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');

	//add fileupload
	const [image, setImage] = useState('');
	const [uploading, setUploading] = useState(false);

	const dispatch = useDispatch();

	//get logged-in user information
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userRegister = useSelector((state) => state.userRegister);
	const { success } = userRegister;

	useEffect(() => {
		if (!userInfo || userInfo.role !== 'admin') {
			history.push('/login');
		} else {
			console.log(success);
			if (success) {
				console.log('success');
				history.push('/admin/userlist');
			}
		}
	}, [dispatch, history, userInfo, success]);

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('image', file);
		setUploading(true);

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};

			const { data } = await axios.post('/api/v1/uploads', formData, config);

			setImage(data);
			setUploading(false);
		} catch (error) {
			console.error(error);
			setUploading(false);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
		} else {
			dispatch(
				registerUser({
					firstName,
					lastName,
					image,
					email,
					telephone,
					role,
					status,
					password,
					confirmPassword,
				})
			);
		}
	};

	return (
		<>
			{message && <Message variant="danger">{message}</Message>}
			<Card className="my-card">
				<Card.Header>
					<h4>User Registration</h4>
				</Card.Header>
				<Card.Body>
					<Form onSubmit={submitHandler} className="mt-4 mb-3">
						<Row>
							<Col md={6}>
								<Form.Group controlId="firstName">
									<Form.Label>{t('user.firstName.label')}</Form.Label>
									<Form.Control
										type="firstName"
										placeholder={t('user.firstName.placeholder')}
										value={firstName}
										required
										onChange={(e) => setFirstName(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group controlId="lastName">
									<Form.Label>{t('user.lastName.label')}</Form.Label>
									<Form.Control
										type="lastName"
										placeholder={t('user.lastName.placeholder')}
										value={lastName}
										required
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
										required
										onChange={(e) => setEmail(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
							<Col md={4}>
								<Form.Group controlId="telephone">
									<Form.Label>{t('user.telephone.label')}</Form.Label>
									<Form.Control
										type="telephone"
										placeholder={t('user.telephone.placeholder')}
										value={telephone}
										required
										onChange={(e) => setTelephone(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>
						<hr className="my-4" />
						<Row>
							<Col md={6}>
								<Form.Group controlId="role">
									<Form.Label>Role</Form.Label>
									<Form.Control
										as="select"
										value={role}
										required
										onChange={(e) => setRole(e.target.value)}
									>
										<option value="">{t('action.select')}</option>
										<option value="client">client</option>
										<option value="surveyor">surveyor</option>
										<option value="admin">admin</option>
									</Form.Control>
								</Form.Group>
							</Col>
							<Col md={4}>
								<Form.Group controlId="status">
									<Form.Label>{t('utility.status')}</Form.Label>
									<Form.Control
										as="select"
										value={status}
										required
										onChange={(e) => setStatus(e.target.value)}
									>
										<option value="">{t('action.select')}</option>
										<option value="active">{t('utility.active')}</option>
										<option value="inactive">{t('utility.inactive')}</option>
									</Form.Control>
								</Form.Group>
							</Col>
						</Row>
						{/* <hr className="my-4" />
					<Row>
						<Col>
							<Form.Group controlId="image">
								<Form.Label>Image</Form.Label>
								<Row className="mb-3">
									<Col md={6}>
										<Form.Control
											type="text"
											placeholder="Enter image url"
											value={image}
											onChange={(e) => setImage(e.target.value)}
										></Form.Control>
									</Col>
								</Row>
								<Row>
									<Col md={6}>
										<Form.File
											id="image-file"
											label="Choose File"
											custom
											onChange={uploadFileHandler}
										>
											{uploading && <Loader />}
										</Form.File>
									</Col>
								</Row>
							</Form.Group>
						</Col>
					</Row> */}
						<hr className="my-4" />
						<Row>
							<Col md={6}>
								<Form.Group controlId="password">
									<Form.Label>{t('user.password.label')}</Form.Label>
									<Form.Control
										type="password"
										placeholder={t('user.password.placeholder')}
										value={password}
										required
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
										required
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
				</Card.Body>
			</Card>
		</>
	);
};

export default UserAddScreen;
