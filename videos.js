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

function set_initial_video() {
    var home_video = document.getElementsByClassName('home_video')[0]
    home_video.src = '/video/' + select_video_source()
}

function update_button_position() {
    // document.getElementsByClassName('home_video')[0].currentTime = 2
    // console.log("video onlonad: currentTime = " + document.getElementsByClassName('home_video')[0].currentTime)
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
    var active_video = document.getElementsByClassName('home_video')[0]
    var play_pause_button = document.getElementById('play_pause')

    if (active_video.paused) {
        play_pause_button.innerHTML = "="
        play_pause_button.classList.add('rotate')
        active_video.play()
        set_timer(active_video)
    } else {
        play_pause_button.innerHTML = ">"
        play_pause_button.classList.remove('rotate')
        active_video.pause()
        clearTimeout(active_timer)
    }
}

function set_timer(active_video) {
    var time_left = active_video.duration - active_video.currentTime
    console.log('time_left = ' + time_left)
    if (time_left > 3) {
        var duration = (Math.random() * 3 + 1) * 1000
        var start_time = (Math.random() * (time_left * 1000 - duration) + active_video.currentTime * 1000) / 1000
        // active_video.currentTime = 5
        console.log('duration = ' + duration + ', currentTime = ' + active_video.currentTime + ', start_time = ' + start_time)
        active_timer = setTimeout(create_new_video, duration)
    }
    return start_time
}

function loaded_data() {
    console.log("loaded_data")
    home_video_list = document.getElementsByClassName('home_video')
    if (home_video_list.length && !home_video_list[0].paused) {
        var start_time = set_timer(this).toString()
    } else {
        var start_time = "0.0"
    }
    this.currentTime = start_time
    // var home_video_container = document.getElementById('home_video_container')
    // home_video_container.appendChild(this)
    // if (home_video_list.length > 1) {
    //     home_video_list[0].remove()
    // }
    console.log('currentTime = ' + this.currentTime)
    // update_button_position()
}

function add_video() {
    var home_video_container = document.getElementById('home_video_container')
    home_video_container.appendChild(this)
    if (home_video_list.length > 1) {
        home_video_list[0].remove()
    }
    update_button_position()
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

function create_new_video(ended = false) {
    console.log("create_new_video: end of video = " + ended)
    var current_video = document.getElementsByClassName('home_video')[0]
    var new_video = document.createElement('video')
    new_video.className = 'home_video'
    new_video.muted = true
    new_video.playsInline = true
    new_video.src = '/video/' + select_video_source() + '#t=3'
    new_video.type = "video/mp4"
    new_video.controls = false
    new_video.preload = 'metadata'
    if (ended === true) {
        new_video.autoplay = true
    } else if (document.getElementsByClassName('home_video').length) {
        new_video.autoplay = !document.getElementsByClassName('home_video')[0].paused
    } else {
        new_video.autoplay = false
    }
    // new_video.currentTime = "4.0"
    new_video.onended = (event) => create_new_video(ended = true)
    new_video.onclick = toggle_play
    new_video.onloadeddata = loaded_data
    new_video.onseeked = add_video
    // if (!current_video.paused) {
    //     set_timer(new_video)
    // }
    // new_video.addEventListener("loadedmetadata", (event) => {
    //     console.log("loadedmetadata")
    // })
    // home_video_container.appendChild(new_video)
}

window.onresize = update_button_position