import React, { useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Accordion, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	Empty,
	Message,
	Loader,
	FilterBox,
} from '../../components/HelperComponents';
import {
	deleteLocation,
	listUserLocations,
} from '../../../application/actions/locationActions';
import { LOCATION_DELETE_RESET } from '../../../application/constants/locationConstants';
import { useTranslation } from 'react-i18next';

const UserLocationsList = ({ match }) => {
	const userId = match.params.id;

	const { url } = useRouteMatch();

	const { t } = useTranslation();

	// get locations
	const dispatch = useDispatch();
	const locationUserList = useSelector((state) => state.locationUserList);
	const { loading, error, locations } = locationUserList;

	console.log(locations);

	const locationDelete = useSelector((state) => state.locationDelete);
	const { success } = locationDelete;

	useEffect(() => {
		if (success) {
			dispatch(listUserLocations(userId));
			dispatch({ type: LOCATION_DELETE_RESET });
		} else {
			dispatch(listUserLocations(userId));
		}
	}, [dispatch, userId, success]);

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
							<FilterBox searchWord={'Communities'} />
						</Card.Header>
					)}
				</>
			)}
			<Card.Body>
				{/* <Card.Body className="card-header-table">
					<div className="card-header-title">Community</div>
					<div className="card-header-title">Project</div>
				</Card.Body> */}
				<Accordion defaultActiveKey={1}>
					{locations &&
						locations.map((location, index) => (
							<Card className="table-card" key={index}>
								<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
									<div className="card-header-item">{location.location}</div>
									<div>{location.project && location.project.projectName}</div>
								</Accordion.Toggle>
								<Accordion.Collapse eventKey={index + 1}>
									<Card.Body>
										<div className="d-flex justify-content-between table-card-body">
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
						))}
				</Accordion>
			</Card.Body>
		</Card>
	);
};

export default UserLocationsList;
