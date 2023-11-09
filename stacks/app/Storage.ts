import { StackContext, Table, Bucket } from "sst/constructs";
import { RemovalPolicy } from "aws-cdk-lib";

export function AppStorage({ stack }: StackContext) {
	// DynamoDB table for Users
	const usersTable = new Table(stack, "AppUsers", {
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
