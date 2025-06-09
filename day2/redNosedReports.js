var input = [
`7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`
 ,puzzleInput
]

var part1 = function() {

  for (let i = 0; i < input.length; i++) {
    const lines = input[i].split(/\n/)
    const reports = lines.map(l => l.split(/\s+/).map(val => Number(val)))

    const minThreshold = 1
    const maxThreshold = 3
    const reportAnalysis = reports.map((r) => {
      let safe = true
      if (r[1] - r[0] > 0) { // increasing
        for (let level = 1; level < r.length; level++) {
          const increaseStep = r[level] - r[level-1]
          if (increaseStep < minThreshold || maxThreshold < increaseStep) {
            safe = false
            break
          }
        }
      } else if (r[0] - r[1] > 0) { // decreasing
        for (let level = 1; level < r.length; level++) {
          const decreaseStep = r[level-1] - r[level]
          if (decreaseStep < minThreshold || maxThreshold < decreaseStep) {
            safe = false
            break
          }
        }
      } else {
        safe = false
      }
      return safe
    })
    const safeReports = reportAnalysis.reduce((acc, safe) => {
      return acc + (safe ? 1 : 0)
    }, 0)

    const result = safeReports
    // console.log(result)
    $('#part1').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

var part2 = function () {

  for (let i = 0; i < input.length; i++) {
    const numberStrings = input[i].split(/\s+/)
    const numbers = numberStrings.map((val => {return Number(val)}))

    const result = 0
    // console.log(result)
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="part1"><h2>part 1</h2></div>')
  part1()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  part2()
  $('#main').append('<br>')
})
