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
	listStakeholderDocuments,
} from '../../../application/actions/documentActions';
import Document from '../../components/Entity/Document';
import { IconContext } from 'react-icons';
import * as IoIcons from 'react-icons/io';

const StakeholderDocuments = ({
	match,
	listStakeholderDocuments,
	deleteDocument,
	documentListStakeholder: { loading, error, documents, pages, page, count },
	documentDelete: { success },
}) => {
	const projectId = match.params.id;
	const { url } = useRouteMatch();
	const { t } = useTranslation();

	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	useEffect(() => {
		if (success) {
			listStakeholderDocuments(projectId, keyword, pageNumber);
		} else {
			listStakeholderDocuments(projectId, keyword, pageNumber);
		}
	}, [listStakeholderDocuments, projectId, success, keyword, pageNumber]);

	const renderEmpty = () => (
		<>
			{documents && documents.length === 0 ? (
				<Empty
					//itemLink={`${url}/upload`}
					url={url}
					type={'Documents'}
					group={'documents'}
				/>
			) : (
				<Card.Header className="my-card-header">
					<h4>{`Documents (${count})`}</h4>
					<Link to={`/documents/register`} className="btn btn-primary ml-2">
						<i className="fas fa-plus"></i> {t('action.register')}
					</Link>
				</Card.Header>
			)}
		</>
	);

	const deleteHandler = (id) => {
		if (window.confirm('Click ok to delete')) {
			deleteDocument(id);
		}
	};

	return (
		<Card className="my-card">
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
	listStakeholderDocuments: PropTypes.func.isRequired,
	deleteDocument: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	documentListStakeholder: state.documentListStakeholder,
	documentDelete: state.documentDelete,
});

export default connect(mapStateToProps, {
	listStakeholderDocuments,
	deleteDocument,
})(withRouter(StakeholderDocuments));
