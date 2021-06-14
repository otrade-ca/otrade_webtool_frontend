import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const NewsForm = ({ match }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	// define states

	// handle submit form
	const submitHandler = (e) => {
		e.preventDefault();

		dispatch();
	};

	return (
		<Card className="my-card">
			<Card.Header className="my-card-header">Add News</Card.Header>
			<Card.Body>
				<Form onSubmit={submitHandler} className="mb-3"></Form>
			</Card.Body>
		</Card>
	);
};

export default NewsForm;
