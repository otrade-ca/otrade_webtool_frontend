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
	listLocationNews,
} from '../../../application/actions/newsActions';
import { News } from '../../components/Entity/News';

const LocationNews = ({
	match,
	listLocationNews,
	deleteNews,
	newsListLocation: { loading, error, news, pages, page, count },
	newsDelete: { success },
}) => {
	const locationId = match.params.id;
	const { url } = useRouteMatch();
	const { t } = useTranslation();

	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	useEffect(() => {
		if (success) {
			listLocationNews(locationId, keyword, pageNumber);
		} else {
			listLocationNews(locationId, keyword, pageNumber);
		}
	}, [listLocationNews, locationId, success, keyword, pageNumber]);

	const renderEmpty = () => (
		<>
			{news && news.length === 0 ? (
				<Empty
					itemLink={`/news/register`}
					url={`/news`}
					type={'News'}
					group={'news'}
				/>
			) : (
				<Card.Header className="my-card-header">
					<h4>{`News (${count})`}</h4>
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
										searchQueryPath={`/community/${locationId}/news/search/`}
										searchQueryEmpty={`/community/${locationId}/news`}
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
										linkPath={`/community/${locationId}/news/${item._id}/view`}
									/>
								))}
						</Accordion>
						<Row className="d-flex justify-content-center mt-2">
							<Paginate
								pages={pages}
								page={page}
								urlOne={`/community/${locationId}/news/search/`}
								urlTwo={`/community/${locationId}/news/page/`}
							/>
						</Row>
					</Card.Body>
				</>
			)}
		</Card>
	);
};

// action creators
LocationNews.propTypes = {
	listLocationNews: PropTypes.func.isRequired,
	deleteNews: PropTypes.func.isRequired,
};

// reducers
const mapStateToProps = (state) => ({
	newsListLocation: state.newsListLocation,
	newsDelete: state.newsDelete,
});

export default connect(mapStateToProps, {
	listLocationNews,
	deleteNews,
})(withRouter(LocationNews));
