var input = [
`xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
`xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`
 ,puzzleInput
]

var part1 = function() {

  for (let i = 0; i < input.length; i++) {
    const matchs = input[i].match(/mul\(\d{1,3}\,\d{1,3}\)/g)
    // console.log(matchs)
    const total = matchs.map(str => {
      const digits = str.match(/\d+/g)
      return Number(digits[0]) * Number(digits[1])
    }).reduce((acc, val) => acc + val, 0)

    const result = total
    // console.log(result)
    $('#part1').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

var part2 = function () {

  for (let i = 0; i < input.length; i++) {
    const matchs = input[i].match(/(mul\(\d{1,3}\,\d{1,3}\))|(do\(\))|(don\'t\(\))/g)
    // console.log(matchs)
    let total = 0
    let enabled = true
    matchs.forEach(str => {
      if (str.startsWith('do(')) {
        enabled = true
      } else if (str.startsWith('don\'t(')) {
        enabled = false
      } else if (enabled && str.startsWith('mul(')) {
        const digits = str.match(/\d+/g)
        total += Number(digits[0]) * Number(digits[1])
      }
    })

    const result = total
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
