export function SetTextareaAutoHeight (element) {
  if (element) {
    const target = element.target ? element.target : element
    // target.style.height = defaultHeight
    target.style.height = `${target.scrollHeight}px`
  }
}
