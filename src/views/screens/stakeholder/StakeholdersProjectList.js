import React, { useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Accordion, Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
	FilterBox,
	Loader,
	Message,
	Empty,
} from '../../components/HelperComponents';
import {
	listProjectStakeholders,
	deleteStakeholder,
} from '../../../application/actions/stakeholderActions';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import PropTypes from 'prop-types';

const StakeholdersLocationList = ({
	match,
	listProjectStakeholders,
	deleteStakeholder,
	stakeholderDelete: { success },
	stakeholderProjectList: { loading, error, filtered, stakeholders },
}) => {
	const projectId = match.params.id;
	const { url } = useRouteMatch();
	const { t } = useTranslation();

	console.log('stakeholders', stakeholders);

	useEffect(() => {
		if (success) {
			listProjectStakeholders(projectId);
		} else {
			listProjectStakeholders(projectId);
		}
	}, [listProjectStakeholders, projectId, success]);

	//delete stakeholder
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			deleteStakeholder(id);
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
					{!filtered && stakeholders && stakeholders.length === 0 ? (
						<Empty url={url} type={'Stakeholder'} group={'stakeholders'} />
					) : (
						<Card.Header className="my-card-header">
							<h4>{t('tables.stakeholder')}</h4>
							<FilterBox searchWord={'UserStakeholders'} />
						</Card.Header>
					)}
					<Card.Body>
						<Accordion defaultActiveKey={1}>
							{filtered
								? filtered.map((item, index) => (
										<Card className="table-card" key={index}>
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
															{item.firstName} {item.lastName}
														</div>
														<div className="item-category">
															Stakeholder |{' '}
															{item.status === 'active' ? (
																<strong className="text-success">
																	{item.status.substring(0, 1).toUpperCase() +
																		item.status.substring(
																			1,
																			item.status.length
																		)}
																</strong>
															) : (
																<em className="text-danger">
																	{item.status.substring(0, 1).toUpperCase() +
																		item.status.substring(
																			1,
																			item.status.length
																		)}
																</em>
															)}
														</div>
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
													<div className="item-two">
														<div>{item.location.location}</div>
														<div className="item-category">Community</div>
													</div>
												</div>
											</Accordion.Toggle>
											<Accordion.Collapse eventKey={index + 1}>
												<Card.Body>
													<div className="d-flex justify-content-between">
														<div>
															<p>
																{t('stakeholder.firstName.label')}
																{': '}
																<strong>
																	<Link to={`/stakeholder/${item._id}`}>
																		{item.firstName} {item.lastName}
																	</Link>
																</strong>
																<br />
																{t('stakeholder.email.label')}
																{': '} <strong>{item.email}</strong>
																<br />
																{t('stakeholder.telephone.label')}{' '}
																<strong>{item.telephone}</strong>
																<br />
																{t('stakeholder.register_Date')}
																{': '}
																{item.createdAt.substring(0, 10)}
															</p>
														</div>
														<div className="d-flex align-items-center">
															<Button
																variant="danger"
																className="btn-md ml-3"
																onClick={() => deleteHandler(item._id)}
															>
																<i className="fas fa-trash"></i>{' '}
																{t('action.delete')}
															</Button>
														</div>
													</div>
													<hr />
													<div className="location-add-btns">
														<Link
															to={`/activities/register`}
															className="btn btn-primary"
														>
															<i className="fas fa-plus" /> Add{' '}
															{t('tables.activity')}
														</Link>
													</div>
												</Card.Body>
											</Accordion.Collapse>
										</Card>
								  ))
								: stakeholders &&
								  stakeholders.map((item, index) => (
										<Card className="table-card" key={index}>
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
															{item.firstName} {item.lastName}
														</div>
														<div className="item-category">
															Stakeholder |{' '}
															{item.status === 'active' ? (
																<strong className="text-success">
																	{item.status.substring(0, 1).toUpperCase() +
																		item.status.substring(
																			1,
																			item.status.length
																		)}
																</strong>
															) : (
																<em className="text-danger">
																	{item.status.substring(0, 1).toUpperCase() +
																		item.status.substring(
																			1,
																			item.status.length
																		)}
																</em>
															)}
														</div>
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
													<div className="item-two">
														<div>{item && item.location.location}</div>
														<div className="item-category">Community</div>
													</div>
												</div>
											</Accordion.Toggle>
											<Accordion.Collapse eventKey={index + 1}>
												<Card.Body>
													<div className="d-flex justify-content-between">
														<div>
															<p>
																<>
																	<Link to={`/stakeholder/${item._id}`}>
																		{item.firstName} {item.lastName}
																	</Link>
																</>
																<br />
																<>{item.email}</>
																<br />
																<>{item.telephone}</>
																<br />
															</p>
														</div>
														<div className="d-flex align-items-center">
															<Button
																variant="danger"
																className="btn-md ml-3"
																onClick={() => deleteHandler(item._id)}
															>
																<i className="fas fa-trash"></i>{' '}
																{t('action.delete')}
															</Button>
														</div>
													</div>
													<div className="location-add-btns">
														<Link to={`/activities/register`}>
															<i className="fas fa-plus" /> Add{' '}
															{t('tables.activity')}
														</Link>
														<Link
															to={`/influences/register/stakeholder/${item._id}`}
														>
															<i className="fas fa-plus" /> Add{' '}
															{t('tables.influence')}
														</Link>
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
};

StakeholdersLocationList.propTypes = {
	listProjectStakeholders: PropTypes.func.isRequired,
	deleteStakeholder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	stakeholderProjectList: state.stakeholderProjectList,
	stakeholderDelete: state.stakeholderDelete,
});

export default connect(mapStateToProps, {
	listProjectStakeholders,
	deleteStakeholder,
})(StakeholdersLocationList);
