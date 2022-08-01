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
* Costum bash script to update Teeny repository and reinstall via NPM
  * `tpush`
* Clear contents of `gh-pages` branch ([from here](https://blog.ediri.io/how-to-create-a-github-gh-pages-branch-in-an-existing-repository))
  * `git checkout gh-pages`
  * `git reset --hard`
  * `git commit --allow-empty -m "Cleared contents of gh-pages"`
  * `git push origin gh-pages`

* 

## Tasks
- [x] Fork Teeny into my GitHub
- [x] Clone Teeny fork to my local computer
- [x] NPM install fork of Teeny
- [x] Init Teeny
- [x] Build Teeny
- [x] Automate pushing changes to Teeny and re-installing via NPM
- [ ] Deploy to `gh-pages` branch
- [ ] Configure "Pages" to deploy from `gh-pages` branch
- [ ] Blog pagination
- [ ] Next/Prev buttons in blog
- [ ] Strip leading zero from Day in date line
- [ ] Add keywords and description meta elements