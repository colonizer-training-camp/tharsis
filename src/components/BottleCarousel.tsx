import styled from "@emotion/styled";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useCallback, useMemo, useState } from "react";
import { BLACK } from "../styles/colors";
import type { BottleData } from "../routes/print/bottle/-types";
import BottleLabelCard from "../routes/bottle-of-the-day/-BottleLabelCard";

const SCALE = 1.5;
const CARD_W = 96 * SCALE;
const CARD_H = 132 * SCALE;
const GAP = 16;
const SLOT = CARD_W + GAP;
const REPS = 20;

type BottleCarouselProps = {
  bottles: BottleData[];
  labeledAt: string;
};

const BottleCarousel = ({ bottles, labeledAt }: BottleCarouselProps) => {
  const [posIdx, setPosIdx] = useState(
    () => bottles.length * Math.floor(REPS / 2),
  );
  const [transition, setTransition] = useState("none");

  const isAnimating = transition !== "none";

  const handleTransitionEnd = useCallback(() => {
    setTransition("none");
    setPosIdx((prev) => {
      if (bottles.length === 0) return prev;
      const middleBase = bottles.length * Math.floor(REPS / 2);
      return middleBase + (prev % bottles.length);
    });
  }, [bottles.length]);

  const move = useCallback(
    (direction: -1 | 1) => {
      if (bottles.length === 0 || isAnimating) return;
      setTransition("transform 0.4s ease");
      setPosIdx((prev) => prev + direction);
    },
    [bottles.length, isAnimating],
  );

  const extended = useMemo(() => {
    return Array(REPS).fill(bottles).flat();
  }, [bottles]);

  const translateX = -(posIdx * SLOT + CARD_W / 2);

  return (
    <Wrapper>
      <ArrowButton onClick={() => move(-1)} disabled={isAnimating}>
        <IconChevronLeft size={24} />
      </ArrowButton>
      <CarouselViewport>
        <Track
          style={{
            transform: `translateX(${translateX}px)`,
            transition,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extended.map((bottle, i) => (
            <CardWrapper key={i} $dimmed={i !== posIdx}>
              <BottleLabelCard bottle={{ ...bottle, labeledAt }} />
            </CardWrapper>
          ))}
        </Track>
      </CarouselViewport>
      <ArrowButton onClick={() => move(1)} disabled={isAnimating}>
        <IconChevronRight size={24} />
      </ArrowButton>
    </Wrapper>
  );
};

export default BottleCarousel;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: ${BLACK};
  flex-shrink: 0;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const CarouselViewport = styled.div`
  position: relative;
  overflow: hidden;
  flex: 1;
  height: ${CARD_H + 20}px;
`;

const Track = styled.div`
  position: absolute;
  left: 50%;
  top: 10px;
  display: flex;
  gap: ${GAP}px;
`;

const CardWrapper = styled.div<{ $dimmed: boolean }>`
  flex-shrink: 0;
  opacity: ${({ $dimmed }) => ($dimmed ? 0.3 : 1)};
  transition: opacity 0.3s ease;
`;
