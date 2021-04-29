import React, { useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import {
	listUsers,
	deleteUser,
} from '../../../application/actions/userActions';
import SearchBox from '../../components/SearchBox';
import Paginate from '../../components/Paginate';
import BorderContainer from '../../components/BorderContainer.js';
import { setAlert } from '../../../application/actions/alertActions';
import { useTranslation } from 'react-i18next';

const UserListScreen = ({ history, match }) => {
	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	const { t } = useTranslation();
	const dispatch = useDispatch();

	//get logged in user
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	//get list of users
	const userList = useSelector((state) => state.userList);
	const { loading, error, users, page, pages } = userList;

	//get success from userDelete reducer
	const userDelete = useSelector((state) => state.userDelete);
	const { success } = userDelete;

	useEffect(() => {
		if (success) {
			history.push('/admin/userList');
		}
		dispatch(listUsers(keyword, pageNumber));
	}, [dispatch, history, keyword, pageNumber, success]);

	//delete user
	const deleteHandler = (id) => {
		if (id === userInfo._id) {
			dispatch(setAlert('You cannot delete yourself'));
		} else {
			if (window.confirm('Are you sure?')) {
				dispatch(deleteUser(id));
			}
		}
	};

	return (
		<Card className="my-card">
			<Card.Header className="my-card-header">
				<h4>Users</h4>
				<Route
					render={({ history }) => (
						<SearchBox
							history={history}
							searchWord={'LastName'}
							searchQueryPath={'/admin/userList/search/'}
							searchQueryEmpty={'/admin/userList'}
						/>
					)}
				/>
				<Link to="/admin/userList/add" className="btn btn-primary">
					<i className="fas fa-plus"></i> User
				</Link>
			</Card.Header>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Card.Body>
					<Accordion defaultActiveKey={1}>
						{users &&
							users.map((user, index) => (
								<Card className="table-card">
									<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
										<p>
											{user.firstName} {user.lastName}
										</p>

										<p>{user.createdAt.substring(0, 10)}</p>
									</Accordion.Toggle>
									<Accordion.Collapse eventKey={index + 1}>
										<Card.Body>
											<div className="d-flex justify-content-between">
												<div>
													<p>
														<strong>User: </strong>
														<Link to={`/profile/${user._id}`}>
															{user.lastName}, {user.firstName}
														</Link>
														<br />
														{t('user.email.label')}:{' '}
														<em>
															<a href={`mailto:${user.email}`}>{user.email}</a>
														</em>
														<br />
														{t('user.telephone.label')}:{' '}
														<strong>
															<em>{user.telephone}</em>
														</strong>
														<br />
														Role:{' '}
														<strong>
															<em>{user.role}</em>
														</strong>
														<br />
														<strong>{t('utility.status')}: </strong>
														{user.status === 'active' ? (
															<strong>
																<em className="text-success">{user.status}</em>
															</strong>
														) : (
															<strong>
																<em className="text-danger">{user.status}</em>
															</strong>
														)}
														<br />
														Joined:{' '}
														<strong>
															{user.createdAt.substring(0, 10)}
														</strong>{' '}
														<br />
													</p>
												</div>
												<div className="d-flex align-items-center">
													<LinkContainer to={`/admin/user/${user._id}/edit`}>
														<Button variant="light" className="btn-md ml-3 ">
															<i className="fas fa-edit" /> {t('action.update')}
														</Button>
													</LinkContainer>
													<Button
														variant="danger"
														className="btn-md ml-3"
														onClick={() => deleteHandler(user._id)}
													>
														<i className="fas fa-trash" /> {t('action.delete')}
													</Button>
												</div>
											</div>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							))}
					</Accordion>
					<Row className="d-flex justify-content-center">
						<Paginate
							pages={pages}
							page={page}
							urlOne={'/admin/projects/search/'}
							urlTwo={'/admin/projects/page/'}
						/>
					</Row>
				</Card.Body>
			)}
		</Card>
	);
};

export default UserListScreen;
