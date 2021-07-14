import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import * as IoIcons from 'react-icons/io';
import Moment from 'react-moment';
import Placeholder from '../../img/placeholder.png';
import { getBucketInfo } from '../../../application/api';

const Stakeholder = ({ item, index, deleteHandler }) => {
	const { prependURL } = getBucketInfo('stakeholder');
	const { t } = useTranslation();
	return (
		<>
			{item && (
				<Card className="table-card" key={index}>
					<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
						<div className="table-card-item">
							<div className="item-one">
								{item.image ? (
									<img
										src={`${prependURL}${item.image}`}
										alt="profile"
										className="user-stakeholder-image"
									/>
								) : (
									<img
										src={Placeholder}
										alt="profile"
										className="user-stakeholder-image"
									/>
								)}
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
												item.status.substring(1, item.status.length)}
										</strong>
									) : (
										<em className="text-danger">
											{item.status.substring(0, 1).toUpperCase() +
												item.status.substring(1, item.status.length)}
										</em>
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
										<>
											<Link to={`/stakeholder/${item._id}`}>
												{item.firstName} {item.lastName}
											</Link>
										</>
										<br />
										<>
											Email: <em>{item.email ? item.email : 'N/A'}</em>
										</>
										<br />
										<>
											Telephone:{' '}
											<em>{item.telephone ? item.telephone : 'N/A'}</em>
										</>
										<br />
										<>
											Updated on:{' '}
											<em>
												{item.updatedAt ? (
													<Moment format="MM-DD-YYYY">{item.updatedAt}</Moment>
												) : (
													'N/A'
												)}
											</em>
										</>
										<br />
										{/* <>
											Community: <em>{item.location.location}</em>
										</> */}
									</p>
								</div>
							</div>
							<hr />
							<div className="action-btns">
								<Link to={`/activities/register`} className="btn btn-primary">
									<IconContext.Provider
										value={{ color: '#fff', size: '1.5em' }}
									>
										<IoIcons.IoIosAdd />
									</IconContext.Provider>{' '}
									{t('tables.activity')}
								</Link>
								<Link to={`/news/register`} className="btn btn-primary">
									<IconContext.Provider
										value={{ color: '#fff', size: '1.5em' }}
									>
										<IoIcons.IoIosAdd />
									</IconContext.Provider>{' '}
									News
								</Link>
								{/* <Button
													variant="danger"
													onClick={() => deleteHandler(item._id)}
												>
													<i className="fas fa-trash"></i>{' '}
													{t('action.delete')}
												</Button> */}
							</div>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			)}
		</>
	);
};

export default Stakeholder;
