/**
 * List of news belonging to a project
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
	deleteNews,
	listProjectNews,
} from '../../../application/actions/newsActions';
import { News } from '../../components/Entity/News';

const ProjectNews = ({
	match,
	listProjectNews,
	deleteNews,
	newsListProject: { loading, error, news, pages, page, count },
	newsDelete: { success },
}) => {
	const projectId = match.params.id;
	const { url } = useRouteMatch();
	const { t } = useTranslation();

	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	useEffect(() => {
		if (success) {
			listProjectNews(projectId, keyword, pageNumber);
		} else {
			listProjectNews(projectId, keyword, pageNumber);
		}
	}, [listProjectNews, projectId, success, keyword, pageNumber]);

	const renderEmpty = () => (
		<>
			{news && news.length === 0 ? (
				<Empty url={url} type={'News'} group={'news'} />
			) : (
				<Card.Header className="my-card-header">
					<h4>News {`(${count})`}</h4>
					<Link to={`/news/register`} className="btn btn-primary ml-2">
						<i className="fas fa-plus"></i> {t('action.register')}
					</Link>
				</Card.Header>
			)}
		</>
	);

	//delete stakeholder
	const deleteHandler = (id) => {
		if (window.confirm('Click ok to delete')) {
			deleteNews(id);
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
						{news && news.length === 0 ? null : (
							<Route
								render={({ history }) => (
									<SearchBox
										history={history}
										searchWord={'title'}
										searchQueryPath={`/project/${projectId}/news/search/`}
										searchQueryEmpty={`/project/${projectId}/news`}
									/>
								)}
							/>
						)}
						<Accordion defaultActiveKey={1} style={{ marginTop: '1rem' }}>
							{news &&
								news.map((item, index) => (
									<News
										item={item}
										index={index}
										linkPath={`/project/${projectId}/news/${item._id}/view`}
									/>
								))}
						</Accordion>
						<Row className="d-flex justify-content-center mt-2">
							<Paginate
								pages={pages}
								page={page}
								urlOne={`/project/${projectId}/news/search/`}
								urlTwo={`/project/${projectId}/news/page/`}
							/>
						</Row>
					</Card.Body>
				</>
			)}
		</Card>
	);
};

// action creators
ProjectNews.propTypes = {
	listProjectNews: PropTypes.func.isRequired,
	deleteNews: PropTypes.func.isRequired,
};

// reducers
const mapStateToProps = (state) => ({
	newsListProject: state.newsListProject,
	newsDelete: state.newsDelete,
});

export default connect(mapStateToProps, {
	listProjectNews,
	deleteNews,
})(withRouter(ProjectNews));
