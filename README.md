# Harm Reduction

[![Build Status](https://travis-ci.org/codeforboston/harm-reduction.svg?branch=master)](https://travis-ci.org/codeforboston/harm-reduction)

[Demo App](https://cfb-harm-reduction.web.app/)

## About the Project

We are developing a tool for the communities of Chelsea, Revere, Saugus, and Winthrop to improve multi-sector and multi-jurisdictional coordination for outreach, response, and recovery to overdoses. We will do this by improving the efficiency of existing systems, speeding up access to critical data, and aiding in cross-jurisdictional  communication, in order to help these four communities save lives.

## About our Partner

Our partner in the project is the City of Revere Substance Use Disorder Initiatives (SUDI) office. They are working with three other communities – Chelsea, Saugus and Winthrop – on fulfilling a newly-provided grant to scale up their existing overdose response outreach programs. The project that we create will ultimately take into account the workflows of all four communities and would be shared amongst them to meet all of their needs. 

The SUDI office offers support and resources as well as ongoing care in these communities via direct outreach with individuals who have experienced a nonfatal overdose.

## Contact Us 

[cfb-harmreduction@codeforboston.org](mailto:cfb-harmreduction@codeforboston.org)

## Important Links

[Welcome Document](https://docs.google.com/document/d/1_yO1GpPvAFnRMpydOWtpd19yDq7Tr0t0ZJdet0WwJpY/edit?usp=sharing)  
[Trello Board](https://trello.com/b/E93Cmx9n/harm-reduction)  
[Google Meet Room](http://www.codeforboston.org/rooms/harmreduction)  
[Shared Google Drive Folder](https://drive.google.com/drive/folders/14Q1e3VCWJSqldykqSxwEAwAdSq6dMnl3?usp=sharing)  

## Getting Started

1. Join us on [Slack](http://slack.codeforboston.org) at #harm-reduction
2. Log in to our Trello
3. Request access to our Google Drive Folder (instructions [here](https://docs.google.com/document/d/1_yO1GpPvAFnRMpydOWtpd19yDq7Tr0t0ZJdet0WwJpY/edit#heading=h.sve3pgxt3iph))
4. Jump into our Google Meet Room and hang out with us!

### Prerequisites

#### Node

If you don't have nodejs installed, [install it](https://nodejs.org/en/download/). If you don't know, do `node --version` in your terminal/command prompt. If you don't get a number, you don't have it.

#### Git and Github

If you're new to github check out [Github Guide, Hello World](https://guides.github.com/activities/hello-world/) to make an account and get started with Github and [How to: fork a repo](https://help.github.com/articles/fork-a-repo/) to learn how to fork a repo.

### Setup

1. Fork the repository: On GitHub, navigate to the [repository](https://github.com/codeforboston/harm-reduction). In the top-right corner of the page, click Fork.
2. On GitHub, navigate to your fork of the harm-reduction repository. In the Clone with HTTPs section, click to copy the clone URL for the repository.
3. Clone your fork: In your terminal type `git clone`, paste the URL you copied and press enter. In your terminal/command prompt cd (change directory) into the new folder. Inside the directory:

```
git clone \
https://github.com/YOUR-USERNAME/harm-reduction.git
cd harm-reduction
```

4. Add the harm-reduction repository as a remote to your fork and fetch its branch information:

```
git remote add upstream \
https://github.com/codeforboston/harm-reduction.git
git fetch upstream
```

5. Install dependencies

```
npm install
```

### Running the App

- In your terminal/command prompt run `npm start` to start the app. It will open automatically in a browser window.

- To stop the local server press ctrl + c in your terminal

### Contributing

To contribute a feature:

1. Claim a card in the Todo column on Trello
2. Create a feature branch in your fork. Here we call it MY-FEATURE, but you should name your branch after the feature you're implementing, like participants-table

```
git checkout master
git checkout -b MY-FEATURE
git push --set-upstream origin MY-FEATURE
```

3. Make your changes in your feature branch
4. Upload your changes to your fork

```
git push origin MY-FEATURE
```

5. [Open a pull request](https://github.com/codeforboston/harm-reduction/compare) to merge your feature branch into codeforboston's master branch. Link to the Trello card in your PR description.
6. Respond to comments in the pull request conversation
7. Once all checks pass and someone approves, merge the pull request!

### Updating

To learn more about keeping your fork up to date view this [article](https://help.github.com/articles/syncing-a-fork/). When there is an update, in your terminal inside your local repo:

```
git checkout master
git pull upstream master
```

This will update your fork's master branch to match upstream. Then, to update your feature branch, run:

```
git checkout MY-FEATURE
git merge master
```

If there is a merge conflict that cannot be resolved automatically, the output from the `git pull` command will read: "Automatic merge has failed; fix conflicts and then commit the result." For more information, read this [article](https://help.github.com/articles/resolving-a-merge-conflict-using-the-command-line/).

**REMEMBER:** After pulling in updates and resolving any merge conflicts, run the following in terminal, which will install any new dependencies:

```
npm install
```

### Contributing

## Testing
//TODO 

## CI/CD Setup

We use [Travis](https://travis-ci.org/github/codeforboston/harm-reduction) for automated testing and deployment.

Tests run on all branches and for pull requests. On master, after tests pass, we deploy the [site](https://cfb-harm-reduction.web.app/) using Firebase.

The deployment is configured with environment variables set in [Travis settings](https://travis-ci.org/github/codeforboston/harm-reduction/settings):

- `FIREBASE_PROJECT`: The name of the firebase project to deploy to.
- `FIREBASE_TOKEN`: The token used to authenticate with Firebase, generated by `firebase login:ci`. The user that generates the token must have permission to deploy to the firebase project.

## Tech Stack

- [Reactjs](https://facebook.github.io/react/docs/react-api.html)
- [Bootstrap](https://react-bootstrap.github.io/)
- [Firebase](https://firebase.google.com/docs/guides) Authentication, Firestore, and Hosting

