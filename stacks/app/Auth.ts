import { StackContext, Cognito } from "sst/constructs";
import * as cognito from "aws-cdk-lib/aws-cognito";
import { Duration } from "aws-cdk-lib";
import { StageRemovalPolicy } from "../settings";

export function Auth({ stack }: StackContext) {
	// Cognito User Pool
	const appAuth = new Cognito(stack, "Auth", {
		cdk: {
			userPool: {
				signInAliases: {
					email: true,
				},
				selfSignUpEnabled: false,
				userVerification: {
					emailBody: "Verification code: <b>{####}</b>",
					emailStyle: cognito.VerificationEmailStyle.CODE,
					emailSubject: "Powertec NCM Account Verification",
					smsMessage: "NCM verification code: {####}",
				},
				userInvitation: {
					emailSubject: "Powertec NCM Invitation",
					emailBody: "Hello {username}, Your temporary password is {####}",
					smsMessage: "Hello {username}, Your temporary password is {####}",
				},
				signInCaseSensitive: false,
				autoVerify: { email: true },
				accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
				removalPolicy: StageRemovalPolicy(stack.stage),
				passwordPolicy: { minLength: 8 },
				standardAttributes: {
					email: {
						required: true,
						mutable: true,
					},
				},
				customAttributes: {
					customerId: new cognito.StringAttribute({ mutable: false }),
				},
			},
			userPoolClient: {
				authFlows: {
					adminUserPassword: true,
					userPassword: true,
				},
				preventUserExistenceErrors: true,
				accessTokenValidity: Duration.days(1),
				readAttributes: new cognito.ClientAttributes().withStandardAttributes({ email: true }),
				writeAttributes: new cognito.ClientAttributes().withStandardAttributes({ email: true }),
			},
		},
	});

	return {
		appAuth,
	};
}
