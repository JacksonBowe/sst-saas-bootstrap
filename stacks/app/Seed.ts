import { StackContext, Script } from "sst/constructs";

export function Seed({ stack }: StackContext) {
	new Script(stack, "Seed", {
		onCreate: "packages/app/functions/seed.create",
		onUpdate: "packages/app/functions/seed.create",
		onDelete: "packages/app/functions/seed.create",
	});
}
