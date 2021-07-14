import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Card, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import * as IoIcons from 'react-icons/io';
import Moment from 'react-moment';
import Placeholder from '../../img/placeholder.png';
import { getBucketInfo } from '../../../application/api';

const Organization = ({ item, index }) => {
	const { prependURL } = getBucketInfo('organization');
	const { t } = useTranslation();
	return (
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
								<Link to={`/organization/${item._id}`}>{item.name}</Link>
							</>
							<br />
							<>
								{t('organization.address.label')} :{' '}
								<em>{item.address ? item.address : 'N/A'}</em>
							</>
							<br />
							<>
								Email: <em>{item.email ? item.email : 'N/A'}</em>
							</>
							<br />
							<>
								Telephone: <em>{item.telephone ? item.telephone : 'N/A'}</em>
							</>
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
							<br />
						</div>
					</div>
					<hr />
					<Row className="d-flex align-items-center">
						<Col>
							<Link to={`/news/register`} className="btn btn-primary">
								<IconContext.Provider value={{ color: '#fff', size: '1.5em' }}>
									<IoIcons.IoIosAdd />
								</IconContext.Provider>{' '}
								News
							</Link>
						</Col>
						{/* <Button
						variant="danger"
						onClick={() => deleteHandler(item._id)}
					>
						<i className="fas fa-trash"></i> Delete
					</Button> */}
					</Row>
				</Card.Body>
			</Accordion.Collapse>
		</Card>
	);
};

export default Organization;
