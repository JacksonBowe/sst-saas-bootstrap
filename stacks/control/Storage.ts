import { StackContext, Table } from "sst/constructs";
import { StageRemovalPolicy } from "../settings";

export function ControlStorage({ stack }: StackContext) {
	// DynamoDB table for Users
	const usersTable = new Table(stack, "ControlUsers", {
		fields: {
			PK: "string",
			SK: "string",
		},
		primaryIndex: { partitionKey: "PK", sortKey: "SK" },
		cdk: { table: { removalPolicy: StageRemovalPolicy(stack.stage) } },
	});

	return {
		usersTable,
	};
}
