import { GetStaticPaths } from 'next';
import { GetCharacterResutls, Character } from '../../types/types';

function CharPage({ character }: { character: Character }) {
	return <div>{character.name}</div>;
}

export async function getStaticPaths() {
	const res = await fetch('https://rickandmortyapi.com/api/character');
	const { results }: GetCharacterResutls = await res.json();

	return {
		paths: results.map((character) => {
			return { params: { id: String(character.id) } };
		}),
		fallback: true,
	};
}

export async function getStaticProps({ params }: { params: { id: string } }) {
	const res = await fetch(
		`https://rickandmortyapi.com/api/character/${params.id}`
	);
	const character = res.json();
	return {
		props: {
			character,
		},
	};
}

export default CharPage;
