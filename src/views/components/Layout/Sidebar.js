import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import Placeholder from '../../img/placeholder.png';
import { listUserProjects } from '../../../application/actions/projectActions';

const Sidebar = () => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const dispatch = useDispatch();
	const projectUser = useSelector((state) => state.projectUser);
	const { projects } = projectUser;

	useEffect(() => {
		dispatch(listUserProjects(userInfo._id));
	}, [dispatch, userInfo]);

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
							<>
								{userInfo.firstName} {userInfo.lastName} <br />
								{userInfo.role} {userInfo.status}
							</>
						)}
					</div>
					<hr />
					<div className="sidebar-menu">
						<h4>Projects</h4>
						<div className="sidebar-meu-items">
							{projects ? (
								<ListGroup variant="flush">
									{projects.map((project, index) => (
										<ListGroup.Item key={index}>
											<Link to={`/project/${project._id}`}>
												<span>{project.projectName}</span>
											</Link>
										</ListGroup.Item>
									))}
								</ListGroup>
							) : (
								<span>There are no Projects</span>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
