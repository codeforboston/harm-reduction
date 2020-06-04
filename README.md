# Harm Reduction

[![Build Status](https://travis-ci.org/codeforboston/harm-reduction.svg?branch=master)](https://travis-ci.org/codeforboston/harm-reduction)

[Demo App](https://cfb-harm-reduction.web.app/)

### About the Project

We are developing a tool for the communities of Chelsea, Revere, Saugus, and Winthrop to improve multi-sector and multi-jurisdictional coordination for outreach, response, and recovery to overdoses. We will do this by improving the efficiency of existing systems, speeding up access to critical data, and aiding in cross-jurisdictional  communication, in order to help these four communities save lives.

### About our Partner

Our partner in the project is the City of Revere Substance Use Disorder Initiatives (SUDI) office. They are working with three other communities – Chelsea, Saugus and Winthrop – on fulfilling a newly-provided grant to scale up their existing overdose response outreach programs. The project that we create will ultimately take into account the workflows of all four communities and would be shared amongst them to meet all of their needs. 

The SUDI office offers support and resources as well as ongoing care in these communities via direct outreach with individuals who have experienced a nonfatal overdose.

### Contact Us 

[cfb-harmreduction@codeforboston.org](mailto:cfb-harmreduction@codeforboston.org)

### Important Links

[Welcome Document](https://docs.google.com/document/d/1_yO1GpPvAFnRMpydOWtpd19yDq7Tr0t0ZJdet0WwJpY/edit?usp=sharing)  
[Trello Board](https://trello.com/b/E93Cmx9n/harm-reduction)  
[Google Meet Room](http://www.codeforboston.org/rooms/harmreduction)  
[Shared Google Drive Folder](https://drive.google.com/drive/folders/14Q1e3VCWJSqldykqSxwEAwAdSq6dMnl3?usp=sharing)  

### Getting Started

1. Join us on [Slack](http://slack.codeforboston.org) at #harm-reduction
2. Log in to our Trello
3. Request access to our Google Drive Folder (instructions [here](https://docs.google.com/document/d/1_yO1GpPvAFnRMpydOWtpd19yDq7Tr0t0ZJdet0WwJpY/edit#heading=h.sve3pgxt3iph))
4. Jump into our Google Meet Room and hang out with us!

### Github Setup

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

4. Add the harm-reduction repository as a remote to your fork:

```
git remote add upstream \
https://github.com/codeforboston/harm-reduction.git
```

4. Installing: Checkout branch reboot and install

```
git checkout reboot
npm install
```

**firebase** is the active development branch. Do not touch the `master` branch.

### Running the App

- In your terminal/command prompt run `npm start` to start the app. It will open automatically in a browser window.

- To stop the local server press ctrl + c in your terminal

### Updating

To learn more about keeping your fork up to date view this [article](https://help.github.com/articles/syncing-a-fork/),1. When there is an update, in your terminal inside your local repo:

```
git checkout reboot
git pull upstream
git pull upstream reboot
```

After running this command once, you may omit the `git pull upstream` step, and only enter `git pull upstream reboot`.

If there is a merge conflict that cannot be resolved automatically, the output from the `git pull` command will read: "Automatic merge has failed; fix conflicts and then commit the result." For more information, read this [article](https://help.github.com/articles/resolving-a-merge-conflict-using-the-command-line/).

**REMEMBER:** If there are no merge conflicts, or after resolving any conflicts, run the following in terminal:

```
npm install
```

## Testing
//TODO 

### CI/CD Setup

We use [Travis](https://travis-ci.org/github/codeforboston/harm-reduction) for automated testing and deployment.

Tests run on all branches and for pull requests. On master, after tests pass, we deploy the [site](https://cfb-harm-reduction.web.app/) using Firebase.

The deployment is configured with environment variables set in [Travis settings](https://travis-ci.org/github/codeforboston/harm-reduction/settings):

- `FIREBASE_PROJECT`: The name of the firebase project to deploy to.
- `FIREBASE_TOKEN`: The token used to authenticate with Firebase, generated by `firebase login:ci`. The user that generates the token must have permission to deploy to the firebase project.

## Tech Stack

- [Reactjs](https://facebook.github.io/react/docs/react-api.html)
- [Bootstrap](https://getbootstrap.com/)

