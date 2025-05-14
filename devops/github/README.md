# GitHub Repository Protection

Repository protection in GitHub ensures that critical branches and actions in a repository are safeguarded against unwanted or unauthorized changes. This helps maintain a stable and secure codebase, supports collaboration with confidence, and enforces development workflows through rules.

---

## ✅ Branch Protection Rules

### Purpose

Branch protection rules allow you to configure certain restrictions and requirements for branches in a GitHub repository. These rules can prevent force pushes, unauthorized merges, and other potentially harmful operations.

### How to Set Up

1. **Navigate to Repository Settings**

   - Go to the desired GitHub repository.
   - Click on the `Settings` tab.

2. **Access Branch Protection**

   - On the left sidebar under **Code and automation**, click `Branches`.
   - Click `Add Rule` to create a new rule.

3. **Define Branch Pattern**

   - In **Branch name pattern**, enter a pattern (e.g., `main`, `develop`, `release/*`).
   - Common patterns:
     - `main`, `develop`
     - `feature/*`, `bugfix-*`
     - `*-stable`, `*` (for all branches)

4. **Choose Enforcement Status**
   | Status | Description |
   |------------|---------------------------------------------------------------------|
   | Active | The rules are applied and enforced. |
   | Disabled | The rule exists but is not enforced (no impact). |

5. **Bypass Permissions**

   - Specify exceptions for:
     - Individuals
     - Teams
     - GitHub Apps (e.g., `github-actions[bot]`)
   - Useful for:
     - Admin force pushes
     - CI/CD bot workflows

6. **Select Protections**

   Configure the following branch protection rules to enforce repository security and maintain code quality:

   - **Restrict Creations**  
     Only users with bypass permissions can create references (e.g., branches or tags) that match the rule. This prevents unauthorized creation of critical refs.

   - **Restrict Updates**  
     Only users with bypass permissions can update references matching the rule. This ensures that only authorized changes are made to protected refs.

   - **Restrict Deletions**  
     Only users with bypass permissions can delete references matching the rule. This safeguards important branches or tags from accidental or malicious deletion.

   - **Require Linear History**  
     Prevents merge commits from being pushed to matching refs, enforcing a linear commit history. This simplifies debugging and ensures a clean project history.

   - **Require Deployments to Succeed**  
     Specifies which deployment environments must succeed before changes can be pushed to matching refs. This ensures that deployments are stable and verified.

   - **Require Signed Commits**  
     Ensures that all commits pushed to matching refs have verified signatures, proving authorship and maintaining commit integrity.

   - **Require a Pull Request Before Merging**  
     Mandates that all changes be made on a non-target branch and submitted via a pull request. This enforces code review and collaboration before merging.

   - **Require Status Checks to Pass**  
     Specifies which status checks (e.g., CI tests) must pass before the ref is updated. Commits must first be pushed to another ref where the checks succeed.

   - **Block Force Pushes**  
     Prevents users with push access from force pushing to matching refs. This protects the branch history from being overwritten.

   - **Require Code Scanning Results**  
     Requires specific tools to provide code scanning results before the reference is updated. This ensures that vulnerabilities or issues are identified and addressed.

   These rules collectively enhance repository security, enforce best practices, and maintain a stable and reliable codebase.

7. **Save Rule**

   - Click `Create` or `Save changes` to apply the rule.

8. **Test Protection**
   - Simulate push or PR merge that violates a rule to verify enforcement.

---

## 💡 Tips & Best Practices

- Create separate rules for branches like `main`, `develop`, and `release/*`.
- Use wildcards to scale branch protections without manual entry.
- Combine with GitHub Actions for CI/CD enforcement.
- Consider default settings for new branches using `Default branch protection`.

---

## 🔐 GPG (GNU Privacy Guard) for Signed Commits

GPG enables you to sign Git commits and tags to prove authorship and maintain integrity. Signed commits display a "Verified" badge on GitHub.

### Setup Steps

1. **Install GPG**

   - [Download GPG](https://gnupg.org/download/) for your OS.

2. **Generate a GPG Key**

   ```bash
   gpg --full-generate-key
   ```

3. **List GPG Keys**

   ```bash
   gpg --list-secret-keys --keyid-format LONG
   ```

4. **Export Public Key**

   ```bash
   gpg --armor --export <your-key-id> | pbcopy
   ```

5. **Add GPG Key to GitHub**

   - Go to `GitHub Settings > SSH and GPG keys > New GPG Key`
   - Paste the exported public key.

6. **Configure Git to Use GPG**

   ```bash
   git config --global user.signingkey <your-key-id>
   git config --global commit.gpgSign true
   ```

7. **Sign Commits Manually**

   ```bash
   git commit -S -m "Your message"
   ```

8. **Verify Commit Signatures**

   ```bash
   git log --show-signature
   ```

9. **Troubleshooting GPG**
   Ensure your terminal session supports GPG signing:

   ```bash
   export GPG_TTY=$(tty)
   ```

10. **Sign Tags**
    ```bash
    git tag -s v1.0 -m "Signed version 1.0"
    git tag -v v1.0
    ```

---

## 🔐 Optional Use Cases for GPG

- **SSH Authentication with GPG**

  ```bash
  gpg --export-secret-keys <your-key-id> | ssh-add -K
  ```

- **File Encryption**

  - Encrypt:
    ```bash
    gpg -e -r <recipient-email> <file>
    ```
  - Decrypt:
    ```bash
    gpg -d <file>.gpg
    ```

- **Email Encryption**
  - Use email clients like Thunderbird with Enigmail.

---

## 🔐 Environment Variables & Secrets

Environment variables and secrets help store sensitive configuration values securely and inject them into GitHub Actions workflows without exposing them publicly.

### Setup in GitHub

1. Go to your repository `Settings`
2. Navigate to `Secrets and variables > Actions`
3. Click `New repository secret` or `New variable`
4. Add key-value pairs (e.g., `DEPLOY_TOKEN`, `FIREBASE_API_KEY`)

### Access in GitHub Actions

```yaml
env:
  FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

---

## 🚀 Deployment Workflows

Use GitHub Actions to automate deployment.

### Example: Firebase Hosting Deploy

```yaml
name: Deploy to Firebase
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install -g firebase-tools
      - run: firebase deploy --token ${{ secrets.FIREBASE_TOKEN }}
```

---

## 🤖 GitHub Apps & Bots (e.g., depanbot)

### Purpose

GitHub Apps or bots like `depanbot` can automate tasks such as labeling, auto-merging, comment moderation, or CI/CD processes.

### Setup

- Install from GitHub Marketplace
- Grant repo access and scopes
- Configure `.github/` directory:
  - `.github/dependabot.yml`
  - `.github/labeler.yml`

### Example: Auto Label PR

```yaml
name: Label PRs
on:
  pull_request:
    types: [opened, synchronize]
jobs:
  label:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/labeler@v4
```

---

## 📌 Summary

| Feature                 | Description                                             |
| ----------------------- | ------------------------------------------------------- |
| Branch Protection Rules | Prevent force pushes, require reviews, enforce CI rules |
| GPG Commit Signing      | Proves authorship, verifies commit integrity            |
| Environment Variables   | Store secrets securely for CI/CD                        |
| Deployment Workflows    | Automate deploys with GitHub Actions                    |
| GitHub Apps & Bots      | Automate workflows, labeling, moderation, etc.          |

Using these practices ensures code quality, secure collaboration, and a professional Git workflow in team environments.

---

**Last updated:** 2024-08-17
