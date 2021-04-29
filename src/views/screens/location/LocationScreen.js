import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import ProfileTop from '../../components/ProfileTop';
import { btnlinks, navbarlinks, routes } from './utilities';
import { getLocationDetails } from '../../../application/actions/locationActions';
import { listStakeholders } from '../../../application/actions/stakeholderActions';
import { listOrganizations } from '../../../application/actions/organizationAction';

const LocationScreen = ({ match }) => {
	const locationId = match.params.id;

	const { url, path } = useRouteMatch();

	// get userDispatch
	const dispatch = useDispatch();

	// get location details
	const locationDetails = useSelector((state) => state.locationDetails);
	const { loading, error, location } = locationDetails;

	useEffect(() => {
		dispatch(listStakeholders(locationId));
		dispatch(getLocationDetails(locationId));
		dispatch(listOrganizations(locationId));
	}, [dispatch, locationId]);

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<ProfileTop
						url={url}
						path={path}
						profile={location}
						btnlinks={btnlinks}
						navbarlinks={navbarlinks}
					/>

					<Switch>
						{routes.map((item, index) => (
							<Route
								key={index}
								exact
								path={`${path}${item.path}`}
								render={item.component}
							/>
						))}
					</Switch>
				</>
			)}
		</>
	);
};

export default LocationScreen;
