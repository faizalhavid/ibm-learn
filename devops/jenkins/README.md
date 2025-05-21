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

### Post Actions

The `post` directive defines actions that will be executed
after the pipeline or a specific stage completes. You can specify different conditions, such as `success`, `failure`, `always`, and `unstable`. Post actions can include notifications, cleanup tasks, and other actions that should be performed after the pipeline execution
is complete. For example, you can send an email notification, archive artifacts, or clean up temporary files.
list of post actions:

- `always`: This block will always be executed, regardless of the pipeline or stage result (success, failure, aborted, etc.). It is useful for cleanup tasks that must run no matter what.
- `success`: This block will be executed only if the pipeline or stage completes successfully.
- `failure`: This block will be executed only if the pipeline or stage fails.
- `unstable`: This block will be executed if the pipeline or stage is marked as unstable.
- `changed`: This block will be executed if the pipeline or stage changes its status (e.g., from success to failure).
- `aborted`: This block will be executed if the pipeline or stage is aborted.
- `cleanup`: This block will be executed

### Script

The `script` directive allows you to write Groovy code within the pipeline. It is useful for executing complex logic, conditionals, and loops that cannot be easily expressed using the declarative syntax. The `script` block can be used within stages or as a standalone block in the pipeline.

### Jenkins Variables

Jenkins pipelines support the use of both global and local variables to manage data and control flow during pipeline execution.

#### Global Variables

Jenkins provides a set of built-in global variables that are accessible throughout the pipeline. These variables offer access to Jenkins features and runtime information:

- **`env`**: Accesses environment variables. You can read or set environment variables using this variable.
- **`params`**: Accesses pipeline parameters. Use this to read values of parameters defined for the pipeline.
- **`currentBuild`**: Provides information about the current build, such as its status, duration, and more.

For a comprehensive list of global variables, refer to the [Jenkins documentation](https://www.jenkins.io/doc/book/pipeline/syntax/#global-variables).

#### Local Variables

Local variables can be defined within a pipeline or stage using the `def` keyword. These variables are scoped to the block in which they are declared and are useful for storing temporary values or results during pipeline execution.

Example:

```groovy
pipeline {
    agent any
    environment {
        MY_ENV_VAR = 'Hello, World!'
    }
    stages {
        stage('Build') {
            steps {
                script {
                    def buildNumber = env.BUILD_NUMBER
                    echo "Building version ${buildNumber}..."
                    echo "Environment variable: ${MY_ENV_VAR}"
                }
            }
        }
    }
}
```

In this example, `env.BUILD_NUMBER` is a global variable, while `buildNumber` is a local variable scoped to the `script` block.

#### Credentials

Jenkins provides a secure way to manage sensitive information, such as passwords, API tokens, and SSH keys, using the Credentials plugin. You can store credentials in Jenkins and access them securely within your pipeline.
To use credentials in a Jenkins pipeline, you can use the `withCredentials` or `credentials` directive. The `withCredentials` directive allows you to wrap a block of code with the specified credentials, making them available only within that block. The `credentials` directive is used to access credentials directly without wrapping them in a block.

```groovy
pipeline {
    agent any
    environment {
        MY_SECRET = credentials('my-secret-id')
    }
    stages {
        stage('Build') {
            steps {
                script {
                    // the jenkins will notify you if we use string interpolation, the secret will be visible in the logs
                    echo "Using secret: $MY_SECRET"
                    // ootherwise, the secret will be unvisible in the logs if we use it directly
                    echo "Using secret: ${MY_SECRET}"

                    withCredentials([string(credentialsId: 'my-secret-token', variable: 'TOKEN')
                    ]) {
                        echo "Using secret token: ${TOKEN}"
                        // Use the TOKEN variable in your build steps
                    }
                }
            }
        }
    }
}
```

### Options

The `options` directive allows you to specify various options for the pipeline or a specific stage. Options can include timeouts, retry attempts, and other settings that control the behavior of the pipeline.
Some common options include:

- `timeout`: Specifies a timeout for the pipeline or stage. If the execution exceeds the specified time, it will be aborted.
- `retry`: Specifies the number of times to retry a stage if it fails. This is useful for handling transient errors or flaky tests.
- `disableConcurrentBuilds`: Prevents concurrent builds of the same pipeline. This is useful for ensuring that only one instance of a pipeline runs at a time.
- `timestamps`: Adds timestamps to the console output for better tracking of when each step was executed.
- `ansiColor`: Enables ANSI color support in the console output. This is useful for improving the readability of logs.
- `lock`: Acquires a lock on a resource before executing the pipeline or stage. This is useful for preventing concurrent access to shared resources.
- `buildDiscarder`: Configures the build discarder strategy for the pipeline. This allows you to specify how many builds to keep and when to discard old builds.
- `skipDefaultCheckout`: Skips the default checkout step for the pipeline. This is useful if you want to manage the checkout process manually.

for complete list of options, refer to the [Jenkins documentation](https://www.jenkins.io/doc/book/pipeline/syntax/#options).

Example of using options in a Jenkins pipeline:

```groovy
pipeline {
    agent any
    options {
        timeout(time: 30, unit: 'MINUTES')
        retry(3)
        disableConcurrentBuilds()
        timestamps()
    }
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
    }
}
```

In this example, the pipeline has a timeout of 30 minutes, will retry each stage up to 3 times if it fails, and will disable concurrent builds. Additionally, timestamps will be added to the console output.
