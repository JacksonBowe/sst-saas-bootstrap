import { SSTConfig } from "sst";
import { ApiStack } from "./stacks/app/Api";
import { ControlApiStack } from "./stacks/control/Api";
import { AuthStack } from "./stacks/app/Auth";

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
		});
		app.stack(AuthStack);
		app.stack(ControlApiStack);
		app.stack(ApiStack);
	},
} satisfies SSTConfig;
