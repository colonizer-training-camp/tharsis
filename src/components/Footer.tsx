import styled from '@emotion/styled';

import { BLACK, WHITE } from '@/styles/colors';

import LayoutPanel from './LayoutPanel';
import Space from './Space';
import { BoldDivider } from './styledComponents';

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${WHITE};
  color: ${BLACK};
  padding: 48px 0 96px 0;
  font-size: 12px;
  line-height: 1.4em;
`;

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 1200px) {
    gap: 32px;
  }
`;

const SubText = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const Footer = () => {
  return (
    <Container>
      <LayoutPanel>
        <BoldDivider />
        <Space h={32} />
        <ContactWrapper>
          <p>
            본 프로젝트는 Colonizer Traning Camp 소유의 위스키 및 스피릿을 관리하기 위해 만들어진
            프로젝트입니다. 사이트 내에 기재된 정보는 실제 정보와 다를 수 있음에 유의해주세요.
          </p>
          <SubText>COLONIZER TRAINING CAMP</SubText>
        </ContactWrapper>
      </LayoutPanel>
    </Container>
  );
};

export default Footer;
