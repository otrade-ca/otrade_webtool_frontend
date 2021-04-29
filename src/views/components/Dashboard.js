import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Dashboard = () => {
	return (
		<>
			{/* <Row className="justify-content-center mt-1">
				<Col>
					<BorderContainer>
						<div className="dashboard-container-bottom">In Development</div>
					</BorderContainer>
				</Col>
			</Row>
			<Row className="justify-content-center mt-1">
				<Col>
					<BorderContainer>
						<div className="dashboard-container-bottom">In Development</div>
					</BorderContainer>
				</Col>
			</Row>
			<Row className="justify-content-center mt-1">
				<Col>
					<BorderContainer>
						<div className="dashboard-container-bottom">In Development</div>
					</BorderContainer>
				</Col>
			</Row> */}
			{/* <Container fluid> */}
			<Row>
				<Col xs={2} id="sidebar-wrapper"></Col>
				<Col xs={10} id="page-content-wrapper">
					this is a test
				</Col>
			</Row>
			{/* </Container> */}
		</>
	);
};

export default Dashboard;
