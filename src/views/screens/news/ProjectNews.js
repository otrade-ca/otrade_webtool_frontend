import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Card, Button, Row } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import * as IoIcons from 'react-icons/io';
import { useTranslation } from 'react-i18next';

const ProjectNews = ({ match }) => {
	console.log('match', match);
	const projectId = match.params.id;
	const { t } = useTranslation();

	return (
		<Card className="my-card">
			<Card.Header className="my-card-header">
				<h4>News Outlet</h4>
				<Link
					to={`/news/register/project/${projectId}`}
					className="btn btn-primary ml-2"
				>
					<i className="fas fa-plus"></i> Add
				</Link>
			</Card.Header>
			<Card.Body>
				<Accordion>
					<Card className="table-card">
						<Accordion.Toggle as={Card.Header}>
							<div className="table-card-item">
								<div className="item-one">
									<IconContext.Provider
										value={{ color: '#008cba', size: '2em' }}
									>
										<IoIcons.IoMdPerson />
									</IconContext.Provider>
								</div>
							</div>
						</Accordion.Toggle>
						<Accordion.Collapse>
							<Card.Body>Project News</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
			</Card.Body>
		</Card>
	);
};

export default ProjectNews;
