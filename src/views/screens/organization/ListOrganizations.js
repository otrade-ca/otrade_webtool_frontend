/**
 * List of all the organizations belonging to a community
 */
import React, { useEffect } from 'react';
import { Route, Link, useRouteMatch } from 'react-router-dom';
import { Accordion, Button, Card, Row } from 'react-bootstrap';
import { useDispatch, connect } from 'react-redux';
import {
	listOrganizations,
	deleteOrganization,
} from '../../../application/actions/organizationAction';
import { Loader, Message, Empty } from '../../components/HelperComponents';
import Paginate from '../../components/Paginate';
import SearchBox from '../../components/SearchBox';
import { ORGANIZATION_DELETE_RESET } from '../../../application/constants/organizationConstants';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import PropTypes from 'prop-types';
import * as RiIcons from 'react-icons/ri';
import * as VscIcons from 'react-icons/vsc';

const OrganizationsList = ({
	match,
	listOrganizations,
	deleteOrganization,
	orgnizationList: { loading, error, organizations, pages, page },
	organizationDelete: { success },
}) => {
	const locationId = match.params.id;
	const { url } = useRouteMatch();
	const { t } = useTranslation();

	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	//get organizations
	const dispatch = useDispatch();

	useEffect(() => {
		if (success) {
			listOrganizations(locationId, keyword, pageNumber);
			dispatch({ type: ORGANIZATION_DELETE_RESET });
		} else {
			listOrganizations(locationId, keyword, pageNumber);
		}
	}, [dispatch, locationId, success, listOrganizations, keyword, pageNumber]);

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
							itemLink={'register'}
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
										searchQueryPath={`/community/${locationId}/organizations/search/`}
										searchQueryEmpty={`/community/${locationId}/organizations`}
									/>
								)}
							/>
							<Link
								to={`/organizations/register/community/${locationId}`}
								className="btn btn-primary ml-2"
							>
								<i className="fas fa-plus"></i> {t('tables.organization')}
							</Link>
						</Card.Header>
					)}
					<Card.Body>
						<Accordion defaultActiveKey={1}>
							{organizations &&
								organizations.map((item, index) => (
									<Card className="table-card">
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
											<div className="table-card-item">
												<div className="item-one">
													<IconContext.Provider
														value={{ color: '#008cba', size: '2em' }}
													>
														<RiIcons.RiCommunityLine />
													</IconContext.Provider>
												</div>
												{item.location ? (
													<div className="item-two">
														<div>{item.location.location}</div>
														<div className="item-category">Community</div>
													</div>
												) : null}
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
														<>
															{t('organization.address.label')} :{' '}
															{item.address ? item.address : 'N/A'}
														</>
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
								urlOne={`/community/${locationId}/organizations/search/`}
								urlTwo={`/community/${locationId}/organizations/page/`}
							/>
						</Row>
					</Card.Body>
				</>
			)}
		</Card>
	);
};

OrganizationsList.propTypes = {
	listOrganizations: PropTypes.func.isRequired,
	deleteOrganization: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	organizationList: state.organizationList,
	organizationDelete: state.organizationDelete,
});

export default connect(mapStateToProps, {
	listOrganizations,
	deleteOrganization,
})(OrganizationsList);
