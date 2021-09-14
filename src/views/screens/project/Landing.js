import React, { useEffect, memo } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listProjectDetails } from '../../../application/actions/projectActions';
import { NavLink, Link } from 'react-router-dom';
import Placeholder from '../../img/placeholder.png';
import { useTranslation } from 'react-i18next';
import { btnlinks, navbarlinks, routes } from './utilities';
import {
	saveRouteInfo,
	saveBreadcrumb,
} from '../../../application/actions/routeActions';
import { getBucketInfo } from '../../../application/api';

const Landing = ({ match }) => {
	const projectId = match.params.id;
	const { prependURL } = getBucketInfo('project');
	const { url, path } = useRouteMatch();
	const { t } = useTranslation();

	// get userDispatch
	const dispatch = useDispatch();

	// get this route right off the bat
	dispatch(
		saveRouteInfo([
			{ route: 'stakeholders', path: `${match.url}/stakeholders` },
		])
	);

	//get project details
	const projectDetails = useSelector((state) => state.projectDetails);
	const { loading, error, project } = projectDetails;

	const breadCrumbSave = useSelector((state) => state.breadCrumbSave);
	const { breadcrumbs } = breadCrumbSave;

	useEffect(() => {
		if (!project.projectName || project._id !== projectId) {
			dispatch(listProjectDetails(projectId));
		}
	}, [dispatch, projectId, project]);

	const breadCrumbHelper = (e) => {
		//e.preventDefault();
		dispatch(saveBreadcrumb(breadcrumbs, url));
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					{project ? (
						<div className="profile-container">
							<Row>
								<Col md={2} className="image-container">
									{project && project.image ? (
										<img
											src={`${prependURL}${project.image}`}
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
										<strong>{project.projectName}</strong>
									</h1>

									<Row className="middle-row d-flex justify-content-between">
										<div className="ml-3">
											<>
												<>Client</>{' '}
											</>
											: <em>{project.projectClient}</em>
											<br />
											{/* profile status */}
											{(project && project.status === 'active') ||
											project.status === 'open' ? (
												<>
													<>
														{t('utility.status')}:{' '}
														<em className="text-success">{project.status}</em>
													</>
												</>
											) : project.status === 'inactive' ||
											  project.status === 'close' ? (
												<>
													<>
														{t('utility.status')}:{' '}
														<em className="text-danger">{project.status}</em>
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
					) : (
						<Loader />
					)}
				</>
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
	);
};

export default memo(Landing);
