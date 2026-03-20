import { createFileRoute } from "@tanstack/react-router";
import NewBottle from "./-NewBottle";

export const Route = createFileRoute("/print/bottle/new/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <NewBottle />;
}
