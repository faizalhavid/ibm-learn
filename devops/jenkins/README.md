# Jenkins

Jenkins is an open-source automation server that enables developers to build, test, and deploy their software. It provides hundreds of plugins to support building, deploying, and automating any project.

## Jenkins Data

Jenkins never stores data in a database. Instead, it uses a file-based approach to store its configuration and build data. The main directories where Jenkins stores its data are:

- **JENKINS_HOME**: This is the main directory where Jenkins stores all its data. By default, it is located at `/var/lib/jenkins` on Linux systems. You can change this location by setting the `JENKINS_HOME` environment variable.
- **jobs**: This directory contains all the job configurations and build data. Each job has its own subdirectory under `jobs`, which contains the job's configuration file (`config.xml`) and build data.
- **plugins**: This directory contains all the installed plugins. Each plugin has its own subdirectory under `plugins`, which contains the plugin's `.hpi` or `.jpi` file and other related files.
- **secrets**: This directory contains sensitive data, such as API tokens and credentials. It is important to secure this directory to prevent unauthorized access.
- **logs**: This directory contains log files for Jenkins and its plugins. It is useful for debugging and troubleshooting issues.
- **updates**: This directory contains information about available updates for Jenkins and its plugins. It is used by the update center to check for updates.
- **war**: This directory contains the Jenkins WAR file, which is the main executable file for Jenkins. It is used to start the Jenkins server.
- **config.xml**: This file contains the main configuration for Jenkins, including global settings and system configuration.
- **credentials.xml**: This file contains the credentials used by Jenkins to access external systems, such as Git repositories and cloud providers.
- **hudson.model.UpdateCenter.xml**: This file contains information about the available plugins and updates for Jenkins. It is used by the update center to check for updates.
- **queue.xml**: This file contains information about the current build queue and scheduled builds.
- **nodes**: This directory contains information about the configured nodes (agents) in Jenkins. Each node has its own subdirectory under `nodes`, which contains the node's configuration file (`config.xml`) and build data.
- **fingerprints**: This directory contains information about the fingerprints of files used in builds. It is used to track the usage of files across different builds and jobs.

## Jenkins Job

A Jenkins job is a task or a set of tasks that Jenkins executes. Jobs can be configured to perform various actions, such as building software, running tests, deploying applications, and more. There are several types of jobs in Jenkins:

- **Freestyle Project**: This is the most basic type of job in Jenkins. It allows you to configure a simple build process using a graphical interface. You can specify the source code repository, build triggers, build steps, and post-build actions.
- **Pipeline**: This type of job allows you to define a complex build process using a domain-specific language (DSL) called Pipeline DSL. Pipelines can be defined in a Jenkinsfile, which is stored in the source code repository. Pipelines support parallel execution, stages, and more advanced features.
- **Multibranch Pipeline**: This type of job automatically creates and manages multiple branches of a pipeline job based on the branches in the source code repository. It allows you to run different pipelines for different branches of your code.
- **Folder**: This type of job allows you to organize jobs into folders. It is useful for managing large numbers of jobs and for grouping related jobs together.
- **Matrix Project**: This type of job allows you to run the same build with different configurations, such as different environments or parameters. It is useful for testing software on multiple platforms or configurations.

For a basic introduction to Jenkins, see [this presentation](https://docs.google.com/presentation/d/1JhqKkc7L9NOxSxnYHKlOHaPt7isbKcLfO-IU4QscEGk/edit?slide=id.g12ada718bc4_0_58#slide=id.g12ada718bc4_0_58).

## Jenkins Pipeline

A Jenkins pipeline is a suite of plugins that supports implementing and integrating continuous delivery pipelines into Jenkins. A pipeline is defined in a Jenkinsfile, which is a text file that contains the definition of the pipeline. The Jenkinsfile can be stored in the source code repository alongside the application code.
There are two types of pipelines in Jenkins:

- **Declarative Pipeline**: This is a simplified and more opinionated syntax for defining pipelines. It provides a more structured way to define the pipeline stages, steps, and post-build actions. Declarative pipelines are easier to read and understand, especially for users who are new to Jenkins.
- **Scripted Pipeline**: This is a more flexible and powerful syntax for defining pipelines. It allows you to use Groovy code to define the pipeline logic. Scripted pipelines are more complex and require a deeper understanding of Groovy and Jenkins.

### Agent

The `agent` directive specifies where the pipeline or a specific stage will run. You can specify different types of agents, such as:

- `any`: The pipeline can run on any available agent.
- `none`: The pipeline will not run on any agent by default. You can specify the agent for each stage.
- `label`: The pipeline will run on an agent with a specific label.
- `docker`: The pipeline will run in a Docker container. You can specify the Docker image and other options.
- `dockerfile`: The pipeline will build and run a Docker container using a Dockerfile. You can specify the Dockerfile location and other options.
- `custom`: The pipeline will run on a custom agent defined in the Jenkins configuration.
- `node`: The pipeline will run on a specific node defined in the Jenkins configuration. You can specify the node name and other options.

### Stages

The `stages` directive defines the different stages of the pipeline. Each stage can contain one or more steps. Stages are used to organize the pipeline and provide a visual representation of the pipeline execution in the Jenkins UI.

### Steps

The `steps` directive defines the individual steps that will be executed within a stage. Steps can include build commands, test commands, deployment commands, and other actions. Steps can be defined using built-in steps, custom steps, or shared libraries.

example of a simple Jenkins pipeline using the declarative syntax:

```groovy
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'make build'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'make test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                sh 'make deploy'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
```
