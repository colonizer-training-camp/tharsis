import styled from "@emotion/styled";
import { LABEL_BASE_H, LABEL_BASE_W, LABEL_HEADER } from "../constants/label";
import type { Bottle } from "../routes/print/bottle/-types";
import { BLACK, WHITE } from "../styles/colors";

const SCALE = 1.5;

const BottleLabelCard = ({ bottle }: { bottle: Bottle }) => {
  const { brand, name, description, labeledAt, abv, meta, metaValue } = bottle;

  return (
    <Container>
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
    </Container>
  );
};

export default BottleLabelCard;

const Container = styled.div`
  width: ${LABEL_BASE_W * SCALE}px;
  height: ${LABEL_BASE_H * SCALE}px;
  display: flex;
  flex-direction: column;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: bold;
  background: ${WHITE};
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

const Brand = styled.div`
  font-size: ${8 * SCALE}px;
  margin-top: ${6 * SCALE}px;
`;

const Name = styled.div`
  font-size: ${10 * SCALE}px;
  margin-top: ${4 * SCALE}px;
`;

const Description = styled.div`
  font-size: ${6 * SCALE}px;
  margin-top: ${4 * SCALE}px;
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
`;
