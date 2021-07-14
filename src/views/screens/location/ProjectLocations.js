/**
 * List of communities belonging to a project
 */
import React, { useEffect } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { Accordion, Card, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Empty, Message, Loader } from '../../components/HelperComponents';
import {
	deleteLocation,
	listLocations,
} from '../../../application/actions/locationActions';
import { LOCATION_DELETE_RESET } from '../../../application/constants/locationConstants';
import { useTranslation } from 'react-i18next';
import SearchBox from '../../components/SearchBox';
import Paginate from '../../components/Paginate';
import Location from '../../components/Entity/Location';
import { IconContext } from 'react-icons';
import * as IoIcons from 'react-icons/io';

const ProjectLocations = ({ match }) => {
	const projectId = match.params.id;

	const { t } = useTranslation();

	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	// get locations
	const dispatch = useDispatch();
	const locationList = useSelector((state) => state.locationList);
	const { loading, error, locations, pages, page, count } = locationList;

	const locationDelete = useSelector((state) => state.locationDelete);
	const { success } = locationDelete;

	useEffect(() => {
		if (success) {
			dispatch(listLocations(projectId, keyword, pageNumber));
			dispatch({ type: LOCATION_DELETE_RESET });
		} else {
			dispatch(listLocations(projectId, keyword, pageNumber));
		}
	}, [dispatch, projectId, keyword, pageNumber, success]);

	const renderEmpty = () => (
		<>
			{locations && locations.length === 0 ? (
				<Empty
					itemLink={`/communities/register/project/${projectId}`}
					url={`/communities/register/project/${projectId}`}
					type={t('tables.location')}
					group={'locations'}
				/>
			) : (
				<Card.Header className="my-card-header">
					<h4>Communities {`(${count})`}</h4>
					<Link
						to={`/communities/register/project/${projectId}`}
						className="btn btn-primary ml-2"
					>
						<IconContext.Provider value={{ color: '#fff', size: '1.5em' }}>
							<IoIcons.IoIosAdd />
						</IconContext.Provider>{' '}
						Community
					</Link>
				</Card.Header>
			)}
		</>
	);

	//delete location
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteLocation(id));
		}
	};

	return (
		<Card className="my-card">
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>{renderEmpty()}</>
			)}
			<Card.Body>
				{locations && locations.length === 0 ? null : (
					<Route
						render={({ history }) => (
							<SearchBox
								history={history}
								searchWord={'community'}
								searchQueryPath={`/project/${projectId}/communities/search/`}
								searchQueryEmpty={`/project/${projectId}/communities`}
							/>
						)}
					/>
				)}
				<Accordion defaultActiveKey={1} style={{ marginTop: '1rem' }}>
					{locations &&
						locations.map((location, index) => (
							<Location location={location} index={index} />
						))}
				</Accordion>
				<Row className="d-flex justify-content-center mt-2">
					<Paginate
						pages={pages}
						page={page}
						urlOne={`/project/${projectId}/communities/search/`}
						urlTwo={`/project/${projectId}/communities/page/`}
					/>
				</Row>
			</Card.Body>
		</Card>
	);
};

export default withRouter(ProjectLocations);
