---
template: index
title: "Project: Music Generator"
date: 20201129
publish: yes
keywords: music generator, python, classes, objects, 318, csound, algorithmic music
description: An overview of an automatic music generation system I designed in Python.
---
## Project: Music Generator

<figure><a href="/blog/project-music-generator"><img src="/images/music_generator1.jpg" alt="Music generator sketch"/></a>
<figcaption>Sketch of the core music generator methods.</figcaption>
</figure>

In my last post I talked about [generating a Csound score with Tracery](index.php?option=com_content&view=article&id=16:project-grammar-music&catid=8:blog). That was a rewarding exercise, but Tracery isn't an ideal language to continue developing a music generator with. I decided to reimplement the music generator entirely in Python in order to take advantage of handy things like lists, conditional statements, functions, and classes. It all came together quicker than I expected, and I was even able to release an album of tracks showcasing the system.

<a class="readmore" href="">Read more</a>

### How It Works

While my Python music generator works in almost the same way under the hood as my Tracery music generator, I was able to add so much more functionality and sophistication to the Python generator that it's hard to compare the two systems. The Python generator is a major leap forward in terms of the complexity and diversity of the output. Here's an overview of the components that make it work.

#### Classes

I was most excited to see how using classes and objects in Python would allow me to do more advanced things with the generator. Here are the classes I'm using for now, but these will probably evolve as I continue development.

*   `Piece` - Holds data about the key of the piece, the amount of swing, the minimum number of sections that must be played before the piece can end, the ongoing length of the piece, and the list of Voices. Its methods initialize all the Voices and their Lines and perform the piece itself.
*   `Mode` - Manages the key of the piece, the chord changes, and the note selection for the melodies. Currently the key can't change during a piece, but I'll probably add key changes in the future.
*   `Voice` - Holds data about the instrument, including which instrument number it is in the Csound orchestra, its register, line length, busyness, and mute status. It also contains the Line itself.
*   `Line` - This is the melody/rhythm line of a Voice. It is of a random length determined when the piece is initialized, but the length can change over the course of the piece. I'm actually not sure if the Line needs to be its own class or can just be a list stored directly in the Voice class.
*   `Note` - Holds data such as duration, frequency, and amplitude.
*   `RuleEngine` - Divides up the piece into sections of random lengths and manages the list of rules that apply to the sections.
*   `Rule` - Holds data about functions, arguments, preconditions, precedence, and other odds and ends. This is the most complex class of the generator, so I'll go over rules in more detail next.

#### Rule System

You can think of rules as transformations that are applied to one or more Voices at different times throughout the piece. The really fascinating thing about the rule system is that the rules overlap and interact in unpredictable ways. My goal is that these rules make the output dynamic, surprising, and musically interesting. Here's a closer look at the properties of the `Rule` class, which will give you a sense for how the rules work.

*   `function` - This is a pointer to the function that actually applies the transformation to the Voice.
*   `arguments` - Each function may require different input arguments, so these arguments are stored as a tuple in the `Rule` the object.
*   `preconditions` - Before a rule can be added to the rule list for a section, certain preconditions must be met. These preconditions are expressions that evaluate to True or False.
*   `prob` - Even if a rule meets the preconditions, it still only has a certain probability of being added to the list.
*   `level` - Rules can operate at two levels: the Voice level and the Note level.
*   `precedence` - Some rules must be applied before or after other rules.
*   `stop_point` - Rules are only applied for a certain number of notes and are then deactivated at the `stop_point`.

![Sketch of chord change function](images/images/music_generator2.jpg)

Sketch of the chord change function.

Here are the rules that currently exist.

*   **Default** - In the absence of any rule, the default behavior of the generator is to loop through the Voice lines without changing anything.
*   **Chord Change** - During every new section this rule might change the chord. When the chord is changed all the Voice lines are transposed to the new chord.
*   **Evolve** - One or more Voice lines evolve during a section, which means that each Note in the line either stays the same or is randomly regenerated with new values. The chance that each Note will evolve is determined by a probability argument that is passed to the Evolve function.
*   **Mimic** - One Voice line is chosen to be mimicked, and one or more Voice lines mimic it. The mimicking Voices may also be transposed up a third or fifth, which results in harmony lines.
*   **Mute/Unmute/UnmuteAll** - A Voice may be muted or unmuted for a section. All Voices may also be unmuted at once.
*   **Movement - More/Fewer Voices** - This is a meta-rule that either encourages more Voices to play by blocking the Mute rule or encourages fewer Voice to play by blocking the Unmute rule.
*   **More/Less Busy** - Every Voice has a busyness property, which determines how often it'll play notes. This rule can increase or decrease the busyness of the Voice.
*   **Movement - More/Less Busy** - This is a meta-rule that either encourages the Voices to grow more busy by blocking the Less Busy rule or encourages the Voices to grow less busy by blocking the More Busy rule.
*   **Grow/Shrink Line** - This will increase or decrease the length of a Voice line.
*   **Movement - Grow/Shrink Lines** - This is a meta-rule that either encourages the Voice lines to grow by blocking the Shrink Lines rule or encourages the Voice lines to shrink by blocking the Grow Lines rule.
*   **Retrieve Lines** - Every time there is a new section of the piece the Voice lines of the old section are stored. This rule retrieves a random past section and sets all the Voice lines to that section's.
*   **End** - This rule ends the piece, but it can only be applied when the piece has gone through the minimum number of sections and the current chord is the tonic chord.

#### Csound Orchestra

I'm using the [same Csound orchestra](index.php?option=com_content&view=article&id=16:project-grammar-music&catid=8:blog) from the Tracery version. The output of the Python generator is a long text string formatted as a Csound score, and this score is then performed by the Csound orchestra. The instruments include plucked string (for both melody and bass), pipe organ, Hammond B3 organ, Rhodes electric piano, marimba, and samples of several vintage drum machines. There's also some reverb sprinkled in.

### Output

It took about five weeks to build this music generator in Python. There's much more work to be done on it. Endless work in fact because new rules and more sophisticated melody, rhythm, and structure algorithms can always be added. But I did reach a good pausing point where I could generate and release some tracks to showcase the generator.

318, an album entirely generated by my music generator.

_318_ is an album of 23 tracks produced by the music generator. The tracks are named after the people in CS 318. I literally wrote a Python script that told the generator to produce 23 tracks, assign them titles, and shuffle them to create the track list. I then adjusted the drum levels for half of the tracks before releasing them on Bandcamp. I actually didn't listen to a single track all the way through before releasing the album because I wanted to be faithful to the process of letting the algorithms generate and sequence the album.

Overall, I'm super happy with the album. First of all, it showcases the variety in output of the generator across the 23 tracks. Second, within the tracks the music does flow and evolve in surprising and sometimes delightful ways. My personal favorite tracks are "Junyi", "Yasmeen", and "Kaeden".

It's a strange feeling to code a music generator, generate an album, and then listen to it. There are moments in the music that take my breath away. I'm proud of those moments, but at the same time I can't really take credit for them. I made them possible, but the generator itself produced those particular moments.

### Next Steps

*   **More rules** - I want to keep adding rules to make the music more and more complex and unpredictable. At the same time, I want to add rules that will increase the internal continuity of the pieces, which means repeating themes, sections, and chord progressions.
*   **Melodies and chords** - The current algorithms that determine the melodies and chords are fairly simple. I'd like to add algorithms that create more sophisticated melodies, chord voicings, and progressions.
*   **Templates** - I'd like to be able to seed the generator with rhythmic and structural templates that the generator can then base its decisions off of. Ultimately, this could help the generator produce music in recognizable styles.
*   **Refractoring** - I'm certain that I haven't coded this generator in the most reasonable way. I need to reconsider the data structures, the modules, and the data that gets passed between objects. I'll also explore whether the generator is better suited to a functional programming paradigm.
*   **Historical research** - This project is the epitome of reinventing the wheel. Hundreds or even thousands of music generators have already been programmed, and people were devising systems to generate music for hundreds of years before the advent of computers. I'll spend some time researching this history, which will give me a trove of ideas to incorporate into my music generator.