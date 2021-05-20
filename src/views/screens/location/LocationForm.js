import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addLocation } from '../../../application/actions/locationActions';
import { useTranslation } from 'react-i18next';

const LocationForm = ({ history }) => {
	const { id } = useParams();
	const { t } = useTranslation();

	// dispatch
	const dispatch = useDispatch();

	//state
	const [location, setLocation] = useState('');
	const [influence, setInfluence] = useState('');
	const [orgType, setOrgType] = useState('');
	const [scope, setScope] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			addLocation(
				{
					location,
					area_influence: influence,
					organization_type: orgType,
					scope,
				},
				id,
				history
			)
		);
	};

	return (
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
								<Form.Label>{t('location.area_of_Influence.label')}</Form.Label>
								<Form.Control
									as="select"
									value={influence}
									onChange={(e) => setInfluence(e.target.value)}
								>
									<option value={t('action.select')}>
										{t('action.select')}
									</option>
									<option value="Nucleus">
										{t('location.area_of_Influence.nucleus')}
									</option>
									<option value="Direct">
										{t('location.area_of_Influence.direct')}
									</option>
									<option value="Indirect">
										{t('location.area_of_Influence.indirect')}
									</option>
									<option value="Non-Applicable">
										{t('location.area_of_Influence.not-applicable')}
									</option>
								</Form.Control>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group controlId="locationType">
								<Form.Label>{t('location.organization_Type.label')}</Form.Label>
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
					<Row>
						<Col md={6}>
							<Form.Group controlId="scope">
								<Form.Label>{t('location.scope.label')}</Form.Label>
								<Form.Control
									as="select"
									value={scope}
									onChange={(e) => setScope(e.target.value)}
								>
									<option value={t('action.select')}>
										{t('action.select')}
									</option>
									<option value="Urban">{t('location.scope.urban')}</option>
									<option value="Rural">{t('location.scope.rural')}</option>
								</Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<hr />
					<Row>
						<Col>
							<Button type="submit" variant="primary" className="px-5 mt-3">
								{t('action.continue')}
							</Button>
						</Col>
					</Row>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default LocationForm;
