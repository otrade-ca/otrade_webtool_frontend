import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import Placeholder from '../img/placeholder.png';
import { useTranslation } from 'react-i18next';
import { getBucketInfo } from '../../application/api';

const ProfileTop = ({ profile, btnlinks, navbarlinks, url }) => {
	const { t } = useTranslation();

	const { prependURL } = getBucketInfo('user');

	return (
		<div className="profile-container">
			<Row>
				<Col md={2} className="image-container">
					{profile && profile.image ? (
						<img
							src={`${prependURL}${profile.image}`}
							alt="profile"
							className="profile-image"
						/>
					) : (
						<img src={Placeholder} alt="profile" className="profile-image" />
					)}
				</Col>
				<Col md={10}>
					<h1>
						<>
							{profile && profile.firstName ? (
								<>
									{profile.firstName} {profile.lastName}
								</>
							) : profile.projectName ? (
								<>{profile.projectName}</>
							) : (
								<>{profile.location}</>
							)}
						</>
					</h1>

					<Row className="middle-row d-flex justify-content-between">
						<div className="ml-3">
							{/* projectclient information */}
							{profile && profile.projectClient && (
								<>
									<em>
										{profile.projectClient}
										<br />
									</em>
								</>
							)}

							{/* telephone or country code */}
							{profile && profile.telephone ? (
								<>
									<>{profile.telephone}</>
									<br />
								</>
							) : profile.country ? (
								<>
									<>
										{profile.country_code}
										{', '}
										{profile.country}
										<br />
									</>
								</>
							) : (
								<>
									<>
										<em>TBD</em>
									</>
									<br />
								</>
							)}

							{/* profile status */}
							{(profile && profile.status === 'active') ||
							profile.status === 'open' ? (
								<>
									<>
										{t('utility.status')}:{' '}
										<em className="text-success">{profile.status}</em>
									</>
								</>
							) : profile.status === 'inactive' ||
							  profile.status === 'close' ? (
								<>
									<>
										{t('utility.status')}:{' '}
										<em className="text-danger">{profile.status}</em>
									</>
								</>
							) : null}

							{profile && profile.area_influence ? (
								<>
									<strong>{profile.area_influence}</strong>
									<br />
								</>
							) : null}

							{profile && profile.organization_type ? (
								<strong>{profile.organization_type}</strong>
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
	);
};

export default ProfileTop;
