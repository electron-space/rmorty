import { Box, Button, Container, Grid, GridItem } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { GetCharacterResutls, Character } from '../../types/types';

function CharPage({ character }: { character: Character }) {
	return (
		<Container fontWeight='semibold' centerContent mt={20}>
			<Button colorScheme='blue' mb={4}>
				<Link href={'/'}>
					<a>{'Homepage'}</a>
				</Link>
			</Button>

			<Image
				src={character.image}
				alt={character.name}
				width='200px'
				height='200px'
			/>

			<Box mt={3}>{character.name}</Box>
			<Grid>
				<Box>Info</Box>
				<GridItem bg='teal.200'>
					{'Status: '}
					{character.status}
				</GridItem>
				<GridItem>
					{'Sex: '}
					{character.gender}
				</GridItem>
				<GridItem>
					{'Location: '}
					{character.location.name}
				</GridItem>
			</Grid>
		</Container>
	);
}

export async function getStaticPaths() {
	const res = await fetch('https://rickandmortyapi.com/api/character');
	const { results }: GetCharacterResutls = await res.json();

	const paths = results.map((character) => ({
		params: {
			id: String(character.id),
		},
	}));
	return { paths, fallback: true };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
	const res = await fetch(
		`https://rickandmortyapi.com/api/character/${params.id}`
	);
	const character = await res.json();

	return {
		props: {
			character,
		},
	};
}

export default CharPage;
