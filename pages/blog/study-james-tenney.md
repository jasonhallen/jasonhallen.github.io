---
template: index
title: "Study: James Tenney"
date: 20200308
publish: yes
image: "/images/tenney_at_computer.png"
imageAlt: "James Tenney in computer lab"
imageCaption: "James Tenney in a computer lab at the University of Illinois in 1961."
keywords: James Tenney, computer music, Csound, Bell Labs, music-n, CsoundQt, Python, interface, algorithmic music, stochastic
description: "I like to study the writings of computer music practitioners and try to implement their ideas in Csound.  This expands my Csound skillset and exposes me to different compositional strategies.  For example, I studied the writings of composer James Tenney about the time he spent composing computer music at Bell Labs in the 1960s."
---
I like to study the writings of computer music practitioners and try to implement their ideas in Csound. This expands my Csound skillset and exposes me to different compositional strategies. For example, I spent a few weeks this fall closely reading composer James Tenney’s essay “[Computer Music Experiences, 1961-1964](http://www.plainsound.org/pdfs/ComputerMusic.pdf),” published in 1969. This essay documents Tenney’s experiences working with the [MUSIC-N computer synthesis program](https://en.wikipedia.org/wiki/MUSIC-N) at Bell Labs from September 1961 to March 1964.

[READ MORE]

<figure><iframe style="border: 0; width: 100%; height: 120px;" src="https://bandcamp.com/EmbeddedPlayer/album=2636624934/size=large/bgcol=ffffff/linkcol=333333/tracklist=false/artwork=none/track=2321235511/transparent=true/" width="100%" height="120px" frameborder="0" seamless="seamless"></iframe></figure>

“Dialogue” is one of the pieces Tenney produced at Bell Labs. You can hear how he explores the use of noise and the randomization of musical parameters like note duration, frequency, and amplitude envelope shape. In his essay he explains the philosophical and aesthetic foundations of his compositional practice at the time. From a technical standpoint, Tenney only illustrates his ideas with prose, schematics, and graphs, so it was up to me to figure out how to translate those into Csound code.

### Using Python to Generate the Score

At the start of this project I was more familiar with Python than Csound, so I wrote a Python program to generate the entire Csound score. A simple Csound instrument (a sine wave oscillator with an amplitude envelope) would then perform the score. In order to write the program that generated the score I had to figure out how to 1) randomize several musical parameters and 2) control and direct this randomness in interesting ways.

<figure><audio controls="controls"> Your browser does not support the audio element.<source src="/audio/hallen_tenney_2019_8_13.mp3" type="audio/mpeg" /></audio>
<figcaption>"hallen_tenney_2019_8_13.mp3" -- Initial Tenney instrument with a score generated in Python.</figcaption>
</figure>

Above is a recording I made of my initial Tenney instrument. You’ll notice that I didn’t explore noise or complex waveforms like he did; it’s all sine waves. Here are a few things to listen for:

*   The note frequencies randomly deviate around a set of defined frequencies, and the amount of deviation around these base frequencies can be increased and decreased. At the beginning of the recording the deviation is large and the notes sound atonal. By 0:27 the deviation decreases to zero, and you perceive harmonic relationships between the frequencies. I also threw in a couple simple chord changes.
*   The note durations randomly deviate around a defined duration just like the frequencies do. The recording begins with short durations and ends with longer durations.
*   The density of note events can be increased and decreased. The recording begins with a high density and ends with a lower density.

### Creating an Interface with CsoundQt

The major drawback to generating the score in Python was that I couldn’t interact with the music in real time. The entire score was generated at the outset and then performed by Csound, and each time I ran it the score was different because of the randomization. All I could do was sit back and listen to the results, which was thrilling in its own way. I suppose this was the more historically accurate way to approach this project given that Tenney also had to generate his pieces ahead of time and then listen to the results.

In order to interact with the music in real time I needed to create a virtual interface with buttons, sliders, and checkboxes. To do this I used [CsoundQt](https://csoundqt.github.io/), a free Csound development environment created by Tarmo Johannes. One big advantage of CsoundQt is that it allows you to create interfaces very easily. However, before I could create an interface I needed to rewrite my Python score generation program in Csound. This was very challenging unto itself, but it was a necessary deep dive into Csound that made me much more comfortable with the language.

My Tenney instrument quickly took on a life of its own once I began building an interface. It began to feel less like a program and more like an instrument I could learn to play, and the more I played the instrument the more new ideas I would think of for enhancing it. Below is a screenshot of the interface I created.

<figure><img src="/images/tenney_interface.png" alt="Screenshot of the interface built in CsoundQt.">
<figcaption>Screenshot of the interface built in CsoundQt.</figcaption>
</figure>

Below is a recording of a live performance I did with the Tenney instrument. Perfoming this instrument consists of manipulating the base frequencies and durations and then sculpting the degree of random deviation around them. I was pleased with the harmonic, rhythmic, and dynamic variation this instrument was able to achieve.

<figure><audio controls="controls"> Your browser does not support the audio element.<source src="/audio/hallen_tenney_2019_08_27.mp3" type="audio/mpeg" /></audio>
<figcaption>"hallen_tenney_2019_08_27.mp3" -- A live performance of the Tenney instrument with real-time interaction.</figcaption>
</figure>

This was as far as I went with the Tenney project, but it served its purpose well. I learned a tremendous amount about Csound and felt empowered to move on to my next project -- building a drum machine in Csound. More on that in my next post.