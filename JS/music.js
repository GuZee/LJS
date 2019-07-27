const toMinute = function (second) {
    let intMinute = zfill(parseInt(second / 60, 10), 2)
    let modSecond = zfill(parseInt(second % 60, 10), 2)
    return `${intMinute} : ${modSecond}`
}

// 进度条设置
const changeRange = function (audio, current) {
    let range = e('#id-imput-range')
    let duration = parseInt(audio.duration, 10)
    range.max = duration
    range.value = current
}

// 当前播放时间
const showCurrentTime = (audio) => {
    setInterval(function() {
        var currentTimeSpan = e("#id-span-currentTime")
        var current = audio.currentTime
        var timeC = toMinute(current)
        currentTimeSpan.innerHTML = timeC
        changeRange(audio, current)
        setVolume(audio)
    }, 500)
}

// 总时间显示
const showDurationTime = function (audio) {
    // 显示歌曲的总时间
    var duration = audio.duration
    var timeD = toMinute(duration)
    var spanDuration = e('#id-span-duration')
    spanDuration.innerHTML = timeD
}

// 播放 和 暂停
const bindEventPlay = function (audio) {
    let playButton = e('#id-button-play')
    bindEvent(playButton, 'click', function (event) {
        var self = event.target
        let showimage = 'showimage'
        let hideimage = 'hideimage'
        if(self.classList.contains("play")) {
            audio.play()
            self.classList.replace(showimage, hideimage)
            let pauseImage = e('.pause')
            pauseImage.classList.replace(hideimage, showimage)
        } else {
            audio.pause()
            self.classList.replace(showimage, hideimage)
            let playImage = e('.play')
            playImage.classList.replace(hideimage, showimage)
        }
    })
}


const nextSong = (audio, button) => {
    let songNumber = Number(audio.dataset.tatal)
    let offset = Number(button.dataset.off)
    let active  = Number(audio.src.split('/')[8].split('.')[0])
    let nextIndex = (active + offset + songNumber) % songNumber 
    return `audio/${nextIndex}.mp3`
}

const changeCover = (audio) => {
    let listLi = es('.musicList')
    for (let i = 0; i < listLi.length; i++) {
        const self = listLi[i];
        let src = audio.src.split('/')[7] + '/' + audio.src.split('/')[8]
        if (self.dataset.path === src) {
            changeName(self)
        }
    }
}

// 上/下一首
const bindEventNext = (audio) => {
    let nextButton = '.button-next'
    bindAll(nextButton, 'click', function(event) {
        let self = event.target
        let button = self.parentElement
        audio.src = nextSong(audio, button)
        audio.play()
        changeButImg()
        changeCover(audio)
    })
}



const changeButImg = () => {
    let playimage = e('.play')
    let pauseimage = e('.pause')
    let showimage = 'showimage'
    let hideimage = 'hideimage'
    if (playimage.classList.contains(showimage)) {
        playimage.classList.replace(showimage, hideimage)
        pauseimage.classList.replace(hideimage, showimage)
    }
}

const changeName = (self) => {
    let text = self.innerText
    let headText = text.split('-')
    let h3Text = headText[0]
    let h4Text = headText[1]
    let h3 = e('#id-h3-name')
    h3.innerHTML = h3Text
    let h4 = e('#id-h4-artist')
    h4.innerHTML = h4Text
    let coverImg = e('.img-cover')
    coverImg.src = `cover/${h3Text}.jpg`
}

// 实现随意切换歌曲
var switchSongs = function (audio) {
    bindAll('.musicList', 'click', function (event) {
        var self = event.target
        var dataPath = self.dataset.path
        audio.src = dataPath
        audio.play()
        changeButImg()
        changeName(self)
    })
}

// 实现单曲循环播放
var singleCycle = function (audio) {
    audio.addEventListener('ended', function(event) {
        audio.currentTime = 0
        audio.play()
        changeButImg()
        changeCover(audio)
    })
}



// 给 audio 绑定 canplay 事件
var bindEventCanplay = function(audio) {
    audio.addEventListener('canplay', function () {
        showDurationTime(audio)
        showCurrentTime(audio)
    })
}
//列表循环
const lLoop = (audio) => {
    let nextButton = e('#id-button-next')
    audio.addEventListener('ended', function (event) {
        audio.src = nextSong(audio, nextButton)
        audio.play()
        changeButImg()
        changeCover(audio)
    })
}

const changeMode = (audio) => {
    let changeButton = e('#id-button-change')
    bindEvent(changeButton, 'click', function(event){
        let self = event.target
        let imgIdx = self.dataset.imgc
        self.classList.replace('showimage', 'hideimage')
        let nextImg = e(imgIdx)
        nextImg.classList.replace('hideimage', 'showimage')
        modePlay(audio)
    })
}

const modePlay = (audio) => {
    let playModeButton = e('.playMode')
    let nextImg = playModeButton.querySelector('.showimage')
    if (nextImg.classList.contains('swicth')) {
        log('switch')
        bindEventEnd(audio)
    }
    if (nextImg.classList.contains('single')) {
        log('single')
        singleCycle(audio)
    }
    if (nextImg.classList.contains('listloop')) {
        log('listloop')
        lLoop(audio)
    }
}

// 获取所有歌曲
var allSongs = function () {
    var musics = es('.musicList')
    var songs = []
    for (var i = 0; i < musics.length; i++) {
        var m = musics[i]
        var path = m.dataset.path
        songs.push(path)
    }
    return songs
}

var choice = function (array) {
    var a = Math.random()
    a = a * array.length
    var index = Math.floor(a)
    return array[index]
}

var randomSong = function () {
    var songs = allSongs()
    var s = choice(songs)
    return s
}
// 随机播放
var bindEventEnd = function (audio) {
    audio.addEventListener('ended', function () {
        var song = randomSong()
        audio.src = song
        changeCover(audio)
    })
}

// 设置音量
const setVolume = (audio) => {
    let input = e('#id-input-volume')
    audio.volume = input.value
}

// 打开音乐列表
const musicList = function () {
    let listButton = e('#id-audio-list')
    listButton.addEventListener('click', function (event) {
        let olList = e('ol')
        olList.classList.toggle('ol-musicList')
    })
}

var bindEvents = function () {
    var audio = e('#id-audio-player')
    bindEventCanplay(audio)
    bindEventPlay(audio)
    bindEventNext(audio)
    switchSongs(audio)
    changeMode(audio)
    modePlay(audio)
    
}

var __main = function () {
    bindEvents()
    musicList()
}

__main()