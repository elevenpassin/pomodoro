const timerPrimaryText = document.querySelector('#timer__primary')
const timerMainText = document.querySelector('#timer__main')
const timerSecondaryText = document.querySelector('#timer__secondary')
const timerToggleButton = document.querySelector('#timer__toggle')
const timerStopButton = document.querySelector('#timer__stop')

timerMainText.textContent = '00:00'


const second = 1000
const minute = second * 60

let roundTime = 25 * minute
let breakTime = 5 * minute
let timeRemaining = 0
let isRound = true
let isRunning = false
let isPaused = false
let interval = null

const formatTime = (time) => {
  const timeinSeconds = time / second
  const minutes = Math.floor(timeinSeconds / 60).toString().padStart(2, '0')
  const seconds = (timeinSeconds % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
}

const renderMainText = () => timerMainText.textContent = formatTime(timeRemaining)
const renderToggleButton = () => {
  if (isRunning && !isPaused) {
    timerToggleButton.textContent = 'Pause'
  } else {
    timerToggleButton.textContent = 'Start'
  }
}
const startPomodoro = () => {
  if (!isRunning) {
    isRunning = true
    timeRemaining = isRound ? 1000 * 5 : 1000 * 3
    renderToggleButton()
    interval = setInterval(() => {
      if (timeRemaining === 0) {
        resetPomodoro()
        isRound = !isRound
        alert("times up!")
      } else if (!isPaused) {
        timeRemaining -= second
        renderMainText()
      }
    }, second)
  } else if (isRunning && !isPaused) {
    isPaused = true
    renderToggleButton()
  } else if (isPaused && isRunning) {
    isPaused = false
    renderToggleButton()
  }
}

const resetPomodoro = () => {
  if (interval !== null) {
    clearInterval(interval)
    isRunning = false
    timeRemaining = 0
    renderMainText()
    renderToggleButton()
    interval = null
  }
}


timerToggleButton.onclick = startPomodoro
timerStopButton.onclick = resetPomodoro