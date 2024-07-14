import { createFileRoute } from "@tanstack/react-router";
import { Publisher } from "../features/publisher";

export const Route = createFileRoute("/")({
    component: Publisher,
});
