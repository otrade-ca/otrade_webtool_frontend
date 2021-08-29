import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Breadcrumb as BootStrapBreadcrumb } from 'react-bootstrap';
import { saveBreadcrumb } from '../../application/actions/routeActions';

const Breadcrumbs = (props) => {
	const {
		history,
		location: { pathname },
	} = props;

	//const pathnames = pathname.split('/').filter((x) => x);
	const pathnames = [pathname];

	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const breadCrumbSave = useSelector((state) => state.breadCrumbSave);
	const { breadcrumbs } = breadCrumbSave;

	console.log(breadcrumbs);

	// useEffect(() => {
	// 	pathNameHandler();
	// }, []);

	const pathHandler = (e) => {
		e.preventDefault();
		console.log(pathname);
		// console.log('adding pathName');
		// console.log('pathname', pathname);
		// let bCrumb = pathname.split('/').filter((x) => x);
		// console.log(bCrumb);

		// if (bCrumb.length === 3) {
		// 	const routeName = bCrumb[2];
		// 	const breadCrumb = {
		// 		pathname,
		// 		routeName,
		// 	};

		// 	const newBreadCrumbs = [...breadcrumbs];
		// 	console.log('routeName', breadCrumb.routeName);
		// 	if (!newBreadCrumbs.includes(breadCrumb.routeName)) {
		// 		newBreadCrumbs.push(breadCrumb);
		// 		dispatch(saveBreadcrumb(newBreadCrumbs));
		// 	}
		// }
	};

	return (
		<BootStrapBreadcrumb>
			<BootStrapBreadcrumb.Item>
				{userInfo && (
					<Link
						onClick={() => history.push(`/profile/${userInfo._id}/projects`)}
					>
						Projects
					</Link>
				)}
			</BootStrapBreadcrumb.Item>
			{/* {pathnames.map((routePath, index) => {
				console.log('routePath', routePath);
				const routeTo = `${pathnames.slice(0, index + 1).join('/')}`;
				console.log('routeTo', routeTo);
				const isLast = index === pathnames.length - 1;
				return isLast ? (
					<BootStrapBreadcrumb.Item>
						<span>{routePath}</span>
					</BootStrapBreadcrumb.Item>
				) : (
					<BootStrapBreadcrumb.Item>
						<Link onClick={() => history.push(routeTo)} key={index}>
							{routePath}
						</Link>
					</BootStrapBreadcrumb.Item>
				);
			})} */}
			{breadcrumbs.map((item, index) => {
				return (
					<BootStrapBreadcrumb.Item>
						<Link onClick={() => history.push(item.path)} key={index}>
							{item.name}
						</Link>
					</BootStrapBreadcrumb.Item>
				);
			})}
		</BootStrapBreadcrumb>
	);
};

export default withRouter(Breadcrumbs);
