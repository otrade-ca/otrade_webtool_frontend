import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import * as BiIcons from 'react-icons/bi';
import * as FcIcons from 'react-icons/fc';
import Moment from 'react-moment';
import Placeholder from '../../img/placeholder.png';
import { getBucketInfo } from '../../../application/api';

const Document = ({ item, index, linkPath }) => {
	const { prependURL } = getBucketInfo('document');
	const { t } = useTranslation();
	return (
		<>
			{item && (
				<Card className="table-card" key={index}>
					<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
						<div className="table-card-item">
							<div className="item-one">
								{/* {item.source ? (
									<img
										src={`${prependURL}${item.source}`}
										alt="profile"
										className="user-stakeholder-image"
									/>
								) : (
									<img
										src={Placeholder}
										alt="profile"
										className="user-stakeholder-image"
									/>
								)} */}
								<IconContext.Provider value={{ color: '#008cba', size: '2em' }}>
									<FcIcons.FcDocument />
								</IconContext.Provider>
							</div>
							<div className="item-two">
								<div>Filename: {item.title}</div>
								<div className="item-category">
									Added on <Moment format="MM-DD-YYYY">{item.createdAt}</Moment>
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
									<>
										Filename: <em>{item.title ? item.title : 'N/A'}</em>
									</>
									<br />
									<>
										<Link to={linkPath}>View Document</Link>
									</>
								</div>
							</div>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			)}
		</>
	);
};

export default Document;
