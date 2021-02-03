export function formatTime(time) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  const decorativeMinutes = minutes < 10 ? `0${minutes}` : minutes
  const decorativeSeconds = seconds < 10 ? `0${seconds}` : seconds
  return `${decorativeMinutes}:${decorativeSeconds}`
}
