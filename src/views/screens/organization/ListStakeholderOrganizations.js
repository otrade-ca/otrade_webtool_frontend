/**
 * List all organizations a stakeholder belongs to
 */
import React, { useEffect } from 'react';
import { Accordion, Button, Card, Row } from 'react-bootstrap';
import { Route, Link, useRouteMatch } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import {
	listStakeholderOrganizations,
	deleteOrganization,
} from '../../../application/actions/organizationAction';
import { Empty, Message, Loader } from '../../components/HelperComponents';
import Paginate from '../../components/Paginate';
import { useTranslation } from 'react-i18next';
import { ORGANIZATION_DELETE_REQUEST } from '../../../application/constants/organizationConstants';
import { IconContext } from 'react-icons';
import * as VscIcons from 'react-icons/vsc';
import PropTypes from 'prop-types';
import SearchBox from '../../components/SearchBox';
import Moment from 'react-moment';

const StakeholderOrganizations = ({
	match,
	listStakeholderOrganizations,
	deleteOrganization,
	organizationStakeholderList: { loading, error, organizations, pages, page },
	organizationDelete: { success },
}) => {
	const stakeholderId = match.params.id;
	const { url } = useRouteMatch();
	const { t } = useTranslation();

	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	//get organizations for stakeholder
	const dispatch = useDispatch();

	useEffect(() => {
		if (success) {
			listStakeholderOrganizations(stakeholderId, keyword, pageNumber);
			dispatch({ type: ORGANIZATION_DELETE_REQUEST });
		} else {
			listStakeholderOrganizations(stakeholderId, keyword, pageNumber);
		}
	}, [
		dispatch,
		stakeholderId,
		success,
		keyword,
		pageNumber,
		listStakeholderOrganizations,
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
						<Empty
							url={'/organizations'}
							type={t('tables.organization')}
							group={'organizations'}
						/>
					) : (
						<Card.Header className="my-card-header">
							<Route
								render={({ history }) => (
									<SearchBox
										history={history}
										searchWord={'organization'}
										searchQueryPath={`/stakeholder/${stakeholderId}/organizations/search/`}
										searchQueryEmpty={`/stakeholder/${stakeholderId}/organizations`}
									/>
								)}
							/>
							<Link
								to={`/organizations/register`}
								className="btn btn-primary ml-2"
							>
								<i className="fas fa-plus"></i> Organization
							</Link>
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
														<p>
															<>
																<Link to={`/organization/${item._id}`}>
																	{item.name}
																</Link>
															</>
															<br />
															<>
																Address:{' '}
																<em>{item.address ? item.address : 'N/A'}</em>
															</>
															<br />
															<>
																Email:{' '}
																<em>{item.email ? item.email : 'N/A'}</em>
															</>
															<br />
															<>
																Telephone:{' '}
																<em>
																	{item.telephone ? item.telephone : 'N/A'}
																</em>
															</>
															<br />
															<>
																Updated On:{' '}
																<em>
																	{item.updatedAt ? (
																		<Moment format="MM-DD-YYYY">
																			{item.updatedAt}
																		</Moment>
																	) : (
																		'N/A'
																	)}
																</em>
															</>
														</p>
													</div>
													<div className="action-btns">
														<Button
															variant="danger"
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
								urlOne={`/stakeholder/${stakeholderId}/organizations/search/`}
								urlTwo={`/stakeholder/${stakeholderId}/organizations/page/`}
							/>
						</Row>
					</Card.Body>
				</>
			)}
		</Card>
	);
};

StakeholderOrganizations.propTypes = {
	listStakeholderOrganizations: PropTypes.func.isRequired,
	deleteOrganization: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	organizationStakeholderList: state.organizationStakeholderList,
	organizationDelete: state.organizationDelete,
});

export default connect(mapStateToProps, {
	listStakeholderOrganizations,
	deleteOrganization,
})(StakeholderOrganizations);
