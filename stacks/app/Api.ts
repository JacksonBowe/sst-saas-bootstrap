import { StackContext, Api, use } from "sst/constructs";
// import { StorageStack } from "./Storage"
// import { AuthStack } from "./Auth"

export function AppApi({ stack }: StackContext) {
	const api = new Api(stack, "AppApi", {
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
		ApiEndpoint: api.url,
	});
}
