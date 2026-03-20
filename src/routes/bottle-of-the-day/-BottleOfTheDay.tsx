import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";
import LayoutPanel from "../../components/LayoutPanel";
import Space from "../../components/Space";
import type { BottleData } from "../print/bottle/-types";
import BottleLabelCard from "./-BottleLabelCard";

const BottleOfTheDay = () => {
  const now = new Date().toISOString().slice(2, 10);
  const [bottles, setBottles] = useState<BottleData[]>([]);
  const [randomBottle, setRandomBottle] = useState<BottleData | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}bottles.json`)
      .then((res) => res.json())
      .then((data: BottleData[]) => {
        setBottles(data);
        if (data.length > 0) {
          setRandomBottle(data[Math.floor(Math.random() * data.length)]);
        }
      });
  }, []);

  const reroll = useCallback(() => {
    if (bottles.length === 0) return;
    setRandomBottle(bottles[Math.floor(Math.random() * bottles.length)]);
  }, [bottles]);

  return (
    <LayoutPanel>
      <Space h={32} />
      <Container>
        {randomBottle && (
          <BottleLabelCard bottle={{ ...randomBottle, labeledAt: now }} />
        )}
        <Space h={16} />
        <RerollButton onClick={reroll}>{"> RE-ROLL"}</RerollButton>
      </Container>
      <Space h={32} />
    </LayoutPanel>
  );
};

export default BottleOfTheDay;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const RerollButton = styled.button`
  background: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  border: none;
`;
