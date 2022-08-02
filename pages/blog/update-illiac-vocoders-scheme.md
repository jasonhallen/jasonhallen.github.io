---
template: index
title: "Update: Illiac, Vocoders & Scheme"
date: 20201216
publish: yes
keywords: Lejaren Hiller, music generators, vocoder, Comedy Bang Bang, Scheme, Structure and Interpretation of Computer Programs
description: Here's what I've learned from studying the history of music generators, the design of digital vocoders, and the Scheme programming language this past month.
---
## Update: Illiac, Vocoders & Scheme

<figure><a href="/blog/update-illiac-vocoders-scheme"><img src="/images/hiller.jpg" alt="Lejaren Hiller in the computer lab"/></a>
<figcaption>Lejaren Hiller in the computer lab circa 1960, courtesy of the <a href="https://distributedmuseum.illinois.edu/exhibit/lejaren-hiller/">Illinois Distributed Museum</a>.</figcaption>
</figure>

After five weeks of intensive coding I was able to release [an album of tracks](link) generated by my music system. This was a month ago. In the aftermath of this frenzy of creative activity a mild hopelessness set in. Even though I could see a thousand paths forward, I wasn't sure I was up to the task of continuing on. I wasn't sure where to direct my attention next. I think this is pretty normal after a bout of creative activity. Here were the paths forward I couldn't decide on.

*   Keep working on the music generator, including studying the history of music generators.
*   Delve into sound synthesis techniques.
*   Focus on studying general computer science.

I ended up doing a little bit of all three over the past month. Here's what I've learned.

<a class="readmore" href="">Read more</a>

### Illiac Suite

The story goes that the first piece of music to be composed entirely by a computer was the _Illiac Suite_ by Lejaren Hiller and Leonard Isaacson at the University of Illinois in 1956-1957. To be clear, Hiller's and Isaacson's computer program didn't generate sound with a computer. Instead, it generated scores to be played by a string quartet. So this isn't quite what we think of when we think of computer music these days.

<figure><iframe src="https://www.youtube.com/embed/n0njBFLQSk8" width="560" height="315" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
<figcaption>Illiac Suite, the first of four parts.</figcaption>
</figure>

It's interesting to note that in 1957 Max Mathews designed the first computer program, which he called MUSIC I, to synthesize audio at Bell Labs. His MUSIC I language would eventually evolve into Csound in the mid-1980s. So two fundamental aspects of computer music -- algorithmic composition and audio synthesis -- were being pioneered around the same time in 1957.

<figure><img src="/images/machine_models_of_music.jpg" alt="Cover of the book Machine Models of Music" style="width:250px;"/>
<figcaption>Machine Models of Music<br>
Edited by Stephan Schwanauer and David Levitt.</figcaption>
</figure>


In order to learn more about how Hiller and Isaacson designed their program, I checked out _Machine Models of Music_, edited by Stephan Schwanauer and David Levitt in 1993. This book is a collection of influential articles written by designers of music generation programs from the late 1950s to the early 1990s. Fittingly, the first article is "Musical Composition with a High-Speed Digital Computer" by Hiller and Isaacson from 1958. This article explains in a general way how they made the program that generated the _Illiac Suite_.

Here's a quick summary. The first two parts of the _Illiac Suite_ are based on traditional rules of counterpoint which were formalized around the 16th century. These rules include stepwise melodic lines, octave range limitations, constraints on harmonies and chord voicings, and constraints on parallel intervals. The third part of the suite is based on 20th century compositional practices like chromaticism, serialism, and extended instrumental techniques. The fourth part is statistically generated melodies based on Markoff chains.

The third part of the _Illiac Suite_ is my favorite from a musical standpoint, while the fourth part is probably closest to how my music generator works. The melodies of my generator are based on simple probabilities that steer the note selection toward chords but still allow any note of the scale to be selected. Chord progressions are selected in a similarly probabilistic way. It will be good to incorporate some of Hiller's and Isaacson's counterpoint rules into my music generator. The stepwise melody rule in particular would make my generator's melodies more singable.

Hiller and Isaacson went into much more detail about their approach in their 1959 book _Experimental Music: Composition with an Electronic Computer_. I might check that out at some point.

### Vocoders

I'm frequently torn between the two aspects of computer music I mentioned earlier: algorithmic composition versus sound synthesis. Frankly, I spend more time on algorithmic composition, which means the actual sounds I use are either very simple or out-of-the-box Csound opcodes. One of my goals is to learn advanced techniques in synthesis so I can make more unique sounds.

To that end, I've been studying speech analysis and synthesis. There's a brief section about this in the Csound textbook from 2016, and Dodge and Jerse devote a whole chapter to it in their _Computer Music_ book from 1997. Charles Dodge himself was one of the early pioneers of speech synthesis. His piece "He Destroyed Her Image" from 1973 blew me away when I first heard it years ago.

<figure><iframe src="https://bandcamp.com/EmbeddedPlayer/album=454583686/size=large/bgcol=ffffff/linkcol=333333/tracklist=false/artwork=small/track=2952873197/transparent=true/" width="100%" height="120px" frameborder="0"></iframe></figure>

One way of synthesizing speech is with a channel vocoder. Lazzarini et al provide the code for one of these in their Csound textbook, and it's pretty easy to implement. A vocoder works by feeding an audio signal into it (typically a recording of a human voice), analyzing the signal's spectrum with a series of filters, and then recreating the signal based on the spectrum analysis. It's in that last stage of recreating the signal that you can do interesting musical things, like recreate the voice with a synthesizer to make it sound like the synthesizer is talking.

Okay, so now I have a vocoder. What am I going to do with it? I'll use it to make a plugs theme. What's that, you ask? My favorite podcast, [Comedy Bang Bang](https://www.earwolf.com/show/comedy-bang-bang/) hosted by Scott Aukerman, invites people to create shorts songs called "plugs themes" and submit them to the podcast. Each week they pick one of these songs and play it on an episode. To create my plugs theme I added my vocoder instrument to my music generator and used a recording of Aukerman's voice as the input to the vocoder.

<figure><audio controls="controls"> Your browser does not support the audio element.<source src="/audio/hallen_plugs_theme_2020_12_15.mp3" type="audio/mpeg" /></audio>
<figcaption>My plugs theme for Comedy Bang Bang.</figcaption>
</figure>

Here's an example output. In order to make it easier to understand what Aukerman is saying I've mixed together the original recording of his voice with the vocoder synthesis. Note that unlike with the pieces on my _318_ album where I didn't edit them at all, on this piece I edited it quite a bit after the fact. I'll be sumbitting this to Comedy Bang Bang in January, so we'll see if it ever appears on an episode.

### Scheme

On the computer science front, I've picked up the book _Structure and Interpretation of Computer Programs_ (SICP) by Harold Abelson, Gerald Jay Sussman, and Julie Sussman from 1996. This is considered a classic textbook in the world of CS, so I figured I should give it a read. MIT Press [has made the book available for free](https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/book.html) in case you'd like to check it out.

<figure><img style="width:250px;" src="/images/sicp.jpg" alt="Cover of the book Structure and Interpretation of Computer Programs" />
<figcaption>Structure and Interpretation of Computer Programs<br>By Harold Abelson, Gerald Jay Sussman, and Julie Sussman.</figcaption>
</figure>

The book uses the [Scheme language](https://www.gnu.org/software/mit-scheme/) to teach programming concepts, which means I've got to learn Scheme in order to follow along and do the exercises. I'm particularly interested in learning Scheme because of its association with Lisp, artificial intelligence, and functional programming.

I'm 50 pages into SICP. The authors quickly throw you into constructing expressions out of primitives and then work toward higher levels of abstraction. What strikes me as interesting about this book is that I have no sense for where it's heading. I'm just along for the ride, absorbing one concept after another, trusting that I'm good hands and that a bigger picture will gradually unfold.