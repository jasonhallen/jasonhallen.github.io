---
template: blogPost
title: "Update: Now with Comments!"
date: 20220818
publish: yes
image: "/images/pagination_detail.png"
imageAlt: "Close up of new pagination design"
imageCaption:
keywords: website, static site generator, node.js, Staticman, comments, Heroku
description: 
---
It's official.  This is now a web development blog.  **Well, not really**.

After [spinning up my new website]() I started to work on my Csound/Node.js project in the past two weeks.  That's what I wanted to post about, but I ran into some frustrating performance issues with the Electron framework.  By this past weekend I was despairing that I'd never figure out how to build a performant Csound GUI in Node.js.  That's probably not true, but the coding process can be discouraging like that.

I decided I "needed a win", so I set aside the Csound project and turned my attention to **incorporating comments into my website using [Staticman]()**.  Even with this project I nearly hit a wall and couldn't do it, but in the end I got it all set up in a few days.

[READ MORE]

### Choosing a Commenting Solution

I based my static site off of Yukko Mujari's [Teeny]() generator, and in his post "This site is hacky AF" he describes how utteranc.es provides an easy commenting solution.  I didn't like that people need to have a GitHub account though, so I looked for other solutions.

Average Linux User has a good article explaining the different commenting solutions for SSG's. 


* Blog post with different options.
* Yukko Mujari uses utteranc.es, but I don't like the idea of requiring GitHub accounts to comment.
* Wanted complete control and no branding.
* Staticman was the way to go. 

### How Staticman Works

Comment form on website `POSTs` to Staticman server running on Heroku. This wakes up the Node.js server, which then parses the `POST` request.
  * Staticman is configured to connect to a GitHub app installed in my website repository.  This app has permissions to submit pull requests to the repository.  Authentication keys for the GitHub app are configured as Heroku environment variables.
  * Staticman sends the comment as a pull request to the repository's `comments` directory.  I get notified by GitHub via email.
  * I go into the repository to view the comment.  Before merging the request, I have to commit (and possibly push) any local changes on my computer to the repository. Otherwise I'll lose the changes when merging the comment.
  * I might want to fix Markdown formatting issues in the request. To approve it I click "Merge pull request" in the pull request. Then run `git pull origin main` locally in order to pull down the comment.
  * To publish the comment on the website run `teeny build` and `gh-pages -d public`.
  * To reject the pull request, click "Close pull request" which then deletes the request and the branch.

### Challenges

* Implementing is not easy.
* Official documentation leaves out a lot of details.
* Helpful blogs, but they are for different versions of Staticman.  Michael Rumpler ended up being the most helpful but I didn't find it until late in the game.

#### Connecting to Heroku App

