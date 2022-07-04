import { Box, Center, Container, Grid, GridItem, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import NextLink from 'next/link';
import { GetCharacterResutls, Character } from '../../types/types';

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

function CharPage({ character }: { character: Character }) {
	console.log('data');
	return (
		<Container fontWeight='semibold' centerContent mt={20}>
			<NextLink href={'/'} passHref>
				<Link color='teal.600'>
					Go Back Home <ExternalLinkIcon mx='2px' />
				</Link>
			</NextLink>

			<Image
				src={character.image}
				alt={character.name}
				width='200px'
				height='200px'
			/>

			<Box mt={3}>{character.name}</Box>
			<Grid>
				<Center>
					<Box p={10}>Info</Box>
				</Center>
				<GridItem bg='teal.500'>
					{'Status: '}
					{character.status}
				</GridItem>
				<GridItem>
					{'Sex: '}
					{character.gender}
				</GridItem>
				<GridItem>
					{'Sex: '}
					{character.species}
				</GridItem>
				<GridItem>
					{'Location: '}
					{character.location.name}
				</GridItem>{' '}
				<GridItem>
					{'Appeared in: '}
					{character.episode.length} {'episodes'}
				</GridItem>
			</Grid>
		</Container>
	);
}

export default CharPage;
