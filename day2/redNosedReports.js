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

    reportAnalysis.forEach((r, rIdx) => {
      if (r) { return true } // skip safe reports
      const report = reports[rIdx].slice()
      let safe = false
      for (let i = 1; i < report.length-1; i++) {
        const step = Math.abs(report[i+1] - report[i])
        const dualIncrease = report[i] - report[i-1] > 0 && report[i+1] - report[i] > 0
        const dualDecrease = report[i-1] - report[i] > 0 && report[i] - report[i+1] > 0
        const testRemove = !dualIncrease && !dualDecrease
        if (step === 0 || step  < minThreshold || maxThreshold < step || testRemove) {
          const testReport = report.slice()
          testReport.splice(i, 1) // remove the current level
          safe = isReportSafe(testReport)
          if (safe) {
            console.log(`report ${rIdx} (${report}) is safe after removing level ${i} (${report[i]})`)
            reportAnalysis[rIdx] = true
            break
          }
        }
      }
      if (safe) { return true } // break
      // test first element
      const testFirstReport = report.slice()
      testFirstReport.shift() // remove the first level
      safe = isReportSafe(testFirstReport)
      if (safe) {
        console.log(`report ${rIdx} (${report}) is safe after removing level ${0} (${report[0]})`)
        reportAnalysis[rIdx] = true
        return true
      }
      // test last element
      const testLastReport = report.slice()
      testLastReport.pop() // remove the last level
      safe = isReportSafe(testLastReport)
      if (safe) {
        console.log(`report ${rIdx} (${report}) is safe after removing level ${report.length-1} (${report[report.length-1]})`)
        reportAnalysis[rIdx] = true
        return true
      }
    })

    const safeReports = reportAnalysis.reduce((acc, safe) => {
      return acc + (safe ? 1 : 0)
    }, 0)
    const result = safeReports
    // console.log(result)
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

function isReportSafe(r) {
  const minThreshold = 1
  const maxThreshold = 3
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
}

$(function (){
  $('#main').append('<div id="part1"><h2>part 1</h2></div>')
  part1()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  part2()
  $('#main').append('<br>')
})
