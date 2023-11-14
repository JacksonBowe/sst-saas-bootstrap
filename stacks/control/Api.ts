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
			// AuthController
			"POST /noauth/auth": { function: "packages/control/functions/auth.handler", authorizer: "none" },
			"POST /noauth/recover": { function: "packages/control/functions/auth.handler", authorizer: "none" },
			"POST /noauth/recover/confirm": { function: "packages/control/functions/auth.handler", authorizer: "none" },
			"POST /noauth/activate": { function: "packages/control/functions/auth.handler", authorizer: "none" },
			"POST /noauth/refresh": { function: "packages/control/functions/auth.handler", authorizer: "none" },
			// UserController
			"GET /tenants/{tenantId}/users": "packages/control/functions/api/user.handler",
			"POST /users/invite": "packages/control/functions/api/user.handler",
			"GET /users/{userId}": "packages/control/functions/api/user.handler",
			"DELETE /users/{userId}": "packages/control/functions/api/user.handler",
			"GET /admin/users": "packages/control/functions/api/user.handler",
			"POST /admin/users/invite": "packages/control/functions/api/user.handler",
			"DELETE /admin/users/{userId}": "packages/control/functions/api/user.handler",
			// TenantController
			"POST /tenant": "packages/control/functions/api/tenant.handler",
			"DELETE /tenant/{tenantId}": "packages/control/functions/api/tenant.handler",
			// LayerController

			"GET /layers": "packages/control/functions/api/layers.handler",
			"GET /layers/{layerId}": "packages/control/functions/api/layers.handler",
			"GET /layers/{layerId}/data": "packages/control/functions/api/layers.handler",
			"GET /layers/{layerId}/cell": "packages/control/functions/api/layers.handler",
			"POST /layers/{layerId}/promote": "packages/control/functions/api/layers.handler",
		},
	});

	stack.addOutputs({
		ControlApiEndpoint: api.url,
	});

	return {
		api,
	};
}
