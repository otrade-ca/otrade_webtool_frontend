import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	Message,
	Loader,
	CardContainer,
} from '../../components/HelperComponents';
import {
	listProjectDetails,
	updateProject,
} from '../../../application/actions/projectActions';
import { PROJECT_UPDATE_RESET } from '../../../application/constants/projectConstants';
import { useTranslation } from 'react-i18next';
import countries from '../../selectCountries.json';

const ProjectEdit = ({ match, history }) => {
	const projectId = match.params.id;

	const { t } = useTranslation();

	// define states
	const [projectName, setProjectName] = useState('');
	const [projectClient, setProjectClient] = useState('');
	const [country, setCountry] = useState('');
	const [countryCode, setCountryCode] = useState('');
	const [language, setLanguage] = useState('');
	const [coordinates, setCoordinates] = useState('');
	const [currency, setCurrency] = useState('');
	const [measurements, setMeasurements] = useState('');
	const [comment, setComment] = useState('');
	const [status, setStatus] = useState('');
	const [updatedDate, setUpdatedDate] = useState('');

	// useDispatch
	const dispatch = useDispatch();

	//get projectDetails from reducer
	const projectDetails = useSelector((state) => state.projectDetails);
	const { loading, error, project } = projectDetails;

	//get projectUpdate from reducer
	const projectUpdate = useSelector((state) => state.projectUpdate);
	const { success: successUpdate } = projectUpdate;

	//useEffect
	useEffect(() => {
		if (successUpdate) {
			dispatch(listProjectDetails(projectId));
			dispatch({ type: PROJECT_UPDATE_RESET });
		} else {
			if (!project.projectName || project._id !== projectId) {
				dispatch(listProjectDetails(projectId));
			} else {
				setProjectName(project.projectName);
				setProjectClient(project.projectClient);
				setComment(project.comment);
				setStatus(project.status);
				setUpdatedDate(project.updatedAt);
				setCountry(project.country);
				setCountryCode(project.country_code);
				setLanguage(project.language);
				setCoordinates(project.coordinates);
				setCurrency(project.currency);
				setMeasurements(project.measurements);
			}
		}
	}, [dispatch, projectId, project, successUpdate]);

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
			updateProject(
				{
					_id: projectId,
					projectName,
					projectClient,
					country,
					country_code: countryCode,
					language,
					coordinates,
					currency,
					measurements,
					status,
					comment,
				},
				history
			)
		);
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<CardContainer title={'Edit Project'}>
					<Form onSubmit={submitHandler}>
						<Row>
							<Col>
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
							<Col>
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
						<Row>
							<Col md={4}>
								<Form.Group controlId="status">
									<Form.Label>Status</Form.Label>
									<Form.Control
										as="select"
										value={status}
										required
										onChange={(e) => setStatus(e.target.value)}
									>
										<option value={t('utility.open')}>
											{t('utility.open')}
										</option>
										<option value={t('utility.close')}>
											{t('utility.close')}
										</option>
									</Form.Control>
								</Form.Group>
							</Col>
						</Row>
						<hr />
						<Row>
							<Col>
								<Form.Group controlId="comment">
									<Form.Label>Comments</Form.Label>
									<Form.Control
										as="textarea"
										rows="6"
										value={comment}
										required
										onChange={(e) => setComment(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>
						<hr />
						<Row>
							<Col>
								<Button type="submit" variant="primary" className="px-5 mt-3">
									Update
								</Button>
							</Col>
							<Col className="text-right">
								<p>updated on: {updatedDate && updatedDate.substring(0, 10)}</p>
							</Col>
						</Row>
					</Form>
				</CardContainer>
			)}
		</>
	);
};

export default ProjectEdit;
