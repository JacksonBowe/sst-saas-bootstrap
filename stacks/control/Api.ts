import { StackContext, Api, use } from "sst/constructs";
// import { StorageStack } from "./Storage"
// import { AuthStack } from "./Auth"

export function ControlApi({ stack }: StackContext) {
	const api = new Api(stack, "ControlApi", {
		defaults: {
			function: {
				copyFiles: [{ from: "packages/core", to: "core" }],
				environment: {},
				permissions: [],
				bind: [],
			},
		},
		routes: {
			// "GET /test": "packages/functions/api/lambda.handler",
			"POST /layers": "packages/control/functions/api/layers.handler",
			"GET /layers": "packages/control/functions/api/layers.handler",
			"POST /users": "packages/control/functions/api/users.handler",
			"GET /users": "packages/control/functions/api/users.handler",
			"GET /users/{userId}": "packages/control/functions/api/users.handler",
		},
	});

	stack.addOutputs({
		ControlApiEndpoint: api.url,
	});

	return {
		api,
	};
}
