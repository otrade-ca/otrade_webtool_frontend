import React, { useEffect, memo } from 'react';
import { Route, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Accordion, Card, Button, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import {
	listUsers,
	deleteUser,
} from '../../../application/actions/userActions';
import SearchBox from '../../components/SearchBox';
import Paginate from '../../components/Paginate';
import { setAlert } from '../../../application/actions/alertActions';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import * as IoIcons from 'react-icons/io';
import Moment from 'react-moment';

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
										<div className="table-card-item">
											<div className="item-one">
												<IconContext.Provider
													value={{ color: '#008cba', size: '2em' }}
												>
													<IoIcons.IoMdPerson />
												</IconContext.Provider>
											</div>
											<div className="item-two">
												<div>
													{user.firstName} {user.lastName}
												</div>
												<div className="item-category">
													{user.role.substring(0, 1).toUpperCase() +
														user.role.substring(1, user.role.length)}{' '}
													|{' '}
													{user.status === 'active' ? (
														<strong className="text-success">
															{user.status.substring(0, 1).toUpperCase() +
																user.status.substring(1, user.status.length)}
														</strong>
													) : (
														<strong className="text-danger">
															{user.status.substring(0, 1).toUpperCase() +
																user.status.substring(1, user.status.length)}
														</strong>
													)}
												</div>
											</div>
										</div>
									</Accordion.Toggle>
									<Accordion.Collapse eventKey={index + 1}>
										<Card.Body>
											<div className="d-flex justify-content-between">
												<div>
													<p>
														{user.firstName} {user.lastName}
														<br />
														Email:{' '}
														<em>
															<a href={`mailto:${user.email}`}>{user.email}</a>
														</em>
														<br />
														<>
															Telephone: <em>{user.telephone}</em>
														</>
														<br />
														<>
															Updated On:{' '}
															<em>
																<Moment format="MM-DD-YYYY">
																	{user.updatedAt}
																</Moment>
															</em>
														</>
													</p>
												</div>
												<div className="action-btns">
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
					<Row className="d-flex justify-content-center mt-2">
						<Paginate
							pages={pages}
							page={page}
							urlOne={'/admin/userlist/search/'}
							urlTwo={'/admin/userlist/page/'}
						/>
					</Row>
				</Card.Body>
			)}
		</Card>
	);
};

export default memo(UserListScreen);
