import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const SearchBox = ({
	history,
	searchWord,
	searchQueryPath,
	searchQueryEmpty,
}) => {
	const { t } = useTranslation();

	const [keyword, setKeyword] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`${searchQueryPath}${keyword}`);
		} else {
			history.push(searchQueryEmpty);
		}
	};

	return (
		<Form
			onSubmit={submitHandler}
			style={{ width: '25rem', marginRight: 'auto' }}
		>
			<Form.Control
				type="text"
				name="q"
				onChange={(e) => setKeyword(e.target.value)}
				placeholder={`${t('action.search')} ${searchWord}...`}
			></Form.Control>
			{/* <Button type="submit" variant="outline-primary" className="pl-3 pr-3">
				{t('action.search')}
			</Button> */}
		</Form>
	);
};

export default SearchBox;
