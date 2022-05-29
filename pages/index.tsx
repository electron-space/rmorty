import { Container, SimpleGrid } from '@chakra-ui/react';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Character, GetCharacterResutls } from '../types/types';

const Home: NextPage<{ characters: Character[] }> = ({ characters }: any) => {
	return (
		<div>
			<Head>
				<title>Rick and Morty Character Info</title>
				<meta name='description' content='Rick and Morty' />
			</Head>

			<SimpleGrid columns={[2, null, 3]} m={[2, 3]} gap='2' p={2}>
				{characters.map((character: Character) => {
					return (
						<Container key={character.id} fontWeight='semibold' centerContent>
							<Image
								src={character.image}
								alt={character.name}
								width='200px'
								height='200px'
							/>
							<Link href={`/characters/${character.id}`}>
								<a>{character.name}</a>
							</Link>
						</Container>
					);
				})}
			</SimpleGrid>
		</div>
	);
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
	const res = await fetch('https://rickandmortyapi.com/api/character');
	const { results }: GetCharacterResutls = await res.json();

	return {
		props: {
			characters: results,
		},
	};
};
