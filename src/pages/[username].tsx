import Head from 'next/head';

import { GetServerSideProps } from 'next';
import { ChallengesProvider } from '../contexts/ChallengeContext';

import { CountDownProvider } from '../contexts/CountDownContext';

import Sidebar from '../components/Sidebar';
import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import CompletedChallenges from '../components/CompletedChallenges';
import Countdown from '../components/Countdown';
import ChallengeBox from '../components/ChallengeBox';

import { Container } from '../styles/username';


interface IUserGithub {
  name: string;
  avatar_url: string;
}

interface ProfileData {
  user: IUserGithub;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function HomePage ({
  user,
  level,
  challengesCompleted,
  currentExperience
}: ProfileData) {
 return (
  
  <ChallengesProvider
  level={level}
  challengeCompleted={challengesCompleted}
  currentExperience={currentExperience}
  >

  <Container>
    <Head>
      <title>Início | Move.it</title>
    </Head>

    <Sidebar />

    <ExperienceBar />

    <CountDownProvider>
      <section>
        <div>
          <Profile user={user}  />
          <CompletedChallenges />
          <Countdown />
        </div>

        <div>
          <ChallengeBox />
        </div>
      </section>
    </CountDownProvider>
  </Container>
  </ChallengesProvider>
);
};

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {

  const { username } = params

  const { level, currentExperience, challengesCompleted } = req.cookies

  const response = await fetch(`https://api.github.com/users/${username}`)

  const user = await response.json()

  return {
      props: {
          user,
          level: Number(level),
          currentExperience: Number(currentExperience),
          challengesCompleted: Number(challengesCompleted)
      }
  }

}


