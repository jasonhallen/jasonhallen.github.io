---
template: index
title: "Update: Website"
date: 20220807
publish: no
keywords: ear, surgery, tympanoplasty, stapedectomy, mayo clinic, ent
description: Last week I had surgery to improve the hearing in my right ear.  I'm stunned at how big a difference it has made so far.  Mundane sounds are now exhilerating.
---
## Update: Website

<figure><a href="/blog/update-website"><img src="/images/detail_audiology_test.png" alt="Detail of audiology test"/></a>
</figure>

Though you might not realize it, my website has been completely rebuilt.  Here's a project I didn't see coming.  Here's how I ended up doing this.

<a class="readmore" href="">Read more</a>

### Csound, Browsers, and Node.js

As I've been working on the [Mell Fark project](/blog/project-mell-fark-part-one) the past few weeks I've run into a couple snags.

1. There were latency issues with Michael Gogins's `webserver` opcodes which were related to communication protocols between the browser and Csound.  Performance issues like this are to be expected when a developer is ironing out bugs in a new project, and I think Michael has already resolved the latency issue.  At the time I noticed the issue, however, it made me want to get outside of the browser environment.

2. I remembered how annoying it is to read and write files from your local file system in the browser environment.  I'd much rather have direct access to the file system.  Especially since my current Csound projects are for my own creative purposes on my laptop.  I'm not planning to deploy these as web apps.

Given that I love coding with JavaScript and had already done a lot of work designing the Mell Fark interface with it, a good option would be to move to the Node.js environment (which I'll just refer to as Node.js).  Node.js allows me to run JavaScript code natively on my computer without being in the browser environment.  All I need is a way to control Csound within Node.js.  A quick search of Node.js packages revealed [`csound-api`](LINK) by Nate Whetsell, and I was in business.

### Static Site Generators

![Node.js Logo]()

I'm new to Node.js, but it's been on my list of environments to learn for a while.  In fact, the timing is good because I need to get familiar with Node.js for a work project.  To get my bearings, I started with the official [Introduction to Node.js](https://nodejs.dev/learn), which is wonderful.  And soon thereafter I started falling down the rabbit hole of Node.js packages and frameworks.

Before long I was looking into [static site generators (SSG's)](LINK), which are popular in the Node.js world.  I've known about SSG's for a few years but never seriously considered using them.  Here's a quick overview.  Most websites these days are built with frameworks that assemble web pages on demand from components stored in databases.  WordPress, Drupal, and Joomla are examples of these frameworks, and they're usually written in PHP.  When you navigate to one of these pages in the browser the server assembles the page on the fly and sends it to you.

SSG's, on the other hand, are frameworks that assemble all the pages from components and deposit them on the server ahead of time.  In other words, they generate a set of pre-built HTML files.  When you navigate to a page in the browser, all the server has to do is send you the HTML file.  It doesn't have to assemble the HTML file on the fly.  As a result, SSG's tend to load very fast.  They also don't need databases.  [Gatsby](), [Jekyll](), and [Hugo]() are examples of these frameworks.

### Problems with Joomla

My website was originally built in Joomla.  I've never loved Joomla, and I only chose it as a CMS because I was maintaining an organization's Joomla site at the time and wanted to learn more about it.  Here's why Joomla is frustrating to me.

* **Bloated** - Just like all CMS's, Joomla is designed to be flexible.  It needs to be able to build any and every kind of website, whether a personal blog, a company website, an e-commerce website, an online magazine, etc.  It needs to provide for user management, customization, and extensions.  This means that the website building environment is quite abstracted, complex, and bloated.  For a super simple website like mine Joomla is actually overkill.

* **Confusing** - The abstraction and complexity I mentioned above cause the configuration, customization, and ongoing management of the site to be confusing.  I've never fully grasped how Joomla works.  Whenever I need to customize something I dig through a dozen configuration pages, comb through PHP templates, examine the file system via FTP, etc.  Sometimes simple changes take a long time to figure out, and they often feeling like hacky solutions.

* **Lack of support** - I've always found Joomla support lacking online.  It feels like a ghost town compared to the robust online support for WordPress.  I'll Google questions about how to do this or that in Joomla, and it can be very hard to get a good answer.  Even searching for Joomla extensions feels sketchy at times.

* **Not secure** - Earlier I mentioned that I maintained an organization's Joomla site.  When I took the site on I realized it had been hacked because nobody had updated the Joomla version for a few years.  This wasn't Joomla's fault, but it showed how vulnerable you can be in a CMS if you're not stayig up to date with patches and updates.  And yet, staying up to date with patches and updates introduces its own complications because you're always wondering what's going to break on your website when you implement them.

### Choosing an SSG

Given my frustrations with Joomla and that I wanted to delve into the world of Node.js, I figured that converting my website into an SSG would be a good introductory Node.js project.  The first order of business was choosing an SSG.  I briefly looked at Gatsby and Jekyll but then started to read other people's blog posts about their experiences with them.  These posts gave the impression that Gatsby and Jekyll were also flexible, abstracted frameworks with their own configuration learning curves.  A couple people made the point that it would take them as long to wrap their heads around the frameworks as it would to code their own SSG's.

One such writer was Yakko Majuri.  His post ["Why I built my own static site generator"](https://yakkomajuri.com/blog/teeny) made the case for an ultra-minimalist SSG.  He wrote his own SSG called [Teeny](https://github.com/yakkomajuri/teeny) and explained how the components work together.  If you look at the main [`cli.js`](https://github.com/yakkomajuri/teeny/blob/main/cli.js) file you'll see that it only takes about 160 lines of JavaScript to build his site.  Studying the `cli.js` file demystifies what an SSG actually does.  Inspired by his approach, I forked Teeny in GitHub and began to customize it for my own site.

### My New Site

You can find the code of my new website in my [forked Teeny repository](https://github.com/jasonhallen/teeny) and the content and assets at my [jasonhallen.github.io repository](https://github.com/jasonhallen/jasonhallen.github.io/).  I'll give you an overview of how it works.

#### Content

The actual content of the website (aka the pages) is made out of Markdown files and HTML templates.  For example, [heres' the Markdown file of this post](LINK).  At the top of the file is a front matter section that contains metadata about the post.  After that is the post itself which is mostly written in Markdown with HTML sprinkled in for the formatting of media items.  Assets like images and audio are stored in dedicated folders within the repository.

#### Assembly

The website itself is assembled by the [`cli.js` script](https://github.com/jasonhallen/teeny/blob/main/cli.js).  All it really does is insert the front matter and Markdown content from each Markdown file into different HTML templates.  That's what produces a set of finished HTML files that constitutes my website.  You'll notice that there's no database that stores and manages the metadata for the templates and assets.  There's no need for it.

The main work I've done for this project is customizing the `cli.js` file.  Out of the box Majuri's `cli.js` file creates a super simple site structure.  My goal was to make the site look and behave like my original Joomla site, which meant that I needed to display a listing of blog posts across multiple pages sorted by the most recent posts.  This feature is also know as "pagination".  Then for each blog post I needed to provide buttons that link to "Newer" and "Older" posts.  You can take features like this for granted in CMS's like WordPress and Joomla, but when you're rolling your own SSG you have to code them yourself.

I also put a lot of attention into the [`style.css` document](https://github.com/jasonhallen/jasonhallen.github.io/blob/main/static/style.css).  That's where I created the theme and layout of the site.  Again, I just wanted the site to look like my original Joomla site.  You can judge my success with the screenshots below.

![JOOMLA SCREENSHOT]

![SSG SCREENSHOT]

#### Hosting

My site is now hosted entirely in GitHub through their free [GitHub Pages]() service.  My old Joomla site was hosted by Bluehost which costs me $10 per month.  I hope to cancel that soon even though I've been happy with Bluehost's service.

#### Workflow

Here's the workflow I've developed so far for writing and publishing a blog post.

1. Write the content of a new post in a Markdown file.  Add the metadata into the front matter section.

2. Use the `teeny develop` command to assemble the site and launch a local server so I can see how the site looks with my new post.  Every time I make a change to the Markfown file Teeny will reassemble the entire site, and I can refresh the page in the browser to see how it looks with the changes.

3. When I'm ready to publish the new post I commit the changes to [`main` branch](https://github.com/jasonhallen/jasonhallen.github.io) of my website's repository and then run `gh-pages -d public` which commits the `public` directory of assembled HTML files and assets to the [`gh-pages` branch](https://github.com/jasonhallen/jasonhallen.github.io/tree/gh-pages) of my website's repository.  I've set up GitHub Pages to deploy my website from the files in the `gh-pages` branch.


### Next Steps

I'm very happy with my new site.  It's basically the same as my old site except that 1) I have complete command over how it works, 2) it's free, and 3) it loads much faster.  The workflow for writing new posts and publishing them is also more suited to how I work.  I can just write local Markdown files and deploy them to GitHub.  No more getting lost and frustrating inside a bloated CMS.

There's more work that could be done on my website.  Here's what I might work on next.

* **SEO optimization** - I'll improve the way the `<meta>` elements are generated for the pages, especially for the keywords and descriptions. This will improve my rankings in search engine results.

* **Comments** - The one thing that I've lost when moving fromm Joomla to an SSG is the ability for readers to leave comments.  It's not a big deal because my Joomla site had only ever received a few comments, but it feels insular when a blog in a vacuum without the ability for readers to comment.  Comments are tricky to implement in SSG's because they typically require JavaScript which interacts dynamically with users and stores user input in a database.  However, there's a great commenting solution for SSG's called [Staticman]() which I'd like to explore.  It requires some decent tech skills to implement, but I'd like the challenge.

* **Streamline workflow** - I'd like to set up my website repository so that I can pull down the `main` branch onto my local computer, use `npm run` to install required packages (Teeny and gh-pages), and execute a set of scripts that cover the core workflows like developing, assembling, and deploying changes to the website.  Yakko Majuri has already provided some of this functionality in his original Teeny package, but I want to tweak it to fit my preferences and workflows.