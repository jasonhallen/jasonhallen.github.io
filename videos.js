var videos_all = [
    'mosh_kallie_annie_2024_4_15_small.mp4',    
    'mosh_kallie_horizontal11_2024_4_15.mp4',
    'mosh_output4_2024_2_27_1.mp4',
    'mosh_output4_2024_2_27_2.mp4',
    'mosh_output4_2024_2_27_3.mp4',
    'mosh_output4_2024_2_27_4.mp4',
    'mosh_abs_average_forward_10_2024_4_16.mp4',
    'mosh_abs_average_forward_10_2_2024_4_16.mp4',
    'mosh_earth_horizontal_2024_4_15.mp4',
    'mosh_planet_transfer_2024_4_15.mp4',
    'mosh_turtle_average_2024_4_15.mp4',
    'mosh_turtle_horizontal_2024_4_15.mp4',
    'mosh_helicopter_2024_5_24_1.mp4',
    'mosh_helicopter_2024_5_24_2.mp4',
    'mosh_helicopter_2024_5_24_3.mp4',
    'mosh_output_2024_2_27.mp4',
    'mosh_output2_2024_2_27_1.mp4',
    'mosh_output2_2024_2_27_2.mp4',
    'mosh_output2_2024_2_27_3.mp4',
    'anim_horizontal_2024_2_27.mp4',
    'anim_transitions_2024_2_28.mp4',
    'anim_pan_skew_2024_3_20.mp4',
    'anim_molly_2024_4_10.mp4',
    'anim_lake_2024_4_8.mp4',
    'anim_red_grid_2024_4_10.mp4',
    'anim_coast_2024_4_10.mp4',
    'anim_glitch_2024_4_8.mp4',
    'anim_glitch2_2024_4_8.mp4',
    'anim_coffee_2024_3_21.mp4',
    'anim_rotate_2024_3_21.mp4',
    'anim_rotate2_2024_3_21.mp4',
    'anim_rotate3_2024_3_21.mp4',
    'planet_clouds.mp4',
    'planet_seal.mp4',
    'planet_shark.mp4',
    'planet_frog.mp4',
    'planet_paradise.mp4',
    'planet_bird_fall.mp4',
    'planet_bird_leap.mp4',
    'planet_rams.mp4',
    'planet_puma.mp4',
    'planet_zebras.mp4',
    'planet_color_sequence.mp4',
    'planet_ibex.mp4',
    'planet_shrimp.mp4',
    'planet_peak.mp4',
    'planet_lava.mp4',
    'planet_lava_shark1.mp4',
    'planet_stingray.mp4',
    'planet_fish.mp4',
    'invasive_01_01.mp4',
    'invasive_01_02.mp4',
    'invasive_03.mp4',
    'invasive_04_01.mp4',
    'invasive_04_02.mp4',
    'methods_transfer3.mp4',
    'shirley.mp4',
    'shirley2.mp4',
    'culkin.mp4',
    'subscribe.mp4',
    'storms.mp4',
    'storms2.mp4',
    'emergency.mp4',
    'fireball.mp4',
]

var videos_available = videos_all.map((x) => x)
var videos_blocked = []
var video_timer
var video_playing = false
var video_index = 0
var initial_load = true

class HomeVideo {
    constructor(id, index) {
        this.element = document.getElementById(id)
        this.index = index
        this.other_video
        this.duration = 0
        this.start_time = 0
        this.timer
        this.seeked = false
        this.can_play = false        

        this.element.onloadedmetadata = () => {this.set_video_duration_start()}
        this.element.onseeked = () => {this.set_seeked_true()}
        this.element.oncanplay = () => {this.set_can_play()}
        // this.element.onplaying = () => {this.swap_video_elements()}
    }

    load_other_video(event = null, change_button_clicked = false) {
        // if (change_button_clicked) {
        //     clearInterval(home_video_list[video_index].timer)
        // }
        this.other_video.load_video()
    }

    load_video(event = null, change_button_clicked = false) {
        console.log(`LOAD_VIDEO:`)
        // if (change_button_clicked) {
        //     clearInterval(home_video_list[video_index].timer)
        // }
        this.seeked = false
        this.element.src = '/video/' + this.select_video_source()
        this.element.load()
        if (event != null) {
            event.stopPropagation()
        }
    }

    select_video_source() {
        var video_source = videos_available[Math.floor(Math.random() * videos_available.length)]
        videos_available.splice(videos_available.indexOf(video_source), 1)
        videos_blocked.push(video_source)
        if (videos_blocked.length > 15) {
            videos_available.push(videos_blocked.shift())
        }
        console.log(`select_video_source: ${video_source}`)
        return video_source
    }

    set_video_duration_start() {
        // Set video duration and start time
        if (this.element.duration > 4) {
            this.duration = Math.random() * 2.75 + 0.75
            this.start_time = Math.random() * (this.element.duration - this.duration)
        } else {
            this.duration = this.element.duration - 0.5
            this.start_time = 0
        }
        this.element.currentTime = this.start_time.toString()
        if (Math.random() < 0.5) {
            this.element.style.transform = 'scaleX(-1)'
        } else {
            this.element.style.transform = 'scaleX(1)'
        }
        console.log(`onloadedmetadata-->set_video_start_duration: vid = ${this.element.id}, current_time = ${this.element.currentTime}, start_time = ${this.start_time}, duration = ${this.duration}, autoplay = ${this.element.autoplay}, source = ${this.element.src}`)
    }

    set_seeked_true() {
        // Set this.seeked to true
        console.log(`onseeked-->set_seeked_true: ${this.element.id}, video_playing: ${video_playing}`)
        this.seeked = true
        // var home_video_container = document.getElementById('home_video_container')
        // var home_video_list = document.getElementsByClassName('home_video')
        if (initial_load == true) {
            swap_video_elements()
            // initial_load = false
        }
    }

    set_can_play() {
        // Set this.can_play to true
        if (this.seeked == true) {
            this.can_play = true
        }
        console.log(`oncanplay-->set_can_play: ${this.element.id}, video_playing = ${video_playing}, seeked = ${this.seeked}, can_play = ${this.can_play}, intial_load = ${initial_load}, readyState = ${this.element.readyState}`)

        if (initial_load == true && this.can_play == true) {
            // this.swap_video_elements()
            // swap_video_elements()
            // initial_load = false
        } else if (video_playing == true && this.can_play == true) {
            // this.timer = setInterval(check_elapsed_time.bind(this))
            // this.element.play() // triggers swap_video_elements
        }
    }

    // swap_video_elements() {
    //     // only toggle when playing is paused
    //     console.log(`swap_video_elements: ${this.element.id}, video_playing = ${video_playing}`)
    //     if (this === window || video_playing == false || (video_playing == true)) {
    //         current_video = this.other_video
    //         this.other_video.element.style.zIndex = 50
    //         this.element.style.zIndex = 25
    //         // this.element.pause()
    //         // video_index = -this.other_video.id + 1
    //         console.log(`video changed = ${this.other_video.element.id}`)
    //     } else {
    //         console.log(`video not changed = ${this.id}, element paused = ${this.element.paused}`)
    //     }
    // }

    play_video() {
        // this.timer = setInterval(check_elapsed_time.bind(this))
        console.log("PLAY_VIDEO")
        this.timer = setInterval(this .check_elapsed_time.bind(this))
        this.element.play()
    }

    check_elapsed_time() {
        console.log(`check_elapsed_time - ${this.element.id}`)
        var time_elapsed = this.element.currentTime - this.start_time
        // console.log(`playing: time_elapsed = ${time_elapsed}, start_time = ${this.start_time}, duration = ${this.duration}`)
        // check that next video can play
        if (time_elapsed >= this.duration && this.other_video.can_play == true) {
            console.log(`reached end of duration`)
            clearInterval(this.timer)
            this.other_video.play_video()
            // this.swap_video_elements()
            swap_video_elements()
            this.load_video()
        }
    }
}

/*
Initial page load
1. Create two video elements
2. Load initial video
3. Display the paused first frame of video
4. Press play
5. Play initial video, at same time load next video
    - Next video waits to play
6. Start timer to monitor duration of initial video
7. After duration, timer checks that seeked and canplay are TRUE
    - Plays next video
        - This triggers the loading of the next video which lies in wait
    - Toggles video display
*/

var home_video_0 = new HomeVideo('vid0', 0)
var home_video_1 = new HomeVideo('vid1', 1)
home_video_0.other_video = home_video_1
home_video_1.other_video = home_video_0
var current_video = home_video_1
// var home_video_list = [home_video_0, home_video_1]

// function load_next_video(event = null, change_button_clicked = false) {
//     console.log(`LOAD_NEXT_VIDEO:`)
//     if (change_button_clicked) {
//         clearInterval(home_video_list[video_index].timer)
//     }
//     home_video_list[-video_index + 1].seeked = false
//     home_video_list[-video_index + 1].element.src = '/video/' + select_video_source()
//     home_video_list[-video_index + 1].element.load()
//     if (event != null) {
//         event.stopPropagation()
//     }
// }

// function select_video_source() {
//     var video_source = videos_available[Math.floor(Math.random() * videos_available.length)]
//     videos_available.splice(videos_available.indexOf(video_source), 1)
//     videos_blocked.push(video_source)
//     if (videos_blocked.length > 15) {
//         videos_available.push(videos_blocked.shift())
//     }
//     console.log(`select_video_source: ${video_source}`)
//     return video_source
// }

// function check_elapsed_time() {
//     console.log(`check_elapsed_time - ${this.element.id}`)
//     var time_elapsed = this.element.currentTime - this.start_time
//     // console.log(`playing: time_elapsed = ${time_elapsed}, start_time = ${this.start_time}, duration = ${this.duration}`)
//     // check that next video can play
//     if (time_elapsed >= this.duration && home_video_list[-video_index + 1].can_play == true) {
//         console.log(`reached end of duration`)
//         // this.ended += 1
//         clearInterval(this.timer)
//         // load_next_video()
//         // PLAY NEXT VIDEO
//         load_next_video()
//         play_video()
//         this.swap_video_elements()
//     }
// }

function swap_video_elements() {
    // only toggle when playing is paused
    console.log(`swap_video_elements: ${current_video.element.id}, video_playing = ${video_playing}`)
    // if (this === window || video_playing == false || (video_playing == true)) {
        current_video.other_video.element.style.zIndex = 50
        current_video.element.style.zIndex = 25
        current_video = current_video.other_video
        // this.element.pause()
        // video_index = -this.other_video.id + 1
        console.log(`video changed = ${current_video.element.id}`)
    // } else {
        // console.log(`index not changed = ${this.id}, element paused = ${this.element.paused}`)
    // }
}

function play_pause_clicked(event) {
    var play_pause_button = document.getElementById('play_pause')

    if (video_playing == true) {
        console.log(`PLAY_PAUSE: video_playing = ${video_playing}, pausing, video = ${current_video.element.id}`)
        play_pause_button.innerHTML = ">"
        play_pause_button.classList.remove('rotate')

        clearInterval(current_video.timer)
        current_video.element.pause()
        video_playing = false

    } else {
        console.log(`PLAY_PAUSE: video_playing = ${video_playing}, starting, video = ${current_video.element.id}`)
        play_pause_button.innerHTML = "="
        play_pause_button.classList.add('rotate')
        // play_video()
        video_playing = true
        if (initial_load == true) {
            initial_load = false
            current_video.load_other_video()
        }
        current_video.play_video()
        // home_video_list[video_index].timer = setInterval(check_elapsed_time.bind(home_video_list[video_index]))
        // home_video_list[video_index].element.play()
        // LOAD NEXT VIDEO
    }
    event.stopPropagation();
}


// function play_video() {
//     home_video_list[video_index].timer = setInterval(check_elapsed_time.bind(home_video_list[video_index]))
//     home_video_list[video_index].element.play()
//     // load_next_video()
// }

// window.onresize = update_button_position
const play_pause_button = document.getElementById('play_pause')
play_pause_button.classList.remove('hidden')
// const next_button = document.getElementById('next')
// next_button.classList.remove('hidden')
// load_next_video()
console.log(`STARTING: current_video: ${current_video.element.id}`)
current_video.other_video.load_video()
// current_video.swap_video_elements()
// home_video_list[-video_index + 1].element.load()
