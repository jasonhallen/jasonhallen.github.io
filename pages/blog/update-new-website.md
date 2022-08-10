---
template: index
title: "Update: New Website"
date: 20220808
publish: yes
keywords: website, CMS, WordPress, Drupal, Joomla, Gatsby, Jekyll, Hugo, static site generator, node.js
description: My website has been completely rebuilt.  Like most things, I stumbled into this project while working on a different project.  This time, in my quest to control Csound with web technologies I fell down the Node.js rabbit hole, which led down the static site generator rabbit hole, which led down the GitHub Pages rabbit hole, and so on.  Less than two weeks later I have this shiny new static website built with an ultra-minimalist custom script.  So long Joomla!  Here's how it all happened.
---
## Update: New Website

<figure><a href="/blog/update-new-website"><img src="/images/pagination_detail.png" alt=""/></a>
</figure>

You might not realize it, but my website has been completely rebuilt.  Like most things, I stumbled into this project while working on a different project.  This time, in my quest to control Csound with web technologies I fell down the **Node.js rabbit hole**, which led down the **static site generator rabbit hole**, which led down the **GitHub Pages rabbit hole**, and so on.  Less than two weeks later I have this shiny new static site built with an ultra-minimalist custom script.  So long Joomla!  Here's how it all happened.

<a class="readmore" href="">Read more</a>

### Csound, Browsers, and Node.js

As I've been working on the [Mell Fark project](/blog/project-mell-fark-part-one) the past few weeks I've run into a couple snags.

* **Latency** - There were latency issues with Michael Gogins's `webserver` opcodes which were related to communication protocols between the browser and Csound.  He's still ironing these issues out, which is pretty common for a new project like this.  Still, it made me want to get outside of the traditional server and browser environment.

* **File system** - I had forgotten how annoying it is to read and write files from your local file system in the browser environment.  I'd rather have direct access to the file system.

<figure><img src="/images/nodejs.png" alt="Node.js logo" style="width:250px"/>
<figcaption>Node.js lets you run JavaScript code outside of the browser environment.</figcaption>
</figure>

Given that I enjoy coding with JavaScript and had already done a lot of work designing the Mell Fark interface with it, a good option would be to move to the [Node.js](https://nodejs.org/en/) environment.  Node.js allows me to run JavaScript code natively on my computer without being in the browser environment.  All I needed was a way to control Csound within Node.js.  A quick search of Node.js packages revealed the [`csound-api`](https://www.npmjs.com/package/csound-api) by Nate Whetsell, so I had a path forward.

### Static Site Generators

I'm new to Node.js, but it's been on my list of environments to learn for a while.  In fact, the timing is good because I need to get familiar with Node.js for a work project.  To get my bearings, I started with the official [Introduction to Node.js](https://nodejs.dev/learn), which is wonderful.  And soon thereafter I started falling down the rabbit hole of Node.js packages and frameworks.

Before long I was looking into static site generators (SSG's), which are popular in the Node.js world.  I've known about SSG's for a few years but never seriously considered using them.  Here's a quick overview of dynamic versus static sites.

* **Dynamic** - Most websites these days are built with frameworks that assemble web pages on demand from components stored in databases.  [WordPress](https://wordpress.org/), [Drupal](https://www.drupal.org/), and [Joomla](https://www.joomla.org/) are examples of these frameworks, and they're usually written in PHP.  When you navigate to one of these pages in the browser the server assembles the page on the fly and sends it to you.

<figure><img src="/images/cms_logos.png" alt="Logos of WordPress, Drupal, and Joomla"/>
<figcaption>WordPress, Drupal, and Joomla are CMS's that dynamically serve websites.</figure>

* **Static** - SSG's, on the other hand, are frameworks that build all the pages from components and deposit them on the server ahead of time.  In other words, they generate a set of pre-built HTML files.  When you navigate to a page in the browser, all the server has to do is send you the HTML file.  It doesn't have to assemble the HTML file on the fly.  As a result, SSG's tend to load very fast.  They also don't need databases.  [Gatsby](https://www.gatsbyjs.com/), [Jekyll](https://jekyllrb.com/), and [Hugo](https://gohugo.io/) are examples of these frameworks.

<figure><img src="/images/ssg_logos.png" alt="Logos of Gatsby, Jekyll, and Hugo"/>
<figcaption>Gatsby, Jekyll, and Hugo are SSG's that generate static websites.</figure>

### Problems with Joomla

My website was originally built in Joomla.  I've never loved Joomla, and I only chose it as a CMS because I was maintaining an organization's Joomla site at the time and wanted to learn more about how it worked.  Here's why Joomla has been frustrating to me.

* **Bloated** - Just like all CMS's, Joomla is designed to be flexible.  It needs to be able to build any and every kind of website, whether a personal blog, a company website, an e-commerce website, an online magazine, etc.  It also needs to provide for user management, customization, and extensions.  This means that the website building environment is quite abstracted, complex, and bloated.  For a super simple website like mine Joomla is actually overkill.

* **Confusing** - The abstraction and complexity I mentioned above cause the configuration, customization, and ongoing management of the site to be confusing.  I've never fully grasped how Joomla works.  Whenever I need to customize something I dig through a dozen configuration pages, comb through PHP templates, examine the file system via FTP, etc.  Sometimes simple changes take a long time to figure out, and they often feel like hacky solutions.

* **Lack of support** - I've always found Joomla support lacking online.  It feels like a ghost town compared to the robust online support for WordPress.  I'll Google questions about how to do this or that in Joomla, and it can be very hard to get a good answer.  Even searching the Joomla extension marketplace feels sketchy at times.

* **Not secure** - Earlier I mentioned that I maintained an organization's Joomla site.  Nobody had updated the Joomla version for a few years by the time I took responsibility for the site, so it had been hacked and injected with malicious code.  This shows how vulnerable you can be in a CMS if you're not staying up to date with patches and updates.  And yet, staying up to date with patches and updates introduces its own complications because you're always wondering what's going to break on your website when you implement them.

### Choosing an SSG

Given my frustrations with Joomla and that I wanted to delve into the world of Node.js, I figured that converting my website into an SSG would be a good introductory Node.js project.  The first order of business was choosing an SSG.  I briefly looked at Gatsby and Jekyll but then started to read other people's blog posts about their experiences with them.  These posts gave the impression that Gatsby and Jekyll were also flexible, abstracted frameworks with their own configuration learning curves.  The writers asked, "Why spend days wrapping our heads around somebody else's idea of how to build a website when we can build bare bones SSG's that meet our needs in the same amount of time?"

One such writer was Yakko Majuri.  His post ["Why I built my own static site generator"](https://yakkomajuri.com/blog/teeny) made the case for an ultra-minimalist SSG.  He wrote his own SSG called [Teeny](https://github.com/yakkomajuri/teeny) and explained how the components work together.  If you look at the main [`cli.js`](https://github.com/yakkomajuri/teeny/blob/main/cli.js) script you'll see that it only takes about 160 lines of JavaScript to build his site.  Studying the `cli.js` script demystifies what an SSG actually does.  Inspired by his approach, I forked Teeny in GitHub and began to customize it for my own site.

### My New Site

You can find the SSG code that builds my new website in my [forked Teeny repository](https://github.com/jasonhallen/teeny) and the content and assets at my [jasonhallen.github.io repository](https://github.com/jasonhallen/jasonhallen.github.io/).  I'll give you an overview of how it works.

#### Content

The content of the website (aka the Music, About, and Blog pages) is made up of Markdown files and HTML templates.  For example, [here's the Markdown file of this post](https://raw.githubusercontent.com/jasonhallen/jasonhallen.github.io/main/pages/blog/update-new-website.md).  At the top of the file is a front matter section that contains metadata about the post.  After that is the post itself which is mostly written in Markdown with HTML sprinkled in to format the media items.  Assets like images and audio are stored in dedicated folders within the repository.  The Node.js package called [`front-matter`](https://www.npmjs.com/package/front-matter) parses the front matter and the package called [`marked`](https://www.npmjs.com/package/marked) converts the Markdown to HTML.

#### Building

The website itself is built by the [`cli.js`](https://github.com/jasonhallen/teeny/blob/main/cli.js) script.  All it really does is insert the front matter and Markdown content from each Markdown file into different HTML templates.  That's what produces a set of finished HTML files that constitutes the website.  You'll notice that there's no database that stores and manages the metadata for the templates and assets.  There's no need for one.

The main work I've done for this project is customizing the `cli.js` script.  Out of the box Majuri's `cli.js` script creates a super simple site structure.  My goal was to make the site look and behave like my original Joomla site, which meant that I needed to display a list of blog posts across multiple pages sorted by the most recent posts.  This feature is also know as "pagination".  Then for each blog post I needed to provide buttons that link to "Newer" and "Older" posts.  Frameworks like WordPress and Joomla provide pagination and linking between posts out of the box, but when you're rolling your own SSG you have to code them yourself.

I also put a lot of work into the [`style.css`](https://github.com/jasonhallen/jasonhallen.github.io/blob/main/static/style.css) style sheet.  That's where I created the theme and layout of the site.  Again, I just wanted the site to look like my original Joomla site.  You can judge my success with these screenshots.

<figure><img src="/images/comparison_home_pages.png" alt="Screenshot of home page in Joomla compared to SSG"/>
<figcaption>Home page in original Joomla site (left) compared to new SSG site (right).</figcaption>
</figure>

#### Hosting

My site is now hosted entirely in GitHub through their free [GitHub Pages](https://pages.github.com/) service.  My old Joomla site was hosted by Bluehost which cost me $10 per month.  In fact, I'm still paying for Bluehost for now, but I hope to cancel it soon.

#### Workflow

Here's the workflow I've developed so far for writing and publishing blog posts.

1. Write the content of a new post in a Markdown file.  Add the metadata into the front matter section.

2. Use the `'teeny develop'` command to build the site and launch a local server so I can see how the new post looks.  Every time I make a change to the Markfown file Teeny will rebuild the entire site, and I can refresh the page in the browser to see how it looks with the changes.

3. When I'm ready to publish the new post I commit the changes to the [`main` branch](https://github.com/jasonhallen/jasonhallen.github.io) of my website's repository and then run `'gh-pages -d public'` (from the [`gh-pages`](https://www.npmjs.com/package/gh-pages) package) which commits the `public` directory of HTML files and assets to the [`gh-pages` branch](https://github.com/jasonhallen/jasonhallen.github.io/tree/gh-pages) of my website's repository.  I've set up GitHub Pages to deploy my website from the files in the `gh-pages` branch.

### Next Steps

I'm very happy with my new site.  It's basically the same as my old site except that:

1. I have complete command over how it works.

2. It's free.

3. It loads much faster.

The workflow for writing new posts and publishing them is also more suited to how I like to work.  All I need is a text editor and a command line to publish my site.  No more getting lost and frustrated inside a bloated CMS.

There's more work that could be done on my website.  Here's what I might work on next.

* **SEO optimization** - I'll improve the way the `<meta>` elements are generated for the pages, especially for the keywords and descriptions. This will improve my rankings in search engine results.

* **Comments** - The one thing that I've lost when moving from Joomla to an SSG is the ability for readers to leave comments.  It's not a big deal because my Joomla site had only ever received a few comments, but I like it when a blog is connected to the outside world.  Comments are tricky to implement in SSG's because they typically require JavaScript to receive, store, and display user input.  However, there's a promising commenting solution for SSG's called [Staticman](https://staticman.net/) which I'd like to explore.  It requires some decent tech skills to implement, but I'd like the challenge.

* **Streamline workflow** - I'd like to set up my website repository so that I can pull down the `main` branch onto my local computer, use `npm install` to install required packages (Teeny and gh-pages), and execute a set of scripts that cover the core workflows like developing, building, and deploying changes.  Yakko Majuri already provides some of this functionality in his original Teeny package, but I want to tweak it to fit the way I work.