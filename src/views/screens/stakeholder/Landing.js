import React, { useEffect } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import { getStakeholderDetails } from '../../../application/actions/stakeholderActions';
import { NavLink, Link } from 'react-router-dom';
import Placeholder from '../../img/placeholder.png';
import { useTranslation } from 'react-i18next';
import { btnlinks, navbarlinks, routes } from './utilities';
import { getLocationId } from '../../../application/localStorage';
import { getBucketInfo } from '../../../application/api';
import { saveBreadcrumb } from '../../../application/actions/routeActions';

const StakeholderScreen = ({ match }) => {
	//get the stakeholderId passed in
	let stakeholderId = match.params.id;
	const locationId = getLocationId();

	const { prependURL } = getBucketInfo('stakeholder');
	const { t } = useTranslation();

	//get path and url
	const { path, url } = useRouteMatch();
	const dispatch = useDispatch();

	//get stakeholder
	const stakeholderDetails = useSelector((state) => state.stakeholderDetails);
	const { loading, error, stakeholder } = stakeholderDetails;

	//setup breadcrumbs
	const breadCrumbSave = useSelector((state) => state.breadCrumbSave);
	const { breadcrumbs } = breadCrumbSave;

	useEffect(() => {
		dispatch(getStakeholderDetails(stakeholderId));
	}, [dispatch, stakeholderId, locationId]);

	const breadCrumbHelper = (e) => {
		//e.preventDefault();
		dispatch(saveBreadcrumb(breadcrumbs, url));
	};

	const renderImage = () => (
		<>
			{stakeholder.image ? (
				<img
					src={`${prependURL}${stakeholder.image}`}
					alt="profile"
					className="profile-image"
				/>
			) : (
				<img src={Placeholder} alt="profile" className="profile-image" />
			)}
		</>
	);

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					{stakeholder && (
						<div className="profile-container">
							<Row>
								<Col md={2} className="image-container">
									{renderImage()}
								</Col>
								<Col md={10}>
									<h1>
										<strong>
											{stakeholder.firstName} {stakeholder.lastName}
										</strong>
									</h1>

									<Row className="middle-row d-flex justify-content-between">
										<div className="ml-3">
											<>
												<>{stakeholder.telephone}</>
												<br />
											</>
											{stakeholder.status === 'active' ||
											stakeholder.status === 'open' ? (
												<>
													<>
														{t('utility.status')}:{' '}
														<em className="text-success">
															{stakeholder.status}
														</em>
													</>
												</>
											) : stakeholder.status === 'inactive' ||
											  stakeholder.status === 'close' ? (
												<>
													<>
														{t('utility.status')}:{' '}
														<em className="text-danger">
															{stakeholder.status}
														</em>
													</>
												</>
											) : null}
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
														onClick={breadCrumbHelper}
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
							/>
						))}
					</Switch>
				</>
			)}
		</>
	);
};

export default StakeholderScreen;