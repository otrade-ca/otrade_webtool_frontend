/**
 * List of documents belonging to a project
 */
import React, { useEffect } from 'react';
import { Link, withRouter, useRouteMatch, Route } from 'react-router-dom';
import { Accordion, Card, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	Loader,
	Message,
	Empty,
	SearchBox,
} from '../../components/HelperComponents';
import Paginate from '../../components/Paginate';
import { useTranslation } from 'react-i18next';
import {
	deleteDocument,
	listProjectDocuments,
} from '../../../application/actions/documentActions';
import { Document } from '../../components/Entity/Document';

const StakeholderDocuments = ({
	match,
	listProjectDocuments,
	deleteDocument,
	documentListProject: { loading, error, documents, pages, page, count },
	documentDelete: { success },
}) => {
	const projectId = match.params.id;
	const { url } = useRouteMatch();
	const { t } = useTranslation();

	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	useEffect(() => {
		if (success) {
			listProjectDocuments(projectId, keyword, pageNumber);
		} else {
			listProjectDocuments(projectId, keyword, pageNumber);
		}
	}, [listProjectDocuments, projectId, success, keyword, pageNumber]);

	const renderEmpty = () => <></>;

	const deleteHandler = (id) => {
		if (window.confirm('Click ok to delete')) {
			deleteDocument(id);
		}
	};

	return (
		<Card>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					{renderEmpty()}
					<Card.Body>
						{documents && documents.length === 0 ? null : (
							<Route
								render={({ history }) => (
									<SearchBox
										history={history}
										searchWord={'title'}
										searchQueryPath={`/project/${projectId}/documents/search/`}
										searchQueryEmpty={`/project/${projectId}/documents`}
									/>
								)}
							/>
						)}
						<Accordion defaultActiveKey={1} style={{ marginTop: '1rem' }}>
							{documents &&
								documents.map((item, index) => (
									<Document
										item={item}
										index={index}
										linkPath={`/project/${projectId}/documents/${item._id}/view`}
									/>
								))}
						</Accordion>
						<Row className="d-flex justify-content-center mt-2">
							<Paginate
								pages={pages}
								page={page}
								urlOne={`/project/${projectId}/documents/search/`}
								urlTwo={`/project/${projectId}/documents/page/`}
							/>
						</Row>
					</Card.Body>
				</>
			)}
		</Card>
	);
};

StakeholderDocuments.propTypes = {
	listProjectDocuments: PropTypes.func.isRequired,
	deleteDocument: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	documentListProject: state.documentListProject,
	documentDelete: state.documentDelete,
});

export default connect(mapStateToProps, {
	listProjectDocuments,
	deleteDocument,
})(withRouter(StakeholderDocuments));
