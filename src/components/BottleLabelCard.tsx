import styled from '@emotion/styled';

import { LABEL_BASE_H, LABEL_HEADER } from '@/constants/label';
import type { Bottle } from '@/routes/print/bottle/-types';
import { BLACK, WHITE } from '@/styles/colors';
import { parseAbvParts, splitNameWithParenthetical } from '@/utils/labelFormat';

const SCALE = 1.5;
const CARD_WIDTH = ((LABEL_BASE_H * SCALE) / 3) * 2;
const CARD_HEIGHT = LABEL_BASE_H * SCALE;

const BottleNameLines = ({ name }: { name: string }) => {
  const { main, parenLine } = splitNameWithParenthetical(name);
  return (
    <NameBlock>
      <NameMain>{main}</NameMain>
      {parenLine && <NameParen>{parenLine}</NameParen>}
    </NameBlock>
  );
};

/** ABV and meta footer numbers share the same split / small-value rules. */
const FooterDecimalValue = ({ value }: { value: string }) => {
  const parsed = parseAbvParts(value);
  if (parsed.mode === 'split') {
    return (
      <BottomValueInlineRow>
        <BottomValueInline>{parsed.integer}</BottomValueInline>
        <BottomValueSmallInline>{parsed.fractionWithDot}</BottomValueSmallInline>
      </BottomValueInlineRow>
    );
  }
  if (parsed.value.length > 4) {
    return <BottomValueSmall>{parsed.value}</BottomValueSmall>;
  }
  return <BottomValue>{parsed.value}</BottomValue>;
};

const BottleLabelCard = ({ bottle }: { bottle: Bottle }) => {
  const { brand, name, description, labelledAt, abv, meta, metaValue, whiskybase } = bottle;

  return (
    <Flipper>
      <Front>
        <Header>{LABEL_HEADER}</Header>
        <Body>
          <Brand>{brand}</Brand>
          <BottleNameLines name={name} />
          <Description>{description}</Description>
          <LabelledSection>
            <LabelledLabel>LABELLED</LabelledLabel>
            <LabelledDate>{labelledAt}</LabelledDate>
          </LabelledSection>
          <Separator />
          <BottomSection>
            <BottomColumn>
              <BottomLabel>%VOL</BottomLabel>
              <FooterDecimalValue value={abv} />
            </BottomColumn>
            <BottomColumn>
              <BottomLabel>{meta}</BottomLabel>
              <FooterDecimalValue value={metaValue} />
            </BottomColumn>
          </BottomSection>
        </Body>
      </Front>
      <Back>
        <Header>{LABEL_HEADER}</Header>
        <Body>
          <Brand>{brand}</Brand>
          <BottleNameLines name={name} />
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
  font-family: 'Geist', sans-serif;
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
  height: ${16 * SCALE}px;
  font-size: ${8 * SCALE}px;
  margin-top: ${6 * SCALE}px;
  ${Ellipsis}
`;

const NameBlock = styled.div`
  height: ${24 * SCALE}px;
  margin-top: ${4 * SCALE}px;
`;

const NameMain = styled.div`
  font-size: ${10 * SCALE}px;
  line-height: 1.15;
  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-word;
`;

const NameParen = styled.div`
  font-size: ${7 * SCALE}px;
  line-height: 1.15;
  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-word;
`;

const Description = styled.div`
  height: ${16 * SCALE}px;
  font-size: ${6 * SCALE}px;
  margin-top: ${4 * SCALE}px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LabelledSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: auto;
`;

const LabelledLabel = styled.div`
  font-size: ${5 * SCALE}px;
`;

const LabelledDate = styled.div`
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
  height: ${24 * SCALE}px;
`;

const BottomColumn = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BottomLabel = styled.div`
  font-size: ${5 * SCALE}px;
`;

const BottomValueInlineRow = styled.span`
  white-space: nowrap;
`;

const BottomValue = styled.div`
  font-size: ${11 * SCALE}px;
  line-height: 1;
`;

const BottomValueInline = styled.span`
  font-size: ${11 * SCALE}px;
  line-height: 1;
`;

const BottomValueSmall = styled.div`
  font-size: ${7 * SCALE}px;
  line-height: 1;
  ${Ellipsis}
`;

const BottomValueSmallInline = styled.span`
  font-size: ${7 * SCALE}px;
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
