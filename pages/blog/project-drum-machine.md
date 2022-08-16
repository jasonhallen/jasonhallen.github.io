---
template: blogPost
title: "Project: Drum Machine"
date: 20200316
publish: yes
image:
imageAlt:
imageCaption:
keywords: Csound, drum machine, Cabbage, tr-808, rhythm
description: Coding a drum machine from scratch in Csound.
---
I can’t remember why I decided to build a drum machine in Csound. After spending a few weeks on the [James Tenney instrument](/blog/study-james-tenney), which generates notes in a very randomized way, I must have been interested in generating notes within a metrical framework. In other words, I wanted to learn how to use the `metro` opcode.

But first, why would you build a drum machine when there are dozens of free, full-featured drum machines available online? Two reasons:

1.  You’ll learn a lot about Csound by building one yourself.
2.  You can custom code the drum machine to do anything you’d like.

[READ MORE]

### Sampling Drum Sounds

The first step was deciding how to generate the drum sounds. Rather than synthesize the sounds from scratch I decided to play pre-recorded drum samples with the [`loscil`](http://www.csounds.com/manual/html/loscil.html) opcode. I found a huge collection of free drum machine samples on [Reverb.com](https://reverb.com/software/samples-and-loops/reverb/3514-reverb-drum-machines-the-complete-collection) and a more extensive collection of free TR-808 samples from [Michael Fischer](http://smd-records.com/tr808/?page_id=14). I chose several of my favorite samples and loaded them into function tables with [GEN routine 01](http://www.csounds.com/manual/html/GEN01.html). The `loscil` opcode would then play the different drum parts depending on which function table it was told to read from.

### Controlling Rhythmic Patterns

The most challenging part of designing a drum machine is deciding how the user will interact with the machine to create rhythmic patterns. The trick is striking the right balance between controlability and simplicity. You want to provide enough ways for the user to control the drum machine and do exactly what they want to do musically, but you also want the drum machine to be simple enough for the user to use it without overwhelming the user with all the options.

<figure><img src="/images/drum_machine.gif" alt="Drum machine">
<figcaption>Screenshot of the drum machine interface built in Cabbage.</figcaption>
</figure>

I was most interested in how the user will control the rhythmic pattern of each drum part. I decided not to have the user click a box for every 1/16th note of every drum part because there would be a total of 192 boxes on the screen! I was afraid that would be overwhelming to the user and difficult to control in real time. Instead, I decided to have the user control the rhythmic patterns by entering and modifying strings of characters. My thinking was that the 24 string fields are visually simpler than 192 buttons, and it’s faster for the user to type characters than to move and click the mouse dozens of times.

Here's a quick overview of what the characters in the strings mean.

*   Each character represents an 1/8th note.
*   **1** = the first 1/16th note of the 1/8th note, low volume
*   **2** = the first 1/16th note of the 1/8th note, high volume
*   **3** = the second 1/16th note of the 1/8th note, low volume
*   **4** = the second 1/16th note of the 1/8th note, high volume
*   **5** = both the first and second 1/16th notes of the 1/8th note, low volume
*   **6** = both the first and second 1/16th notes of the 1/8th note, high volume
*   **e** = rest, no note sounds
*   **r** = randomly pick any of the above values

Under the hood, this drum machine reads the various widget values into arrays, cycles through the active rows (i.e. drum parts) and columns (i.e. rhythmic sequences), parses and interprets the strings, and triggers the drum samples.

### Controlling Widgets in Cabbage

I began coding the drum machine in [CsoundQt](https://csoundqt.github.io/), but managing the widgets (i.e. buttons, knobs, and sliders) became cumbersome as the drum machine became more complex. I needed a more efficient way to work with lots of widgets in an instrument. On the Csound listserv [edit: the listserv has mostly moved over to the [Csound forum](https://forum.csound.com/)] I saw someone recommend another Csound development environment called [Cabbage](https://cabbageaudio.com/), so I decided to give it a shot. There was a learning curve going from CsoundQt to Cabbage, but I could see the benefits.

*   Cabbage offers a brilliant way to create and manipulate widgets through the Csound code itself. This cut down on development time a lot.
*   You can easily export your instruments as VST/AU plugins for use in your preferred digital audio workstation.
*   Cabbage has fantastic [documentation](https://cabbageaudio.com/docs/introduction/), and the lead developer, Rory Walsh, responds quickly and helpfully to all requests on the [Cabbage Forum](https://forum.cabbageaudio.com/).

<figure><img src="/images/drum_machine_cabbage.jpg" alt="Drum machine in Cabbage">
<figcaption>Screenshot of Cabbage, code, and drum machine.</figcaption>
</figure>

### Special Features

*   **Randomization** - This comes in two flavors. 1) You can hit the "Randomize" button to generate random rhythmic patterns for all the drum parts. 2) The "r" character in the strings randomly picks a value for the 1/8th notes. This second option is the secret sauce that brings the rhythms of this drum machine to life.
*   **Probability** - This determines how likely any given note will be to sound, and it ranges from 0% to 100% chance of sounding. When set to 50%, only about half of the notes will sound as determined by random chance. As you turn the probability down the music gets more sparse and the rhythms become less identifiable.
*   **Swing** - Any good drum machine should have a swing feature that delays every other 1/8th or 1/16th note.
*   **Deviation** - This determines how much the exact timing of the notes can deviate from the tempo. Turning up the deviation increases the looseness of the rhythms. If you turn it up too high the rhythms begin to sound chaotic.

<figure><audio controls="controls"> Your browser does not support the audio element.<source src="/audio/hallen_drum_machine_2019_9_6.mp3" type="audio/mpeg" /></audio>
<figcaption>"hallen_drum_machine_2019_9_6.mp3" -- A live performance of the drum machine.</figcaption>
</figure>

Here's a recording of a live performance I did with this drum machine. It's pretty simple, but it's made from scratch! That's as far as I got on the drum machine because another project grabbed my attention at the time. I'm sure I'll return to this though. When I do, I'd like to expand the number of characters the user can use to control the rhythmic patterns. I'd also like to spend more time "tuning the randomness" in the drum machine because truly random rhythmic patterns are often not satisfying musically. That's for another day.