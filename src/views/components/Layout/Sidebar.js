import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import Placeholder from '../../img/placeholder.png';
import { listUserProjects } from '../../../application/actions/projectActions';
import { getURL } from '../../../application/api';

const Sidebar = () => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const dispatch = useDispatch();
	const projectUser = useSelector((state) => state.projectUser);
	const { projects } = projectUser;

	useEffect(() => {
		dispatch(listUserProjects(userInfo._id));
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<div className="sidebar-wrapper">
				<div className="sidebar-heading">
					<div className="sidebar-image-container">
						{userInfo && userInfo.image ? (
							<img
								src={userInfo.image}
								alt="profile"
								className="profile-image sidebar-image"
							/>
						) : (
							<img
								src={Placeholder}
								alt="profile"
								className="profile-image sidebar-image"
							/>
						)}
					</div>
					<div className="sidebar-info">
						{userInfo && (
							<p>
								{userInfo.firstName} {userInfo.lastName} <br />
								{userInfo.role}
							</p>
						)}
					</div>
					<hr />
				</div>
				<h4>Projects</h4>
				{projects && (
					<ListGroup variant="flush">
						{projects.map((project, index) => (
							<ListGroup.Item key={index}>
								<Link to={`/project/${project._id}`}>
									<span>{project.projectName}</span>
								</Link>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</div>
		</>
	);
};

export default Sidebar;
