import styled from '@emotion/styled';

import {
  LABEL_HEADER,
  VIAL_ARROW_H,
  VIAL_ARROW_POLYGONS,
  VIAL_ARROW_VIEWBOX,
  VIAL_ARROW_W,
  VIAL_CARE_INSTRUCTIONS,
  VIAL_LABEL_BASE_H,
  VIAL_LABEL_BASE_W,
  VIAL_LABEL_HEADER_MID,
  VIAL_LABEL_HEADER_PRE,
} from '@/constants/label';
import type { VialBox, VialData } from '@/routes/print/vial/-types';
import { BLACK, GREY, WHITE } from '@/styles/colors';

const SCALE = 1.5;
const CARD_WIDTH = VIAL_LABEL_BASE_W * SCALE;
const CARD_HEIGHT = VIAL_LABEL_BASE_H * SCALE;

const isEmptyVial = (vial: VialData) => !vial.brand && !vial.name && !vial.abv && !vial.ppm;

const VialBoxLabelCard = ({ vialBox }: { vialBox: VialBox }) => {
  const { vials, labeledAt } = vialBox;

  return (
    <Card>
      <HeaderRow>
        <Banner>
          {VIAL_LABEL_HEADER_PRE}
          <BannerSerif>{` ${VIAL_LABEL_HEADER_MID} `}</BannerSerif>
          {LABEL_HEADER}
        </Banner>
        <LabeledSection>
          <LabeledLabel>LABELED</LabeledLabel>
          <LabeledDate>{labeledAt}</LabeledDate>
        </LabeledSection>
      </HeaderRow>
      <VialsRow>
        {vials.map((vial, index) => (
          <VialColumn key={index}>
            {!isEmptyVial(vial) && (
              <>
                <Brand>{vial.brand}</Brand>
                <Name>{vial.name}</Name>
                <ValuesRow>
                  <ValueColumn>
                    <ValueLabel>%VOL</ValueLabel>
                    <Value>{vial.abv}</Value>
                  </ValueColumn>
                  <ValueColumn>
                    <ValueLabel>PPM</ValueLabel>
                    <Value>{vial.ppm}</Value>
                  </ValueColumn>
                </ValuesRow>
              </>
            )}
          </VialColumn>
        ))}
      </VialsRow>
      <BottomSection>
        <Instructions>
          {VIAL_CARE_INSTRUCTIONS.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </Instructions>
        <ThisSideUp>
          <ThisSideUpText>
            <div>THIS</div>
            <div>SIDE</div>
            <div>UP</div>
          </ThisSideUpText>
          <ArrowSvg viewBox={VIAL_ARROW_VIEWBOX}>
            {VIAL_ARROW_POLYGONS.map((points) => (
              <polygon key={points} points={points} fill={BLACK} />
            ))}
          </ArrowSvg>
        </ThisSideUp>
      </BottomSection>
    </Card>
  );
};

export default VialBoxLabelCard;

const Card = styled.div`
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  padding: ${10 * SCALE}px ${7 * SCALE}px ${7 * SCALE}px;
  display: flex;
  flex-direction: column;
  background-color: ${WHITE};
  color: ${BLACK};
  border: 1px solid ${GREY};
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  line-height: 1.15;
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const Banner = styled.div`
  background-color: ${BLACK};
  color: ${WHITE};
  font-size: ${6.5 * SCALE}px;
  padding: ${1.5 * SCALE}px ${4 * SCALE}px;
  white-space: nowrap;
`;

const BannerSerif = styled.span`
  font-family: 'Times New Roman', Georgia, serif;
  font-style: italic;
  font-weight: normal;
  font-size: ${6 * SCALE}px;
  white-space: pre;
`;

const LabeledSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: ${5 * SCALE}px;
  margin-bottom: ${1 * SCALE}px;
  flex-shrink: 0;
  white-space: nowrap;
`;

const LabeledLabel = styled.div`
  font-size: ${6 * SCALE}px;
`;

const LabeledDate = styled.div`
  font-size: ${8.5 * SCALE}px;
  line-height: 0.85;
`;

const VialsRow = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  margin-top: ${10 * SCALE}px;
`;

const VialColumn = styled.div`
  width: ${100 / 3}%;
  display: flex;
  flex-direction: column;
  padding: 0 ${4 * SCALE}px;

  &:first-of-type {
    padding-left: 0;
  }

  &:last-of-type {
    padding-right: 0;
  }

  &:not(:last-of-type) {
    border-right: 1px solid ${BLACK};
  }
`;

const Brand = styled.div`
  font-size: ${6 * SCALE}px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Name = styled.div`
  font-size: ${9.5 * SCALE}px;
  line-height: 1.15;
  margin-top: ${2 * SCALE}px;
  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-word;
`;

const ValuesRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: auto;
`;

const ValueColumn = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

const ValueLabel = styled.div`
  font-size: ${6 * SCALE}px;
`;

const Value = styled.div`
  font-size: ${10 * SCALE}px;
  line-height: 1;
  margin-top: ${2 * SCALE}px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: ${2 * SCALE}px;
`;

const Instructions = styled.div`
  font-size: ${6 * SCALE}px;
  line-height: 1.45;
`;

const ThisSideUp = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: ${2 * SCALE}px;
`;

const ThisSideUpText = styled.div`
  font-size: ${6 * SCALE}px;
  line-height: 1.1;
  text-align: right;
`;

const ArrowSvg = styled.svg`
  width: ${VIAL_ARROW_W * SCALE}px;
  height: ${VIAL_ARROW_H * SCALE}px;
  display: block;
`;
