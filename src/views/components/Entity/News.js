import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Card } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Moment from 'react-moment';

export const News = ({ item, index, linkPath }) => {
	const { t } = useTranslation();
	return (
		<Card className="table-card" key={index}>
			<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
				<div className="table-card-item">
					<div className="item-one">
						<IconContext.Provider value={{ color: '#008cba', size: '2em' }}>
							<FaIcons.FaRegNewspaper />
						</IconContext.Provider>
					</div>
					<div className="item-two">
						<div>
							{item.firstName} {item.lastName}
						</div>
						<div className="item-category">
							News |{' '}
							{item.status === 'active' ? (
								<strong className="text-success">
									{item.title.substring(0, 1).toUpperCase() +
										item.title.substring(1, item.title.length)}
								</strong>
							) : (
								<em className="text-danger">
									{item.title.substring(0, 1).toUpperCase() +
										item.title.substring(1, item.title.length)}
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
									<Link to={linkPath}>{item.title}</Link>
								</>
								<br />
								<>
									Title: <em>{item.title ? item.title : 'N/A'}</em>
								</>
								<br />
								<>
									Theme: <em>{item.theme ? item.theme : 'N/A'}</em>
								</>
								<br />
								<>
									Source:{' '}
									<em>
										{item.source ? (
											<a href={`${item.source}`} target="blank">
												View Source
											</a>
										) : (
											'N/A'
										)}
									</em>
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
							</p>
						</div>
					</div>
					{/* <div className="action-btns">
                    <Button
                        variant="danger"
                        onClick={() => deleteHandler(item._id)}
                    >
                        <i className="fas fa-trash"></i>{' '}
                        {t('action.delete')}
                    </Button>
                </div> */}
				</Card.Body>
			</Accordion.Collapse>
		</Card>
	);
};
