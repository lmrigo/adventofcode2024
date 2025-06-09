var input = [
`3   4
4   3
2   5
1   3
3   9
3   3`
 ,puzzleInput
]

var part1 = function() {

  for (var i = 0; i < input.length; i++) {
    const listA = []
    const listB = []
    const rows = input[i].split(/\n/)
    rows.forEach((row) => {
      const numbers = row.split(/\s+/)
      listA.push(Number(numbers[0]))
      listB.push(Number(numbers[1]))
    })
    listA.sort((a, b) => a - b)
    listB.sort((a, b) => a - b)
    let totalDistance = 0
    for (let j = 0; j < listA.length; j++) {
      totalDistance += Math.abs(listA[j] - listB[j])
    }

    const result = totalDistance
    // console.log(result)
    $('#part1').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

var part2 = function () {

  for (var i = 0; i < input.length; i++) {
    const listA = []
    const listB = []
    const count = {}
    const rows = input[i].split(/\n/)
    rows.forEach((row) => {
      const numbers = row.split(/\s+/)
      const numberA = Number(numbers[0])
      const numberB = Number(numbers[1])
      if (count[numberA] === undefined) {
        count[numberA] = {a: 0, b: 0}
      }
      count[numberA].a++
      if (count[numberB] === undefined) {
        count[numberB] = {a: 0, b: 0}
      }
      count[numberB].b++
      listA.push(numberA)
      listB.push(numberB)
    })
    let similarityScore = 0
    listA.forEach((numberA) => {
      similarityScore += numberA * count[numberA].b
    })


    const result = similarityScore
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
