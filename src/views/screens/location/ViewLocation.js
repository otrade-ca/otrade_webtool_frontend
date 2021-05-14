import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getLocationDetails } from '../../../application/actions/locationActions';
import { Loader, Message } from '../../components/HelperComponents';
import { useTranslation } from 'react-i18next';

const ViewLocation = ({ match }) => {
	const locationId = match.params.id;

	const { url } = useRouteMatch();
	const { t } = useTranslation();

	// state
	const [community, setCommunity] = useState('');
	const [influence, setInfluence] = useState('');
	const [orgType, setOrgType] = useState('');
	const [updatedDate, setUpdatedDate] = useState('');

	// dispatch
	const dispatch = useDispatch();

	// get locationDetails
	const locationDetails = useSelector((state) => state.locationDetails);
	const { loading, error, location } = locationDetails;

	console.log(location);

	useEffect(() => {
		console.log('getting there');
		if (!location && location._id !== locationId) {
			console.log('getting info');
			dispatch(getLocationDetails(locationId));
		} else {
			setCommunity(location.location);
			setInfluence(location.area_influence);
			setOrgType(location.organization_type);
			setUpdatedDate(location.updatedAt);
		}
	}, [dispatch, locationId, location]);

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Card className="my-card">
					<Card.Header className="my-card-Header">
						<h4>{t('tables.location')}</h4>
						<Link to={`${url}/edit`} className="btn btn-light ml-2">
							<i className="fas fa-edit"></i> Edit
						</Link>
					</Card.Header>
					<Card.Body>
						<Form className="mt-3">
							<Row>
								<Col md={12}>
									<Form.Group controlId="location">
										<Form.Label>{t('location.location')}</Form.Label>
										<Form.Control
											type="text"
											value={community}
											readOnly
											disabled
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
											readOnly
											disabled
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
										<Form.Control as="select" value={orgType} readOnly disabled>
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
									<Col className="text-right">
										<p>updated on: {updatedDate.substring(0, 10)}</p>
									</Col>
								</Col>
							</Row>
						</Form>
					</Card.Body>
				</Card>
			)}
		</>
	);
};

export default ViewLocation;
