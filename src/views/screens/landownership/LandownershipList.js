import React, { useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	CardContainer,
	Empty,
	Message,
	Loader,
} from '../../components/HelperComponents';

const LandownershipList = ({ match }) => {
	const projectId = match.params.id;
	const { url } = useRouteMatch();

	return (
		<Card className="my-card">
			<Empty
				itemLink={'register'}
				url={url}
				type={'Register'}
				group={'landownerships'}
			/>
		</Card>
	);
};

export default LandownershipList;
