#!/usr/bin/env groovy
/**
 * Custom Properties
 */

def call(language, projectEnv, sourceRepositoryTypeRef) {
	return [		
		//nodejs
		[
			type: "boolean",
		    name: 'nodejsBuild',
			showWhen: projectEnv ==~ /dev|buildrc|rel/ && language == "nodejs",
			defaultValue: devopspaasParametersLoader.defaultValueForNonFeatures(sourceRepositoryTypeRef),
		],
			
		[
			type: "boolean",
			name: 'nodejsUnitTest',
			showWhen: projectEnv ==~ /dev|buildrc|rel/ && language == 'nodejs' ,
			defaultValue: devopspaasParametersLoader.defaultValueForNonFeatures(sourceRepositoryTypeRef),
		],
		[
			type: "boolean",
			name: 'nodejsSonar',
			showWhen: projectEnv ==~ /dev|buildrc|rel/ && language == 'nodejs' ,
			defaultValue: devopspaasParametersLoader.defaultValueForNonFeatures(sourceRepositoryTypeRef),
		],		
		[
			type: "boolean",
			name: 'nodejsPush',
			showWhen: projectEnv ==~ /dev|buildrc|rel/ && language == 'nodejs' ,
			defaultValue: devopspaasParametersLoader.defaultValueForNonFeatures(sourceRepositoryTypeRef),
		],
		[
			type: "boolean",
			name: 'deployApp',
			showWhen: projectEnv ==~ /dev|buildrc|rel/ && language == 'nodejs' ,
			defaultValue: devopspaasParametersLoader.defaultValueForNonFeatures(sourceRepositoryTypeRef),
		],
		[
			type: "boolean",
			name: 'debug',
			showWhen: true,
			description: 'Switch on debug mode logger',
			defaultValue: false

		],
		[
			type: "hidden",
			name: 'TRIGGER_REF',
			showWhen: true,
			defaultValue: "",
		],
		[
			type: "hidden",
			name: 'PULL_REQUEST_FROM_BRANCH',
			showWhen: true,
			defaultValue: "",
		],
		[
			type: "hidden",
			name: 'PULL_REQUEST_ID',
			showWhen: true,
			defaultValue: "",
		]
	]
}

return this