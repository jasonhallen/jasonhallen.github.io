---
template: index
title: "Project: Musical Time in Python"
date: 20210117
image: "/images/python_csound5.png"
imageAlt: "Abstract diagram of timing problem"
imageCaption:
keywords: Python, ctcsound, Jupyter Notebook, asyncio, open sound control, osc, multitimer, time, api
description: For the past couple weeks I've been wrestling with how to handle timing in Python. This was the main challenge I'd have to solve before converting my Python music generator into a real-time system. After experimenting with several possible solutions I finally found a promising one.
---
For the past couple weeks I've been wrestling with how to handle timing in Python. This was the main challenge I'd have to solve before converting my [Python music generator](/blog/project-music-generator) into a real-time system. After experimenting with several possible solutions I finally found a promising one.

[READ MORE]

### The Goal

I want to interact with my music generator in real time to guide the generation of the music. Currently, that's not how my music generator works. Built in Python, it uses algorithms to generate a Csound score which is then passed to Csound and performed. In other words, I run the generator, it quickly crunches some numbers, and in less than a second I am listening to a new piece of music. This is wonderful, but all I can do is run the program and sit back and listen. It's time to make this more interactive.

This shouldn't be too hard to do. The generator is already based on the idea of constructing a piece of music one note at a time according to a metronomic impulse. Here's pseudocode that shows the basic logic of the generator. You can see that the `count` variable acts like a metronomic impulse.

```
define next_note(count):  
  if end_condition == True:  
    end_piece()  
  else:
    generate_note(start_time=count)
    next_note(count+1)
```

### The Plan

1.  Taking my lead from Joachim Heintz's [tutorial video](https://vimeo.com/480443886) and [cookbook](https://github.com/csound/ctcsound/blob/master/cookbook/11-GUI-with-PySimpleGUI.ipynb), I'll use [Jupyter Notebook](https://jupyter.org/) (a.k.a. interactive Python), ICsound (part of [Csoundmagics](https://github.com/csound/ctcsound/tree/master/cookbook/csoundmagics)), and [PySimpleGUI](https://pysimplegui.readthedocs.io/en/latest/) to develop a GUI to interact with the music generator.
2.  A metronome will keep time and tell Python when to trigger the next set of notes.
3.  Python will then send score events in real time to a running instance of Csound via the Csound API.

### The Problem

Hidden in the plan above is a tough problem. Step 2 calls for a metronome, and Python doesn't come with a metronome out of the box. Furthermore, the metronome in this project must be:

*   **Accurate** - The metronome needs to be very accurate, especially at fast speeds. When a metronome isn't accurate, it will throw off the stability of the rhythms. The listener will hear this in the music.
*   **Controllable** - I have to be able to change the speed of the metronome on the fly.
*   **Simple** - All code should strive to be as simple as possible. This helps me and any other readers of the code have a good conceptual grasp of how the code works at all times. An overly complicated solution for something as simple as a metronome should be avoided.
*   **Performant** - The metronome will be just one process taking place alongside many others in this program. It should perform efficiently and co-exist smoothly with the other processes.

### Baseline Metronome

Before we hear what the possible solutions sound like, here's a recording of the baseline metronome in Csound. It's based on the `metro` opcode triggering note events.

<figure><audio controls="controls"> Your browser does not support the audio element.<source src="/audio/hallen_pure_csound_metronome.mp3" type="audio/mpeg" /></audio>
<figcaption>Pure Csound metronome.</figcaption>
</figure>

It sounds rock solid, even at very fast tempos. So why can't we just use Csound's `metro` opcode? The trick is that Python needs the metronome in my music generator, not Csound. A couple of the solutions below use Csound's `metro` opcode to send impulses to Python, but you'll see that these solutions don't work very well.

### Solution 1: Multitimer

The first thing I tested out was the [multitimer package](https://pypi.org/project/multitimer/). This is based on Python's built-in `threading.Timer` class, which is itself based on `.sleep()` calls where Python pauses execution for a specified interval of time. This basically functions as a metronome, and each metronome impulse tells Python to trigger a note event in Csound.

<figure><img src="/images/python_csound1.png" alt="Diagram of multitimer solution"/>
<figcaption>Diagram of the multitimer solution.</figcaption>
</figure>

This is certainly a simple solution. But how does it sound?

<figure><audio controls="controls"> Your browser does not support the audio element.<source src="/audio/hallen_multitimer_slow_metronome.mp3" type="audio/mpeg" /></audio>
<figcaption>Slow multitimer metronome.</figcaption>
</figure>

<figure><audio controls="controls"> Your browser does not support the audio element.<source src="/audio/hallen_multitimer_fast_metronome.mp3" type="audio/mpeg" /></audio>
<figcaption>Fast multitimer metronome.</figcaption>
</figure>

There are two problems with this.

1.  There's no simple way to change the multitimer's tempo once you've started it. I need a metronome that can be sped up and slowed down in real time.
2.  The timing gets inconsistent at fast tempos. You can hear it in the second recording.

### Solution 2: Channels and GUI Event Loop

Trying to use the multitimer gave me the sense that Python's `.sleep()` function wouldn't be reliable enough for a metronome. Instead of letting Python keep track of time, I thought I should use Csound's time clock and somehow pass it into Python.

My first attempt at this was to run an instrument in Csound that only maintains a metronome with the `metro` opcode. I'd then use Csound's `chnset` opcode to send the metronome impulses to a dedicated channel. Python could then use ICsound's `.channel()` method to receive the message on the channel.

Here's the catch. Since this is real time, I have to find a way to repeatedly call `.channel()` in Python. One easy solution is to use PySimpleGUI's event loop. This event loop cycles through a block of code over and over, checking for and responding to any new events in the GUI. I can add the `.channel()` method in the event loop, and that way it'll catch any `metro` impulses.

<figure><img src="/images/python_csound2.png" alt="Diagram of channel solution"/>
<figcaption>Diagram of the channel solution.</figcaption>
</figure>

Well, not quite. There's a synchronization problem. The `metro` opcode works by sending a value of 1 during a single k-frame when the metronome is striking, and then it sends a value of 0 for the rest of the k-frames until the next impulse. If we're running 44,100 samples per second with a k-rate of 32 samples per frame, that means each k-frame lasts only 0.0007 seconds. If the GUI event loop doesn't check the `.channel()` in that 0.0007 second window of time it won't catch the impulse and won't trigger a note.

<figure><audio controls="controls"> Your browser does not support the audio element.<source src="/audio/hallen_channel_metronome.mp3" type="audio/mpeg" /></audio>
<figcaption>Channel metronome.</figcaption>
</figure>

While this solution does allow me to control the tempo of the `metro` opcode, there are still some problems.

1.  Extra code is required to get around the synchronization issue, and it's clunky.
2.  The metronome is still sloppy at fast speeds.

### Solution 3: Open Sound Control

[Open Sound Control](https://en.wikipedia.org/wiki/Open_Sound_Control) (OSC) is a data exchange protocol that is faster and more flexible than MIDI. Lots of musical applications use OSC to manage message communications between programs and devices. I decided to see if I could use OSC to send `metro` impulses from Csound to Python.

In OSC terminology, an OSC client sends messages, and an OSC server receives and responds to messages. In this case, Csound is the client, and Python is the server. Using Csound as a client is trivially easy because Csound has the [`OSCsend`](http://www.csounds.com/manual/html/OSCsend.html) opcode. However, it turns out that setting up an OSC server in Python can be quite complicated.

I used the [python-osc package](https://python-osc.readthedocs.io/en/latest/), which allows you to configure your OSC server in many ways. In my case, the OSC server has to be "non-blocking", meaning that it allows the rest of my program to run while it listens for incoming messages. This sent me into the confusing world of [asyncio](https://docs.python.org/3/library/asyncio.html). Further complicating things, the OSC server needed to play well with my GUI event loop, and both of these were being run from Jupyter Notebook which itself is running within an asyncio event loop.

<figure><img src="/images/python_csound3.png" alt="Diagram of the Open Sound Control solution"/>
<figcaption>Diagram of the Open Sound Control solution.</figcaption>
</figure>

In the end, I got everything to work together. Csound was able to run a metronome and send impulses via OSC, and Python was able to receive them and trigger a metronome tone. The diagram above shows how it all works.

<figure><audio controls="controls"> Your browser does not support the audio element.<source src="/audio/hallen_osc_metronome.mp3" type="audio/mpeg" /></audio>
<figcaption>Open Sound Control metronome.</figcaption>
</figure>

Alas, this solution had three major problems.

1.  It's very complicated.
2.  Juggling multiple event loops meant I had to slow down the GUI refresh rate, which gave it a sluggish feel.
3.  The metronome was still sloppy! After all that work incorporating OSC, the improvements in accuracy were not significant enough.

### Solution 4: Csound API's scoreTime()

Just when I thought I had run out of ideas, a very simple one popped into my head. Instead of having Csound send a `metro` impulse to Python, what if Python could listen to Csound's time clock directly and figure out when the correct time interval had passed?

After digging into the [ctcsound documentation](https://csound.com/docs/ctcsound/ctcsound-API.html#module-ctcsound) I found a method called `.scoreTime()`. This simply gets the current running time of the Csound instance down to many decimal places. I added the `.scoreTime()` call to the GUI event loop and built a simple metronome like this:

```
time_clock = 0
while True:   # GUI event loop
  time_interval = 60/values['TEMPO']
  test_interval = cs.scoreTime() - time_clock
  if test_interval >= time_interval:
    cs.sendScore("i 1 0 0.1")   # trigger note in Csound
    time_clock = cs.scoreTime()
```

You might wonder, "What's that `values['TEMPO']` line at the beginning?" That's reading the value from a slider in PySimpleGUI, and it's what allows me to control the tempo in real time.

<figure><img src="/images/python_csound4.png" alt="Diagram of the scoreTime() solution"/>
<figcaption>Diagram of the scoreTime() solution.</figcaption>
</figure>

Here's what it sounds like.

<figure><audio controls="controls"> Your browser does not support the audio element.<source src="/audio/hallen_scoretime_metronome.mp3" type="audio/mpeg" /></audio>
<figcaption>scoreTime() metronome.</figcaption>
</figure>

It's the best solution so far! To my ears, I barely perceive any sloppiness. It also has the advantage of being a very simple solution, which means I'll be less likely to get confused by the code in the future.

### Solution 5: Python's time.time()

Then I wondered whether Python's built in `time.time()` method would be just as good as Csound's `.scoreTime()` method. Why continuously call into Csound for its time when Python has access to the operating system's time clock? So I used the same code as Solution 4 but swapped in `time.time()` for `.scoreTime()`. Here's what it sounds like.

<figure><audio controls="controls"> Your browser does not support the audio element.<source src="/audio/hallen_time_metronome.mp3" type="audio/mpeg" /></audio>
<figcaption>time.time() metronome.</figcaption>
</figure>

It's surprisingly sloppy. I asked [Michael Gogins](https://michaelgogins.tumblr.com/), the original author of the Csound API, why Csound's time clock would be superior to Python's time clock. Here's what he said:

> "Csound is running in its own separate thread of execution at a high priority. This is scheduled and managed by the operating system. Python is also running in its own separate thread of execution, but it can't create new threads in Python. Everything has to happen in that one thread including managing the timers and managing memory garbage collection. So Python itself has a bumpier ride."

There you have it.

### Conclusion

I'll stick with Solution 4 for now. It at least allows me to move on to the next phase of converting the music generator into a real-time system. However, I'm curious how accurate the timer will be once it's competing for processing time with many GUI elements and the algorithms running the music generator itself.

Another thing I haven't really explored is whether the overhead of running all of this in Jupyter Notebook is causing some of the poor timing performance in Solutions 1, 2, 3 and 5. For the next phase of development I'll probably move out of Jupyter Notebook and into plain Python.

Are there other solutions I'm missing? I would love to hear about them. Please add them in the comments below. Thanks for reading!