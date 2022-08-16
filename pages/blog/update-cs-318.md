---
template: blogPost
title: "Update: CS 318"
date: 20201018
publish: yes
image: "/images/soft_landscape.jpg"
imageAlt: "Soft landscpes"
imageCaption: 'Computer-generated landscape by the <a href="https://twitter.com/softlandscapes">soft landscapes Twitter bot'
keywords: computer science, computational media, computer poetry, Twitter bots
description: "This fall I've been sitting in on a computer science course at Carleton called CS 318: Computational Media, taught by a visiting professor named James Ryan. This course focuses on new forms of creative expression and media that can only be made with computers. Examples include computer-generated poetry and novels, Twitter bots, computer-generated visual art, and virtual reality works."
---
This fall I've been sitting in on a computer science course at Carleton called CS 318: Computational Media, taught by a visiting professor named [James Ryan](https://www.jamesryan.world/). This course focuses on new forms of creative expression and media that can only be made with computers. Examples include computer-generated poetry and novels, Twitter bots, computer-generated visual art, and virtual reality works.

[READ MORE]

At first I debated whether to take CS 318 or a more foundational computer science course such as Programming Languages or Software Design. Having taken three foundational computer science courses over the past year and a half, I wondered if CS 318 was too frivolous, not a rigorous enough immersion in computer science theory and techniques.

However, after some reflection I felt compelled to explore the creative side of coding. While CS 318 primarily focuses on text (e.g. poetry, novels, Twitter), I've been taking it with an eye toward applying the ideas I've learned to music. I'm now half-way through the term, so here is a recap of some of the highlights.

### Poetry

Before we did any coding, James first had us learn about pre-computational approaches to text generation, including the Fünffacher Denckring der Teutschen Sprache (1651), the Eureka machine (1845), and the Dadaist cut-up method (1920s). Even though I took this class to apply the ideas to music, I have to say that playing with language itself has been very creatively stimulating.

For example, here's a paragraph I found in a recent issue of the Walker Art Center Magazine.

<figure><img src="/images/walker_magazine_paragraph.jpg" alt="Walker Magazine paragraph">
<figcaption>Paragraph from recent issue of the Walker Art Center Magazine.</figcaption>
</figure>

Here's a poem I made by cutting up the words in this paragraph and using chance procedures to reassemble them.

> **Walker Cut-Up**  
> structural apocalypse imagine realities  
> to incomprehensibility  
> futures the crossroads  
> surveillance individuals  
> we lives from and are digitization  
> hard overwhelming pandemic of our present  
> it faced racism activities everyday  
> seem all-encompassing might  
> divergent number  
> at climate infinite data complexities  
> stand slow-motion big shape can these  
> today variety ubiquitous be  
> daily with how

Next we turned to the use of templates to generate text. Templates are basically computerized Mad Libs (i.e. sentences with fill-in-the-blank slots), but they were state-of-the-art programming in the 1950s. Here's a poem I generated with templates I created based on several lines of poetry by Kay Ryan. I also used Python code to cut up the generated text and arrange it into lines.

> **Hommage to Kay Ryan**  
> it, like half  
> hereafters of hereafter,  
> comfort sunburnt  
> disaster really,  
> matching face gestated  
> hovered whole no ornate  
> shape's laughter oh  
> if passersby gathered sulfurous  
> the tiring  
> humanity crashing  
> during slate with  
> scratching the offspring  
> most not reacted suffer  
> quite otherly and  
> of an  
> acetate

### Twitter Bots

The last couple weeks we've focused on using grammars to generate text. Grammars are basically templates nested within templates nested within templates, etc. More technically, grammars involve non-terminal symbols (e.g. `[NOUN_PHRASE]`) which are expanded via production rules (i.e. `->`) into terminal symbols (e.g. `apples`). Production rules can have multiple options to choose from, indicated by the vertical pipe "`|`". Here's a simple example.

```
SENTENCE -> [NOUN_PHRASE] [VERB_PHRASE]
NOUN_PHRASE -> [NOUN] | [ADJECTIVE] [NOUN]
NOUN -> apples | trees | birds
ADJECTIVE -> happy | sad | brilliant
VERB_PHRASE -> [VERB] | [ADVERB] [VERB]
VERB -> fall | chirp | grow
ADVERB -> quickly | noisily | freely
```

Here are some possible outputs of the grammar above.

*   apples chirp quickly
*   brilliant birds fall
*   sad trees grow freely

James taught us how to build Twitter bots using a grammar language called [Tracery](https://tracery.io/) in conjunction with the site [Cheap Bots, Done Quick](https://cheapbotsdonequick.com/). It's easier to do than you might think. 

<figure><a class="twitter-timeline" href="https://twitter.com/thrivetodeath?ref_src=twsrc%5Etfw" data-height="200" data-theme="dark">Tweets by thrivetodeath</a>
<figcaption><a href="https://twitter.com/thrivetodeath" target="_blank" rel="noopener noreferrer">Thrive to Death</a>, my first Twitter bot.</figcaption>
</figure>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

I created a bot called [Thrive to Death](https://twitter.com/thrivetodeath), which is a parody of productivity gurus like Tim Ferriss and David Allen. The grammar is based on sentence structures and vocabulary I found in popular productivity gurus' Twitter feeds. Developing grammars like this is fun. You can easily spend hours and hours tweaking and refining the grammars so they can generate a wide range of structures and nuanced ideas. But unless you're very sophisticated with your grammar it will end up sounding slightly off and non-human at times.

Here are a few of my favorite tweets produced so far by Thrive to Death.

*   Productivity isn't a choice. It's a dream.
*   When's the last time you championed your routine?
*   Here's an idea: underestimate a big priority.
*   Sometimes you celebrate a schedule, and sometimes a schedule celebrates you.

### Up Next...

So how have I applied templates and grammars to music? For the past week I've been developing a grammar in Tracery that generates a Csound score. It has been an incredibly challenging but rewarding project, and I'm very excited about the results that have been produced thus far.

Over the next week I'll continue to tweak and refine the grammar so that the resulting music gets closer to what I'm envisioning. In my next post I'll go into detail about the project, which I call Grammar Music, and share some recordings of the results.