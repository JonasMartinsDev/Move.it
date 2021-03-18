import { useContext } from 'react';
import { RiCloseFill } from 'react-icons/ri';

import { CountdownContext } from '../../contexts/CountDownContext';

import { Container, CountdownButton } from './styles';

const Countdown = () => {
  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountDown,
    resetCountdown,
  } = useContext(CountdownContext);

  const [minutesLeft, minutesRight] = `0${minutes}`.slice(-2).split('');
  const [secondsLeft, secondsRight] = `0${seconds}`.slice(-2).split('');

  return (
    <>
      <Container>
        <div>
          <span>{minutesLeft}</span>
          <span>{minutesRight}</span>
        </div>

        <span>:</span>

        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRight}</span>
        </div>
      </Container>

      {hasFinished ? (
        <CountdownButton disabled active={isActive}>
          Ciclo encerrado
         
        </CountdownButton>
      ) : (
        <>
          {isActive ? (
            <CountdownButton active={isActive} onClick={resetCountdown}>
              Abandonar ciclo
              <RiCloseFill />
            </CountdownButton>
          ) : (
            <CountdownButton active={isActive} onClick={startCountDown}>
              Iniciar um ciclo    
            </CountdownButton>
          )}
        </>
      )}
    </>
  );
};

export default Countdown;
