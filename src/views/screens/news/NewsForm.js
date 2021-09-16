import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addNews } from '../../../application/actions/newsActions';
import { useTranslation } from 'react-i18next';
import {
	CommunityDropdown,
	MemberDropdownProject,
	OrganizationDropdown,
} from '../../components/Dropdown/helper';
import { CardContainer } from '../../components/HelperComponents';
import { getProjectId } from '../../../application/localStorage';

const NewsForm = ({ history }) => {
	const projectId = getProjectId();

	const { t } = useTranslation();

	const dispatch = useDispatch();
	const locationsAssign = useSelector((state) => state.locationsAssign);
	const { locations } = locationsAssign;

	const stakeholderAssign = useSelector((state) => state.stakeholderAssign);
	const { members } = stakeholderAssign;

	const organizationAssignment = useSelector(
		(state) => state.organizationAssignment
	);
	const { organizations } = organizationAssignment;

	// define states
	const [title, setTitle] = useState();
	const [theme, setTheme] = useState();
	const [source, setSource] = useState();
	const [date, setDate] = useState();
	const [projImpact, setProjImpact] = useState();
	const [comment, setComment] = useState();

	// handle submit form
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			addNews(
				{
					title,
					theme,
					source,
					date,
					project_Impact: projImpact,
					comment,
					project: projectId,
					locations,
					organizations,
					stakeholders: members,
				},
				history
			)
		);
	};

	return (
		<CardContainer title={'News'}>
			<Form onSubmit={submitHandler} className="mb-3">
				<Row>
					<Col md={6}>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								value={title}
								placeholder="Enter a title"
								required
								onChange={(e) => setTitle(e.target.value)}
							></Form.Control>
						</Form.Group>
					</Col>
					<Col md={6}>
						<Form.Group controlId="theme">
							<Form.Label>Theme</Form.Label>
							<Form.Control
								type="text"
								value={theme}
								placeholder="Enter a source"
								required
								onChange={(e) => setTheme(e.target.value)}
							></Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<Form.Group controlId="source">
							<Form.Label>Source</Form.Label>
							<Form.Control
								type="text"
								value={source}
								placeholder="Enter a source"
								required
								onChange={(e) => setSource(e.target.value)}
							></Form.Control>
						</Form.Group>
					</Col>
					<Col md={6}>
						<Form.Group controlId="date">
							<Form.Label>Date</Form.Label>
							<Form.Control
								type="date"
								value={date}
								required
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
				<Row>
					<Col md={8}>
						<CommunityDropdown label={'Community'} id={projectId} />
					</Col>
				</Row>
				<hr />
				<Row>
					<Col md={8}>
						<MemberDropdownProject label={'Members'} />
					</Col>
				</Row>
				<hr />
				<Row>
					<Col md={8}>
						<OrganizationDropdown
							label={'Organizations'}
							projectId={projectId}
						/>
					</Col>
				</Row>
				<hr />
				<Row>
					<Col>
						<Button type="submit" variant="primary" className="px-5 mt-3">
							Submit
						</Button>
					</Col>
				</Row>
			</Form>
		</CardContainer>
	);
};

export default NewsForm;
