
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
​
const Container = styled.div`
 position: absolute;
 height: 50%;
 width: 50%;
​
 @keyframes spin-me-round {
  0% {
   transform: rotate(0deg);
  }
  100% {
   transform: rotate(360deg);
  }
 }
`
​
const Clock = styled.div`
 position: relative;
 width: 50px;
 height: 50px;
 border-radius: 50%;
 border: solid 2px ${props => props.theme.colors.primary};
 left: 50%;
 margin-left: -25px;
 top: 50%;
 margin-top: -25px;
 animation: pop-in 0.5s ease-in-out 0s 1 normal forwards;
​
 @keyframes pop-in {
  0% {
   transform: scale(0, 0);
   opacity: 0;
  }
  90% {
   transform: scale(1.3, 1.3);
   opacity: 1;
  }
  100% {
   transform: scale(1, 1);
  }
 }
`
​
const Minutes = styled.div`
 position: absolute;
 height: 2px;
 width: 20px;
 top: 50%;
 left: 50%;
 margin-top: -1px;
 margin-left: -1px;
 background: ${props => props.theme.colors.primary};
 border-radius: 2px;
 animation: spin-me-round 1s linear 0.2s infinite;
 transform-origin: 1px 1px;
​
 ${props =>
  props.isError &&
  `
  animation: broken-clock-minutes 5s ease-out 0s 1 normal forwards;
 `};
​
 @keyframes broken-clock-minutes {
  0% {
   transform: rotate(0deg);
  }
  90% {
   transform: rotate(1050deg);
  }
  100% {
   transform: translate(36px, 38px) rotate(195deg);
  }
 }
`
​
const Hours = styled.div`
 position: absolute;
 height: 2px;
 width: 15px;
 top: 50%;
 left: 50%;
 margin-top: -1px;
 margin-left: -1px;
 background: ${props => props.theme.colors.primary};
 border-radius: 2px;
 animation: spin-me-round 6s linear 0.2s infinite;
 transform-origin: 1px 1px;
​
 ${props =>
  props.isError &&
  `
  animation: broken-clock 5s ease-out 0s 1 normal forwards;
 `};
​
 @keyframes broken-clock {
  0% {
   transform: rotate(0deg);
  }
  89% {
   transform: rotate(180deg);
  }
  100% {
   transform: translate(-28px, 36px) rotate(-15deg);
  }
 }
`
​
const Loading = ({ isError }) => (
 <Container>
  <Clock>
   <Minutes isError={isError} />
   <Hours isError={isError} />
  </Clock>
 </Container>
)
​
Loading.propTypes = {
 isError: PropTypes.bool,
}
​
export default Loading