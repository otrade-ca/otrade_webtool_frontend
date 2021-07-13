import React, { useEffect } from 'react';
import { Card, Accordion, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
	deleteInfluence,
	listInfluences,
} from '../../../application/actions/influenceActions';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import Empty from '../../components/Empty';
import Paginate from '../../components/Paginate';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Influence } from '../../components/Entity/Influence';

const StakeholderInfluences = ({
	match,
	listInfluences,
	deleteInfluence,
	influenceList: { loading, error, influences, pages, page, count },
	influenceDelete: { success },
}) => {
	const stakeholderId = match.params.id;
	const { t } = useTranslation();

	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	useEffect(() => {
		if (success) {
			listInfluences(stakeholderId, keyword, pageNumber);
		} else {
			listInfluences(stakeholderId, keyword, pageNumber);
		}
	}, [listInfluences, stakeholderId, success, keyword, pageNumber]);

	const renderEmpty = () => (
		<>
			{influences && influences.length === 0 ? (
				<Empty
					url={'/influences'}
					type={t('tables.influence')}
					group={'influence'}
				/>
			) : (
				<Card.Header className="my-card-header">
					<h4>{`Assessments (${count})`}</h4>
				</Card.Header>
			)}
		</>
	);

	//delete activity
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			deleteInfluence(id);
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
						{/* <Route
							render={({ history }) => (
								<SearchBox
									history={history}
									searchWord={'activity'}
									searchQueryPath={`/stakeholder/${stakeholderId}/assessments/search/`}
									searchQueryEmpty={`/stakeholder/${stakeholderId}/assessments`}
								/>
							)}
						/> */}
						<Accordion defaultActiveKey={1} style={{ marginTop: '1rem' }}>
							{influences &&
								influences.map((item, index) => (
									<Influence item={item} index={index} />
								))}
						</Accordion>
						<Row className="d-flex justify-content-center mt-2">
							<Paginate
								pages={pages}
								page={page}
								urlOne={`/stakeholder/${stakeholderId}/assessments/search/`}
								urlTwo={`/stakeholder/${stakeholderId}/assessments/page/`}
							/>
						</Row>
					</Card.Body>
				</>
			)}
		</Card>
	);
};

StakeholderInfluences.propTypes = {
	listInfluences: PropTypes.func.isRequired,
	deleteInfluence: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	influenceList: state.influenceList,
	influenceDelete: state.influenceDelete,
});

export default connect(mapStateToProps, {
	listInfluences,
	deleteInfluence,
})(StakeholderInfluences);
