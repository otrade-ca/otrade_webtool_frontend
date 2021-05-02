import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	getLocationDetails,
	updateLocation,
} from '../../../application/actions/locationActions';
import { Loader, Message } from '../../components/HelperComponents';
import { useTranslation } from 'react-i18next';
import { LOCATION_UPDATE_RESET } from '../../../application/constants/locationConstants';

const EditLocation = ({ match }) => {
	const locationId = match.params.id;

	const { t } = useTranslation();

	// dispatch
	const dispatch = useDispatch();

	// get locationDetails
	const locationDetails = useSelector((state) => state.locationDetails);
	const { loading, error, location: loc } = locationDetails;

	// get locationUpdate
	const locationUpdate = useSelector((state) => state.locationUpdate);
	const {
		success: successUpdate,
		loading: loadingUpdate,
		error: errorUpdate,
	} = locationUpdate;

	//state
	const [location, setLocation] = useState('');
	const [influence, setInfluence] = useState('');
	const [orgType, setOrgType] = useState('');

	useEffect(() => {
		if (successUpdate) {
			dispatch(getLocationDetails(locationId));
			dispatch({ type: LOCATION_UPDATE_RESET });
		} else {
			if (!loc.location || loc._id !== locationId) {
				dispatch(getLocationDetails(locationId));
			} else {
				setLocation(loc.location);
				setInfluence(loc.area_influence);
				setOrgType(loc.organization_type);
			}
		}
	}, [dispatch, locationId, loc.location, loc._id, successUpdate, loc]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateLocation(
				{
					location,
					area_influence: influence,
					organization_type: orgType,
				},
				locationId
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
				<Card className="my-card">
					<Card.Header className="my-card-header">
						<h4>{t('tables.location')}</h4>
					</Card.Header>
					<Card.Body>
						<Form onSubmit={submitHandler} className="mb-3">
							<Row>
								<Col md={12}>
									<Form.Group controlId="location">
										<Form.Label>{t('location.location')}</Form.Label>
										<Form.Control
											type="text"
											value={location}
											onChange={(e) => setLocation(e.target.value)}
										></Form.Control>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col md={6}>
									<Form.Group controlId="areaInfluence">
										<Form.Label>
											{t('location.area_of_Influence.label')}
										</Form.Label>
										<Form.Control
											as="select"
											value={influence}
											onChange={(e) => setInfluence(e.target.value)}
										>
											<option value={t('action.select')}>
												{t('action.select')}
											</option>
											<option value={t('location.area_of_Influence.nucleus')}>
												{t('location.area_of_Influence.nucleus')}
											</option>
											<option value={t('location.area_of_Influence.direct')}>
												{t('location.area_of_Influence.direct')}
											</option>
											<option value={t('location.area_of_Influence.indirect')}>
												{t('location.area_of_Influence.indirect')}
											</option>
											<option
												value={t('location.area_of_Influence.not-applicable')}
											>
												{t('location.area_of_Influence.not-applicable')}
											</option>
										</Form.Control>
									</Form.Group>
								</Col>
								<Col md={6}>
									<Form.Group controlId="locationType">
										<Form.Label>
											{t('location.organization_Type.label')}
										</Form.Label>
										<Form.Control
											as="select"
											value={orgType}
											onChange={(e) => setOrgType(e.target.value)}
										>
											<option value={t('action.select')}>
												{t('action.select')}
											</option>
											<option value={t('location.division.federation')}>
												{t('location.division.federation')}
											</option>
											<option value={t('location.division.state')}>
												{t('location.division.state')}
											</option>
											<option value={t('location.division.province')}>
												{t('location.division.province')}
											</option>
											<option value={t('location.division.municipality')}>
												{t('location.division.municipality')}
											</option>
											<option value={t('location.division.community')}>
												{t('location.division.community')}
											</option>
											<option value={t('location.division.parish')}>
												{t('location.division.parish')}
											</option>
											<option value={t('location.division.settlement')}>
												{t('location.division.settlement')}
											</option>
										</Form.Control>
									</Form.Group>
								</Col>
							</Row>
							<hr />
							<Row className="mt-3">
								<Col>
									<Button type="submit" variant="primary" className="px-5 mt-3">
										{t('action.update')}
									</Button>
								</Col>
							</Row>
						</Form>
					</Card.Body>
				</Card>
			)}
		</>
	);
};

export default EditLocation;
