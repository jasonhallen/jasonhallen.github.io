---
template: index
title: "Project: Looper"
date: 20210425
publish: yes
image: "/images/looper.png"
imageAlt: "Detail of Looper interface"
imageCaption:
keywords: p5.js, JavaScript, WebCsound, Carl Stone, loops, YouTube, GUIs
description: My focus shifted entirely when I learned about an animation library called p5.js.  This led me to develop a new web-based program that loops audio files with the help of WebCsound. I was able to perform a live set with my program on YouTube.  Carl Stone was my major inspiration.
---
It's been a while! A lot has happened since my last post three months ago. After [finding an accurate time source in Python](/blog/project-musical-time-in-python) I turned my attention to building a graphical user interface (GUI) for my Python music generator. That was moving along nicely, but then I discovered [p5.js](https://p5js.org/) and my focus shifted entirely. This led me to develop a new web-based program that loops audio files, and I was able to perform a live set with the program on YouTube. Read on for more details!

[READ MORE]

### Working with PySimpleGUI

Before talking about the looper, here's a quick recap of how far I got on my Python GUI. I followed [Joachim Heintz's lead](https://github.com/csound/ctcsound/blob/master/cookbook/11-GUI-with-PySimpleGUI.ipynb) and used the [PySimpleGUI framework](https://pysimplegui.readthedocs.io/en/latest/) to build it. The advantage of using PySimpleGUI is that, as the name suggests, it makes building GUIs simpler by taking care of a lot of the messy code of other popular frameworks (e.g. tkinter, PyQT, Remi) behind the scenes.

Here's as far as I got.

<figure><img src="/images/python_generator.png" alt="GUI of Python generator made with PySimpleGUI"/>
<figcaption>GUI of Python generator made with PySimpleGUI.</figcaption>
</figure>

The code for the GUI is very simple thanks to PySimpleGUI. The trickiest thing I had to iron out was using a CsoundPerformanceThread to control playback of the score. I eventually realized I had to include `-+rtaudio=CoreAudio` in the Csound Options section or else the audio would stutter when I paused playback.

All was moving along fine, but I was frustrated by a couple things.

1.  **Aesthetics** - GUIs built with PySimpleGUI look pretty plain and dated out of the box. I felt like I was designing an interface for the Compliance Department at Global Megacorp.
    
2.  **Adding new elements** - PySimpleGUI doesn't have a convenient way to dynamically add new elements into the GUI window once the window has been launched.
    

### Along Comes p5.js

Then out of the blue came [this post](https://forum.csound.com/t/interactive-flowcharts/116) in the Csound forum by Rory Walsh (the guy behind the amazing [Cabbage](https://cabbageaudio.com/) front end application for Csound). In the post Rory shared a great looking, web-based, interactive GUI that controlled a Csound instrument. Hot damn!

A little investigation and communication with Rory revealed that he built this with [Web Csound](https://csound.com/docs/web/) and [p5.js](https://p5js.org/). Web Csound is an official version of Csound made for use in web browsers. For example, the [Csound Web-IDE](https://ide.csound.com/) is built with Web Csound.

p5.js is a JavaScript library that allows you to create animations, dynamically add HTML elements, and respond to mouse and keyboard events easily in the browser. And as Rory showed, you could use it to make a GUI to control Csound in real time. p5.js also addressed my two concerns about PySimpleGUI: 1) aesthetically the interfaces look better and 2) you can add new GUI elements on the fly thanks to the magic of JavaScript and the DOM.

### New Project Idea

At the same time that I learned about p5.js, a new project was brewing in my mind. A few months earlier I had become fascinated by Carl Stone's piece "Shing Kee" from 1986.

<figure><iframe style="border: 0;" src="https://bandcamp.com/EmbeddedPlayer/album=1021630657/size=large/bgcol=ffffff/linkcol=333333/tracklist=false/artwork=small/track=497536404/transparent=true/" width="100%" height="120px" frameborder="0"></iframe></figure>

Despite the simplicity of the composition, there were a lot of interesting technical things going on in his sampling process. I decided to pause development of the PySimpleGUI project and instead build a Stone-inspired sample looper with p5.js and Web Csound.

### Working with p5.js and Web Csound

Getting the hang of p5.js and Web Csound was especially challenging for me because, while I had worked a fair amount with HTML and CSS, I had only a little experience with JavaScript. Thankfully, Rory Walsh and Steven Yi answered many of my questions on the Csound forum. This project wouldn't have gotten this far with their help.

#### JavaScript and p5.js

One of the big learning curves for me was working with async functions and fetching files with JavaScript. I did come to enough of an understanding of those issues to get my project working. p5.js itself has its own set of objects and functions built on top of JavaScript, and those took some getting used to. Fortunately, [p5.js is well documented](https://p5js.org/reference/) and has a [pretty active user community online](https://discourse.processing.org/c/p5js/10).

#### Web Csound, WASM, and Web Audio

Web Csound is compiled down to [WebAssembly (WASM)](https://webassembly.org/) in your browser and works within the [Web Audio framework](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API). Both of these systems have learning curves. One particular pain is working with WASM's file system. For example, loading WAV files into an instance of Web Csound is a two part process where you first fetch the file from the server into the browser with JavaScript and then load the file into the WASM file system with the Web Csound API.

#### Performance Issues

I've run into performance issues with my looper program. You can hear these issues as clicks and dropouts in the audio. The looper also consumes a lot of CPU, causes my laptop's fans to start spinning, and drains the battery. I haven't gotten to the bottom of the performance issues yet. There are two likely culprits.

1.  Some developers say that p5.js is very slow and gets sluggish under heavy loads. There are other JavaScript frameworks for drawing and animation that are known to perform better (e.g. Pixi.js, Paper.js, Create.js).
2.  Web Csound is compiled to WebAssembly and run from within your browser, so it doesn't run as fast as the standard version of Csound installed on your computer.

### Current State of the Looper

I won't go into all the details of developing the looper. The main thing to know is that it revolves around the `mincer` opcode, which is a phase vocoder that reads the sample files which are loaded into tables. The instrument also relies on the Web Csound API to send data between the p5.js interface and Csound.

You can see the current state of the looper as of this writing in my performance on YouTube below. And you can play around with the looper yourself at [jasonhallen.com/play/looper](/play/looper/).

<figure style="text-align: center;" data-wf-figure="1"><iframe title="YouTube video player" src="https://www.youtube.com/embed/5-UH1UPIE58" width="560" height="315" frameborder="0" allowfullscreen="allowfullscreen"></iframe></figure>

Here are some of the key features of the looper.

*   **Speed** - The `mincer` opcode allows you to change the playback speed of a sample. You can also make the speed negative, which reverses playback.
*   **Pitch & keyboard** - The `mincer` opcode also lets you change the pitch of the sample independently of its speed. I included a keyboard on each track to let you play melodies with the samples.
*   **Time lock** - This feature locks the duration of a sample segment regardless of the size of the segment. Under the hood the time lock just changes the playback speed.
*   **Shift** - This automatically moves the left and/or right boundaries of the sample segment after each playback loop. Stone's "Shing Kee" makes heavy use of the shift and time lock features.
*   **Crossfade** - This will crossfade the end of a loop with the start of the loop for a more seemless looping sound.
*   **Delay & reverb** - These are just classic effects.
*   **Keyboard bindings** - I programmed keyboard bindings to trigger the start and stop of tracks. You just need to hold down the \` button and the track number.

### Next Steps

I spent a lot of time coding this instrument up until my performance on March 4. Immediately after the performance I hit a wall. My body just wouldn't let me sit in front of a computer and code anymore. Instead, I switched gears and spent six weeks building a backyard vegetable garden for the upcoming growing season. I cut lots of lumber and got tons of dirt under my fingernails. It's healthy to step away from computer screens for a while.

In the past couple weeks I've picked up this project again. My current goal is to develop circular recording buffers so that I can record and loop samples on the fly just like Stone does on "[Shibucho](https://unseenworlds.bandcamp.com/track/shibucho-1984)" from 1984. I should be able to post on this soon.

Another fun project I've begun working on is bringing together a group of people to perform the algorithmic music of my album _[318](https://jasonhallen.bandcamp.com/album/318)_ with live instruments. Could be an interesting sound!