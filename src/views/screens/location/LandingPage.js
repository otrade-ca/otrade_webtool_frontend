import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { btnlinks, navbarlinks, routes } from './utilities';
import { NavLink, Link } from 'react-router-dom';
import Placeholder from '../../img/placeholder.png';
import { useTranslation } from 'react-i18next';
import { getBucketInfo } from '../../../application/api';
import { getLocationDetails } from '../../../application/actions/locationActions';
import { listLocationStakeholders } from '../../../application/actions/stakeholderActions';
import { listLocationOrganizations } from '../../../application/actions/organizationAction';

const LandingPage = ({ match, history }) => {
	const locationId = match.params.id;
	const { url, path } = useRouteMatch();

	const { prependURL } = getBucketInfo('location');
	const { t } = useTranslation();

	// get userDispatch
	const dispatch = useDispatch();

	// get location details
	const locationDetails = useSelector((state) => state.locationDetails);
	const { loading, error, location } = locationDetails;

	useEffect(() => {
		dispatch(listLocationStakeholders(locationId));
		dispatch(getLocationDetails(locationId));
		dispatch(listLocationOrganizations(locationId));
	}, [dispatch, locationId]);

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					{location && (
						<div className="profile-container">
							<Row>
								<Col md={2} className="image-container">
									{location.image ? (
										<img
											src={`${prependURL}${location.image}`}
											alt="profile"
											className="profile-image"
										/>
									) : (
										<img
											src={Placeholder}
											alt="profile"
											className="profile-image"
										/>
									)}
								</Col>
								<Col md={10}>
									<h1>
										<>{location.location}</>
									</h1>
									<Row className="middle-row d-flex justify-content-between">
										<div className="ml-3">
											<>{location.area_influence}</>
											<br />
											<>{location.organization_type}</>
										</div>
										<div className="mr-3 d-flex justify-content-end align-items-end">
											{btnlinks.map((item, index) => (
												<Link
													key={index}
													to={`${url}${item.link}`}
													className={item.class}
												>
													<i className={item.icon}></i>
													{item.type}
												</Link>
											))}
										</div>
									</Row>
									<hr className="profile-container-hr" />
									<Row className="lower-row ml-1">
										<ul className="my-navbar">
											{navbarlinks.map((item, index) => (
												<li key={index}>
													<NavLink
														activeClassName="selected"
														activeStyle={{
															fontWeight: 'bold',
															color: 'blue',
															textDecoration: 'underline',
														}}
														to={`${url}${item.link}`}
													>
														{item.type}
													</NavLink>
												</li>
											))}
										</ul>
									</Row>
								</Col>
							</Row>
						</div>
					)}

					<Switch>
						{routes.map((item, index) => (
							<Route
								key={index}
								exact
								path={`${path}${item.path}`}
								render={item.component}
								history={history}
							/>
						))}
					</Switch>
				</>
			)}
		</>
	);
};

export default LandingPage;
