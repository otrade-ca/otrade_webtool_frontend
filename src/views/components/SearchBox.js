import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
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
			style={{
				width: '100%',
				display: 'inline-flex',
			}}
		>
			<Form.Control
				type="text"
				name="q"
				onChange={(e) => setKeyword(e.target.value)}
				placeholder={`${t('action.search')} ${searchWord}...`}
				style={{ maxWidth: '30rem' }}
			></Form.Control>
			<Button
				type="submit"
				variant="outline-primary"
				className="pl-3 pr-3 ml-1"
			>
				{t('action.search')}
			</Button>
		</Form>
	);
};

export default SearchBox;
