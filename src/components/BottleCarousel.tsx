import { useCallback, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

import { LABEL_BASE_H } from '@/constants/label';
import type { BottleData } from '@/routes/print/bottle/-types';
import { BLACK } from '@/styles/colors';

import BottleLabelCard from './BottleLabelCard';

const PX_PER_MM = 2.83465;
const SCALE = 1.5;
const CARD_W = ((LABEL_BASE_H * PX_PER_MM * SCALE) / 3) * 2;
const CARD_H = LABEL_BASE_H * PX_PER_MM * SCALE;
const GAP = 16;
const SLOT = CARD_W + GAP;
const REPS = 20;

export type CarouselMode = 'arrows' | 'reroll';

type BottleCarouselProps = {
  bottles: BottleData[];
  labelledAt: string;
  mode?: CarouselMode;
  initialRandom?: boolean;
};

const BottleCarouselContent = ({
  bottles,
  labelledAt,
  mode = 'arrows',
  initialRandom = false,
}: BottleCarouselProps) => {
  const getInitialPos = useCallback(
    (len: number) => {
      const base = len * Math.floor(REPS / 2);
      return initialRandom ? base + Math.floor(Math.random() * len) : base;
    },
    [initialRandom],
  );

  const [posIdx, setPosIdx] = useState(() => getInitialPos(bottles.length));
  const [transition, setTransition] = useState('none');

  const isAnimating = transition !== 'none';

  const handleTransitionEnd = useCallback(() => {
    setTransition('none');
    setPosIdx((prev) => {
      if (bottles.length === 0) return prev;
      const middleBase = bottles.length * Math.floor(REPS / 2);
      return middleBase + (prev % bottles.length);
    });
  }, [bottles.length]);

  const move = useCallback(
    (direction: -1 | 1) => {
      if (bottles.length === 0 || isAnimating) return;
      setTransition('transform 0.4s ease');
      setPosIdx((prev) => prev + direction);
    },
    [bottles.length, isAnimating],
  );

  const reroll = useCallback(() => {
    if (bottles.length === 0 || isAnimating) return;
    const target = Math.floor(Math.random() * bottles.length);
    const current = posIdx % bottles.length;
    let distance = target - current;
    if (distance < 0) distance += bottles.length;
    if (distance < Math.floor(bottles.length / 2)) distance += bottles.length;
    const advance = bottles.length * 3 + distance;
    setTransition('transform 4s cubic-bezier(0.05, 0.5, 0.0, 1)');
    setPosIdx((prev) => prev + advance);
  }, [bottles, posIdx, isAnimating]);

  const extended = useMemo(() => {
    return Array(REPS).fill(bottles).flat();
  }, [bottles]);

  const translateX = -(posIdx * SLOT + CARD_W / 2);

  return (
    <Wrapper>
      <CarouselRow>
        {mode === 'arrows' && (
          <ArrowButton onClick={() => move(-1)} disabled={isAnimating}>
            <IconChevronLeft size={24} />
          </ArrowButton>
        )}
        <CarouselViewport $hasArrows={mode === 'arrows'}>
          <Track
            style={{
              transform: `translateX(${translateX}px)`,
              transition,
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extended.map((bottle, i) => (
              <CardWrapper
                key={i}
                $dimmed={mode === 'reroll' ? !isAnimating && i !== posIdx : i !== posIdx}
              >
                <BottleLabelCard bottle={{ ...bottle, labelledAt }} />
              </CardWrapper>
            ))}
          </Track>
        </CarouselViewport>
        {mode === 'arrows' && (
          <ArrowButton onClick={() => move(1)} disabled={isAnimating}>
            <IconChevronRight size={24} />
          </ArrowButton>
        )}
      </CarouselRow>
      {mode === 'arrows' && bottles.length > 0 && (
        <Counter>
          {(posIdx % bottles.length) + 1} / {bottles.length}
        </Counter>
      )}
      {mode === 'reroll' && (
        <Center>
          <RerollButton onClick={reroll} disabled={isAnimating}>
            {'> RE-ROLL'}
          </RerollButton>
        </Center>
      )}
    </Wrapper>
  );
};

const BottleCarousel = ({
  bottles,
  labelledAt,
  mode = 'arrows',
  initialRandom = false,
}: BottleCarouselProps) => {
  return bottles.length > 0 ? (
    <BottleCarouselContent
      key="bottleCarouselContent"
      bottles={bottles}
      labelledAt={labelledAt}
      mode={mode}
      initialRandom={initialRandom}
    />
  ) : (
    <BottleCarouselContent
      key="bottleCarouselPlaceholder"
      bottles={bottles}
      labelledAt={labelledAt}
      mode={mode}
      initialRandom={initialRandom}
    />
  );
};

export default BottleCarousel;

const Wrapper = styled.div`
  min-height: ${CARD_H + 20}px;
`;

const CarouselRow = styled.div`
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

const CarouselViewport = styled.div<{ $hasArrows: boolean }>`
  position: relative;
  overflow: hidden;
  ${({ $hasArrows }) => ($hasArrows ? 'flex: 1;' : 'width: 100%;')}
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

const Counter = styled.div`
  text-align: center;
  font-size: 12px;
  margin-top: 8px;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
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
