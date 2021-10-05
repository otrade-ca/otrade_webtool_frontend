import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import { Loader, Message } from '../../components/HelperComponents';
import { getDocumentDetails } from '../../../application/actions/documentActions';
import { getBucketInfo } from '../../../application/api';
import './Document.css';

const DocumentView = ({ match }) => {
	const documentId = match.params.documentId;
	const { prependURL } = getBucketInfo('document');

	// usedispatch
	const dispatch = useDispatch();
	// get commitmentdetails
	const documentDetails = useSelector((state) => state.documentDetails);
	const { document, loading, error } = documentDetails;

	useEffect(() => {
		dispatch(getDocumentDetails(documentId));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error.message}</Message>
			) : (
				<Card className="my-card">
					<Card.Header className="my-card-header">
						<h4>Document</h4>
					</Card.Header>
					<Card.Body style={{ width: '100%', margin: 'center' }}>
						<div>
							<p>title: {document.title}</p>
							<div>
								{document.source && (
									<img
										src={`${prependURL}${document.source}`}
										alt="document"
										className="document-image"
									/>
								)}
							</div>
						</div>
					</Card.Body>
				</Card>
			)}
		</>
	);
};

export default DocumentView;
