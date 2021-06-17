import React, { useState } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CommunityDropdown from '../../components/Dropdown/CommunityDropdown';
import OrganizationDropdown from '../../components/Dropdown/OrganizationDropdown';

const NewsForm = ({ match }) => {
	const projectId = match.params.id;
	const { t } = useTranslation();

	const dispatch = useDispatch();
	const locationAssign = useSelector((state) => state.locationAssign);
	const { location } = locationAssign;

	// define states
	const [title, setTitle] = useState();
	const [source, setSource] = useState();
	const [date, setDate] = useState();
	const [projImpact, setProjImpact] = useState();
	const [comment, setComment] = useState();

	// handle submit form
	const submitHandler = (e) => {
		e.preventDefault();

		dispatch();
	};

	return (
		<Card className="my-card">
			<Card.Header className="my-card-header">Add News</Card.Header>
			<Card.Body>
				<Form onSubmit={submitHandler} className="mb-3">
					<Row>
						<Col md={6}>
							<Form.Group controlId="title">
								<Form.Label>Title</Form.Label>
								<Form.Control
									type="text"
									value={title}
									placeholder="Enter a title"
									onChange={(e) => setTitle(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group controlId="source">
								<Form.Label>Source</Form.Label>
								<Form.Control
									type="text"
									value={source}
									placeholder="Enter a source"
									onChange={(e) => setSource(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<Form.Group controlId="date">
								<Form.Label>Date</Form.Label>
								<Form.Control
									type="date"
									value={date}
									onChange={(e) => setDate(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<hr />
					<Row>
						<Col md={6}>
							<Form.Group controlId="date">
								<Form.Label>Impact to Project</Form.Label>
								<Form.Control
									as="select"
									value={projImpact}
									required
									onChange={(e) => setProjImpact(e.target.value)}
								>
									<option value="">--Select--</option>
									<option value="alto">alto</option>
									<option value="muy alto">muy alto</option>
									<option value="bajo">bajo</option>
									<option value="desconocido">desconocido</option>
									<option value="medio">medio</option>
								</Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col md={12}>
							<Form.Group>
								<Form.Label>Comments</Form.Label>
								<Form.Control
									className="mb-3"
									as="textarea"
									rows="4"
									placeholder="Enter Details"
									required
									onChange={(e) => setComment(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<hr />
					<CommunityDropdown label={'Community'} id={projectId} />

					<OrganizationDropdown label={'Organization'} locationId={location} />
					<hr />
					<Row>
						<Col>
							<Button type="submit" variant="primary" className="px-5 mt-3">
								Submit
							</Button>
						</Col>
					</Row>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default NewsForm;
