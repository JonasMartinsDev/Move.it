import { useContext } from 'react';
import { ChallengesContext } from "../../contexts/ChallengeContext"

import { Container } from './styles';

const CompletedChallenges = () => {
  const { challengeCompleted } = useContext(ChallengesContext);
  return (
    <Container>
      <span>Desafios Completos</span>
      <span>{challengeCompleted}</span>
    </Container>
  );
};

export default CompletedChallenges;
