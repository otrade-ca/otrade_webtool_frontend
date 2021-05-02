import React, { useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Accordion, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Empty, Message, Loader } from '../../components/HelperComponents';
import {
	deleteLocation,
	listLocations,
} from '../../../application/actions/locationActions';
import { LOCATION_DELETE_RESET } from '../../../application/constants/locationConstants';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

const LocationList = ({ match }) => {
	const projectId = match.params.id;
	const { url } = useRouteMatch();

	const { t } = useTranslation();

	// get locations
	const dispatch = useDispatch();
	const locationList = useSelector((state) => state.locationList);
	const { loading, error, filtered, locations } = locationList;

	const locationDelete = useSelector((state) => state.locationDelete);
	const { success } = locationDelete;

	useEffect(() => {
		if (success) {
			dispatch(listLocations(projectId));
			dispatch({ type: LOCATION_DELETE_RESET });
		} else {
			dispatch(listLocations(projectId));
		}
	}, [dispatch, projectId, success]);

	//delete location
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteLocation(id));
		}
	};

	return (
		<Card className="my-card">
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					{locations && locations.length === 0 ? (
						<Empty
							itemLink={'register'}
							url={url}
							type={t('tables.location')}
							group={'locations'}
						/>
					) : (
						<Card.Header className="my-card-header">
							<h4>{t('tables.location')}</h4>
							<Link to={`${url}/register`} className="btn btn-primary ml-2">
								<i className="fas fa-plus"></i> {t('tables.location')}
							</Link>
						</Card.Header>
					)}
				</>
			)}
			<Card.Body>
				<Accordion defaultActiveKey={1}>
					{filtered
						? filtered.map((location, index) => (
								<Card className="table-card" key={index}>
									<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
										<div className="table-card-item">
											<div className="item-one">
												<IconContext.Provider
													value={{ color: '#008cba', size: '2em' }}
												>
													<RiIcons.RiCommunityLine />
												</IconContext.Provider>
											</div>
											<div className="item-two">
												<div>{location.location}</div>
												<div className="item-category">Community</div>
											</div>
										</div>
										<div className="table-card-item">
											<div className="item-two">
												<div>
													<strong>{location.createdAt.substring(0, 10)}</strong>{' '}
												</div>
												<div className="item-category">Registered Date</div>
											</div>
										</div>
									</Accordion.Toggle>
									<Accordion.Collapse eventKey={index + 1}>
										<Card.Body>
											<div className="d-flex justify-content-between">
												<div>
													<p>
														{t('location.location')}
														{': '}
														<strong>
															<Link to={`/location/${location._id}`}>
																{location.location}
															</Link>
														</strong>
														<br />
														{t('location.area_of_Influence.label')}
														{': '} {location.area_influence}
														<br />
														{t('location.organization_Type.label')}
														{': '} {location.organization_type}
													</p>
												</div>
												<div className="d-flex align-items-center">
													<Button
														variant="danger"
														className="btn-md ml-3"
														onClick={() => deleteHandler(location._id)}
													>
														<i className="fas fa-trash"></i> Delete
													</Button>
												</div>
											</div>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
						  ))
						: locations &&
						  locations.map((location, index) => (
								<Card className="table-card" key={index}>
									<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
										<div className="table-card-item">
											<div className="item-one">
												<IconContext.Provider
													value={{ color: '#008cba', size: '2em' }}
												>
													<RiIcons.RiCommunityLine />
												</IconContext.Provider>
											</div>
											<div className="item-two">
												<div>{location.location}</div>
												<div className="item-category">Community</div>
											</div>
										</div>
										<div className="table-card-item">
											<div className="item-two">
												<div>
													<strong>{location.createdAt.substring(0, 10)}</strong>{' '}
												</div>
												<div className="item-category">Registered Date</div>
											</div>
										</div>
									</Accordion.Toggle>
									<Accordion.Collapse eventKey={index + 1}>
										<Card.Body>
											<div className="d-flex justify-content-between">
												<div>
													<strong>
														<Link to={`/location/${location._id}`}>
															{location.location}
														</Link>
													</strong>
													<br />
													<strong>
														{t('location.area_of_Influence.label')}
													</strong>
													{': '} {location.area_influence}
													<br />
													<strong>
														{t('location.organization_Type.label')}
													</strong>
													{': '} {location.organization_type}
												</div>
												<div className="d-flex align-items-center">
													<Button
														variant="danger"
														className="btn-md ml-3"
														onClick={() => deleteHandler(location._id)}
													>
														<i className="fas fa-trash"></i> Delete
													</Button>
												</div>
											</div>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
						  ))}
				</Accordion>
			</Card.Body>
		</Card>
	);
};

export default LocationList;
