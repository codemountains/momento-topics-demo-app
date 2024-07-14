import { createFileRoute } from "@tanstack/react-router";
import { Subscriber } from "../features/subscriber";

export const Route = createFileRoute("/sub")({
    component: Subscriber,
});
