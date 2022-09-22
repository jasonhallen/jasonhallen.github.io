---
template: blogPost
title: "Update: Csound, Node.js, and Electron"
date: 20220905
publish: yes
image: "/images/cs_node_electron_header.jpg"
imageAlt: "Csound logo plus Node logo plus Electron logo equals an unhappy face."
imageCaption:
keywords: Csound, Node.js, Electron, GUI, framework, open sound control, OSC, JavaScript, HTML, CSS
description: In my search for a framework to build Csound GUIs with I tried Node.js and Electron, but I was disappointed with the results.
---
I've spent the last few weeks trying to build a Csound GUI with Node.js and Electron.  My immediate goal has been to revive my [Mell Fark project](https://www.jasonhallen.com/blog/project-mell-fark-part-one), but my longer-term goal is to find a framework to build other Csound GUIs with going forward.  Alas, I suspect Node.js and Electron won't be that framework.  As much as I enjoy working with HTML, CSS, and JavScript for rendering GUIs, I've grown frustrated with the Node.js environment.

[READ MORE]

### One Big Caveat

Before going any further, I want to mention one big caveat.  **It's very likely that Node.js/Electron are great environments for building Csound GUIs, but as a rudimentary programmer I don't have the knowledge and skills to make it work for my needs**.  Please don't take this blog post to mean that it's not worth pursuing Node.js/Electron.  People with more command of the Node.js environment can probably do amazing things with it.

### The Search for a GUI Framework

I'm searching for a framework to build GUIs for **real-time interactive Csound performance**.  My blog has actually documented my journey with Csound GUIs up until now.

* **[James Tenney project](https://www.jasonhallen.com/blog/study-james-tenney)** - This began with Python scripts generating algorithmic pieces and ended with building my first GUI in CsoundQt.
<figure><img src="/images/tenney_interface.png" alt=""><figcaption>James Tenney GUI.</figcaption></figure>
* **[Drum machine project](https://www.jasonhallen.com/blog/project-drum-machine) and [Mark Fell project](https://www.jasonhallen.com/blog/study-mark-fell-rhythms)** - These saw me building GUIs in Cabbage for the first time.
<figure><img src="/images/drum_machine.gif" alt=""><figcaption>Drum machine GUI.</figcaption></figure>
<figure><img src="/images/fell_rhythmic_pattern_generator.png" alt=""><figcaption>Mark Fell GUI.</figcaption></figure>
* **[Looper project](https://www.jasonhallen.com/blog/project-looper)** - I briefly explored Python and PySimpleGUI to build a GUI and then dove into Web Csound and p5.js instead.
<figure><img src="/images/python_generator.png" alt=""><figcaption>Music generator GUI.</figcaption></figure>
<figure><img src="/images/looper_gui.png" alt=""><figcaption>Looper GUI.</figcaption></figure>

This brings us to the present where I've returned to the Mark Fell project, now renamed the [Mell Fark project](http://localhost:8000/blog/project-mell-fark-part-one).  This time I'd like to focus on building a performant GUI that avoids some of the pain points of Web Csound.

### Framework Requirements

Here's what I'm looking for in a GUI framework:

* **Not a Csound IDE**
    * Csound IDEs like [CsoundQt](https://csoundqt.github.io/), [Cabbage](https://cabbageaudio.com/), and [Blue](https://blue.kunstmusik.com/) are wonderful.  One of their selling points is that they provide convenient ways to build GUIs. However, the GUI widgets and methods aren't fully customizable, and the IDEs are best suited to writing programs entirely within Csound rather than using scripting languages to control Csound.  For complete flexibility I'd like to get outside of the IDEs.
* **Not a web app**
    * I had performance issues with Web Csound and p5.js, and coding for the WebAssembly environment was annoying.  I'd rather have access to the local file system and work directly with Csound running on my computer rather than run it through a browser.
* **Not C++**
    * I might be delaying the inevitable because C++ is such a common language for GUI and audio programming, but I don't want to go through its steep learning curve right now.  If I can get by with JavaScript or Python I'll be happy. 
* **Performant for real-time applications**
    * The framework will need to handle lots of incoming and outgoing messages, animate fast-changing data, respond to a variety of user inputs, and manage the central data model and logic of the performance.  It should offer ways to run code concurrently to get the best performance without freezing the GUI.

### Node.js & Electron

Given my framework requirements and that I had already begun porting my Cabbage GUI into JavaScript I thought [Node.js](https://nodejs.org/en/) would be good to try out.  Furthermore, [Electron](https://www.electronjs.org/) could turn my JavaScript GUI into a desktop app pretty easily.

<figure><img src="/images/node_electron_logos.jpg" alt=""><figcaption>Node.js and Electron turn web apps into desktop apps.</figcaption></figure>

The big draw with Electron is that it allows web developers to turn their web apps into desktop apps without having to rewrite much of the code base.  It does this by running two separate processes and providing a bridge between the them.

* **Main process** - The backend logic of the program is handled in the main process.  This process is run in Node.js and has direct access to your local file system.
* **Renderer process** - This is a Chromium-based browser environment that runs your GUI with the standard HTML/CSS/JavaScript tools.  For security reasons the renderer process is isolated from the main process, so you have to carefully pass data between the processes.
* **contextBridge** - Also called the preload stage, the contextBridge is where you expose certain functionality from the main process to the renderer process.  This is also where you handle "inter-process communication" (IPC, i.e. pass data) between the main and renderer processes.

In order to control Csound within Node.js I used Nate Whetsell's [csound-api](https://www.npmjs.com/package/csound-api) package, which is a C++ binding for the Csound API that works within Node.js.  I'm able to use the csound-api functions in the main process to run and control a Csound performance in a separate thread from both the main and renderer processes.

### Frustrations with Electron

At first I was impressed with Electron.  I was able to install it and get the Mell Fark GUI running easily.  I like how Node.js manages dependencies with `npm` and `package.json`, and I like the developer tools available within the Electron GUI.

However, I quickly ran into frustrations with Electron.  Here are a couple of them.

#### Bundled with Node.js

When you run an Electron app, it's not using the version of Node.js you have installed on your computer.  It's using its own bundled version.  This can cause problems when the dependencies you've installed for your local Node.js don't work with Electron's Node.js.

For example, the latest version of Electron came with a version of Node.js which used a version of V8 that conflicted with csound-api, so I got an error message when running the app.

```
Error: The module '/Users/hallenj/Documents/csound/node/node_modules/csound-api/build/Release/csound-api.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION 108. This version of Node.js requires
NODE_MODULE_VERSION 107. Please try re-compiling or re-installing
the module
```

I wasn't able to figure this out, so [I asked Nate Whetsell for help](https://github.com/nwhetsell/csound-api/issues/21).  The solution was installing an earlier version of Electron and rebuilding his csound-api package against its version of Node.js.

#### Inter-process Communication

Ideally, I'd want to run the csound-api within the browser GUI just like Web Csound runs in the browser.  However, Electron prevents you from running Node.js packages within the renderer (i.e. browser) process.  You have to run them in the main process and then pass data between the processes with inter-process communication.

Okay, technically, you *can* run Node.js packages within the renderer process by setting `webPreferences: {contextIsolation: false, nodeIntegration: true}`, but this is highly discouraged for security reasons.  I tried to do it anyway, and it didn't even work because the csound-api is a "non-context-aware native module" which Electron won't run in the renderer process.

It took a lot of trial and error to get `ipcMain`, `ipcRenderer`, and `webContents.send()` to pass data to each other.  It felt like jumping through so many hoops.  Even worse, I was surprised at how bad the data throughput was when traveling from Csound to the main process to the renderer process.  As you'll see below, this actually wasn't the fault of Node.js or Electron.

#### Complications with Apple's M1 Chips

This isn't an Electron issue, but not all software has caught up with Apple's switch to M1/ARM chips.  This caused incompatibility problems when I tried [NW.js](https://nwjs.io/).  Since I had been frustrated with IPC in Electron I thought NW.js, which allows you to run Node.js packages within the renderer process, would be a better option.  However, NW.js and csound-api did not work together because NW.js was written for the x86 architecture and csound-api was written for the ARM architecture.

### Getting High Resolution Data from Csound

The one issue I couldn't find a good solution for was getting high resolution data from Csound to display in the GUI.  Specifically, I wanted to animate a volume meter to keep an eye on volume levels during a performance, and the higher resolution the data the smoother the animation.  Here are the approaches I tried.

#### Using a Control Channel

<figure><img src="/images/control_channel_solution.png" alt="Diagram of control channel solution."><figcaption>Control channel solution.</figcaption></figure>

In my Csound instrument I sent amplitude data out through a control channel like this:

```
ktrig metro 50
kmeter max_k asig, ktrig, 1
chnset kmeter, "meter"
```

In the main process of Electron I read from the control channel and sent the value to the renderer process like this:

```
function readCsoundValues(){
    let amplitude = csound.GetControlChannel(Csound, "meter")
    win.webContents.send('volume-meter', amplitude)
    setTimeout(readCsoundValues, 20)
}
readCsoundValues()
```

In the preload stage I set up the IPC between the main process and the renderer process like this:

```
contextBridge.exposeInMainWorld('electron', {
    receive: (channel, func) => {
        ipcRenderer.on(channel, func)
    }
})
```

In the renderer process I received the value and animated the volume meter like this:

```
function animate() {
    window.electron.receive("volume-meter", (event, data) => {
        volume = data
    })
    ctx.fillRect(600, 10, volume * 200, 40) 
    requestAnimationFrame(animate)
}
animate()
```

After all this work, the volume meter animation would only receive about 10 different values per second from Csound.  That makes for a pretty choppy animation.  [I asked Nate Whetsell about this](https://github.com/nwhetsell/csound-api/issues/22), and he explained that the data bottleneck actually comes from the Csound API itself when Csound is run in a separate thread.

I had been running Csound in the main process with csound-api's `.PerformAsync()` method, so I switched to the `.PerformKsmpsAsync()` method.  The handy thing about this is that you can run a Node.js function in between each Csound k-cycle.  Here's what that looks like.

```
const Csound = csound.Create()
csound.CompileCsd(Csound, "mellfark.csd")
if (csound.Start(Csound) === csound.SUCCESS) {
    csound.PerformKsmpsAsync(Csound, () => {
        kcycleFunction()
    }, () => {csound.Destroy(Csound)})
}

function kcycleFunction() {
    volume = csound.GetControlChannel(Csound, "meter")
    win.webContents.send('volume-meter', amplitude)
}
```

This increased the resolution of the volume data to about 26 values per second from Csound.  That's better but still disappointing given that I was expecting a resolution of around 800 values per second.  When asked about this, Nate explained that the low resolution is probably because Node.js only *sometimes* runs the `kcylcleFunction` depending on other priorities in the Node.js event loop.

#### Using Open Sound Control

<figure><img src="/images/osc_solution.png" alt="Diagram of open sound control solution."><figcaption>Open Sound Control solution.</figcaption></figure>

It seemed like control channels were not a good solution for getting high resolution data out of Csound, so I switched over to [Open Sound Control (OSC)](https://ccrma.stanford.edu/groups/osc/index.html).  OSC is a data transport standard that allows applications to exchange data, and the data is transmitted over network protocols.

On the Csound side, the `OSCsend` opcode conveniently handles the sending of OSC messages.  In this example, I'm sending the message over the User Datagram Protocol (UDP) network layer to IP address `127.0.0.1` (aka `localhost`) at port `8080` with channel name `"/test/message/"`.  Here's what that code looks like:

```
OSCsend kcount, "127.0.0.1", 8080, "/test/message/", "f", kmeter
```

On the Electron side, I used the [osc-js package](https://www.npmjs.com/package/osc-js) to set up the OSC infrastructure.  To receive OSC messages from Csound I have to launch a server to listen for the messages.  Here what that code looks like:

```
const options = {
host: '127.0.0.1',
port: 8080
}
const osc = new OSC({ plugin: new OSC.WebsocketServerPlugin(options) })
osc.open()
osc.on("/test/message/", message => {
    win.webContents.send('volume-meter', amplitude)
})
```

Sending data from Csound via OSC resulted in a major increase in resolution over using control channels.  I was easily getting 200 values per second in the main process of Electron, which is more than enough for my purposes.  However, the volume meter animation in the renderer process was still maddeningly choppy.  When I inspected it, I noticed the volume meter function was still only getting 10 values per second.

#### Stripping It Down

I thought maybe the bottleneck was due to sluggishness in Electron's inter-process communication, so I stripped the project down to its bare essentials.  Instead of using Electron, I just used a Node.js [express](https://expressjs.com/) server to serve up the HTML page with the GUI.  This meant all communication between Csound, the express server, and the GUI would be through OSC communication.

Even in this stripped down environment I got the same bottlenecking.  It wasn't Electron's fault at all.  Probably not even Node.js' fault.  I think it has to do with the recursive `requestAnimationFrame()` function that draws my GUI on the canvas.  Even though the function is supposed to be non-blocking, it only seems to yield to the function that reads the OSC volume data about 10 times per second.

I finally found a solution by not using `requestAnimationFrame()`. Instead I triggered the GUI drawing function any time an OSC message arrived.  Finally the volume meter was animated with high resolution data!  Except now the GUI became very sluggish when responding to keyboard commands.  The I solved one problem and created another equally bad problem.

### Moving on from Node.js and Electron

I really wanted to love Node.js and Electron.  The whole promise of Electron is that you can conveniently port a web app to a desktop app.  However, it was an uphill battle for me.  I never felt like I understood what was actually happening in Node.js.  It was a discouraging experience.  At times I thought I wasn't up to the task of building a Csound GUI framework.

After about three weeks I decided it was time to move on from Node.js and Electron for this project.  I briefly considered [Sciter](https://sciter.com/) because it allows you to write the program logic in whatever language you'd like and still use HTML/CSS/JS for the GUI.  However, I was tired of the complications of the browser environment.

I revisited an [old post](https://forum.csound.com/t/gui-solution-for-command-line-controlled-program/532) on the Csound Forum where I asked for advice about building Csound GUIs.  Rory Walsh, the patron saint of Csound newbies, suggested Qt as a good option.  I had resisted Qt because I had this idea that it was an overwhelming framework that was too advanced for me.  But at this point, any other framework seemed more appealing to me than Electron, so I've been working with PyQt5 for the past several days.

At some point soon I'll post about my experiences with PyQt5, but for now I'll say that within three days I had already made more progress on my GUI than three weeks with Node.js and Electron.  In fact, I've already found a straightforward way to animate a volume meter with over 100 values/second.