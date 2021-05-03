import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useParams, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStakeholder } from '../../../application/actions/stakeholderActions';
import { CardContainer } from '../../components/HelperComponents';
import { useTranslation } from 'react-i18next';

const StakeholderContactInfo = ({ history }) => {
	const { id } = useParams();

	const { t } = useTranslation();

	const dispatch = useDispatch();

	//get projectDetails
	const projectDetails = useSelector((state) => state.projectDetails);
	const { project } = projectDetails;

	//define states
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [alias, setAlias] = useState('');
	const [telephone, setTelephone] = useState('');
	const [gender, setGender] = useState('');
	const [birthdate, setBirthdate] = useState(Date);
	const [email, setEmail] = useState('');
	const [ethnicity, setEthnicity] = useState('');
	const [organization, setOrganization] = useState('');
	const [orgPosition, setOrgPosition] = useState('');
	const [media, setMedia] = useState([{ website: '' }]);

	//add input field
	const addHandler = (i) => {
		setMedia([...media, { website: '' }]);
	};

	const removeHandler = (i) => {
		const removeMediaItem = media[i];
		//filter out media item to remove from current list and return a new list
		const list = media.filter((i) => i !== removeMediaItem);
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
			addStakeholder(
				{
					firstName,
					lastName,
					alias,
					telephone,
					gender,
					birthdate,
					email,
					ethnicity,
					organization,
					media,
					org_Position: orgPosition,
					project: project._id,
				},
				id,
				history
			)
		);
	};

	return (
		<CardContainer title={'Stakeholder Registrations'}>
			<Form onSubmit={submitHandler}>
				<Row>
					<Col md={6}>
						<Form.Group controlId="firstName">
							<Form.Label>{t('stakeholder.firstName.label')}</Form.Label>
							<Form.Control
								type="firstName"
								placeholder={t('stakeholder.firstName.placeholder')}
								value={firstName}
								required
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
								required
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
								required
								onChange={(e) => setGender(e.target.value)}
							>
								<option value="">--Select--</option>
								<option value="Male">{t('stakeholder.gender.male')}</option>
								<option value="Female">{t('stakeholder.gender.female')}</option>
								<option value="Other">{t('stakeholder.gender.other')}</option>
							</Form.Control>
						</Form.Group>
					</Col>
					<Col md={4}>
						<Form.Group controlId="birthdate">
							<Form.Label>{t('stakeholder.birthdate.label')}</Form.Label>
							<Form.Control
								type="date"
								placeholder={'Enter birthdate'}
								value={birthdate}
								required
								onChange={(e) => setBirthdate(e.target.value)}
							></Form.Control>
						</Form.Group>
					</Col>
					<Col md={4}>
						<Form.Group controlId="ethnicity">
							<Form.Label>{t('stakeholder.ethnicity.label')}</Form.Label>
							<Form.Control
								type="ethnicity"
								placeholder="Enter ethnicity"
								value={ethnicity}
								required
								onChange={(e) => setEthnicity(e.target.value)}
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
								required
								onChange={(e) => setTelephone(e.target.value)}
							></Form.Control>
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
								<option value="">{t('action.select')}</option>
								<option value="Yes">{t('stakeholder.organization.yes')}</option>
								<option value="No">{t('stakeholder.organization.no')}</option>
							</Form.Control>
						</Col>
					</Row>
				</Form.Group>
				<Form.Group controlId="org_Position">
					<Row>
						<Col md={8}>
							<Form.Label>{t('stakeholder.orgPosition.question')}</Form.Label>
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
				<Row className="mb-3">
					<Col md={9}>
						<Form.Group controlId="media">
							<Form.Label>{t('stakeholder.social_Media.label')}</Form.Label>
							{media.map((site, i) => (
								<Row key={i}>
									<Col md={8}>
										<Form.Control
											className="mb-3"
											placeholder={t('stakeholder.social_Media.placeholder')}
											value={site.website}
											required
											onChange={(e) => handleInputChange(e, i)}
										></Form.Control>
									</Col>
									<Col>
										{media.length !== 1 && (
											<Button
												variant="danger"
												className="btn-md mr-3"
												onClick={() => removeHandler(i)}
											>
												<i className="fas fa-trash"></i>
											</Button>
										)}
										{media.length - 1 === i && (
											<Button className="px-3" onClick={() => addHandler(i)}>
												<i className="fas fa-plus"></i>{' '}
												{t('tables.stakeholder')}
											</Button>
										)}
									</Col>
								</Row>
							))}
						</Form.Group>
					</Col>
				</Row>
				<hr />
				<Row className="mt-3">
					<Col>
						<Button type="submit" variant="primary" className="px-5 mt-3">
							{t('action.submit')}
						</Button>
					</Col>
				</Row>
			</Form>
		</CardContainer>
	);
};

export default withRouter(StakeholderContactInfo);
