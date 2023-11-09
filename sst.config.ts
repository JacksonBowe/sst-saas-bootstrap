import { SSTConfig } from "sst";
import { AppAuth } from "./stacks/app/Auth";
import { AppStorage } from "./stacks/app/Storage";
import { AppApi } from "./stacks/app/Api";
import { ControlAuth } from "./stacks/control/Auth";
import { ControlStorage } from "./stacks/control/Storage";
import { ControlApi } from "./stacks/control/Api";

export default {
	config(_input) {
		return {
			name: "sst-saas-bootstrap",
			region: "ap-southeast-2",
			profile: "sandbox",
		};
	},
	stacks(app) {
		app.setDefaultFunctionProps({
			runtime: "python3.11",
			copyFiles: [{ from: "packages/core", to: "core" }],
		});

		// Application Plane
		app.stack(AppAuth).stack(AppStorage).stack(AppApi);

		// Control Plane
		app.stack(ControlAuth).stack(ControlStorage).stack(ControlApi);
	},
} satisfies SSTConfig;
