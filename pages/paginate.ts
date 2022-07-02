import type { GetStaticProps } from 'next';
import { useState } from 'react';
import { GetCharacterResutls, Info } from '../types/types';

export const getStaticProps: GetStaticProps = async (context) => {
	const res = await fetch('https://rickandmortyapi.com/api/character');

	const { info }: GetCharacterResutls = await res.json();

	return {
		props: {
			data: info,
		},
	};
};

export const Paginate: React.FunctionComponent<Info> = ({ data: Info }) => {
	const [data, updateData] = useState();
	// const results = data;

	return null;
};
