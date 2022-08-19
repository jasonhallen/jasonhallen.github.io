# Jason Hallen
This is where I'll build a static website in GitHub Pages. I'll try to replicate my current website at [www.jasonhallen.com](www.jasonhallen.com) built with Joomla.

## Rationale
* My website is very simple.  Joomla is overkill.
* Joomla is very complicated. It takes a long time to figure out how to modify it for my needs.  Feels like I've just hacked it into shape without understanding it.
* Building my own simple static site generator will let me understand it inside and out.
* This project will help me understand Node.js, GitHub Pages, and aspects of deploying a website better.
* Hosting on GitHub Pages is free, so I could consider canceling BlueHost subscription.

## Dependencies
* Fork of [Teeny]() static site generator

## Content
* Written in Markdown files

## Hosting
* Host static files in GitHub repository `jasonhallen.github.io` and publish with GitHub Pages
* Develop website locally, build with customized Teeny fork, push changes to GitHub for deployment 

## Developing
* Use fork of Teeny installed from my GitHub repository
* Enhance and customize Teeny to fit the structure of my website
* [NPM Install from GitHub](https://www.pluralsight.com/guides/install-npm-packages-from-gitgithub)
* [NPM Update from Github](LINK)

## Deploying
* Configure "Pages" setting of repository to deploy from `gh-pages`
* Deploy static pages to `gh-pages` branch of `jasonhallen.github.io`

## Comments
* Use [Staticman v3]()
* Followed [Travis Downs](https://travisdowns.github.io/blog/2020/02/05/now-with-comments.html), [Spinning Numbers](https://spinningnumbers.org/a/staticman-heroku.html), [Michael Rumpler](https://www.mrumpler.at/comments-with-staticman/), and [Made Mistakes](https://mademistakes.com/mastering-jekyll/static-comments-improved/)
* Created a Heroku app at https://jasonhallen-staticman.herokuapp.com
* How comments work:
  * Comment form on website `POSTs` to Staticman server running on Heroku. This wakes up the Node.js server, which then parses the `POST` request.
  * Staticman is configured to connect to a GitHub app installed in my website repository.  This app has permissions to submit pull requests to the repository.  Authentication keys for the GitHub app are configured as Heroku environment variables.
  * Staticman sends the comment as a pull request to the repository's `comments` directory.  I get notified by GitHub via email.
  * I go into the repository to view the comment.  Before merging the request, I have to commit (and possibly push) any local changes on my computer to the repository. Otherwise I'll lose the changes when merging the comment.
  * I might want to fix Markdown formatting issues in the request. To approve it I click "Merge pull request" in the pull request. Then run `git pull origin main` locally in order to pull down the comment.
  * To publish the comment on the website run `teeny build` and `gh-pages -d public`.
  * To reject the pull request, click "Close pull request" which then deletes the request and the branch.

## Commands
* Install/update Teeny on local machine
  * `npm i -g https://github.com/jasonhallen/teeny`
* Build website from components
  * `teeny build`
* Lauch development server to render site locally
  * `teeny develop`
* Custom bash script to update Teeny repository in GitHub and reinstall via NPM
  * `tpush`
* Deploy local 'public' folder from `main` branch to `gh-pages` branch of website repository
  * `gh-pages -d public`
* Pull down changes from `main` branch (mostly for new comments)
  * `git pull origin main`

## Tasks
- [ ] Create website repository package that lets me pull just the `main` branch onto my local computer, `npm run` to install `teeny` and `gh-pages`, and execute scripts that cover the main workflows
- [ ] Strip out Google Analytics script when in Teeny development mode
- [ ] Decommission GitHub bot account

## Completed Tasks
- [x] Comments from Staticman
- [x] Remove image link at top of blog posts
- [x] Auto-generate the H2's based on the frontmatter Title
- [x] Fork Teeny into my GitHub
- [x] Clone Teeny fork to my local computer
- [x] NPM install fork of Teeny
- [x] Init Teeny
- [x] Build Teeny
- [x] Automate pushing changes to Teeny and re-installing via NPM
- [x] Deploy to `gh-pages` branch
- [x] Configure "Pages" to deploy from `gh-pages` branch
- [x] Blog pagination
- [x] Next/Prev buttons in blog
- [x] Strip leading zero from Day in date line
- [x] Add keywords and description meta elements
- [x] Add Google Analytics tracking