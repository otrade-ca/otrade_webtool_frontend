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
import { getOrganizationDetails } from '../../../application/actions/organizationAction';

const Landing = ({ match, history }) => {
	const id = match.params.id;
	const { url, path } = useRouteMatch();
	const { t } = useTranslation();

	const dispatch = useDispatch();
	const organizationDetails = useSelector((state) => state.organizationDetails);
	const { loading, error, organization } = organizationDetails;

	useEffect(() => {
		dispatch(getOrganizationDetails(id));
	}, [dispatch, id]);

	const renderImage = () => {
		return organization.image ? (
			<img src={organization.image} alt="profile" className="profile-image" />
		) : (
			<img src={Placeholder} alt="profile" className="profile-image" />
		);
	};

	const renderBtnLinks = () => {
		return btnlinks.map((item, index) => (
			<Link key={index} to={`${url}${item.link}`} className={item.class}>
				<i className={item.icon}></i>
				{item.type}
			</Link>
		));
	};

	const renderNavLinks = () => {
		return navbarlinks.map((item, index) => (
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
		));
	};

	const renderRoutes = () => {
		return (
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
		);
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					{organization && (
						<div className="profile-container">
							<Row>
								<Col md={2} className="image-container">
									{renderImage()}
								</Col>
								<Col md={10}>
									<h1>{organization.name}</h1>
									<Row className="middle-row d-flex justify-content-between">
										<div className="ml-3">
											<>{organization.email}</>
											<br />
											<>{organization.telephone}</>
										</div>
										<div className="mr-3 d-flex justify-content-end align-items-end">
											{renderBtnLinks()}
										</div>
									</Row>
									<hr className="profile-container-hr" />
									<Row className="lower-row ml-1">
										<ul className="my-navbar">{renderNavLinks()}</ul>
									</Row>
								</Col>
							</Row>
						</div>
					)}
					{renderRoutes()}
				</>
			)}
		</>
	);
};

export default Landing;
