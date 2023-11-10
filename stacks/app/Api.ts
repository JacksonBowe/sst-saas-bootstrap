import { StackContext, Api as SSTApi, use } from "sst/constructs";
// import { StorageStack } from "./Storage"
// import { AuthStack } from "./Auth"

export function Api({ stack }: StackContext) {
	const api = new SSTApi(stack, "Api", {
		defaults: {
			function: {
				copyFiles: [{ from: "packages/core", to: "core" }],
				environment: {},
				permissions: [],
				bind: [],
			},
		},
		routes: {
			"POST /noauth/auth": "packages/app/functions/api/auth.handler",
			"GET /layers": "packages/app/functions/api/layers.handler",
		},
	});

	stack.addOutputs({
		AppApiEndpoint: api.url,
	});

	return {
		api,
	};
}
