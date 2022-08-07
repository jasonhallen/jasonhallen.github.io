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

## Tasks
- [ ] Add keywords and description meta elements
- [ ] Comments from Staticman
- [ ] Remove image link at top of blog posts
- [ ] Create website repository package that lets me pull just the `main` branch onto my local computer, `npm run` to install `teeny` and `gh-pages`, and execute scripts that cover the main workflows
- [ ] Add Google Analytics tracking
- [ ] Strip out Google Analytics script when in Teeny development mode
- [ ] Auto-generate the H2's based on the frontmatter Title
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