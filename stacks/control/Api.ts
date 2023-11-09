import { StackContext, Api, use } from "sst/constructs";
// import { StorageStack } from "./Storage"
// import { AuthStack } from "./Auth"

export function ControlApi({ stack }: StackContext) {
	const api = new Api(stack, "ControlApi", {
		defaults: {
			function: {
				copyFiles: [{ from: "packages/core", to: "core" }],
			},
		},
		routes: {
			"GET /test": "packages/functions/api/lambda.handler",
		},
	});

	stack.addOutputs({
		ControlApiEndpoint: api.url,
	});

	return {
		api,
	};
}
