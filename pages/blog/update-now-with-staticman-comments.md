---
template: blogPost
title: "Update: Now with Staticman Comments!"
date: 20220820
publish: yes
image: "/images/staticman_logo.png"
imageAlt: "Staticman logo, a man with glasses wearing a cape"
imageCaption:
keywords: website, static site generator, node.js, Staticman, comments, Heroku, GitHub, authentication, reCAPTCHA
description: 
---
It's official.  This is now a web development blog.  **Well, not really**.

After [spinning up my new website](/blog/update-new-website) a couple weeks ago I started to work on my Csound/Node.js project.  That's what I wanted to post about, but I ran into frustrating performance issues with the Electron framework.  By last weekend I was despairing that I'd never figure out how to build a performant Csound GUI in Node.js.  That's probably not true, but the coding process can be discouraging like that.

I decided I "needed a win", so I set aside the Csound project and turned my attention to **incorporating comments into my website using [Staticman](https://staticman.net/)**.  Even with this project I nearly hit a wall and couldn't do it, but in the end I got it all set up in a few days.

[READ MORE]

### Choosing a Commenting Solution

I based my static site off of Yakko Majuri's [Teeny](https://github.com/yakkomajuri/teeny) generator, and in his post "[This website is hacky AF](https://yakkomajuri.com/blog/hacky)" he describes how [utterances](https://utteranc.es/) provides an easy commenting solution.  However, I didn't like that people need GitHub accounts to comment, so I looked for other solutions.

Average Linux User has a [good article](https://averagelinuxuser.com/static-website-commenting/) explaining the different commenting solutions for SSG's. I wanted a solution that was free, offered me complete control, and didn't have any branding.  Staticman checked all those boxes, but it came with the caveat that it requires some coding on the backend to make it work.

### How Staticman Works

At its core, Staticman is a Node.js [`express`](https://expressjs.com/) server which you host somewhere on the internet.  The server receives comment submissions from your website, does some authentication and verification, and then sends the comments to your website repository (on GitHub, GitLab, or OneDev) as pull requests.

Here's a high-level diagram of the process from Staticman's website.

<figure><img src="/images/staticman_diagram.png" alt="High-level diagram of how Staticman works."><figcaption>High-level diagram of how Staticman works.</figcaption></figure>

#### What Exactly Is a Comment?

I'd like to demystify one thing that took me a while to understand.  **In Staticman, a comment is simply a YML (or JSON or front matter) file that contains the comment message along with metadata such as author, email, and date**.  This file gets deposited into any directory you want in your website repository.  [Here's an example](https://github.com/jasonhallen/jasonhallen.github.io/blob/main/static/comments/update-the-last-four-months/comment-1660681066445.yml) of a comment on my site.

Staticman's job is just to deposit comment files in my repository.  It's my job to figure out how to incorporate the comment files into my website build process and display the comments on my pages.

### Details of My Implementation

Here are more concrete details of how my implementation of Staticman works.

#### Installation on Heroku

* As recommended in Staticman's [Getting Started guide](https://staticman.net/docs/getting-started), I signed up for a free [Heroku](https://www.heroku.com/) account.  Heroku is a cloud app platform that hosts my Staticman server, which I installed from the [Staticman GitHub repository](https://github.com/eduardoboucas/staticman).
* When a user on my site submits a comment, it is sent to my Staticman server as a `POST` request.

<figure><img src="/images/heroku_server.png" alt="Output logs from Heroku server."><figcaption>Output logs of the Heroku server running Staticman.</figcaption></figure>

#### Connection to GitHub

* I've configured Staticman to connect to a GitHub app installed in my [website repository](https://github.com/jasonhallen/jasonhallen.github.io).  This app has permissions to submit pull requests to the repository.  Authentication keys for the GitHub app are configured in Heroku as environment variables.
* I've set Staticman to `moderation: true`, which means that I have to approve comments before they are published.  Therefore, when the `POST` request arrives, Staticman screens out spam submissions with reCAPTCHA, authenticates with the GitHub app, and sends the comment as a pull request to my repository's [`comments` directory](https://github.com/jasonhallen/jasonhallen.github.io/tree/main/static/comments).  GitHub notifies me of new submissions via email.

<figure><img src="/images/github_notification.png" alt="GitHub email notification when a comment has been sent."><figcaption>GitHub email notification when a comment has been sent.</figcaption></figure>

#### Approval and Publishing of Comments
* I go into the GitHub repository in the browser to view the comment.  I can quickly tell whether it's a comment I want to publish.
* If I decide to publish it, I should first commit to the repository any local changes I've made to my website. Otherwise I'll lose the changes when merging the pull request.
* I'll approve the request by clicking "Merge pull request" in the pull request in the GitHub website. Then I'll run `git pull origin main` locally in order to pull down the comment.
* The final step that publishes the comment on the live website is to run `teeny build` and `gh-pages -d public` on my computer.

### Challenges

It took almost as much work to install Staticman comments as it did to build the website itself. The Getting Started guide on Staticman's website leaves out a lot of technical details, so I wouldn't have been able to install Staticman from that guide alone.  Instead, I relied on blog posts from [Travis Downs](https://travisdowns.github.io/blog/2020/02/05/now-with-comments.html), [Spinning Numbers](https://spinningnumbers.org/a/staticman-heroku.html), [Michael Rumpler](https://www.mrumpler.at/comments-with-staticman/), and [Made Mistakes](https://mademistakes.com/mastering-jekyll/static-comments-improved/).

I encourage everyone to read those blogs for step-by-step guides to installing Staticman.  I'll just add some comments on a few of the issues I struggled with the most.

#### Staticman v2 or v3

The latest version of Staticman is v3, but the official website doesn't make that very clear.  The helpful blog posts from Travis Downs and Spinning Numbers were written for Staticman v2, but they don't make that very clear either.  There are differences between v2 and v3 that aren't documented, such as the GitHub authentication issue I'll talk about below.  Michael Rumpler's post was written for v3, and he helped me work through some of the issues that were tripping me up.  **For the record, I used Staticman v3**.  All this really means is that I use `v3` in the `POST` request URL.

`https://{your-heroku-app-name.herokuapp.com/v3/entry/github/{github-username}/{website-name}.github.io/{branch}/{directory}`

There is one big problem with Staticman that Rumpler touches on, and it's worth pointing out.  If you look at Staticman's GitHub repository, you'll notice it hasn't been updated for two years at the time of this writing.  The original creator of Staticman, Eduardo Bouças, hasn't been actively maintaining it, and neither has a crew of volunteers.  It's still a great piece of software if you can get it working on your site, but it concerns me that it isn't being updated or supported at this point.

#### GitHub Authentication

One of the main differences between v2 and v3 is that, if you're using GitHub, v3 only authenticates through a GitHub app connection.  You can't use a personal access token through a GitHub bot as Travis Downs and Spinning Numbers suggest.  This isn't documented anywhere, and it caused me lots of frustration until I figured it out.

Even after I set up a GitHub app and installed it in my website repository, my Staticman instance was still not authenticating with GitHub.  I had read that [there were formatting issues](https://github.com/eduardoboucas/staticman/issues/406) when storing the `GITHUB_PRIVATE_KEY` environment variable in Heroku.  It had to do with new lines and spaces that might get inserted into the key after `"BEGIN RSA PRIVATE KEY-----"` and before `"-----END RSA PRIVATE KEY"`.  After trial and error I formatted the key in the way that GitHub would accept for authentication.  In my case, I just opened the GitHub private key (it's a .pem file downloaded from GitHub) in a text editor, copied the whole thing, and pasted it into the Config Vars section of Heroku.  I didn't add `\n` or change the formatting in any way.

#### Formatting the Comments and Form

The hardest part of the whole installation was correctly configuring Staticman to receive a test comment, authenticate with Github, and create a pull request in my website repository.  It took a while to get that ironed out, but what a great feeling when the first test comment showed up in my repository!  I could then move on to the fun part of formatting the comments and the comment form.

This is where you have complete control over the functionality and styling of the comments section.  Like so many other people using Staticman, I followed Michael Rose's lead in [Made Mistakes](https://mademistakes.com/mastering-jekyll/static-comments-improved/) where he shows how to create one level of nesting in the comments section and how to display messages upon the success or failure of sending the comment.  Frankly, this took hours of fiddling with CSS and JavaScript to get the look and interactivity right, but it was fun.  I added a friendly message whenever someone successfully sends a comment.

<figure><img src="/images/comments_success_message.png" alt="Success message when someone submits a comment."><figcaption>Success message when someone submits a comment.</figcaption></figure>

#### Adding reCAPTCHA

After all this work, I was excited to get my first comment yesterday.  A nice gentleman named Darrin sent a comment singing the praises of Amman Arab University, which he called "a Jordanian bookish institute of cutting edge education, located on Jordan Street".  So yeah, it was spam.  That didn't take long.  I decided to implement reCAPTCHA in order to prevent bots from spamming my site with comments.

Implementing reCAPTHCA has been surprisingly difficult, and I'm not yet satisfied with the result.  Registering my site with reCAPTCHA was easy enough.  The problem was that I wanted the "v2 Invisible Badge" type (which is what Made Mistakes has) rather than the "v2 Checkbox" (which is what Spinning Numbers has), but I kept getting `"invalid-input-response"` errors with the invisible badge type.  I tried switching to reCAPTCHA v3 which is also invisible (i.e. requires no interaction from the user), but that didn't work either.  I suspect this has to do with how Staticman has implemented reCAPTCHA.  I see that it uses `express-recaptcha` v2 in its [`package.json`](https://github.com/eduardoboucas/staticman/blob/master/package.json), yet `express-recaptcha` is now up to v5.

If I want to dive deeper into this, I could fork Staticman, customize it to meet my needs, and deploy it to Heroku, but I'd rather switch back to my Csound project at this point.  For now I'll just live with the reCAPTCHA checkbox.

### Up Next

My next post better not be about this website.  Instead, I'll now focus on finding a framework for building performant Csound GUIs.  It's been fun exploring the Node.js world the past few weeks, but I'm not convinced it's the best environment for my needs.  I'm going to explore Python again and hope to report soon on what I've found.