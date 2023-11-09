import { StackContext, Table } from "sst/constructs";
import { RemovalPolicy } from "aws-cdk-lib";

export function ControlStorage({ stack }: StackContext) {
	// DynamoDB table for Users
	const usersTable = new Table(stack, "ControlUsers", {
		fields: {
			PK: "string",
			SK: "string",
		},
		primaryIndex: { partitionKey: "PK", sortKey: "SK" },
		cdk: { table: { removalPolicy: RemovalPolicy.DESTROY } },
	});

	return {
		usersTable,
	};
}
