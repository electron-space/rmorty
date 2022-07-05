import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
	Center,
	Container,
	Heading,
	IconButton,
	SimpleGrid,
	useColorMode,
} from '@chakra-ui/react';

import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { Character, GetCharacterResults } from '../types/types';

export const getStaticProps: GetStaticProps = async (context) => {
	const res = await fetch('https://rickandmortyapi.com/api/character/');
	const { results }: GetCharacterResults = await res.json();

	return {
		props: {
			characters: results,
		},
	};
};

const Home: NextPage<{ characters: Character[] }> = ({ characters }) => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<div>
			<Head>
				<title>Rick and Morty Character Info</title>
				<meta name='description' content='Rick and Morty' />
			</Head>

			<Heading as='h1' size='4x1'>
				<Center>Rick and Morty Status Page </Center>
			</Heading>

			<IconButton
				icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
				variant='outline'
				colorScheme='teal'
				aria-label='Color mode switcher'
				onClick={toggleColorMode}
				ml={2}>
				Switch Mode
			</IconButton>

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
