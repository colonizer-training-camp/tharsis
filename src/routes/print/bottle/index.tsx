import { createFileRoute } from "@tanstack/react-router";
import PrintBottle from "./-PrintBottle";

export const Route = createFileRoute("/print/bottle/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PrintBottle />;
}
