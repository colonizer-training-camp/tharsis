import { useEffect, useState } from "react";
import type { BottleData } from "../routes/print/bottle/-types";

export const useBottles = () => {
  const [bottles, setBottles] = useState<BottleData[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}bottles.json`)
      .then((res) => res.json())
      .then((data: BottleData[]) => setBottles(data));
  }, []);

  return bottles;
};
