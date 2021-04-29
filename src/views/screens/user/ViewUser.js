import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../../application/actions/userActions';
import { Loader, Message } from '../../components/HelperComponents';
import { useTranslation } from 'react-i18next';
import { CardContainer } from '../../components/HelperComponents';

const ViewUser = ({ match }) => {
	const userId = match.params.id;
	const { t } = useTranslation();

	const dispatch = useDispatch();
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	//define states
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [telephone, setTelephone] = useState('');
	const [email, setEmail] = useState('');
	const [updatedDate, setUpdatedDate] = useState('');

	useEffect(() => {
		if (!user.firstName || user._id !== userId) {
			dispatch(getUserDetails(userId));
		} else {
			setFirstName(user.firstName);
			setLastName(user.lastName);
			setTelephone(user.telephone);
			setEmail(user.email);
			setUpdatedDate(user.updatedAt);
		}
	}, [dispatch, userId, user]);

	return (
		<>
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<CardContainer title={'User Profile'} link={'edit'}>
				<Form>
					<Row>
						<Col md={6}>
							<Form.Group controlId="firstName">
								<Form.Label>{t('user.firstName.label')}</Form.Label>
								<Form.Control
									type="text"
									placeholder={t('user.firstName.placeholder')}
									value={firstName}
									readOnly
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
									readOnly
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
									readOnly
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
									readOnly
								></Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<hr className="mt-4 mb-2" />
					<Row className="mt-3">
						<Col className="text-right">
							<p>updated on: {updatedDate.substring(0, 10)}</p>
						</Col>
					</Row>
				</Form>
			</CardContainer>
		</>
	);
};

export default ViewUser;
