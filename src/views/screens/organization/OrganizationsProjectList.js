import React, { memo, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Accordion, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	listProjectOrganizations,
	deleteOrganization,
} from '../../../application/actions/organizationAction';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FilterBox from '../../components/FilterBox';
import Empty from '../../components/Empty';
import { ORGANIZATION_DELETE_RESET } from '../../../application/constants/organizationConstants';
import { useTranslation } from 'react-i18next';

const OrganizationsProjectList = memo(({ match }) => {
	const projectId = match.params.id;
	const { url } = useRouteMatch();
	const { t } = useTranslation();

	//get organizations
	const dispatch = useDispatch();
	const organizationList = useSelector((state) => state.organizationList);
	const { loading, error, organizations, filtered } = organizationList;

	const organizationDelete = useSelector((state) => state.organizationDelete);
	const { success } = organizationDelete;

	useEffect(() => {
		if (success) {
			dispatch(listProjectOrganizations(projectId));
			dispatch({ type: ORGANIZATION_DELETE_RESET });
		} else {
			dispatch(listProjectOrganizations(projectId));
		}
	}, [dispatch, projectId, success]);

	//delete user
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteOrganization(id));
		}
	};

	return (
		<Card className="my-card">
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					{!filtered && organizations && organizations.length === 0 ? (
						<Empty
							itemLink={'register'}
							url={url}
							type={'Organization'}
							group={'organizations'}
						/>
					) : (
						<Card.Header className="my-card-header">
							<FilterBox searchWord={'Organizations'} />
							<Link to={`${url}/register`} className="btn btn-primary ml-2">
								<i className="fas fa-plus"></i> {t('tables.organization')}
							</Link>
						</Card.Header>
					)}
					<Card.Body>
						<Accordion defaultActiveKey={1}>
							{filtered
								? filtered.map((item, index) => (
										<Card className="table-card">
											<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
												<p>{item.name}</p>
												<p>{item.createdAt.substring(0, 10)}</p>
											</Accordion.Toggle>
											<Accordion.Collapse eventKey={index + 1}>
												<Card.Body>
													<div className="d-flex justify-content-between">
														<div>
															<p>
																{t('tables.organization')}
																{': '}
																<strong>
																	<Link to={`${url}/${item._id}/profile/view`}>
																		{item.name}
																	</Link>
																</strong>
																<br />
																{t('organization.address')}
																{': '} <strong>{item.address}</strong>
																<br />
																{t('organization.email')}
																{': '} <strong>{item.email}</strong>
																<br />
																{t('organization.telephone')}
																{': '} <strong>{item.telephone}</strong>
																<br />
																{t('organization.registered')}
																{': '} {item.createdAt.substring(0, 10)}
															</p>
														</div>
														<div className="d-flex align-items-center">
															<Button
																variant="danger"
																className="btn-md ml-3"
																onClick={() => deleteHandler(item._id)}
															>
																<i className="fas fa-trash"></i> Delete
															</Button>
														</div>
													</div>
												</Card.Body>
											</Accordion.Collapse>
										</Card>
								  ))
								: organizations &&
								  organizations.map((item, index) => (
										<Card className="table-card">
											<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
												<p>{item.name}</p>
												<p>{item.createdAt.substring(0, 10)}</p>
											</Accordion.Toggle>
											<Accordion.Collapse eventKey={index + 1}>
												<Card.Body>
													<div className="d-flex justify-content-between">
														<div>
															<p>
																{t('tables.organization')}
																{': '}
																<strong>
																	<Link to={`${url}/${item._id}/profile`}>
																		{item.name}
																	</Link>
																</strong>
																<br />
																{t('organization.address.label')}
																{': '} <strong>{item.address}</strong>
																<br />
																{t('organization.email.label')}
																{': '} <strong>{item.email}</strong>
																<br />
																{t('organization.telephone.label')}
																{': '} <strong>{item.telephone}</strong>
																<br />
																{t('organization.register_Date')}
																{': '} {item.createdAt.substring(0, 10)}
															</p>
														</div>
														<div className="d-flex align-items-center">
															<Button
																variant="danger"
																className="btn-md ml-3"
																onClick={() => deleteHandler(item._id)}
															>
																<i className="fas fa-trash"></i> Delete
															</Button>
														</div>
													</div>
												</Card.Body>
											</Accordion.Collapse>
										</Card>
								  ))}
						</Accordion>
					</Card.Body>
				</>
			)}
		</Card>
	);
});

export default OrganizationsProjectList;
