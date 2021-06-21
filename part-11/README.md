
# fullstack-open-part11-bloglist

This repo contains the solutions for exercise 11.21 and 11.22 of [Fullstack Open course part 11 - Introduction to CI/CD](https://fullstackopen.com/en/part11/).
Solutions for the exercise 1-20 of part 11 can be found in [this repo](https://github.com/l0ve2cr3ate/full-stack-open-pokedex).

[Course Notes part 11 - CD/CD](#course-notes-part-11-fullstack-open) <br>
[Course Review part 11 - CI/CD](#course-review-part-11-fullstack-open) <br>
[Course Review part 1-9 - Fullstack Open](https://github.com/l0ve2cr3ate/fullstack-open-2020/blob/master/README.md#review-fullstack-open-2020) <br>
[Course Review part 10 - React Native](https://github.com/l0ve2cr3ate/rate-repository-app/blob/master/README.md#course-review-part-10-react-native) <br>


## Exercise 11.21
11.21 Your own pipeline
Build a similar CI/CD-pipeline for some of your own applications. Some of the good candidates are the phonebook app that was built in parts 2 and 3 of the course, or the blogapp built in parts 4 and 5, or the redux anecdotes built in part 6. You may also use some app of your own for this exercise.

You most likely need to do some restructuring to get all the pieces together. A logical first step is to store both the frontend and backend code in the same repository. This is not a requirement but it is recommended since it makes things much more simple.

One possible repository structure would be to have the backend at the root of the repository and the frontend as a subdirectory. You can also "copy paste" the structure of the [example app](https://github.com/fullstack-hy2020/create-app) of this part or try out the example app mentioned in [part 7](https://fullstackopen.com/en/part7/class_components_miscellaneous#frontend-and-backend-in-the-same-repository).

It is perhaps best to create a new repository for this exercise and simply copy and paste the old code there. In real life, you most likely would do this all in the old repository but now "a fresh start" makes things easier.

This is a long and perhaps quite a tough exercise, but this kind of situation where you have a "legacy code" and you need to build proper deployment pipeline is quite common in real life!

Obviously, this exercise is not done in the same repository as the previous exercises. Since you can return only one repository to the submission system, put a link of the other repository to the one you fill into the submission form.

## Exercise 11.22
11.22 Protect master and ask for pull request
Protect the master branch of the repository where you did the previous exercise. This time prevent also the administrators from merging the code without a review.

Do a pull request and ask any of GitHub users mluukkai, kaltsoon or jakousa to review your code. Once the review is done, merge your code to master. Note that the reviewer needs to be a collaborator in the repoistory. Ping us in telegram/slack to get the review.

Then you are done!

## Course Notes part 11 Fullstack Open
[Fullstack open part 11](https://fullstackopen.com/en/part11) is part of the course [Fullstack Open 2020 - Deep Dive Into Modern Web Development](https://fullstackopen.com/en/) of the University of Helsinki . Part 11 is created by the Engineering Team at [Smartly.io](https://www.smartly.io/).

## a. Intro to CI/CD
During this part you will build a deployment pipeline to a provided example project. In the last two exercises you will build another deployment pipeline for ome of your own created apps. <br>
Part 11 consists of 22 exercises, which you should all complete to finish the course. <br>
This course part relies on concepts covered in previous parts. It is recommended that you finish at least part 0-5 before you start part 11. <br>

Unlike the other parts of this course, you will not write many lines of code in part 11. You will spent most time configuring actions. Debugging configurations is harder than debugging code. Just keep going!

### Getting Software to Production
Part 11 will cover ways to work together and build and deploy software in a strictly defined way, so that it's clear *exactly* what will happen under any circumstance.

### Some Useful Terms
- *Branches*: Git allows multiple copies, streams or versions of the code to co-exist without overwriting each other -> branch. Each branch is a copy of the main* branch with some changes that make it diverge from the main. Once the feature or change on the branch is ready it can be *merged* back into the main branch. In this way, each developer can work on their own set of changes without affecting code of other developers until the changes are ready.
- *Pull request (PR)*: merging a branch back to the main branch.
- *Build*: Preparing the software to run on the platform where it's intended to run. In some interpreted languages such as Python or Ruby there is no need for a build step. <br>
Example: If you have written a TS app, which you will run with Node, the build step consists of transpiling TS to JS. <br>
For compiled languages like C and Rust this step is more complicated, since the code needs to be compiled and executed.
- *Deploy*: putting software where it needs to be for the end-user to use it. *Zero downtime deployment*: software must be available at all times during the development.

<sub><sup>* GitHub has renamed their master branches to main, but older repositories still have a master branch. Here the word main will be used to refer to the main or master branch.</sup></sub>

### What is CI (Continuous Integration)?
Strictly speaking CI refers to merging developer changes to the main branch often. In practice however CI refers to what happens after the actual merge takes place:
- Lint: keep your code clean and maintainable.
- Build: put all of your code together into software.
- Test: to ensure existing features don't break.
- Package: put it all together in easily movable batch.
- Deploy: make it available to the world.

CI profits from strict definitions, which allow for easier development and working together.

### Packaging and Deployment as part of CI
-> not always considered part of CI, but they are part of the flow and pipeline (get code to the users) and are the most likely point of failure. <br>
Packaging is often an area where issues show up in CI, since it isn't usually tested locally. It makes sense to test packaging of project during CI. Some workflows even test the already build packages, because the code is in the same form of that that will be deployed to production. <br>

**Deployment**: you want a process thats always the same, whether you are running tests on a development or main branch. In this context it makes sense to include deployment in CI process.

### Is this CD thing related?
**CD (Continuous Delivery/Continuous Deployment)**: practice where main branch is kept deployable at all times. In general, this is frequently coupled with automated deployments triggered from merges into main branch. <br>
Their is no clear line between CI and CD, thats why people often refer to CI/CD to describe the entire process.

### Why is it important?
- disallow commits directly from main branch
- allow merges only when tests pass
- build packages for production in known environment
- main branch always running in production
- prevent different developers from overwriting each other's changes.

### Important principles
CI/CD is not a goal. The **goal** is better, faster software development with fewer preventable bugs and better team cooperation. You can think of CI as the answer to the following questions:
- How to make sure tests run on all code that will be deployed?
- How to make sure that the main branch is deployable at all times?
- How to ensure that builds will be consistent and will always work on platform it will be deployed to.
- How to make sure changes don't overwrite each other?
- How to make deployments happen at the click of a button/automatically when merged to main branch?

The use of CI/CD correlates heavily with organizational success (improves profitability and product quality, increases market share, shortens time to market). CI/CD makes developers happier by reducing burnout rate.

### Documented behavior
Document all steps and fail safely. <br>

### Know the same thing happens every time
The required tasks should be performed in the right order.

### Code always kept deployable
Ideally main branch is running in production. 

### Knowing what code is deployable (sha/sum version)
It is not always possible to have main branch running in production. The build can have failed, or you may want to batch serveral changes before you deploy them at once. In these situations you need to know what code is running in production. This can be done with a *version number* or with the commit SHA sum (= unique identifying hash) attached to the code, or by combining version with a history of all releases.

### Types of CI setup
Having a separate server for running CI tasks minimizes the risk that something else will interfere with CI/CD process. <br>
2 options: 
- host own server
- use a cloud service

### Jenkins (and other self-hosted setups)
-> most popular self-hosted option. <br>
**Advantages**: <br>
- extremely flexible
- a lot of plugins
- entire environment under your control
- number of resources can be controlled
- secrets are never exposed

**Disadvantages**: <br>
- quite complicated
- a lot of boilerplate
- CI/CD must be setup with Jenkin's own domain-specific language
- risk of hardware failure

With self-hosted options billing is usually based on hardware. You pay for the server. What you do on the server doesn't change the billing. 

### GitHub Action and other cloud based solutions
**Advantages**: <br>
- environment already setup
- actual CI config often a little simpler'

**Disadvantages**: <br>
- if you want to do something more special, cloud-based options may become more limited
- resource limitations

In a self-hosted setup, if a build is slow, you can just get a bigger server. Cloud-based options are usually billed by build time.

### Why pick one over the other?
Small/medium project, no special requirements -> cloud-based. <br>
Config is simple, and you don't need to go to the hassle/expense of setting up your own system. <br>
Larger project, more resources needed or larger companies where there are multiple teams and projects to take advantage of CI setup -> self-hosted. <br>

### Why use GitHub Actions for this Course?
- no need to setup a server
- one of the best cloud-based CI solutions

## b. Getting started with GitHub Actions
GitHub Actions work on a basis of *workflows*: series of *jobs* that run when a certain triggering *event* happens. The jobs that are run contain instructions for what GitHub Actions should do. <br>

Typical workflow execution: <br>
- triggering event happens (e.g. push to main branch)
- workflow is executed
- cleanup

### Basic Needs
To have CI operate on a repo you will need: <br>
- a repo
- definition of what CI needs to do: specific file inside the repo or defined in CI system.
- CI needs to know repo exists
- CI needs permissions to perform actions (like credentials)

### Getting started with Workflows
*workflow*: core component of creating CI/CD workflow pipeline with GitHub Actions. It is the process flow that you can setup in your repo to run automated tasks such as building, testing, linting, etc. <br>

Hierarchy of a workflow: <br>
- Job
    - step
    - step
- Job
    - step

Each workflow must specify at least one *job*, which contains a set of *steps* to perform individual tasks. Jobs run in *parallel*. Steps of each job will be executed sequentially. Steps can vary from running a custom command to using pre-defined actions. <br>
For GitHub to recognize workflows, you must specify them in `.github/workflows` folder. Each workflow is its own separate file, written in `YAML`. <br>

Basic workflow contains three elements in a `YAML` document: <br>
- name
- on (triggers)
- jobs

Example workflow, triggerd by push to main branch: <br>

```yaml
name: Hello World!

on: 
  push:
    branches:
      - main

jobs:
  hello_world_job:
    runs_on: ubuntu-18.04
    steps:
      - name: Say Hello
        run: 
          echo "Hello World!"             
```

You can configure a workflow to start when: <br>
- An event on GitHub occurs (pushing commit to repo)
- A scheduled event, specified using cron-syntax, happens
- An external event occurs: a command is performed in an external app, such as Slack.

### Setting up lint, test and build steps
**Setting up the environment** <br>
Use the same environment that will be used in production, like ubuntu-18.04. You want to replicate the same environment in CI as in production as closely as possible, to avoid situations where the code works differently in CI and production. <br>
By default the virtual environment does not have any code in it. You will need to *checkout* the code from the repo: <br>

```yaml
jobs:
  simple_deployment_pipeline:
    runs-on: ubuntu-18.04
    steps: 
      - uses: actions/checkout@v2
```

The *uses* keyword tells the workflow to run a specific *action*: a reusable piece of code. <br>
After checking out the repo, Node.js is needed to execute the commands in the `package.json`. Select the same node version as you will be using in production.

```yaml
- uses: actions/setup-node@v1
  with: 
    node-version: '12.x'
```

*with* keyword can be used to give a "parameter" to the action. <br>

Install the dependencies: <br>

```yaml
- name: npm install
  run: npm install
```

Environment is setup. <br>

**Lint** <br>
Now scripts from the `package.json` can be called: <br>

```yaml
- name: lint
  run: npm run eslint
```

 **E2e Tests** <br>

```yaml
- name: e2e tests
  uses: cypress-io/github-action@v2
  with:
    command: npm run test:e2e
    start: npm run start-prod
    wait-on: http://localhost:5000   
 ```

*command*: specificies how to run cypress tests. <br>
*start*: gives npm script that starts the server. <br>
*wait-on*: wait for server to have started on http://localhost:5000 before running tests. <br>

## c. Deployment
### Anything that can go wrong...
...will go wrong <br>

Things to consider are: <br>
- What if pc crashes/hangs during deployment?
- What if internet connection is lost?
- What happens if any specific instruction in deployment script/system fails?
- What happens if software doesn't works as expected on the server? Can I roll back to previous version?
- What happens if a user does a HTTP request to the software just before the deployment is done?

The deployment system should **never** leave software in a broken state. You should always know what state a deployment is in. <br>
Silent failures are **very** bad! If you are aware of the problem, you can fix it.

### What does a good deployment system do?
- deployment system should be able to fail gracefully at *any* step of deployment.
- deployment system should *never* leave software in broken state.
- deployment system should notify when failure has happened.
- deployment system should allow to roll back to previous deployment:
  - preferably rollback is easier + less prone to failure than full deployment.
  - best option = automatic rollback in case of deployment failure.
- deployment system should handle situation where user makes HTTP request just before/during deployment.
- deployment system should make sure software that is deployed meets requirements.

You also *want* the deployment system to be fast and to have no downtime during deployment. <br>

## d. Keeping green
### Working with Pull Requests
You can configure your GitHub repo so that pull requests will only be merged after they have been approved. To open a pull request, open branch in GitHub and click the green "Compare & Pull Request"button at the top. <br>
All workflows in the course till now were triggered by commits to main branch. To let the workflow run for each pull request, the trigger in the workflow needs to be updated: <br>

```yaml
on:
  push:
    branches:
      - main
    pull_request:
      branches: [main]
      types: [opened, synchronize]
```

In your workflow you can run the deployment step only for the main branch by using an if statement for this step: <br>

```yaml
 if: ${{ github.event_name == 'push' }}
```

**Versioning** <br>
Most important purpose of versioning = uniquely identify software you are running + associated code.
- <ins>Semantic Versioning</ins>: {major}.{minor}.{patch} 
*patch*: changes that fix functionality without changing how app works from outside. <br>
*minor*: changes that make small changes to functionality. <br>
*major*: changes that completely change the app or functionality. <br>

- <ins>Hash Versioning/ SHA versioning</ins>: version number is a hash (which looks like a random string) derived from content of the repo, and changes introduced in the commit. In git this is already done for you as the commit hash. Hash versioning is almost always used in an automated environment. <br>

### But what does the version point to?
In hash versioning: to the code associated with the commit on which the hash is based. <br>
Semantic versioning: something in the code, like a version number in a file. repo/metadata approach: relies on *tags* or release. The tag/release points to a commit.

### Version order
For hash versioning you will need git log to reveal order of commits.

### Compare the Two
Semantic versioning works well when deploying services where version number is of significance, like JS libraries.  Hash versioning is very useful where most commits are being built into artifacts (e.g. runnable binaries or Docker images) that are themselves uploaded or stored. <br>

Example: Testing requires building package into an artifact, uploading it to a server and running tests against it. Hash versioning would prevent accidents. With semantic versioning 3.2.2 you have a failing test, fix it, push the commit, but since you are working on your branch you don't update the version number. Without hash versioning, the artifact name may not change. If there is an error uploading the artifact, you don't know if the tests run against the older artifact. If the artifact is versioned with has, the version number <ins>must</ins> change on very commit.

### Best of both World
Semantic versioning -> release software <br>
Hash-based versioning -> during development <br>
You can use them both together. <br>

### A note about using third party actions
When using a thrid party action such as `github-tag-action`, it might be a good idea to specifiy used version with hash instead of using a version number. The version nunber that is implemented with a git tag can in principle be *moved*, while the code in commit with a particular hash does not change.

### Keep main protected
GitHub allows you to setup protected branches. For CI the most important protection is requiring status checks to pass before a PR can be merged into main branch. <br>
To protect a branch, in GitHub navigate to `Settings`. Select `Branches`. Click `Add Rule`. Next to `Branch protection rules` type a name for your rule, like `main`. Select `Require status checks to pass before merging.` + `Require branches to be up to date before merging.` Select all status checks that should pass before PR can be merged.


## Course Review part 11 Fullstack Open
Course part 11 about CI/CD is at the time of writing (6 January 2021) the newest addition to the Fullstack Open curriculum. It was added in December 2020. 

## Prerequisits
Part 11 relies on concepts covered in previous course parts. It is recommended that you finish at least part 0-5 before you start part 11. <br>

## What you  will learn
Part 11 of Fullstack Open is about CI/CD, which stands for Continuous Integration/Continuous Delivery/Continuous Deployment. You will learn why you should use a CI/CD system, what it can do for you and how to use GitHub Actions. <br>

During this part you will build a deployment pipeline to a provided example project. In the last two exercises you will build another deployment pipeline for ome of your own created apps. <br>

## Course Certificate
You can earn a certificate if you complete and submit the 22 course exercises before 15 February 2021. The 2021 version of the course will start 15 March 2021.

## High Quality Course Content
This course is a university course and contains the same content as the Fullstack Open course at the University of Helsinki. Students with a Finnish social security number can earn 1 credit for part 11 of the course. The course content is up-to-date and of high quality. 

## No Videos
This course provides you with written information on how to setup a pipeling/create a workflow. Then you will complete exercises where you are asked implement a similar pipeline/workflow, or extend on something you have learned before. This is not a course where someone takes your hand and tells you what to do. The course does however provide enough information for you to be able to complete the exercises and learn a lot. The course only has written content, no videos, and it is self-paced. <br>

Unlike the other parts of this course, you will not write many lines of code in part 11. You will spent most time configuring actions. Debugging configurations is harder than debugging code. Do not give up! <br>

## Challenge
At the end of the course you will build a deployment pipeline for one of your own apps. Depending on which app you will deploy, this can be challenging. The pipeline itself will look at lot like the pipeline that you have build during earlier exercises, but you can encounter some errors you did not have before. Just keep working through them! I &#10084; &#10084; &#10084; these exercises where you have to implement what you have learned on your own.

## Improvements
We learned how to deploy to Heroku and how to rollback our deployment to Heroku, but it would be great if there would be a short mention about how to go about rolling back a deployment when Heroku is not used. 
Also in the course it is mentioned that you should handle what happens when the user sends an HTTP request just for deployment, but it does not explain how you can handle this.

## Summary
This course is a nice introduction to CI/CD and GitHub Actions. I would recommend this course if you satisfy the [requirements]((#prerequisits)), want to go through some high quality course material and put in the effort to complete the exercises. If you love getting certificates, you are in the right place. If you expect video content, this course in NOT for you.
