---
template: index
title: "Helpful Resources for Csound"
date: 20200203
publish: yes
keywords: Csound, resources, books, computer music, Victor Lazzarini, Richard Boulanger, Floss Manual, Charles Dodge, Curtis Roads, code, blog
description: Here is a list of helpful resources for learning Csound.
---
## Helpful Resources for Csound

<figure><a href="/blog/helpful-resources-for-csound"><img src="/images/csound_bookshelf.jpg" alt="Computer music books on bookshelf"/></a>
<figcaption>Csound and computer music books on my bookshelf at work.</figcaption>
</figure>

Even with the best documentation and most supportive user community Csound would still be difficult for anyone to learn. That’s because digital audio generation and processing is hard to grasp conceptually. It has been for me anyway. Tremendously hard.

<a class="readmore" href="">Read more</a>

Here’s a brief selection of the topics I’ve had to wrestle with in the past ten months:

*   **Physical acoustics** - sound waves, their propagation through media, the physical basis of pitch and amplitude, the mechanical operation of the ear, and the brain’s perception of sound
*   **Digital audio** - sampling rate, quantization depth, the Nyquist frequency, and aliasing
*   **Trigonometry** - sine, cosine, degrees, radians, frequency, period, etc. I’m relearning what I’ve forgotten from junior high school.
*   **Synthesis techniques** - Amplitude modulation, frequency modulation, waveshaping, additive synthesis, subtractive synthesis

Note that none of the topics above are specifically about Csound. Rather, they are general concepts in computer music, and Csound, like all programming languages for music, has its own ways of implementing these concepts. What made Csound such a steep learning curve was not simply the Csound language itself -- the strange syntax and 2,000+ specialized functions (called “opcodes”) -- but the slow, challenging absorption of these general concepts.

In case this is helpful to anyone else trying to learn Csound or computer music, here is a list of the main resources I’ve used thus far. They are listed in the order that I began using them, which as you'll see is not the order I'd recommend.

<figure><img style="width:250px" src="/images/computer_music_instruments_cover.jpg" alt="Computer Music Instruments cover">
<figcaption><strong><a href="https://www.springer.com/gp/book/9783319635033">Computer Music Instruments: Foundations, Design and Development (2017)</a></strong><br>
Author - Victor Lazzarini<br>
Publisher - Springer</figcaption>
</figure>

I thought _Computer Music Instruments: Foundations, Design and Development_ by Victor Lazzarini would be the perfect introduction to Csound. However, I quickly became overwhelmed by the subject matter of the first chapter, which is a crash course in Csound, [Faust](https://faust.grame.fr/) (a specialized audio processing language), and Python. I’ve since come to realize that _Computer Music Instruments_ is a more advanced book for people who are already familiar with audio processing languages, general scripting, and software development. It is no doubt a rigorous and useful resource for the advanced computer music practitioner, but it wasn’t the right book for me to learn Csound.

<figure><img style="width:250px" src="/images/csound_cover.jpg" alt="Csound cover">
<figcaption><strong><a href="https://www.springer.com/gp/book/9783319453682">Csound: A Sound and Music Computing System (2016)</a></strong><br>
Authors - Lazzarini, Yi, ffitch, Heintz, Brantsegg, McCurdy<br>
Publisher - Springer</figcaption>
</figure>

_Csound: A Sound and Music Computing System_ was written by some of the core developers of Csound: Victor Lazzarini, Steven Yi, John ffitch, Joacim Heintz, Oyvind Branstegg, and Iain McCurdy. This was exactly what I needed - a thorough overview of Csound from the fundamentals of digital audio to classic synthesis techniques to methods of controlling program flow. And yet I still struggled immensely to grasp the ideas in this book. The real challenge was wrapping my head around the concept of variable rates. In Csound, variables are computed at three different rates:

*   **Initialization rate** - computed once each time an instrument is called
*   **Control rate** - computed multiple times at consistent intervals throughout the duration of a note, usually on the order of thousands of times per second
*   **Audio rate** - computed for each digital audio sample (i.e. at the sampling rate, often 44,100 or 48,000 samples/second)

I found myself reading and rereading Chapter 2: “Key System Concepts” and Chapter 3: “Fundamentals” because I couldn’t understand how variable rates, phase, functions, and opcodes worked together to generate audio signals. It was profoundly frustrating, and I nearly gave up on Csound multiple times. After a couple weeks of struggling it all started to make more sense.

_**Floss Manual and Canonical Reference**_

The [Floss Manual for Csound](http://write.flossmanuals.net/csound/preface/) is indispensable to anyone learning Csound. It might actually be the best place for anyone to start. The [Canonical Csound Reference Manual](http://www.csounds.com/manual/html/) is also essential. You can’t get too far into Csound without becoming familiar with this manual because it documents the inputs and outputs of each opcode along with examples. The Reference Manual is written in fairly technical and terse language, so it doesn’t function well as a stand alone introduction to Csound. The Floss Manual is better for that.

<figure><img style="width:250px" src="/images/csound_book_cover.jpg" alt="Csound Book cover">
<figcaption><strong><a href="https://mitpress.mit.edu/books/csound-book">The Csound Book: Perspectives in Software Synthesis, Sound Design, Signal Processing, and Programming (2010)</a></strong><br>
Author - Richard Boulanger<br>
Publisher - MIT Press</figcaption>
</figure>

Another resource I consulted in order to round out my understanding of Csound fundamentals was Richard Boulanger’s _The Csound Book: Perspectives in Software Synthesis, Sound Design, Signal Processing, and Programming_. The large introductory chapter is meant to cover all the basics of Csound, but I found the chapter difficult to follow; it jumps from topic to topic without providing thorough explanations. I've since come to find some of the later chapters to be more focused and useful, so I still think it's a great resource. It just might not be very beginner friendly.

<figure><img style="width:250px" src="/images/computer_music_cover.jpg" alt="Computer Music cover">
<figcaption><strong><a href="https://dl.acm.org/doi/book/10.5555/549805">Computer Music: Synthesis, Composition, and Performance (2nd edition, 1997)</a></strong><br>
Authors - Charles Dodge and Thomas A. Jerse <br>
Publisher - Cengage Learning</figcaption>
</figure>

This is the book that finally unlocked the fundamental concepts of computer music for me. While it isn't specifically about Csound, I don't think I could have made much progress on Csound without first coming to terms with the concepts laid out in this book. One extremely helpful practice has been reading the chapters on various synthesis techniques and figuring out how to implement the examples in Csound.

<figure><img style="width:250px" src="/images/computer_music_tutorial_cover.jpg" alt="Computer Music Tutorial cover">
<figcaption><strong><a href="https://dl.acm.org/doi/book/10.5555/525484">The Computer Music Tutorial (1996)</a></strong><br>
Author - Curtis Roads <br>
Publisher - MIT Press</figcaption>
</figure>

Similar to _Computer Music_ by Dodge and Jerse, _The Computer Music Tutorial_ covers all aspects of computer music without reference to a specific programming language. It actually feels more like a reference manual because it's enormous. I haven't spent as much time with this book as I have with _Computer Music_, but I suspect I'll refer to it more and more as I explore new topics in computer music.