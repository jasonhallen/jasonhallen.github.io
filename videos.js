var videos_all = [
    'mosh_kallie_annie_2024_4_15.mp4',    
    'mosh_kallie_horizontal11_2024_4_15.mp4',
    'mosh_kallie_horizontal14_2024_4_15.mp4',
    'mosh_kallie_average8_2024_4_15.mp4',
    'mosh_output4_2024_2_27.mp4',
    'mosh_abs_average_forward_10_2024_4_16.mp4',
    'mosh_abs_average_forward_10_2_2024_4_16.mp4',
    'mosh_earth_horizontal_2024_4_15.mp4',
    'mosh_puppy4_2024_4_13.mp4',
    'mosh_puppy_output2_2024_4_14.mp4',
    'mosh_planet_transfer_2024_4_15.mp4',
    'mosh_turtle_average_2024_4_15.mp4',
    'mosh_turtle_horizontal_2024_4_15.mp4',
    'mosh_helicopter_2024_5_24_1.mp4',
    'mosh_helicopter_2024_5_24_2.mp4',
    'mosh_helicopter_2024_5_24_3.mp4',
    'mosh_output_2024_2_27.mp4',
    'mosh_output2_2024_2_27.mp4',
    'anim_horizontal_2024_2_27.mp4',
    'anim_transitions_2024_2_28.mp4',
    'anim_pan_skew_2024_3_20.mp4',
    'anim_smear_2024_4_11.mp4',
    'anim_molly_2024_4_10.mp4',
    'anim_lake_2024_4_8.mp4',
    'anim_red_grid_2024_4_10.mp4',
    'anim_coast_2024_4_10.mp4',
    'anim_smear_annie_2024_4_11.mp4',
    'anim_glitch_2024_4_8.mp4',
    'anim_glitch2_2024_4_8.mp4',
    'anim_coffee_2024_3_21.mp4',
    'anim_rotate_2024_3_21.mp4',
    'anim_rotate2_2024_3_21.mp4',
    'anim_rotate3_2024_3_21.mp4'
]

var starting_video = 'anim_transitions_2024_2_28.mp4'
var videos_available = videos_all.map((x) => x)
videos_available.splice(videos_available.indexOf(starting_video), 1)

var videos_blocked = []
var video_timer
var active_video_list = []
var video_playing = false
var video_index = 0

class HomeVideo {
    constructor(id, index) {
        this.element = document.getElementById(id)
        this.index = index
        // console.log(this.element)

        // this.element.onloadedmetadata = this.set_video_start_duration.bind(this)
        // this.element.onseeked = this.add_video_to_dom.bind(this)
        
        this.duration
        this.start_time
        this.timer
        this.seeked = false

        this.element.onloadedmetadata = set_video_start_duration.bind(this)
        this.element.onseeked = prepare_for_display.bind(this)
        this.element.oncanplaythrough = determine_play.bind(this)
        this.element.onplaying = toggle_video_index.bind(this)
    }

    // set_video_start_duration() {
    //     // var time_left = this.duration - this.currentTime
    //     // console.log(this.duration, this.currentTime)
    //     console.log(`starting set_video_start_duration: ${this.element.id}`)
    //     if (this.element.duration > 4) {
    //         this.duration = Math.random() * 3 + 0.5
    //         this.start_time = Math.random() * (this.element.duration - this.duration)
    //     // determine if video is playing
    //     // if (home_video_list.length && !home_video_list[0].paused) {
    //     //     var start_time = set_time_duration(this).toString()
    //     } else {
    //         this.duration = 0
    //         this.start_time = "0.0"
    //     }
    //     this.element.currentTime = this.start_time.toString()
    //     // this.element.onseeked = toggle_video_index.bind(this)
    //     // this.ended = 0
    //     console.log(`total = ${this.element.duration}, current_time = ${this.element.currentTime}, start_time = ${this.start_time}, duration = ${this.duration}, autoplay = ${this.element.autoplay}, source = ${this.element.src}`)
    //     // this.ontimeupdate = check_elapsed_time(this, start_time, duration)
    // }    
}

var home_video_0 = new HomeVideo('vid0', 0)
var home_video_1 = new HomeVideo('vid1', 1)
var home_video_list = [home_video_0, home_video_1]

function change_video(change_button_clicked = false) {
    console.log(`CHANGE_VIDEO:`)
    // var video_element = document.querySelector('.home_video')
    // var home_video = home_video_list[video_index]
    // console.log(-video_index + 1)
    if (change_button_clicked) {
        // stop current
        clearInterval(home_video_list[video_index].timer)
    }
    home_video_list[-video_index + 1].seeked = false
    home_video_list[-video_index + 1].element.src = '/video/' + select_video_source()
    // home_video_list[-video_index + 1].element.load()
    // home_video.element.onloadedmetadata = home_video.set_video_start_duration.bind(home_video)
}

function select_video_source() {
    var video_source = videos_available[Math.floor(Math.random() * videos_available.length)]
    videos_available.splice(videos_available.indexOf(video_source), 1)
    videos_blocked.push(video_source)
    if (videos_blocked.length > 15) {
        videos_available.push(videos_blocked.shift())
    }
    return video_source
}

function set_video_start_duration() {
    // var time_left = this.duration - this.currentTime
    // console.log(this.duration, this.currentTime)
    if (this.element.duration > 4) {
        this.duration = Math.random() * 3 + 0.5
        this.start_time = Math.random() * (this.element.duration - this.duration)
    // determine if video is playing
    // if (home_video_list.length && !home_video_list[0].paused) {
    //     var start_time = set_time_duration(this).toString()
    } else {
        this.duration = 0
        this.start_time = 0
    }
    this.element.currentTime = this.start_time.toString()
    // this.element.onseeked = toggle_video_index.bind(this)
    // this.ended = 0
    console.log(`set_video_start_duration: total = ${this.element.id}, ${this.element.duration}, current_time = ${this.element.currentTime}, start_time = ${this.start_time}, duration = ${this.duration}, autoplay = ${this.element.autoplay}, source = ${this.element.src}`)
    // this.ontimeupdate = check_elapsed_time(this, start_time, duration)
}

function prepare_for_display() {
    console.log(`prepare_for_display: ${this.element.id}`)
    this.seeked = true
    // var home_video_container = document.getElementById('home_video_container')
    // var home_video_list = document.getElementsByClassName('home_video')
    if (video_playing == true) {
        // this.element.oncanplay = this.element.play
        // this.element.onplaying = toggle_video_index.bind(this)
        // this.element.autoplay = true
        // this.element.play()
        // start timer
        // clearInterval(this.timer)
        
        // this.timer = setInterval(check_elapsed_time.bind(this))
    } else {
        this.element.pause()
        toggle_video_index()
    }
}

function determine_play() {
    console.log(`determine_play: ${this.element.id}, video_playing = ${video_playing}, seeked = ${this.seeked}, readyState = ${this.element.readyState}`)
    if (this.seeked && video_playing == true) {
        this.timer = setInterval(check_elapsed_time.bind(this))
        this.element.play()
        // toggle_video_index()
    }
}

function toggle_video_index() {
    
    // home_video_container.insertBefore(home_video_list[1].element, home_video_list[0].element)
    // home_video_list[video_index].element.classList.add('hidden')
    // home_video_list.reverse()
    // home_video_list[-video_index + 1].element.classList.remove('hidden')
    
    // this.element.play()
    
    // only toggle when playing is paused
    console.log(`toggle_video_index: ${this}, video_playing = ${video_playing}, old index = ${video_index}`)
    if (this === window || video_playing == false || (video_playing == true && video_index != this.index)) {
        home_video_list[-video_index + 1].element.style.zIndex = 50
        home_video_list[video_index].element.style.zIndex = 25
        home_video_list[video_index].element.pause()
        video_index = -video_index + 1
        console.log(`index changed = ${video_index}`)
    } else {
        console.log(`index not changed = ${video_index}, element paused = ${this.element.paused}`)
    }
   
    // document.querySelector('.home_video').pause()
    // document.querySelector('.home_video').src = ''
    // home_video_list[video_index].element.src = ''
    
    // if (home_video_list.length && !home_video_list[0].paused) {
    //     // this.element.play()
    //     this.timer = setInterval(this.check_elapsed_time.bind(this), 30)
    // }
    
    // if (this.element.autoplay) {
    //     this.timer = setInterval(this.check_elapsed_time.bind(this), 30)
    // }
    update_button_position()
}

function check_elapsed_time() {
    console.log(`check_elapsed_time - ${this.element.id}`)
    var time_elapsed = this.element.currentTime - this.start_time
        // console.log(`playing: time_elapsed = ${time_elapsed}, start_time = ${this.start_time}, duration = ${this.duration}`)
        if (time_elapsed >= this.duration) {
            console.log(`reached end of duration`)
            // this.ended += 1
            clearInterval(this.timer)
            change_video()
        }
}

function new_toggle_play() {
    // var active_video = document.getElementsByClassName('home_video')[0]
    var play_pause_button = document.getElementById('play_pause')

    // if (active_video_list.some((video) => video.element.paused == false)) {
    if (video_playing == true) {
        console.log(`PLAY_PAUSE: video_playing = ${video_playing}, pausing, video_index = ${video_index}`)
        play_pause_button.innerHTML = ">"
        play_pause_button.classList.remove('rotate')
        // active_video_list.forEach(video => {
        //     // console.log(`playing = ${!video.element.paused}`)
        //     video.element.pause()
        //     video.element.autoplay = false
        //     clearInterval(video.timer)
        // })
        clearInterval(home_video_list[video_index].timer)
        home_video_list[video_index].element.pause()
        video_playing = false
        // active_video.pause()
        // clearTimeout(active_timer)
    } else {
        console.log(`PLAY_PAUSE: video_playing = ${video_playing}, starting, video_index = ${video_index}`)
        play_pause_button.innerHTML = "="
        play_pause_button.classList.add('rotate')
        // set_time_duration(active_video)
        // active_video_list.forEach(video => {
        //     // console.log(`playing = ${!video.element.paused}`)
        //     video.element.play()
        //     video.timer = setInterval(video.check_elapsed_time.bind(video), 30)
        // })
        // video_timer = setInterval(check_elapsed_time.bind(document.getElementsByClassName('home_video')[1], start_time, duration))
        home_video_list[video_index].timer = setInterval(check_elapsed_time.bind(home_video_list[video_index]))
        home_video_list[video_index].element.play()
        // home_video_list[1].element.play()
        video_playing = true
        // active_video.play()        
    }
}

/*
1) load initial video
- playing = false
- select source
- set video start duration
- determine play -> paused, so do not play element
- toggle index -> yes, display initial paused screen (WORKS)

2) play initial video
- playing = false
- start timer
- play element => toggle index -> no, the video_index is already set (WORKS)

3) change video while playing (auto or manual)
- playing = true
- change_video trigger
- select source for non-video_index element
- set video start duration
- determine play -> playing, so play element
- toggle index -> yes, to show next element (DOESN'T WORK)

4) pause video
- playing = true
- clear timer
- pause element (WORKS)

5) restart video
- playing = false
- start timer
- play element => toggle index -> no, stay on current video_index (WORKS)

6) change video while paused
- playing = false
- select source
- set video start duration
- determine play -> paused, so do not play element
- pause element
- toggle index -> yes, show video screen even when paused (WORKS)

*/

window.onresize = update_button_position
change_video()













///////////////////////////////////////////////////
///////////////////////////////////////////////////

class CustomVideo {
    constructor(button_clicked) {
        console.log("Initializing CustomVideo instance")
        this.element = document.createElement('video')
        this.element.className = 'home_video'
        this.element.muted = true
        this.element.playsInline = true
        this.element.src = '/video/' + select_video_source()
        this.element.type = "video/mp4"
        this.element.controls = false
        this.element.preload = 'metadata'

        if (button_clicked == true) {
            console.log('orig video playing = ' + !document.getElementsByClassName('home_video')[0].paused)
            this.element.autoplay = !document.getElementsByClassName('home_video')[0].paused
        } else if (document.getElementsByClassName('home_video').length && !document.getElementsByClassName('home_video')[0].paused) {
            this.element.autoplay = true
        } else {
            this.element.autoplay = false
        }

        // this.element.autoplay = false

        // this.element.onclick = this.toggle_play.bind(this)
        this.element.onloadedmetadata = this.set_video_start_duration.bind(this)
        this.element.onseeked = this.add_video_to_dom.bind(this)
        
        console.log('Finished initialization')
    }

    // set_video_start_duration() {
    //     // var time_left = this.duration - this.currentTime
    //     // console.log(this.duration, this.currentTime)
    //     console.log(`Starting set_video_start_duration: ${this}`)
    //     if (this.element.duration > 4) {
    //         this.duration = Math.random() * 3 + 0.5
    //         this.start_time = Math.random() * (this.element.duration - this.duration)
    //     // determine if video is playing
    //     // if (home_video_list.length && !home_video_list[0].paused) {
    //     //     var start_time = set_time_duration(this).toString()
    //     } else {
    //         this.start_time = "0.0"
    //     }
    //     this.element.currentTime = this.start_time
    //     // this.ended = 0
    //     console.log(`total = ${this.element.duration}, start_time = ${this.start_time}, duration = ${this.duration}, autoplay = ${this.element.autoplay}, source = ${this.element.src}`)
    //     // this.ontimeupdate = check_elapsed_time(this, start_time, duration)
    // }

    add_video_to_dom() {
        console.log('adding to DOM')
        var home_video_list = document.getElementsByClassName('home_video')
        var home_video_container = document.getElementById('home_video_container')
        if (home_video_list.length && !home_video_list[0].paused) {
            // this.element.play()
            this.timer = setInterval(this.check_elapsed_time.bind(this), 30)
        }
        home_video_container.appendChild(this.element)
        if (home_video_list.length > 1) {
            home_video_list[0].remove()
            active_video_list.shift()
        }
        // if (this.element.autoplay) {
        //     this.timer = setInterval(this.check_elapsed_time.bind(this), 30)
        // }
        update_button_position()
    }

    toggle_play() {
        var play_pause_button = document.getElementById('play_pause')

        if (this.element.paused) {
            play_pause_button.innerHTML = "="
            play_pause_button.classList.add('rotate')
            this.element.play()
            this.timer = setInterval(this.check_elapsed_time.bind(this), 30)
            // setInterval to check elapsed time
        } else {
            play_pause_button.innerHTML = ">"
            play_pause_button.classList.remove('rotate')
            Array.from(document.getElementsByClassName('home_video')).forEach(function(element) {
                element.pause()
                element.autoplay = false
            })
            clearInterval(this.timer)
            // clear interval
        }
    }

    check_elapsed_time() {
        var time_elapsed = this.element.currentTime - this.start_time
        // console.log(`playing: time_elapsed = ${time_elapsed}, start_time = ${this.start_time}, duration = ${this.duration}`)
        if (time_elapsed >= this.duration) {
            console.log(`timeupdate`)
            // this.ended += 1
            clearInterval(this.timer)
            create_new_video()
        }
    }
}

function update_button_position() {
    // bottom_position = document.getElementsByClassName('home_video')[0].getBoundingClientRect().bottom
    right_position = document.getElementsByClassName('home_video')[0].getBoundingClientRect().right
    media_buttons = Array.from(document.getElementsByClassName('media_button'))
    var i = 1
    media_buttons.forEach((element) => {
        // element.style.top = bottom_position - 50 + "px"
        element.style.left = right_position - 50 * i + "px"
        element.classList.remove('hidden')
        i += 1
    })
}

function toggle_play() {
    // var active_video = document.getElementsByClassName('home_video')[0]
    var play_pause_button = document.getElementById('play_pause')

    // if (active_video_list.some((video) => video.element.paused == false)) {
        if (video_playing == true) {
        console.log(`PLAY_PAUSE: video_playing = ${video_playing}, pausing`)
        play_pause_button.innerHTML = ">"
        play_pause_button.classList.remove('rotate')
        active_video_list.forEach(video => {
            // console.log(`playing = ${!video.element.paused}`)
            video.element.pause()
            video.element.autoplay = false
            clearInterval(video.timer)
        })
        video_playing = false
        // active_video.pause()
        // clearTimeout(active_timer)
    } else {
        console.log(`PLAY_PAUSE: video_playing = ${video_playing}, starting`)
        play_pause_button.innerHTML = "="
        play_pause_button.classList.add('rotate')
        // set_time_duration(active_video)
        active_video_list.forEach(video => {
            // console.log(`playing = ${!video.element.paused}`)
            video.element.play()
            video.timer = setInterval(video.check_elapsed_time.bind(video), 30)
        })
        video_playing = true
        // active_video.play()        
    }
}

// function set_time_duration(active_video) {
//     var time_left = active_video.duration - active_video.currentTime
//     // console.log(active_video.duration, active_video.currentTime)
//     if (time_left > 3) {
//         var duration = (Math.random() * 3 + 1) * 1000
//         var start_time = (Math.random() * (time_left * 1000 - duration) + active_video.currentTime * 1000) / 1000
//         // active_video.currentTime = 5
//         console.log('start_time = ' + start_time.toFixed(2) + ', duration = ' + (duration / 1000).toFixed(2))
//         active_timer = setTimeout(create_new_video, duration)
//     }
//     return start_time
// }

// function set_video_start_duration() {
//     // var time_left = this.duration - this.currentTime
//     // console.log(this.duration, this.currentTime)
//     if (this.duration > 4) {
//         var duration = Math.random() * 3 + 1
//         var start_time = Math.random() * (this.duration - duration)
//     // determine if video is playing
//     // if (home_video_list.length && !home_video_list[0].paused) {
//     //     var start_time = set_time_duration(this).toString()
//     } else {
//         var start_time = "0.0"
//     }
//     this.currentTime = start_time
//     // this.ended = 0
//     console.log(`total = ${this.duration}, start_time = ${start_time}, duration = ${duration}, source = ${this.src}`)
//     // this.ontimeupdate = check_elapsed_time(this, start_time, duration)
// }

// function check_elapsed_time(video, start_time, duration) {
//     var time_elapsed = video.currentTime - start_time
//     console.log(`playing: time_elapsed = ${time_elapsed}, start_time = ${start_time}, duration = ${duration}`)
//     if (time_elapsed >= duration) {
//         console.log(`timeupdate`)
//         // this.ended += 1
//         create_new_video()
//     }
// }

// function add_video_to_dom() {
//     var home_video_list = document.getElementsByClassName('home_video')
//     var home_video_container = document.getElementById('home_video_container')
//     home_video_container.appendChild(this)
//     if (home_video_list.length > 1) {
//         home_video_list[0].remove()
//     }
//     update_button_position()
// }

function create_new_video(button_clicked = false) {
    console.log("CREATE_NEW_VIDEO: button_clicked = " + button_clicked)
    // var current_video = document.getElementsByClassName('home_video')[0]
    var new_video = new CustomVideo(button_clicked)
    active_video_list.push(new_video)
    // var new_video = document.createElement('video')
    // new_video.className = 'home_video'
    // new_video.muted = true
    // new_video.playsInline = true
    // new_video.src = '/video/' + select_video_source()
    // new_video.type = "video/mp4"
    // new_video.controls = false
    // new_video.preload = 'metadata'
    // if (button_clicked == true) {
    //     console.log('orig video playing = ' + !document.getElementsByClassName('home_video')[0].paused)
    //     new_video.autoplay = !document.getElementsByClassName('home_video')[0].paused
    // } else if (document.getElementsByClassName('home_video').length) {
    //     new_video.autoplay = true
    // } else {
    //     new_video.autoplay = false
    // }
    // // new_video.autoplay = false
    // // console.log("autoplay = " + new_video.autoplay)
    // // new_video.onended = (event) => create_new_video(button_clicked = false)
    // new_video.onclick = toggle_play
    // new_video.onloadedmetadata = set_video_start_duration
    // new_video.onseeked = add_video_to_dom
}