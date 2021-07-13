import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Card, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import * as VscIcons from 'react-icons/vsc';
import Moment from 'react-moment';

const Organization = ({ item, index }) => {
	const { t } = useTranslation();
	return (
		<Card className="table-card" key={index}>
			<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
				<div className="table-card-item">
					<div className="item-one">
						<IconContext.Provider value={{ color: '#008cba', size: '2em' }}>
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
							<Link to={`/news/register`} className="btn btn-secondary">
								<i className="fas fa-plus" /> Add News
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
