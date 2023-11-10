import { SSTConfig } from "sst";
import { Auth } from "./stacks/app/Auth";
import { Storage } from "./stacks/app/Storage";
import { Api } from "./stacks/app/Api";
import { ControlAuth } from "./stacks/control/Auth";
import { ControlStorage } from "./stacks/control/Storage";
import { ControlApi } from "./stacks/control/Api";
import { Seed } from "./stacks/app/Seed";

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
		app.stack(Auth).stack(Storage).stack(Api);

		if (app.stage === "local") app.stack(Seed);

		// Control Plane
		app.stack(ControlAuth).stack(ControlStorage).stack(ControlApi);
	},
} satisfies SSTConfig;
