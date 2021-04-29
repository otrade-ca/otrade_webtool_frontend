import React, { useEffect } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import { getStakeholderDetails } from '../../../application/actions/stakeholderActions';
import ProfileTop from '../../components/ProfileTop';
import { btnlinks, navbarlinks, routes } from './StakeholderRoutes';

const StakeholderScreen = ({ match }) => {
	//get the stakeholderId passed in
	let stakeholderId = match.params.id;

	//get path and url
	const { path, url } = useRouteMatch();

	const dispatch = useDispatch();

	//get stakeholder
	const stakeholderDetails = useSelector((state) => state.stakeholderDetails);
	const { loading, error, stakeholder } = stakeholderDetails;

	useEffect(() => {
		dispatch(getStakeholderDetails(stakeholderId));
	}, [dispatch, stakeholderId]);

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
						profile={stakeholder}
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

export default StakeholderScreen;
