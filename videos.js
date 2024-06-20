function update_button_position() {
    bottom_position = document.getElementsByClassName('home_video')[0].getBoundingClientRect().bottom
    right_position = document.getElementsByClassName('home_video')[0].getBoundingClientRect().right
    media_buttons = Array.from(document.getElementsByClassName('media_button'))
    var i = 1
    media_buttons.forEach((element) => {
        element.style.top = bottom_position - 50 + "px"
        element.style.left = right_position - 50 * i + "px"
        element.classList.remove('hidden')
        i += 1
    })
}

function toggle_play() {
    var video = document.getElementsByClassName('home_video')[0]
    if (video.paused) {
        var icon = document.getElementById('play_pause')
        icon.innerHTML = "="
        icon.classList.add('rotate')
        video.play()
    } else {
        var icon = document.getElementById('play_pause')
        icon.innerHTML = ">"
        icon.classList.remove('rotate')
        video.pause()
    }
}

function loaded_data() {
    console.log("loaded_data")
    document.getElementsByClassName('home_video')[0].remove()
    this.currentTime = 3
    update_button_position()
}

function change_video(ended = false) {
    console.log("change_video: end of video = " + ended)
    var vid_array = [
    '/video/mosh_kallie_annie_2024_4_15.mp4',    
    '/video/mosh_kallie_horizontal11_2024_4_15.mp4',
    '/video/mosh_kallie_horizontal14_2024_4_15.mp4',
    '/video/mosh_kallie_average8_2024_4_15.mp4',
    '/video/mosh_output4_2024_2_27.mp4',
    '/video/anim_horizontal_2024_2_27.mp4',
    '/video/anim_transitions_2024_2_28.mp4',
    '/video/anim_pan_skew_2024_3_20.mp4'
    ]
    var home_video_container = document.getElementById('home_video_container')
    var old_video = document.getElementsByClassName('home_video')[0]
    var new_video = document.createElement('video')
    new_video.className = 'home_video'
    var video_source = vid_array[Math.floor(Math.random() * vid_array.length)]
    // while (!old_video.src.includes(video_source)) {
    //     video_source = vid_array[Math.floor(Math.random() * vid_array.length)]
    // }
    // console.log(video_source, old_video.getElementsByTagName("source")[0].src, !old_video.src.includes(video_source))
    new_video.src = video_source
    new_video.controls = false
    // new_video.loop = true
    if (ended === true) {
        new_video.autoplay = true
    } else {
        new_video.autoplay = !old_video.paused
    }
    new_video.muted = true
    // new_video.preload = 'metadata'
    new_video.onended = (event) => change_video(ended = true)
    // add_onclick(new_video)
    new_video.onloadeddata = (event) => loaded_data()
    // new_video.addEventListener("loadedmetadata", (event) => {
    //     console.log("loadedmetadata")
    // })
    home_video_container.appendChild(new_video);
}
function add_onclick(video) {
    video.onclick = change_video
}

window.onresize = update_button_position