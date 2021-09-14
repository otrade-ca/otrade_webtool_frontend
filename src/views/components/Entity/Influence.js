import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Accordion } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import * as MdIcons from 'react-icons/md';
import * as IoIcons from 'react-icons/io';
import * as BiIcons from 'react-icons/bi';
import Moment from 'react-moment';

export const Influence = ({ item, index }) => {
	const { t } = useTranslation();
	return (
		<Card className="table-card" key={index}>
			<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
				<div className="table-card-item">
					<div className="item-one">
						<IconContext.Provider value={{ color: '#008cba', size: '2em' }}>
							<MdIcons.MdAssessment />
						</IconContext.Provider>
					</div>
					<div className="item-two">
						<div>{item.activity && item.activity}</div>
						<div className="item-category">
							Asessment | Updated on:{' '}
							{item.updatedAt ? (
								<Moment format="MM-DD-YYYY">{item.updatedAt}</Moment>
							) : (
								'N/A'
							)}
						</div>
					</div>
					<div className="item-three">
						<IconContext.Provider value={{ color: '#008cba', size: '2em' }}>
							<BiIcons.BiCaretDown />
						</IconContext.Provider>
					</div>
				</div>
			</Accordion.Toggle>
			<Accordion.Collapse eventKey={index + 1}>
				<Card.Body>
					<div className="d-flex justify-content-between">
						<div>
							<>Type:</> <em>{item.type ? item.type : 'N/A'}</em>
							<br />
							<>Position:</> <em>{item.position ? item.position : 'N/A'}</em>
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
									<Moment format="MM-DD-YYYY">{item.updatedAt}</Moment>
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
	);
};
