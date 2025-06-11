var input = [
`190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`
 ,puzzleInput
]

var part1 = function() {

  for (let i = 0; i < input.length; i++) {
    const numberStrings = input[i].split(/\n/)
    const equations = numberStrings.map((val => val.split(/\:?\s+/).map(n => BigInt(n))))
    // console.log(equations)
    let total = BigInt(0)
    equations.forEach(eq => {
      const [result, ...numbers] = eq
      let tests = [{n:numbers[0],str:''+numbers[0]}]
      let valid = false
      for (let n = 1; n < numbers.length; n++) {
        if (n < numbers.length - 1) {
          let newTests = []
          while (tests.length > 0) {
            let t = tests.shift()
            const sumT = t.n + numbers[n]
            if (sumT <= result) { // <= because last element could be *1
              newTests.push({n:sumT,str:t.str+'+'+numbers[n]})
            }
            const productT = t.n * numbers[n]
            if (productT <= result) { // <= because last element could be *1
              newTests.push({n:productT,str:t.str+'*'+numbers[n]})
            }
          }
          tests = newTests
        } else {
          while (tests.length > 0 && !valid) {
            let t = tests.shift()
            const sumT = t.n + numbers[n]
            if (sumT === result) {
              total += result
              // console.log(t.str+'+'+numbers[n])
              valid = true
              break
            }
            const productT = t.n * numbers[n]
            if (productT === result) {
              total += result
              // console.log(t.str+'*'+numbers[n])
              valid = true
              break
            }
          }
        }
      }
    })

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
    const numberStrings = input[i].split(/\n/)
    const equations = numberStrings.map((val => val.split(/\:?\s+/).map(n => Number(n))))
    // console.log(equations)
    let total = Number(0)
    equations.forEach(eq => {
      const [result, ...numbers] = eq
      let tests = [{n:numbers[0],str:''+numbers[0]}]
      let valid = false
      for (let n = 1; n < numbers.length; n++) {
        if (n < numbers.length - 1) {
          let newTests = []
          while (tests.length > 0) {
            let t = tests.shift()
            const sumT = t.n + numbers[n]
            if (sumT <= result) { // <= because last element could be *1
              newTests.push({n:sumT,str:t.str+'+'+numbers[n]})
            }
            const productT = t.n * numbers[n]
            if (productT <= result) { // <= because last element could be *1
              newTests.push({n:productT,str:t.str+'*'+numbers[n]})
            }
            const concatT = Number(t.n +''+numbers[n])
            if (concatT <= result) { // <= because last element could be *1
              newTests.push({n:concatT,str:t.str+'||'+numbers[n]})
            }
          }
          tests = newTests
        } else {
          while (tests.length > 0 && !valid) {
            let t = tests.shift()
            const sumT = t.n + numbers[n]
            if (sumT === result) {
              total += result
              // console.log(t.str+'+'+numbers[n])
              valid = true
              break
            }
            const productT = t.n * numbers[n]
            if (productT === result) {
              total += result
              // console.log(t.str+'*'+numbers[n])
              valid = true
              break
            }
            const concatT = Number(t.n +''+numbers[n])
            if (concatT === result) {
              total += result
              // console.log(t.str+'*'+numbers[n])
              valid = true
              break
            }
          }
        }
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
