import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { addProject } from '../../../application/actions/projectActions';
import { PROJECT_ADD_RESET } from '../../../application/constants/projectConstants';
import { useTranslation } from 'react-i18next';
import countries from '../../selectCountries.json';

const ProjectAddScreen = ({ history }) => {
	const { t } = useTranslation();

	const [projectName, setProjectName] = useState('');
	const [projectClient, setProjectClient] = useState('');
	const [country, setCountry] = useState('');
	const [countryCode, setCountryCode] = useState('');
	const [language, setLanguage] = useState('');
	const [coordinates, setCoordinates] = useState('');
	const [currency, setCurrency] = useState('');
	const [measurements, setMeasurements] = useState('');
	const [comment, setComment] = useState('');

	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const projectAdd = useSelector((state) => state.projectAdd);
	const { success } = projectAdd;

	useEffect(() => {
		if (!userInfo || userInfo.role !== 'admin') {
			history.push('/login');
		} else {
			if (success) {
				dispatch({ type: PROJECT_ADD_RESET });
				history.push('/admin/projects');
			}
		}
	}, [dispatch, history, success, userInfo]);

	const onTextChange = (e) => {
		e.preventDefault();

		setCountry(e.target.value);

		axios
			.get(`https://restcountries.eu/rest/v2/name/${e.target.value}`)
			.then((result) => {
				const { data } = result;
				setCountryCode(data[0].alpha3Code);
				setLanguage(data[0].languages[0].name);
				setCurrency(data[0].currencies[0].name);
				setCoordinates(data[0].latlng.join(', '));

				if (data[0].alpha3Code === 'CAD') {
					setMeasurements('Imperial System');
				} else {
					setMeasurements('Metric System');
				}
			})
			.catch((err) => console.log(err));
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			addProject({
				projectName,
				projectClient,
				country,
				country_code: countryCode,
				language,
				coordinates,
				currency,
				measurements,
				comment,
			})
		);
	};

	return (
		<Card className="my-card">
			<Card.Header className="my-card-header">
				<h4>{`${t('tables.project')} ${t('action.register')}`}</h4>
			</Card.Header>
			<Card.Body>
				<Form onSubmit={submitHandler} className="mb-3">
					<Row>
						<Col md={6}>
							<Form.Group controlId="projectName">
								<Form.Label>{t('project.projectName.label')}</Form.Label>
								<Form.Control
									type="text"
									placeholder={t('project.projectName.placeholder')}
									value={projectName}
									onChange={(e) => setProjectName(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group controlId="projectClient">
								<Form.Label>{t('project.client.label')}</Form.Label>
								<Form.Control
									type="text"
									placeholder={t('project.client.placeholder')}
									value={projectClient}
									onChange={(e) => setProjectClient(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col md={4}>
							<Form.Group controlId="country">
								<Form.Label>{t('project.country.label')}</Form.Label>
								<Form.Control
									as="select"
									value={country}
									onChange={onTextChange}
								>
									<option value="">{t('action.select')}</option>
									{countries.map((c, i) => (
										<option value={countries.name} key={i}>
											{c.name}
										</option>
									))}
								</Form.Control>
							</Form.Group>
						</Col>
						<Col md={2}>
							<Form.Group controlId="countryCode">
								<Form.Label>{t('project.country_Code.label')}</Form.Label>
								<Form.Control
									type="text"
									placeholder={t('project.country_Code.placeholder')}
									value={countryCode}
									onChange={(e) => setCountryCode(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group controlId="coordinates">
								<Form.Label>{t('project.coordinates.label')}</Form.Label>
								<Form.Control
									type="text"
									placeholder={t('project.coordinates.placeholder')}
									value={coordinates}
									onChange={(e) => setCoordinates(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col md={4}>
							<Form.Group controlId="language">
								<Form.Label>{t('project.language.label')}</Form.Label>
								<Form.Control
									type="text"
									placeholder={t('project.language.placeholder')}
									value={language}
									onChange={(e) => setLanguage(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
						<Col md={4}>
							<Form.Group controlId="currency">
								<Form.Label>{t('project.currency.label')}</Form.Label>
								<Form.Control
									type="text"
									placeholder={t('project.currency.placeholder')}
									value={currency}
									onChange={(e) => setCurrency(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
						<Col md={4}>
							<Form.Group controlId="measurements">
								<Form.Label>{t('project.measurements.label')}</Form.Label>
								<Form.Control
									type="text"
									placeholder={t('project.measurements.placeholder')}
									value={measurements}
									onChange={(e) => setMeasurements(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<hr />
					<Row className="mt-3">
						<Col>
							<Form.Group controlId="comment">
								<Form.Label>{t('project.comments')}</Form.Label>
								<Form.Control
									as="textarea"
									rows="6"
									value={comment}
									onChange={(e) => setComment(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<hr />
					<Row>
						<Col>
							<Button type="submit" variant="primary" className="px-5 mt-3">
								{t('action.submit')}
							</Button>
						</Col>
					</Row>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default ProjectAddScreen;
