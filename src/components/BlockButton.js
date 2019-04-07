import styled from 'styled-components';

export default styled('button')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  width: auto;
  background-color: inherit;
  color: inherit;
  padding: 5px 20px 5px 20px;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  opacity: ${props => (props.fade || props.disabled ? 0.5 : 1)};
  transition: opacity 0.2s;
`;
