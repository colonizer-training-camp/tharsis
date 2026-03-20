import styled from '@emotion/styled';

import { LABEL_BASE_H, LABEL_BASE_W, LABEL_HEADER } from '@/constants/label';
import type { Bottle } from '@/routes/print/bottle/-types';
import { BLACK, WHITE } from '@/styles/colors';

const SCALE = 1.5;
const CARD_WIDTH = LABEL_BASE_W * SCALE;
const CARD_HEIGHT = LABEL_BASE_H * SCALE;

const BottleLabelCard = ({ bottle }: { bottle: Bottle }) => {
  const { brand, name, description, labeledAt, abv, meta, metaValue, whiskybase } = bottle;

  return (
    <Flipper>
      <Front>
        <Header>{LABEL_HEADER}</Header>
        <Body>
          <Brand>{brand}</Brand>
          <Name>{name}</Name>
          <Description>{description}</Description>
          <LabeledSection>
            <LabeledLabel>LABELED</LabeledLabel>
            <LabeledDate>{labeledAt}</LabeledDate>
          </LabeledSection>
          <Separator />
          <BottomSection>
            <BottomColumn>
              <BottomLabel>%VOL</BottomLabel>
              <BottomValue>{abv}</BottomValue>
            </BottomColumn>
            <BottomColumn>
              <BottomLabel>{meta}</BottomLabel>
              <BottomValue>{metaValue}</BottomValue>
            </BottomColumn>
          </BottomSection>
        </Body>
      </Front>
      <Back>
        <Header>{LABEL_HEADER}</Header>
        <Body>
          <Brand>{brand}</Brand>
          <Name>{name}</Name>
          {whiskybase && (
            <WhiskybaseLink href={whiskybase} target="_blank" rel="noopener noreferrer">
              {'> WHISKYBASE'}
            </WhiskybaseLink>
          )}
        </Body>
      </Back>
    </Flipper>
  );
};

export default BottleLabelCard;

const Flipper = styled.div`
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  position: relative;
  perspective: 600px;

  &:hover > div:first-of-type {
    transform: rotateY(180deg);
  }

  &:hover > div:last-of-type {
    transform: rotateY(0deg);
  }
`;

const Face = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transition: transform 0.5s ease;
  display: flex;
  flex-direction: column;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  line-height: 1.15;
`;

const Front = styled(Face)`
  transform: rotateY(0deg);
`;

const Back = styled(Face)`
  transform: rotateY(-180deg);
`;

const Header = styled.div`
  background-color: ${BLACK};
  color: ${WHITE};
  font-size: ${5 * SCALE}px;
  padding: ${2 * SCALE}px ${4 * SCALE}px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${2 * SCALE}px;
  overflow: hidden;
`;

const Ellipsis = `
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Brand = styled.div`
  font-size: ${8 * SCALE}px;
  margin-top: ${6 * SCALE}px;
  ${Ellipsis}
`;

const Name = styled.div`
  font-size: ${10 * SCALE}px;
  margin-top: ${4 * SCALE}px;
`;

const Description = styled.div`
  font-size: ${6 * SCALE}px;
  margin-top: ${4 * SCALE}px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LabeledSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: auto;
`;

const LabeledLabel = styled.div`
  font-size: ${5 * SCALE}px;
`;

const LabeledDate = styled.div`
  font-size: ${6 * SCALE}px;
  background-color: ${BLACK};
  color: ${WHITE};
  padding: ${1 * SCALE}px ${3 * SCALE}px;
  margin-top: ${1 * SCALE}px;
`;

const Separator = styled.div`
  border-bottom: ${SCALE}px solid ${BLACK};
  margin-top: ${4 * SCALE}px;
  margin-bottom: ${4 * SCALE}px;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: row;
`;

const BottomColumn = styled.div`
  flex: 1;
`;

const BottomLabel = styled.div`
  font-size: ${5 * SCALE}px;
`;

const BottomValue = styled.div`
  font-size: ${10 * SCALE}px;
  line-height: 1;
`;

const WhiskybaseLink = styled.a`
  margin-top: auto;
  font-size: ${6 * SCALE}px;
  color: ${BLACK};
  text-decoration: none;
  border: ${SCALE}px solid ${BLACK};
  padding: ${4 * SCALE}px ${4 * SCALE}px;
  text-align: center;

  &:hover {
    background: ${WHITE};
    color: ${BLACK};
  }
`;
