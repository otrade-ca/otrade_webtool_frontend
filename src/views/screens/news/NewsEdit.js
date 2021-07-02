import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getProjectId } from '../../../application/localStorage';
import { Loader, Message } from '../../components/HelperComponents';
import { getNewsDetails } from '../../../application/actions/newsActions';

const NewsEdit = ({ match }) => {
	const newsId = match.params.newsId;
	const projectId = match.params.projectId
		? match.params.projectId
		: getProjectId();

	const { url } = useRouteMatch();

	const { t } = useTranslation();

	const dispatch = useDispatch();
	const newsDetails = useSelector((state) => state.newsDetails);
	const { loading, news, error } = newsDetails;

	console.log(news);

	// define states
	const [title, setTitle] = useState();
	const [theme, setTheme] = useState();
	const [source, setSource] = useState();
	const [date, setDate] = useState();
	const [projImpact, setProjImpact] = useState();
	const [comment, setComment] = useState();

	useEffect(() => {
		if (!news.title || news._id !== newsId) {
			dispatch(getNewsDetails(newsId));
		} else {
			setTitle(news.title);
			setTheme(news.theme);
			setSource(news.source);
			setDate(news.date.substring(0, 10));
			setProjImpact(news.project_Impact);
			setComment(news.comment);
		}
	}, [dispatch, news, newsId]);

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<Card className="my-card">
					<Card.Header className="my-card-header">
						<h4>News</h4>
						<Link to={`${url}/edit`} className="btn btn-light ml-2">
							<i className="fas fa-edit"></i> Edit
						</Link>
					</Card.Header>
					<Card.Body>
						<Form className="mb-3">
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
											value={comment}
											required
											onChange={(e) => setComment(e.target.value)}
										></Form.Control>
									</Form.Group>
								</Col>
							</Row>
							<hr />

							<hr />

							<Row></Row>
						</Form>
					</Card.Body>
				</Card>
			)}
		</>
	);
};

export default NewsEdit;
