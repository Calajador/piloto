#!groovy
@Library('devopspaas-pipeline-paas@master')
@Library('devopspaas-pipeline-basic-nodejs-library@develop') _

devopspaasDevelopment(language: 'nodejs', paas: 'kubernetes', ci: true, cd: true, executeKubePluginAgents: true, providerAgents:'openshift', configurationFile: 'jenkinsfile.yaml')