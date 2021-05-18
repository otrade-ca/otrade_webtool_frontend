import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrganizationDetails } from '../../../application/actions/organizationAction';
import { listLocationStakeholders } from '../../../application/actions/stakeholderActions';
import { getLocationId } from '../../../application/localStorage';
import { Loader, Message } from '../../components/HelperComponents';
import { useTranslation } from 'react-i18next';

const ViewOrganization = ({ match }) => {
	const organizationId = match.params.organizationId;

	const { url } = useRouteMatch();

	const { t } = useTranslation();

	// get locationId from localStorage
	const locationId = getLocationId();

	// get stakeholderList
	const dispatch = useDispatch();

	// get organization
	const organzationDetails = useSelector((state) => state.organizationDetails);
	const { loading, error, organization: orgDetails } = organzationDetails;

	const stakeholderProjectList = useSelector(
		(state) => state.stakeholderProjectList
	);
	const { stakeholders: members } = stakeholderProjectList;

	// define states
	const [organization, setOrganization] = useState('');
	const [division, setDivision] = useState('');
	const [location, setLocation] = useState('');
	const [email, setEmail] = useState('');
	const [telephone, setTelephone] = useState('');
	const [website, setWebsite] = useState('');
	const [stakeholders, setStakeholders] = useState([{ member: '' }]);
	const [updatedAt, setUpdatedAt] = useState('');

	useEffect(() => {
		if (!orgDetails.name || orgDetails._id !== organizationId) {
			dispatch(getOrganizationDetails(organizationId));
			dispatch(listLocationStakeholders(locationId));
		} else {
			setOrganization(orgDetails.name);
			setDivision(orgDetails.division);
			setLocation(orgDetails.address);
			setEmail(orgDetails.email);
			setTelephone(orgDetails.telephone);
			setWebsite(orgDetails.website);
			setStakeholders(orgDetails.stakeholders);
			setUpdatedAt(orgDetails.updatedAt);
		}
	}, [dispatch, orgDetails, organizationId, locationId]);

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<Card className="my-card">
					<Card.Header className="my-card-header">
						<h4>{t('tables.organization')}</h4>
						<Link to={`${url}/edit`} className="btn btn-light ml-2">
							<i className="fas fa-edit"></i> Edit
						</Link>
					</Card.Header>
					<Card.Body>
						<Form>
							<Row>
								<Col md={6}>
									<Form.Group controlId="organization">
										<Form.Label>
											{t('organization.organization_name.label')}
										</Form.Label>
										<Form.Control
											type="organization"
											placeholder={t(
												'organization.organization_name.placeholder'
											)}
											value={organization}
											readOnly
											disabled
										></Form.Control>
									</Form.Group>
								</Col>
								<Col md={6}>
									<Form.Group controlId="division">
										<Form.Label>
											{t('organization.political_Division.label')}
										</Form.Label>
										<Form.Control
											as="select"
											value={division}
											readOnly
											disabled
										>
											<option value="">--Select--</option>
											<option value={t('division.community')}>
												{t('division.community')}
											</option>
											<option value={t('division.federation')}>
												{t('division.federation')}
											</option>
											<option value={t('division.municipality')}>
												{t('division.municipality')}
											</option>
											<option value={t('division.parish')}>
												{t('division.parish')}
											</option>
											<option value={t('division.settlement')}>
												{t('division.settlement')}
											</option>
										</Form.Control>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col md={12}>
									<Form.Group controlId="location">
										<Form.Label>{t('organization.address.label')}</Form.Label>
										<Form.Control
											type="location"
											placeholder={t('organization.address.placeholder')}
											value={location}
											readOnly
											disabled
										></Form.Control>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col md={6}>
									<Form.Group controlId="email">
										<Form.Label>{t('organization.email.label')}</Form.Label>
										<Form.Control
											type="email"
											placeholder={t('organization.email.placeholder')}
											value={email}
											readOnly
											disabled
										></Form.Control>
									</Form.Group>
								</Col>
								<Col md={4}>
									<Form.Group controlId="telephone">
										<Form.Label>{t('organization.telephone.label')}</Form.Label>
										<Form.Control
											type="telephone"
											placeholder={t('organization.telephone.placeholder')}
											value={telephone}
											readOnly
											disabled
										></Form.Control>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col md={6}>
									<Form.Group controlId="website">
										<Form.Label>
											{t('organization.social_Media.label')}
										</Form.Label>
										<Form.Control
											type="website"
											placeholder={t('organization.social_Media.placeholder')}
											value={website}
											readOnly
											disabled
										></Form.Control>
									</Form.Group>
								</Col>
							</Row>
							<hr />
							<Row className="mt-3 pl-3">
								<Form.Label>
									{t('organization.organization_Members.label')}
								</Form.Label>
							</Row>
							<Row>
								<Col md={9}>
									{stakeholders &&
										stakeholders.map((assignee, i) => (
											<Row key={assignee._id}>
												<Col md={7}>
													<Form.Control
														as="select"
														value={assignee}
														className="px-5 mb-3"
														readOnly
														disabled
													>
														<option value="">{t('action.select')}</option>
														{members &&
															members.map((stakeholder) => (
																<option
																	key={stakeholder._id}
																	value={stakeholder._id}
																>
																	{stakeholder.firstName} {stakeholder.lastName}
																</option>
															))}
													</Form.Control>
												</Col>
											</Row>
										))}
								</Col>
							</Row>
							<hr />
							<Row className="mt-3">
								<Col className="text-right">
									<p>updated on: {updatedAt.substring(0, 10)}</p>
								</Col>
							</Row>
						</Form>
					</Card.Body>
				</Card>
			)}
		</>
	);
};

export default ViewOrganization;
