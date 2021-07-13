import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Accordion } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import * as MdIcons from 'react-icons/md';
import Moment from 'react-moment';

const Activity = ({ item, index, linkView, linkCommitment }) => {
	const { t } = useTranslation();
	return (
		<Card className="table-card" key={index}>
			<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
				<div className="table-card-item">
					<div className="item-one">
						<IconContext.Provider value={{ color: '#008cba', size: '2em' }}>
							<MdIcons.MdEvent />
						</IconContext.Provider>
					</div>
					<div className="item-two">
						<div>
							<>{item.activity}</>
						</div>
						<div className="item-category">Activity Type</div>
					</div>
				</div>
			</Accordion.Toggle>
			<Accordion.Collapse eventKey={index + 1}>
				<Card.Body>
					<div className="d-flex justify-content-between">
						<div>
							<>
								<Link to={linkView}>View Details</Link>
							</>
							<br />
							Commitment:{' '}
							<em>
								{item.compromise === 'Yes' ? (
									<Link to={linkCommitment}>{item.compromise}</Link>
								) : (
									<>{item.compromise}</>
								)}
							</em>
							<br />
							Other stakeholders:{' '}
							<em>
								{item.stakeholders && item.stakeholders.length < 2 ? (
									'None'
								) : (
									<div className="activityStakeholders">
										{item.stakeholders &&
											item.stakeholders.map((person) => (
												<>
													<br />
													{person.firstName} {person.lastName}
												</>
											))}
									</div>
								)}
							</em>
							<br />
							<>
								Updated On:{' '}
								<em>
									{item.updatedAt ? (
										<Moment format="MM-DD-YYYY">{item.updatedAt}</Moment>
									) : (
										'N/A'
									)}
								</em>
							</>
						</div>
					</div>
					{/* <div className="d-flex align-items-center">
													<Button
														variant="danger"
														className=" ml-3"
														onClick={() => deleteHandler(item._id)}
													>
														<i className="fas fa-trash"></i> Delete
													</Button>
												</div> */}
				</Card.Body>
			</Accordion.Collapse>
		</Card>
	);
};

export default Activity;
