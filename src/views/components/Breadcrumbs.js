import React from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Breadcrumb as BootStrapBreadcrumb } from 'react-bootstrap';

const Breadcrumbs = ({ history }) => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const breadCrumbSave = useSelector((state) => state.breadCrumbSave);
	const { breadcrumbs } = breadCrumbSave;

	return (
		<>
			{userInfo ? (
				<BootStrapBreadcrumb>
					<BootStrapBreadcrumb.Item>
						<Link to={`/profile/${userInfo._id}/projects`}>Projects</Link>
					</BootStrapBreadcrumb.Item>

					{breadcrumbs.map((item, index) => (
						<BootStrapBreadcrumb.Item key={index}>
							<Link to={item.path}>{item.name}</Link>
						</BootStrapBreadcrumb.Item>
					))}
				</BootStrapBreadcrumb>
			) : null}
		</>
	);
};

export default withRouter(Breadcrumbs);
