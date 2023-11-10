import { StackContext, Table, Bucket } from "sst/constructs";
import { StageRemovalPolicy } from "../settings";

export function Storage({ stack }: StackContext) {
	// DynamoDB table for Users
	const usersTable = new Table(stack, "Users", {
		fields: {
			PK: "string",
			SK: "string",
		},
		primaryIndex: { partitionKey: "PK", sortKey: "SK" },
		cdk: { table: { removalPolicy: StageRemovalPolicy(stack.stage) } },
	});

	// Example bucket that holds whatever - random example below for a GIS solution
	const layersBucket = new Bucket(stack, "LayersBucket", {
		notifications: {
			layerUploaded: {
				// Do stuff when a .toml is uploaded to the layers/ folder
				function: "packages/functions/bucket_notifications/layers.create_index",
				events: ["object_created"],
				filters: [{ prefix: "layers/" }, { suffix: ".toml" }],
			},
			layerRemoved: {
				// Do stuff when a .toml is removed from the layers/ folder
				function: "packages/functions/bucket_notifications/layers.remove_index",
				events: ["object_removed"],
				filters: [{ prefix: "layers/" }, { suffix: ".toml" }],
			},
		},
		cors: [
			{
				allowedMethods: ["GET"],
				allowedOrigins: ["*"], // TODO: Specify
			},
		],
		cdk: {
			bucket: {
				removalPolicy: StageRemovalPolicy(stack.stage),
			},
		},
	});

	// DynamoDB table for Layers - following above example
	const layersTable = new Table(stack, "Layers", {
		fields: {
			PK: "string",
			SK: "string",
		},
		primaryIndex: { partitionKey: "PK" },
		globalIndexes: {},
		cdk: {
			table: {
				removalPolicy: StageRemovalPolicy(stack.stage),
			},
		},
	});

	stack.addOutputs({
		TestThing: StageRemovalPolicy(stack.stage),
	});

	return {
		usersTable,
		layersTable,
	};
}
