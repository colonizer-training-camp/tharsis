import { type PropsWithChildren } from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1200px) {
    width: 100%;
    padding: 0 24px;
  }
`;

const LayoutPanel = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
};

export default LayoutPanel;
