import { createFileRoute } from "@tanstack/react-router";
import BottleOfTheDay from "./-BottleOfTheDay";

export const Route = createFileRoute("/bottle-of-the-day/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <BottleOfTheDay />;
}
