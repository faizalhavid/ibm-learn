# IBM SECURITY COURSE 🧾

## Security and Privacy by Design

## OWASP

## Secrets Management

## Contaiener Security

## Software Supply Chain

A software supply chain attack happens when a cyber threat actor inserts malicious code into software during its development or update process—before it reaches customers. This can occur through initial releases, patches, or hotfixes, impacting all users and posing significant risks to government, critical infrastructure, and private sectors.

The software supply chain is complex, with inputs coming from many sources before an application or product is deployed to production and consumed by its users or clients. When securing the software supply chain, we must consider all elements, including:

#### Software components and dependencies

open-source libraries/plugins, commercial third-party software, container image templates and other IBM products

#### Development and build environments

the tools used to develop, test, build, package and deploy software artifacts, including but not limited to code quality tools, CI/CD pipelines, access management systems that control access to those tools.

#### Supporting Infrastructure and People

The virtual or physical equipment used to operate or access the software supply chain - including servers, storage, and networking devices - and the teams of people involved in the software development
Attack Flow Explanation

![Alt text](./assets/image.png 'Software Supply Chain')

The diagram illustrates the various stages of a software supply chain and highlights potential attack vectors at each step:

1. **Developer**

   - The process begins with a developer writing code.
   - **Risk:** An attacker may submit unauthorized code changes (malicious pull requests or commits).

2. **Source Code**

   - The source code is stored in a repository.
   - **Risk:** Attackers can compromise the source repository, injecting malicious code.

3. **Builds**

   - The code is built, often using dependencies from third-party software.
   - **Risk:**
     - The build process itself can be compromised.
     - Using compromised dependencies from third-party or public repositories can introduce vulnerabilities.
     - Building from modified (malicious) source code.

4. **Package**

   - The built artifacts are packaged for deployment.
   - **Risk:**
     - Attackers may upload modified (malicious) packages to public container registries.
     - Compromised package repositories can distribute malicious packages.

5. **Public Container Registries**

   - Packages are often stored in public registries for distribution.
   - **Risk:**
     - Attackers can compromise public registries, replacing legitimate packages with malicious ones.

6. **Private Compromised Container**

   - Organizations may pull images from public registries into private environments.
   - **Risk:**
     - Private containers can be compromised if they are built from malicious images or packages.

7. **Kubernetes (or Orchestration Platform)**

   - Containers are deployed to orchestration platforms like Kubernetes.
   - **Risk:**
     - Deploying compromised containers.
     - Attacks on exposed or misconfigured clusters.

8. **Application**
   - The application runs in production and serves end-users.
   - **Risk:**
     - Attackers exploit vulnerabilities in the running application.

Securing the software supply chain requires vigilance at every stage—from code development and dependency management to build, packaging, deployment, and runtime operations.

## Technical Vulnerability
