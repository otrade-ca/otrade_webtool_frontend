import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import * as RiIcons from 'react-icons/ri';
import Moment from 'react-moment';

const Location = ({ location, index }) => {
	const { t } = useTranslation();
	return (
		<Card className="table-card" key={index}>
			<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
				<div className="table-card-item">
					<div className="item-one">
						<IconContext.Provider value={{ color: '#008cba', size: '2em' }}>
							<RiIcons.RiCommunityLine />
						</IconContext.Provider>
					</div>
					<div className="item-two">
						<div>{location.location}</div>
						<div className="item-category">Community</div>
					</div>
				</div>
			</Accordion.Toggle>
			<Accordion.Collapse eventKey={index + 1}>
				<Card.Body>
					<div className="d-flex justify-content-between">
						<div>
							<>
								<Link to={`/community/${location._id}`}>
									{location.location}
								</Link>
							</>
							<br />
							<>{t('location.area_of_Influence.label')}</>
							{': '}{' '}
							<em>
								{location.area_influence ? location.area_influence : 'N/A'}
							</em>
							<br />
							<>{t('location.organization_Type.label')}</>
							{': '}{' '}
							<em>
								{location.organization_type
									? location.organization_type
									: 'N/A'}
							</em>
							<br />
							<>{t('location.scope.label')}</>
							{': '} <em>{location.scope ? location.scope : 'N/A'}</em>
							<br />
							<>Updated On</>
							{': '}{' '}
							<em>
								{location.updatedAt ? (
									<Moment format="MM-DD-YYYY">{location.updatedAt}</Moment>
								) : (
									'N/A'
								)}
							</em>
						</div>
					</div>
					<hr />
					<div className="action-btns">
						<Link
							to={`/stakeholders/register/community/${location._id}`}
							className="btn btn-primary"
						>
							<i className="fas fa-plus" />
							{t('tables.stakeholder')}
						</Link>
						<Link
							to={`/organizations/register/community/${location._id}`}
							className="btn btn-primary"
						>
							<i className="fas fa-plus" />
							{t('tables.organization')}
						</Link>
						<Link
							to={`/news/register/community/${location._id}`}
							className="btn btn-secondary"
						>
							<i className="fas fa-plus" />
							{'News'}
						</Link>
						{/* <Button
                    variant="danger"
                    onClick={() => deleteHandler(location._id)}
                >
                    <i className="fas fa-trash"></i> Delete
                </Button> */}
					</div>
				</Card.Body>
			</Accordion.Collapse>
		</Card>
	);
};

export default Location;
