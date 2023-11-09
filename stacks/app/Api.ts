import { StackContext, Api, use } from "sst/constructs";
// import { StorageStack } from "./Storage"
// import { AuthStack } from "./Auth"

export function AppApi({ stack }: StackContext) {
	const api = new Api(stack, "AppApi", {
		defaults: {
			function: {
				environment: {},
				permissions: [],
				bind: [],
			},
		},
		routes: {
			"POST /noauth/auth": "packages/app/functions/api/auth.handler",
		},
	});

	stack.addOutputs({
		AppApiEndpoint: api.url,
	});

	return {
		api,
	};
}
