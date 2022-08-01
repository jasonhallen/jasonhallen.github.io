---
template: index
title: "Project: Mell Fark, Part One"
date: 20220716
publish: yes
keywords: Mark Fell, Gábor Lázár, Michael Gogins, csound, computer music, electronic music, synthesizer, rhythm, algorithmic music
description: 
---
## Project: Mell Fark, Part One

<figure><a href="/blog/project-mell-fark-part-one"><img src="../images/mell_fark_excerpt.png" alt="Mell Fark interface"/></a>
</figure>

And just [when I wrote](/blog/update-the-past-year), after a year’s absence from the blog, that I’m not doing computer music, I’ve suddenly been swept back into computer music in the past week. It’s Gábor Lázár’s fault. His new album _Boundary Object_ on Planet Mu immediately gripped me and told me to get back to work.

<a class="readmore" href="">Read more</a>

### Inspiration for the Project

The seed was planted when Kallie and I were in Nashville a few weeks ago. At the wonderful [Grimey’s Records](https://www.grimeys.com/) I stumbled on Lázár’s _Boundary Object_ on vinyl. I revere his 2015 album with Mark Fell called _The Neurobiology of Moral Decision Making_, so I decided to buy _Boundary Object_ knowing nothing about it.

<figure><iframe style="border: 0; width: 100%; height: 120px;" src="https://bandcamp.com/EmbeddedPlayer/album=3936339719/size=large/bgcol=ffffff/linkcol=333333/tracklist=false/artwork=small/transparent=true/" seamless="" width="300" height="150"><a href="https://gaborlazar.bandcamp.com/album/boundary-object">Boundary Object by Gábor Lázár</a></iframe></figure>

When I played it on my stereo at home a couple weeks later it knocked my socks off. It’s very much in the tradition of Mark Fell with the stuttering rhythms and relentless digital synths.

As I sat listening to _Boundary Object_ for the first time, within minutes I was inspired to return to [my own explorations of Fell’s rhythm algorithms](blog/study-mark-fell-rhythms) from a couple years ago. In that project I had fleshed out the rhythmic side of Fell’s music. Picking the project back up, I’ll need to turn my attention to the digital synthesis side.

### Where I Left Off

When I left off with computer music a year ago I had come to prefer using the command line to control live Csound performance. In particular, I liked the constraints of only using the keyboard for input and only using single-character commands which were immediately interpreted with the `sensekey` opcode.

<figure><img src="../images/buffer_command_line.png" alt="Screenshot of controlling Csound through the command line"/>
<figcaption>Controlling a Csound performance through the command line.</figcaption>
</figure>

This was largely a reaction against the [more complex GUI I built for the Looper instrument](blog/project-looper). Between using p5.js, Web Csound, and lots of mouse clicks and animation, that whole instrument was a bit heavy. I found it liberating to simplify my Csound environment and interactivity with the command line.

But the problem with this approach was that I had no GUI and therefore no good way to quickly monitor the state of a Csound performance. This wasn’t a big problem for a simple Csound instrument, but the more complicated the instrument the harder it was to fly blind without a GUI.

Here was my ideal solution:

*   Use native Csound rather than Web Csound.
*   Use only single-character entry on the keyboard for all performance control.
*   Use a lean GUI framework to display current performance state but not for interaction with a mouse.
*   Avoid Csound IDE’s like CsoundQt, Cabbage, or Blue.

### Tools I’m Using

Based on the ideal solution above, I had to decide what tools to use on this revived project. I knew I didn’t want to use Cabbage like I originally did two years ago. Cabbage is a wonderful IDE that I’d recommend to everyone, but I wanted more control over the design and styling of the GUI.

*   **Csound** - I’m using standard Csound 6.17 downloaded from the [Csound website](https://csound.com/download.html).
*   **GUI** - I’m sticking with JavaScript, but I’m trying to code the GUI in vanilla JavaScript rather than p5.js.
*   **Synthesizers** - For now I’ll probably use the [Dexed synthesizer](https://asb2m10.github.io/dexed/), which is a VST3 emulation of the Yamaha DX-7 FM synthesizer from the 1980s. Mark Fell uses a similar synthesizer on his album _Multistability_. I can use Michael Gogins’ (see below) [csound-vst3-opcodes](https://github.com/gogins/csound-vst3-opcodes) to run and control the Dexed synth within Csound. Down the road I might like to design the FM synthesizers myself in Csound, but that’s not a hill I want to die on right now.

But how does the JavaScript in my browser interact with a running performance of Csound on my computer, you might ask? That’s the million dollar question. I was thrilled to learn that Michael Gogins, the talented and tireless Csound developer, recently released his [`webserver` plugin opcodes](https://github.com/gogins/csound-webserver-opcodes). With these opcodes, Csound can run a local server and facilitate communication between a web page and native Csound. Amazing!

### Progress So Far

I’ve only been working on this project for a week now. So far I’ve been building the GUI in JavaScript and testing out the basic functionality of the `webserver` opcodes. I’ve also named the project “Mell Fark”.

Here’s a screenshot of what the original GUI in Cabbage looked like followed by the current state of the JavaScript GUI.

<figure><img src="../images/fell_rhythmic_pattern_generator.png" alt="Original version of the Fell rhythmic pattern generator written in Cabbage"/>
<figcaption>Original version of the Fell rhythmic pattern generator written in Cabbage.</figcaption>
</figure>

<figure><img src="../images/mell_fark.png" alt="Current version of the Mell Fark interface written in JavaScript"/>
<figcaption>Current version of the Mell Fark interface written in JavaScript.</figcaption>
</figure>

The first milestone of Mell Fark will be porting the original instrument I designed in Cabbage over to this JavaScript environment. That’s what I’m gearing up to now. Most of the underlying Csound code will stay the same, but I’ll have to convert all the code that communicates through Cabbage channels to code that communicates via the `webserver` opcodes.

Once the project has been ported into JavaScript I will incorporate the synthesizers. I also plan to add more commands and functionality that will give me plenty of creative options during real-time performance. I hope to report back with updates in the coming weeks.