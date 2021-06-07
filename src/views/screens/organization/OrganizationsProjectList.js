import React, { useEffect } from 'react';
import { Route, Link, useRouteMatch } from 'react-router-dom';
import { Accordion, Button, Card, Row } from 'react-bootstrap';
import { useDispatch, connect } from 'react-redux';
import {
	listProjectOrganizations,
	deleteOrganization,
} from '../../../application/actions/organizationAction';
import { Loader, Message, Empty } from '../../components/HelperComponents';
import Paginate from '../../components/Paginate';
import SearchBox from '../../components/SearchBox';
import { ORGANIZATION_DELETE_RESET } from '../../../application/constants/organizationConstants';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import PropTypes from 'prop-types';
import * as VscIcons from 'react-icons/vsc';

const OrganizationsProjectList = ({
	match,
	listProjectOrganizations,
	deleteOrganization,
	organizationDelete: { success },
	organizationList: { loading, error, organizations, pages, page },
}) => {
	const projectId = match.params.id;
	const { url } = useRouteMatch();
	const { t } = useTranslation();

	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;
	console.log('organizations returned', organizations);
	//get organizations
	const dispatch = useDispatch();

	useEffect(() => {
		if (success) {
			listProjectOrganizations(projectId, keyword, pageNumber);
			dispatch({ type: ORGANIZATION_DELETE_RESET });
		} else {
			listProjectOrganizations(projectId, keyword, pageNumber);
		}
	}, [
		dispatch,
		projectId,
		success,
		listProjectOrganizations,
		keyword,
		pageNumber,
	]);

	//delete user
	const deleteHandler = (id) => {
		if (window.confirm('Click ok to delete')) {
			deleteOrganization(id);
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
					{organizations && organizations.length === 0 ? (
						<Empty url={url} type={'Organization'} group={'organizations'} />
					) : (
						<Card.Header className="my-card-header">
							<Route
								render={({ history }) => (
									<SearchBox
										history={history}
										searchWord={'organization'}
										searchQueryPath={`/project/${projectId}/organizations/search/`}
										searchQueryEmpty={`/project/${projectId}/organizations`}
									/>
								)}
							/>
						</Card.Header>
					)}
					<Card.Body>
						<Accordion defaultActiveKey={1}>
							{organizations &&
								organizations.map((item, index) => (
									<Card className="table-card" key={index}>
										<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
											<div className="table-card-item">
												<div className="item-one">
													<IconContext.Provider
														value={{ color: '#008cba', size: '2em' }}
													>
														<VscIcons.VscOrganization />
													</IconContext.Provider>
												</div>
												<div className="item-two">
													<div>{item.name}</div>
													<div className="item-category">Organization</div>
												</div>
											</div>
										</Accordion.Toggle>
										<Accordion.Collapse eventKey={index + 1}>
											<Card.Body>
												<div className="d-flex justify-content-between">
													<div>
														<>
															<Link to={`${url}/${item._id}/view`}>
																{item.name}
															</Link>
														</>
														<br />
														<>Address: {item.address ? item.address : 'N/A'}</>
														<br />
														<>Email: {item.email ? item.email : 'N/A'}</>
														<br />
														<>
															Telephone:{' '}
															{item.telephone ? item.telephone : 'N/A'}
														</>
														<br />
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
						<Row className="d-flex justify-content-center mt-2">
							<Paginate
								pages={pages}
								page={page}
								urlOne={`/project/${projectId}/organizations/search/`}
								urlTwo={`/project/${projectId}/organizations/page/`}
							/>
						</Row>
					</Card.Body>
				</>
			)}
		</Card>
	);
};

OrganizationsProjectList.propTypes = {
	listProjectOrganizations: PropTypes.func.isRequired,
	deleteStakeholder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	organizationList: state.organizationList,
	organizationDelete: state.organizationDelete,
});

export default connect(mapStateToProps, {
	listProjectOrganizations,
	deleteOrganization,
})(OrganizationsProjectList);
