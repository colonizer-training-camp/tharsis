import styled from "@emotion/styled";
import { useCallback, useEffect, useMemo, useState } from "react";
import LayoutPanel from "../../components/LayoutPanel";
import Space from "../../components/Space";
import type { BottleData } from "../print/bottle/-types";
import BottleLabelCard from "./-BottleLabelCard";

const SCALE = 1.5;
const CARD_W = 96 * SCALE;
const CARD_H = 132 * SCALE;
const GAP = 16;
const SLOT = CARD_W + GAP;
const REPS = 20;

const BottleOfTheDay = () => {
  const now = new Date().toISOString().slice(2, 10);
  const [bottles, setBottles] = useState<BottleData[]>([]);
  const [posIdx, setPosIdx] = useState(0);
  const [transition, setTransition] = useState("none");

  const isAnimating = transition !== "none";

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}bottles.json`)
      .then((res) => res.json())
      .then((data: BottleData[]) => {
        setBottles(data);
        if (data.length > 0) {
          const startIdx =
            data.length * Math.floor(REPS / 2) +
            Math.floor(Math.random() * data.length);
          setPosIdx(startIdx);
        }
      });
  }, []);

  const handleTransitionEnd = useCallback(() => {
    setTransition("none");
    setPosIdx((prev) => {
      if (bottles.length === 0) return prev;
      const middleBase = bottles.length * Math.floor(REPS / 2);
      return middleBase + (prev % bottles.length);
    });
  }, [bottles.length]);

  const reroll = useCallback(() => {
    if (bottles.length === 0 || isAnimating) return;
    const target = Math.floor(Math.random() * bottles.length);
    const current = posIdx % bottles.length;
    let distance = target - current;
    if (distance < 0) distance += bottles.length;
    if (distance < Math.floor(bottles.length / 2)) distance += bottles.length;
    const advance = bottles.length * 3 + distance;
    setTransition("transform 4s cubic-bezier(0.05, 0.5, 0.0, 1)");
    setPosIdx((prev) => prev + advance);
  }, [bottles, posIdx, isAnimating]);

  const extended = useMemo(() => {
    return Array(REPS).fill(bottles).flat();
  }, [bottles]);

  const translateX = -(posIdx * SLOT + CARD_W / 2);

  return (
    <LayoutPanel>
      <Space h={32} />
      <CarouselViewport>
        <Track
          style={{
            transform: `translateX(${translateX}px)`,
            transition,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extended.map((bottle, i) => (
            <CardWrapper key={i} $dimmed={!isAnimating && i !== posIdx}>
              <BottleLabelCard bottle={{ ...bottle, labeledAt: now }} />
            </CardWrapper>
          ))}
        </Track>
      </CarouselViewport>
      <Space h={16} />
      <Center>
        <RerollButton onClick={reroll} disabled={isAnimating}>
          {"> RE-ROLL"}
        </RerollButton>
      </Center>
      <Space h={32} />
    </LayoutPanel>
  );
};

export default BottleOfTheDay;

const CarouselViewport = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
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
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const RerollButton = styled.button`
  background: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  border: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
