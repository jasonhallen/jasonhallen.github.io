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
var active_timer
var active_video_list = []

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
        } else if (document.getElementsByClassName('home_video').length) {
            this.element.autoplay = true
        } else {
            this.element.autoplay = false
        }

        this.element.onclick = this.toggle_play.bind(this)
        this.element.onloadedmetadata = this.set_video_start_duration.bind(this)
        this.element.onseeked = this.add_video_to_dom.bind(this)
        
        console.log('Finished initialization')
    }

    set_video_start_duration() {
        // var time_left = this.duration - this.currentTime
        // console.log(this.duration, this.currentTime)
        console.log("Starting set_video_start_duration")
        if (this.element.duration > 4) {
            this.duration = Math.random() * 3 + 1
            this.start_time = Math.random() * (this.element.duration - this.duration)
        // determine if video is playing
        // if (home_video_list.length && !home_video_list[0].paused) {
        //     var start_time = set_time_duration(this).toString()
        } else {
            this.start_time = "0.0"
        }
        this.element.currentTime = this.start_time
        // this.ended = 0
        console.log(`total = ${this.element.duration}, start_time = ${this.start_time}, duration = ${this.duration}, source = ${this.element.src}`)
        // this.ontimeupdate = check_elapsed_time(this, start_time, duration)
    }

    add_video_to_dom() {
        var home_video_list = document.getElementsByClassName('home_video')
        var home_video_container = document.getElementById('home_video_container')
        home_video_container.appendChild(this.element)
        if (home_video_list.length > 1) {
            home_video_list[0].remove()
        }
        if (this.element.autoplay) {
            this.timer = setInterval(this.check_elapsed_time.bind(this), 30)
        }
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
        console.log(`playing: time_elapsed = ${time_elapsed}, start_time = ${this.start_time}, duration = ${this.duration}`)
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

// function toggle_play() {
//     var active_video = document.getElementsByClassName('home_video')[0]
//     var play_pause_button = document.getElementById('play_pause')

//     if (active_video.paused) {
//         play_pause_button.innerHTML = "="
//         play_pause_button.classList.add('rotate')
//         // set_time_duration(active_video)
//         active_video.play()
//     } else {
//         play_pause_button.innerHTML = ">"
//         play_pause_button.classList.remove('rotate')
//         active_video.pause()
//         // clearTimeout(active_timer)
//     }
// }

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

function select_video_source() {
    var video_source = videos_available[Math.floor(Math.random() * videos_available.length)]
    videos_available.splice(videos_available.indexOf(video_source), 1)
    videos_blocked.push(video_source)
    if (videos_blocked.length > 15) {
        videos_available.push(videos_blocked.shift())
    }
    return video_source
}

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

window.onresize = update_button_position