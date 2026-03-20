import BottleCarousel from "../../components/BottleCarousel";
import LayoutPanel from "../../components/LayoutPanel";
import Space from "../../components/Space";
import { useBottles } from "../../hooks/useBottles";
import { getToday } from "../../utils/date";

const BottleOfTheDay = () => {
  const bottles = useBottles();
  const now = getToday();

  return (
    <LayoutPanel>
      <Space h={32} />
      {bottles.length > 0 && (
        <BottleCarousel
          bottles={bottles}
          labeledAt={now}
          mode="reroll"
          initialRandom
        />
      )}
      <Space h={32} />
    </LayoutPanel>
  );
};

export default BottleOfTheDay;
