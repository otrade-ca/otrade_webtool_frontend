import React, { useEffect } from 'react';
import { Card, Button, Accordion, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
	deleteInfluence,
	listInfluences,
} from '../../../application/actions/influenceActions';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import Empty from '../../components/Empty';
import Paginate from '../../components/Paginate';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import * as MdIcons from 'react-icons/md';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const StakeholderInfluences = ({
	match,
	listInfluences,
	deleteInfluence,
	influenceList: { loading, error, influences, pages, page, count },
	influenceDelete: { success },
}) => {
	const stakeholderId = match.params.id;
	const { t } = useTranslation();

	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	useEffect(() => {
		if (success) {
			listInfluences(stakeholderId, keyword, pageNumber);
		} else {
			listInfluences(stakeholderId, keyword, pageNumber);
		}
	}, [listInfluences, stakeholderId, success, keyword, pageNumber]);

	//delete activity
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			deleteInfluence(id);
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
					{influences && influences.length === 0 ? (
						<Empty
							url={'/influences'}
							type={t('tables.influence')}
							group={'influence'}
						/>
					) : (
						<Card.Header className="my-card-header">
							<h4>{`Assessments (${count})`}</h4>
						</Card.Header>
					)}
					<Card.Body>
						{/* <Route
							render={({ history }) => (
								<SearchBox
									history={history}
									searchWord={'activity'}
									searchQueryPath={`/stakeholder/${stakeholderId}/assessments/search/`}
									searchQueryEmpty={`/stakeholder/${stakeholderId}/assessments`}
								/>
							)}
						/> */}
						<Accordion defaultActiveKey={1} style={{ marginTop: '1rem' }}>
							{influences &&
								influences.map((item, index) => (
									<Card className="table-card" key={index}>
										<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
											<div className="table-card-item">
												<div className="item-one">
													<IconContext.Provider
														value={{ color: '#008cba', size: '2em' }}
													>
														<MdIcons.MdAssessment />
													</IconContext.Provider>
												</div>
												<div className="item-two">
													<div>{item.activity && item.activity}</div>
													<div className="item-category">Asessment</div>
												</div>
											</div>
										</Accordion.Toggle>
										<Accordion.Collapse eventKey={index + 1}>
											<Card.Body>
												<div className="d-flex justify-content-between">
													<div>
														<>Type:</> <em>{item.type ? item.type : 'N/A'}</em>
														<br />
														<>Position:</>{' '}
														<em>{item.position ? item.position : 'N/A'}</em>
														<br />
														<>Influence: </>{' '}
														<em>{item.influence ? item.influence : 'N/A'}</em>
														<br />
														<>Impact to project: </>{' '}
														<em>{item.projImpact ? item.projImpact : 'N/A'}</em>
														<br />
														<>Updated On: </>
														<em>
															{item.updatedAt ? (
																<Moment format="MM-DD-YYYY">
																	{item.updatedAt}
																</Moment>
															) : (
																'N/A'
															)}
														</em>
													</div>
												</div>
												{/* <div className="d-flex align-items-center">
													<Button
														variant="danger"
														onClick={() => deleteHandler(item._id)}
													>
														<i className="fas fa-trash"></i> Delete
													</Button>
												</div> */}
											</Card.Body>
										</Accordion.Collapse>
									</Card>
								))}
						</Accordion>
						<Row className="d-flex justify-content-center mt-2">
							<Paginate
								pages={pages}
								page={page}
								urlOne={`/stakeholder/${stakeholderId}/assessments/search/`}
								urlTwo={`/stakeholder/${stakeholderId}/assessments/page/`}
							/>
						</Row>
					</Card.Body>
				</>
			)}
		</Card>
	);
};

StakeholderInfluences.propTypes = {
	listInfluences: PropTypes.func.isRequired,
	deleteInfluence: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	influenceList: state.influenceList,
	influenceDelete: state.influenceDelete,
});

export default connect(mapStateToProps, {
	listInfluences,
	deleteInfluence,
})(StakeholderInfluences);
