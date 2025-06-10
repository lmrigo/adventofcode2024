var input = [
`47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`
 ,puzzleInput
]

var part1 = function() {

  for (let i = 0; i < input.length; i++) {
    const rules = {}
    const updates = []

    const lines = input[i].split(/\n/)
    let l = 0
    while (lines[l] && lines[l].trim() !== '') {
      const pages = lines[l].split('|').map(val => Number(val))
      if (!rules[pages[0]])  {
        rules[pages[0]] = { before: [], after: [] }
      }
      rules[pages[0]].before.push(pages[1])
      if (!rules[pages[1]])  {
        rules[pages[1]] = { before: [], after: [] }
      }
      rules[pages[1]].after.push(pages[0])
      l++
    }

    l++
    while (l < lines.length) {
      updates.push(lines[l].split(',').map(val => Number(val)))
      l++
    }
    // console.log(rules)
    // console.log(updates)
    const updatesAnalysis = []

    updates.forEach((update) => {
      let ordered = true
      let middle = 0
      update.forEach((page, idx) => {
        if (rules[page].before.length) {
          const previous = update.slice(0, idx)
          const filtered = previous.filter(val => rules[page].before.includes(val))
          if (filtered.length > 0) {
            ordered = false
            return false
          }
        }
        if (rules[page].after.length) {
          const following = update.slice(idx + 1)
          const filtered = following.filter(val => rules[page].after.includes(val))
          if (filtered.length > 0) {
            ordered = false
            return false
          }
        }
      })

      if (ordered) {
        middle = update[Math.floor(update.length/2)]
      }
      updatesAnalysis.push({ ordered, middle })
    })
    // console.log(updatesAnalysis)

    const result = updatesAnalysis.reduce((acc, upd) => {
      return acc + (upd.ordered ? upd.middle : 0)
    },0)
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
