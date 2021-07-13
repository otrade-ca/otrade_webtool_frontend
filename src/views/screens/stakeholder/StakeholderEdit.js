import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	getStakeholderDetails,
	updateStakeholder,
} from '../../../application/actions/stakeholderActions';
import { STAKEHOLDER_UPDATE_RESET } from '../../../application/constants/stakeholderConstants';
import {
	CardContainer,
	Loader,
	Message,
} from '../../components/HelperComponents';
import { useTranslation } from 'react-i18next';

const StakeholderEdit = ({ match }) => {
	const stakeholderId = match.params.id;

	const { t } = useTranslation();

	//get the stakeholder
	const dispatch = useDispatch();
	const stakeholderDetails = useSelector((state) => state.stakeholderDetails);
	const { loading, error, stakeholder } = stakeholderDetails;

	//get project
	const projectDetails = useSelector((state) => state.projectDetails);
	const { project } = projectDetails;

	//get success
	const stakeholderUpdate = useSelector((state) => state.stakeholderUpdate);
	const { success } = stakeholderUpdate;

	//define states
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [alias, setAlias] = useState('');
	const [address, setAddress] = useState('');
	const [telephone, setTelephone] = useState('');
	const [gender, setGender] = useState('');
	const [birthdate, setBirthdate] = useState(Date);
	const [email, setEmail] = useState('');
	const [ethnicity, setEthnicity] = useState('');
	const [media, setMedia] = useState([{ website: '' }]);
	const [organization, setOrganization] = useState();
	const [orgPosition, setOrgPosition] = useState('');

	useEffect(() => {
		if (success) {
			dispatch(getStakeholderDetails(stakeholderId));
			dispatch({ type: STAKEHOLDER_UPDATE_RESET });
		} else {
			setFirstName(stakeholder.firstName);
			setLastName(stakeholder.lastName);
			setGender(stakeholder.gender);
			setBirthdate(stakeholder.birthdate);
			setEthnicity(stakeholder.ethnicity);
			setEmail(stakeholder.email);
			setTelephone(stakeholder.telephone);
			setMedia(stakeholder.media);
			setOrganization(stakeholder.organization);
			setAlias(stakeholder.alias);
			setAddress(stakeholder.address);
			setOrgPosition(stakeholder.org_Position);
		}
	}, [dispatch, stakeholder, stakeholderId, success, project]);

	//add input field
	const addHandler = (i) => {
		setMedia([...media, { website: '' }]);
	};

	const removeHandler = (i) => {
		const removeItem = media[i];
		const list = media.filter((i) => i !== removeItem);
		setMedia(list);
	};

	//handle input change
	const handleInputChange = (e, i) => {
		e.preventDefault();
		const list = [...media];
		list[i] = e.target.value;
		setMedia(list);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateStakeholder(
				{
					firstName,
					lastName,
					alias,
					address,
					telephone,
					gender,
					birthdate,
					email,
					ethnicity,
					media,
					organization,
					org_Position: orgPosition,
				},
				stakeholderId
			)
		);
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<CardContainer title={'Stakeholder'}>
					<Form onSubmit={submitHandler}>
						<Row>
							<Col md={6}>
								<Form.Group controlId="firstName">
									<Form.Label>{t('stakeholder.firstName.label')}</Form.Label>
									<Form.Control
										type="firstName"
										placeholder={t('stakeholder.firstName.placeholder')}
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group controlId="lastName">
									<Form.Label>{t('stakeholder.lastName.label')}</Form.Label>
									<Form.Control
										type="lastName"
										placeholder={t('stakeholder.lastName.placeholder')}
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Form.Group controlId="alias">
									<Form.Label>{t('stakeholder.alias.label')}</Form.Label>
									<Form.Control
										type="alias"
										placeholder={t('stakeholder.alias.placeholder')}
										value={alias}
										onChange={(e) => setAlias(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>
						<hr />
						<Row>
							<Col md={4}>
								<Form.Group controlId="gender">
									<Form.Label>{t('stakeholder.gender.label')}</Form.Label>
									<Form.Control
										as="select"
										value={gender}
										onChange={(e) => setGender(e.target.value)}
									>
										<option value="">--Select--</option>
										<option value={t('stakeholder.gender.male')}>
											{t('stakeholder.gender.male')}
										</option>
										<option value={t('stakeholder.gender.female')}>
											{t('stakeholder.gender.female')}
										</option>
										<option value={t('stakeholder.gender.other')}>
											{t('stakeholder.gender.other')}
										</option>
									</Form.Control>
								</Form.Group>
							</Col>
							<Col md={4}>
								<Form.Group controlId="birthdate">
									<Form.Label>{t('stakeholder.birthdate.label')}</Form.Label>
									<Form.Control
										type="date"
										value={birthdate && birthdate.substring(0, 10)}
										onChange={(e) => setBirthdate(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
							<Col md={4}>
								<Form.Group controlId="ethnicity">
									<Form.Label>{t('stakeholder.ethnicity.label')}</Form.Label>
									<Form.Control
										type="ethnicity"
										placeholder={t('stakeholder.ethnicity.placeholder')}
										value={ethnicity}
										onChange={(e) => setEthnicity(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>
						<hr className="mb-4" />
						<Row>
							<Col md={12}>
								<Form.Group controlId="address">
									<Form.Label>Address</Form.Label>
									<Form.Control
										type="address"
										placeholder="Enter Address"
										value={address}
										onChange={(e) => setAddress(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Form.Group controlId="email">
									<Form.Label>{t('stakeholder.email.label')}</Form.Label>
									<Form.Control
										type="email"
										placeholder={t('stakeholder.email.placeholder')}
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group controlId="telephone">
									<Form.Label>{t('stakeholder.telephone.label')}</Form.Label>
									<Form.Control
										type="telephone"
										placeholder={t('stakeholder.telephone.placeholder')}
										value={telephone}
										onChange={(e) => setTelephone(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>
						<Row className="mb-3">
							<Col md={9}>
								<Form.Group controlId="media">
									<Form.Label>{t('stakeholder.social_Media.label')}</Form.Label>
									{media &&
										media.map((site, i) => (
											<Row key={i}>
												<Col md={6}>
													<Form.Control
														className="mb-3"
														placeholder={t(
															'stakeholder.social_Media.placeholder'
														)}
														value={site}
														onChange={(e) => handleInputChange(e, i)}
													></Form.Control>
												</Col>
												<Col>
													{media.length !== 1 && (
														<Button
															variant="danger"
															className="btn-md mr-3 mb-1"
															onClick={() => removeHandler(i)}
														>
															<i className="fas fa-trash"></i> Delete
														</Button>
													)}
													{media.length - 1 === i && (
														<Button
															className="px-3"
															onClick={() => addHandler(i)}
														>
															<i className="fas fa-plus"></i> Add
														</Button>
													)}
												</Col>
											</Row>
										))}
								</Form.Group>
							</Col>
						</Row>
						<hr className="mb-4" />
						<Form.Group controlId="organization">
							<Row>
								<Col md={10}>
									<Form.Label>{t('stakeholder.question')}</Form.Label>
								</Col>
								<Col md={2}>
									<Form.Control
										as="select"
										value={organization}
										required
										onChange={(e) => setOrganization(e.target.value)}
									>
										<option value="">--Select--</option>
										<option value="Yes">Yes</option>
										<option value="No">No</option>
									</Form.Control>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group controlId="org_Position">
							<Row>
								<Col md={8}>
									<Form.Label>
										{t('stakeholder.orgPosition.question')}
									</Form.Label>
								</Col>
								<Col md={4}>
									<Form.Control
										type="orgPosition"
										placeholder={t('stakeholder.orgPosition.placeholder')}
										value={orgPosition}
										disabled={!organization || organization === 'No'}
										onChange={(e) => setOrgPosition(e.target.value)}
									></Form.Control>
								</Col>
							</Row>
						</Form.Group>

						<hr />
						<Row className="mt-3">
							<Col>
								<Button type="submit" variant="primary" className="mt-3 px-5">
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

export default StakeholderEdit;
