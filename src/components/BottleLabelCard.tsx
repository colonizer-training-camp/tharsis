import styled from '@emotion/styled';

import { LABEL_BASE_H } from '@/constants/label';
import type { Bottle } from '@/routes/print/bottle/-types';

import BottleLabelSvg from './BottleLabelSvg';

// mm to px for screen display (1mm ≈ 2.83px at this scale)
const PX_PER_MM = 2.83465;
const SCALE = 1.5;
const CARD_WIDTH = ((LABEL_BASE_H * PX_PER_MM * SCALE) / 3) * 2;
const CARD_HEIGHT = LABEL_BASE_H * PX_PER_MM * SCALE;

const BottleLabelCard = ({ bottle }: { bottle: Bottle }) => {
  return (
    <Flipper>
      <Front>
        <BottleLabelSvg bottle={bottle} />
      </Front>
      <Back>
        <BottleLabelSvg bottle={bottle} face="back" />
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

  svg {
    width: 100%;
    height: 100%;
  }
`;

const Front = styled(Face)`
  transform: rotateY(0deg);
`;

const Back = styled(Face)`
  transform: rotateY(-180deg);
`;
