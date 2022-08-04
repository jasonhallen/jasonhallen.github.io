---
template: index
title: "Study: Mark Fell - Rhythms"
date: 20200403
publish: yes
keywords: Mark Fell, rhythm generator, algorithmic music, Csound, Multistability
description: "How I studied and implemented the algorithmic techniques of Mark Fell."
---
## Study: Mark Fell - Rhythms

<figure><a href="/blog/study-mark-fell-rhythms"><img src="/images/fell_detail.png" alt="Electric Miles Davis"/></a>
</figure>

I was drawn to the work of [Mark Fell](http://www.markfell.com/wiki/) this past fall when I was exploring [rhythmic pattern generation](/blog/project-drum-machine) and FM synthesis. In particular, I was blown away by Fell’s collaboration with Gábor Lázár from 2015 called _[The Neurobiology of Moral Decision Making](https://soundcloud.com/gaborlazar/mark-fell-and-gabor-lazar-the-neurobiology-of-moral-decision-making-2015)_.

I wanted to know how Fell and Lázár made these rhythms and sounds. A Google search landed me on [this thread in the lines forum](https://llllllll.co/t/approaching-gabor-lazar-sound-design-techniques/13349) where I learned that Fell completed a PhD thesis in 2013 called [_Works in Sound and Pattern Synthesis_](https://openresearch.surrey.ac.uk/esploro/outputs/doctoral/Works-in-Sound-and-Pattern-Synthesis/99516858802346?institution=44SUR_INST). It turns out this thesis provides detailed discussions of Fell’s rhythmic pattern and synthesis algorithms. I decided to implement Fell’s ideas in Csound just like I did with [James Tenney’s ideas](/blog/study-james-tenney).

<a class="readmore" href="">Read more</a>

### Multistability

So far I’ve only focused on the ideas Fell explores on his album _Multistability_ from 2010. Specifically, I’ve implemented some of his rhythmic pattern algorithms, which I’ll cover in this post. In my next post I’ll cover his FM synthesis algorithms.

Fell’s basic approach to rhythm on _Multistability_ is to avoid clearly defined tempos or meters. Instead of setting a tempo and generating rhythmic patterns based on equal subdivisions of the beat, he essentially changes the tempo from one beat to the next. In other words, he defines the time in milliseconds between each beat for a sequence of beats and then cycles through that sequence. This might sound confusing, so let me illustrate the idea by showing you the “rhythmic pattern generator” I coded in Csound and Cabbage.

### Rhythmic Pattern Generator

<figure><img src="/images/fell_rhythmic_pattern_generator.png" alt="Fell rhythmic pattern generator">
<figcaption>Screenshot of the Fell rhythmic pattern generator built in Cabbage.</figcaption>
</figure>

Let’s first look at the top box called “Rhythm”. The six columns in the middle each represent a beat (or multiple beats depending on the Repetition value) in the rhythmic sequence. The rhythmic sequence is cycled through over and over. Here’s what the different fields mean.

*   **Duration** - This sets the duration of each beat in milliseconds. You can see how this allows you to create a sequence of irregularly timed beats (e.g. 500, 90, 65, 220, 412, and 500). Alternatively, you could just as well create a sequence of beats that mimic regular subdivisions (e.g. 500, 250, 500, 125, 250).
*   **Multiplier** - This is a factor that the duration of each beat is multiplied by. For example, if the multiplier is set to 5 and the duration of a beat is set to 40, then the actual duration of the beat is 5 x 40 = 200ms.
*   **Repetition** - This sets the number of times that a beat will be repeated during the sequence.
*   **Max Duration** - When the Randomize All button is pressed, the duration values are randomly generated with a maximum possible value of Max Duration divided by Multiplier.
*   **On/Off** - This determines whether the column is included in the rhythmic sequence. If a column is turned off then the three drum parts in the corresponding column below are skipped during the sequence.

Now let’s look at the three boxes below the Rhythm box. These are the individual drum parts. Here’s what the widgets do.

*   **Instrument** - The dropdown menu on the left lets you select different instruments such as kick drum, snare, handclaps, high hat, etc.
*   **On/Off** - The six buttons in the middle determine whether the drum part will be triggered on that beat.
*   **Amplitude Sequence** - On the right side of the box you’ll see six vertical sliders and six buttons. The sliders create an amplitude sequence for the drum part, and the buttons determine whether to include the above slider value in the sequence. The drum part cycles through this amplitude sequence over and over as the overall rhythmic sequence is traversed.
*   **Mute** - The “M” button mutes the drum part.
*   **Volume Knob** - This adjusts the overall volume of the drum part. You use this in conjunction with the amplitude sequence to determine the volume of the drum part.

The ideas here are a combination of Mark Fell’s and mine. Fell wrote about the duration, multiplier, repetition, and amplitude sequence ideas in his thesis. I added more interactivity in the Cabbage interface and the ability to layer more drum parts. That’s the fun of studying other people’s ideas. You immediately start taking them in directions that are interesting to you.

### Example Recordings

Here are some improvisations I recorded with this instrument. In each case I started with a pre-made rhythmic pattern and quickly began altering the pattern. Note that these are not the most compelling pieces of music on their own. To bring these pieces to life I’ll need to add synthesizer accompaniment, which I’ll cover in the next post.

<figure><audio controls="controls"> Your browser does not support the audio element.<source src="/audio/hallen_fell_rhythm_2020_4_1_a.mp3" type="audio/mpeg" /></audio>
<figcaption>"hallen_fell_rhythm_2020_4_1_a.mp3"</figcaption>
</figure>

<figure><audio controls="controls"> Your browser does not support the audio element.<source src="/audio/hallen_fell_rhythm_2020_4_1_e.mp3" type="audio/mpeg" /></audio>
<figcaption>"hallen_fell_rhythm_2020_4_1_e.mp3"</figcaption>
</figure>

<figure><audio controls="controls"> Your browser does not support the audio element.<source src="/audio/hallen_fell_rhythm_2020_4_1_c.mp3" type="audio/mpeg" /></audio>
<figcaption>"hallen_fell_rhythm_2020_4_1_c.mp3"</figcaption>
</figure>

<figure><audio controls="controls"> Your browser does not support the audio element.<source src="/audio/hallen_fell_rhythm_2020_4_1_b.mp3" type="audio/mpeg" /></audio>
<figcaption>"hallen_fell_rhythm_2020_4_1_b.mp3"</figcaption>
</figure>

### Playing the Instrument

This instrument is an example of how a few simple elements (i.e. duration, multiplier, repetition, and amplitude sequence) can interact to create complex and surprising patterns. Playing it is very different from playing a [traditional drum machine](/blog/project-drum-machine) where each drum part is independent and fully controllable. Instead, in this instrument the drum parts are interconnected. It takes some getting used to.

You can make metrical rhythms that sound pretty traditional with this instrument, but it’s an uphill battle. This instrument is better for creating awkward, knotty rhythms, and that was Fell’s intention. Your best bet is to embrace the awkwardness and let the rhythms get weird.

### Csound Code

The Csound code for this instrument is pretty similar to the code for [the drum machine I made](/blog/project-drum-machine). The code reads the various widget values into arrays, cycles through the active rows and columns, and triggers the drum samples which are played with the `loscil` opcode.

The main difference is that this instrument changes the value of the `metro` opcode every time it moves to the next rhythm column. In other words, it continuously cycles through different tempos, whereas the traditional drum machine maintains a constant tempo as it cycles through the drum patterns.