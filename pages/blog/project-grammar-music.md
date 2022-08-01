---
template: index
title: "Project: Grammar Music"
date: 20201109
publish: yes
keywords: Tracery, grammar, music generation, Csound
description: I used the Tracery grammar language to random generate music with Csound.
---
## Project: Grammar Music

<figure><a href="/blog/project-grammar-music"><img src="/images/grammar_music_code.png" alt="Grammar Music code screenshot"/></a>
<figcaption>Excerpt of code from Grammar Music project.</figcaption>
</figure>

In my [previous post](index.php?option=com_content&view=article&id=15:update-cs-318&catid=8:blog) I talked about using [Tracery](http://tracery.io/) to write grammars which generate text. In this post I'll talk about using Tracery to generate Csound scores instead.

<a class="readmore" href="">Read more</a>

### Tracery

First, let's do a quick overview of Tracery. [This handy tutorial](http://www.crystalcodepalace.com/traceryTut.html) can explain Tracery better than I can. The syntax is actually pretty simple in that there are only a few elements to learn, but it does take some practice to get the hang of it. Despite the apparent simplicity, you come to find that Tracery can do powerful things.

Here are the key points for our purposes:

*   Tracery randomly selects elements to insert into the grammar each time it's run. More technically, Tracery expands all non-terminal symbols into randomly selected terminal symbols. In other words, this is what allows the musical output to be different every time you run it.
*   You can create variables that save and reuse strings.
*   The output is simply a string of characters.

Since the output of Tracery is a string of characters, you can get clever about encoding instructions for other languages in the string. For example, you can use Tracery to output a string of Csound score events, and then you can combine that score with a Csound orchestra to produce music!

### But First, a Little Python

So you can use Tracery to output a Csound score, and you can then feed that score into Csound to hear Csound perform it. Is there a way to automate that process? Sure there is. I used a Python script to do this. Here are the components I used.

*   [Tracery for Python](https://github.com/aparrish/pytraceryhttps://github.com/aparrish/pytracery) - This lets you run Tracery within Python. Made by Allison Parrish.
*   [ctcsound](https://github.com/csound/ctcsound) - This lets you run and control Csound in Python. It comes packaged with Csound. Made by François Pinot.

Ok, now back to score generation with Tracery.

### Generating a Score

Given that this whole project revolves around generating a Csound score in Tracery, the first thing I had to do was reacquaint myself with the [Csound score syntax and statements](https://csound.com/docs/manual/ScoreTop.html). Here are some of the features of the score that I used.

*   **b statements** - The piece is constructed one instrument track at a time. After each track is constructed the program resets the time to the beginning of the piece with a `b` statement and constructs the next track.
*   **Carry** - I use the `+` carry feature in the `p2` field and the number 1 in the `p3` field to act as a metronome for the entire piece. This keeps the instruments in sync.
*   **{ } loops** - The opening section features multiple instrument lines of varying lengths being looped with the `{ }` system.
*   **t statements** - Tempo is altered with `t` statements.

My initial goal was to prove that a Tracery grammar could output a valid Csound score. This took a couple hours of tinkering but it wasn't too hard. At this stage I used simple sine waves (i.e. the `oscili` opcode) to play the melodies and drum machine samples (i.e. the `loscil` opcode) to play the drum parts.

At its core, the Tracery grammar generates note events with the following production rule:

`"note": ["i #inst# + 1 #dur# $BO[#set_on_off#]#amp# * #note_on_off# / #voices#$BC $BO#inst_register#+#note_options# #note_offset#$BC"]`

Let's break down what's going on in this production rule.

*   `#inst#` and `#dur#` are what you'd probably guess: the name of the instrument in the Csound orchestra and the duration of the note.
*   `$BO` and `$BC` stand for "bracket open" and "bracket close". These are macros that Python replaces with `[` and `]` before passing the score into Csound. They are necessary because Tracery uses brackets in its own syntax, and this was causing problems. The easiest solution was macros.
*   Within `$BO` and `$BC` is the expression for the note amplitude. `#note_on_off#` determines whether the amplitude will be multiplied by 0 and therefore cause the note to be silent. `#voices#` is the number of instruments playing in the piece. Dividing the amplitude by the number of voices helps keep the overall amplitude at any given instant under the value of 1.
*   The next set of brackets calculates the frequency of the note. `#inst_register#` selects which register the instrument plays in. `#note_offset#` shifts the fundamental note of the scale up or down by a certain number of half tones. `#note_options#` selects which note within the scale to play (e.g. fundamental, second, third, fourth, etc).

There's much more I could say about how all of this works, but I won't go into more detail here. You can check out [my code for this project](https://github.com/jasonhallen/grammarmusic) if you want to learn more.

Here's an output of the grammar from an early stage of development. It's a good lesson in the fact that, while it's not too hard to get Tracery to generate a valid Csound score, it's another thing to get Tracery to generate a compelling piece of music. This early output consists of loops of randomly generated melodies and rhythms. The music starts, doesn't go anywhere, and abruptly ends.

Your browser does not support the audio element.

"hallen\_grammar\_music\_zoxjpqe\_2020\_10\_11.mp3"

I needed to find a way to make the grammar output more interesting, so I spent the next week wrestling with the limitations of Tracery and the constraints of the Csound score system. I had two goals:

1.  Find a way to create an interesting structure from beginning to end.
2.  Add more interesting melody instruments and drum kits.

### Structural Improvements

*   **Slow Build** - Rather than have all the instruments start playing at once, I found a way for them to be introduced more gradually.
*   **Tempo Change** - To shake things up a bit, I incorporated a randomly placed tempo change.
*   **Evolution** - It's not that interesting to hear randomly generated melodies and rhythms looped over and over, so I found a way to have them slowly evolve over time.
*   **Mode Change** - Halfway through the piece the mode gradually changes, which sounds a little like a chord change.
*   **Unison Melody** - While biking past a symphony band practicing outside I heard all the musicians playing a melody in unison. In that instant I was struck with the idea of having my melody instruments play in unison. I was able to implement this similarly to how I implemented the evolution feature above, except instead of evolving separately the melody instruments evolved and converged over time on the same randomly generated melody. This became the finale of the piece.

Here's a diagram I drew of the structure of the piece as I was working it out.

![Grammar Music diagram](images/images/grammar_music_diagram.jpg)

Diagram of Grammar Music structure.

### Instruments

I wanted to avoid getting bogged down in instrument design like I did on the [Mark Fell project](index.php?option=com_content&view=article&id=13:study-mark-fell-rhythms&catid=8), so I decided to search online for pre-made Csound instruments. Turns out there are several opcodes that made this very easy. Here are the instruments I made for Grammar Music.

*   **Plucked String** - I borrowed this instrument from Iain McCurdy's Bounce project that comes with Cabbage. It uses the [`wgpluck2`](http://www.csounds.com/manual/html/wgpluck2.html) opcode, which is a physical model of a plucked string. This instrument plays both melodies and bass lines depending on the register selected.
*   **Pipe Organ** - This is a straightforward use of additive synthesis that I found on [René Nyffenegger's site](http://www.adp-gmbh.ch/csound/instruments/organ01.html).
*   **Hammond B3 Organ** - Uses the [`fmb3`](https://csound.com/docs/manual/fmb3.html) opcode.
*   **Rhodes Electric Piano** - Uses the [`fmrhode`](http://www.csounds.com/manual/html/fmrhode.html) opcode.
*   **Marimba** - Uses the [`marimba`](http://www.csounds.com/manual/html/marimba.html) opcode.

As I mentioned earlier, the drums are [samples I got for free from Reverb.com](https://reverb.com/software/samples-and-loops/reverb/3514-reverb-drum-machines-the-complete-collection). The drum kits I used in this project were the Roland CR-78, Roland TR-808, E-mu Drumulator, LinnDrum, Oberheim DM, and Univox SR-95.

To add some atmosphere I ran all the instruments through the [`freeverb`](http://www.csounds.com/manual/html/freeverb.html) reverb opcode.

### Output

Here are three outputs of the latest version of the Grammar Music system. Note that in "822l1jk" I had accidentally configured the main melody instrument, a Hammond B3, to play a perfect fifth higher than it was supposed to. This resulted in serendipitous melodies and harmonies.

Your browser does not support the audio element.

"hallen\_grammar\_music\_822l1jk\_2020\_10\_20.mp3"

Your browser does not support the audio element.

"hallen\_grammar\_music\_1w1pfvp\_2020\_11\_8.mp3"

Your browser does not support the audio element.

"hallen\_grammar\_music\_9qodbm6\_2020\_11\_8.mp3"

### Code

You can check out the code for Grammar Music in [my GitHub repository](https://github.com/jasonhallen/grammarmusic). Note that you won't be able to hear the drum parts if you render the Csound files on your computer because I haven't included the drum samples in the repository. But you can at least see how the Tracery grammar works and how everything is stitched together in Python.

### Future Directions

Just because you can make music with Tracery, should you? Probably not. It's been an uphill battle. Given the constraints of Tracery and the Csound score syntax, you have to get really creative and write lots of lines of code. And you can frankly get the same results coding all this in Csound itself. However, this was my midterm project for CS 318, and we had to use a grammar language. So I set this as a technical challenge for myself, and I've shown that it's possible to make music with Tracery.

So here are the future directions I plan to take the Grammar Music project.

*   **Python** - I'm now moving all this functionality over to Python where I can create a framework of classes and methods that will allow me to do more powerful and interesting things. While I won't be using Tracery anymore, the project will always be influenced by Tracery's implementation of grammar systems.
*   **Rule System** - I'll create a rule system that will determine how each new piece will be constructed. This will bring more structural variation to the output.
*   **Instruments** - I'll add new instruments to diversify the sound palette.
*   **Interactivity** - Ultimately I'd like to be able to interact with the rule system in real time to guide the construction of a piece.