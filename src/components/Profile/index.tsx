import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengeContext';

import { Container } from './styles';

interface IUserGithub {
  name: string;
  avatar_url: string;
} 

interface ProfileData {
 user: IUserGithub
}

const Profile = ({user}: ProfileData) => {
  const { level } = useContext(ChallengesContext);
  return (
    <Container>
      <img src={user.avatar_url} alt="Jonas Martins" />

      <div>
        <strong>{user.name}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </Container>
  );
};

export default Profile;
