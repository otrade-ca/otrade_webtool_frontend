import React from 'react';
import { Table, Row } from 'react-bootstrap';

const TableHelper = ({ children }) => {
	return (
		<Row className="px-3">
			<Table responsive className="table-sm px-4">
				<thead>
					<tr>
						<th>Actor</th>
						<th>Project</th>
						<th>Community</th>
					</tr>
				</thead>
				{children}
			</Table>
		</Row>
	);
};

export default TableHelper;
