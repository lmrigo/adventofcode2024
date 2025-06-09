var input = [
`MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`
 ,puzzleInput
]

let grid = []

var part1 = function() {

  for (let i = 0; i < input.length; i++) {
    grid = input[i].split(/\s+/).map(row => row.split(''))

    let xmasCount = 0
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const cell = grid[i][j]
        if (cell === 'X') {
          if (topLeftXmas(i,j)) xmasCount++
          if (topXmas(i,j)) xmasCount++
          if (topRightXmas(i,j)) xmasCount++
          if (rightXmas(i,j)) xmasCount++
          if (bottomLeftXmas(i,j)) xmasCount++
          if (bottomXmas(i,j)) xmasCount++
          if (bottomRightXmas(i,j)) xmasCount++
          if (leftXmas(i,j)) xmasCount++
        }
      }
    }

    const result = xmasCount
    // console.log(result)
    $('#part1').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}


function topLeftXmas(i,j) {
  if (i < 3 || j < 3) {
    return false
  }
  return grid[i-1][j-1] === 'M' && grid[i-2][j-2] === 'A' && grid[i-3][j-3] === 'S'
}
function topXmas(i,j) {
  if (i < 3) {
    return false
  }
  return grid[i-1][j] === 'M' && grid[i-2][j] === 'A' && grid[i-3][j] === 'S'
}
function topRightXmas(i,j) {
  if (i < 3 || j > grid[i].length - 4) {
    return false
  }
  return grid[i-1][j+1] === 'M' && grid[i-2][j+2] === 'A' && grid[i-3][j+3] === 'S'
}
function rightXmas(i,j) {
  if (j > grid[i].length - 4) {
    return false
  }
  return grid[i][j+1] === 'M' && grid[i][j+2] === 'A' && grid[i][j+3] === 'S'
}
function bottomRightXmas(i,j) {
  if (i > grid.length - 4|| j > grid[i].length - 4) {
    return false
  }
  return grid[i+1][j+1] === 'M' && grid[i+2][j+2] === 'A' && grid[i+3][j+3] === 'S'
}
function bottomXmas(i,j) {
  if (i > grid.length - 4) {
    return false
  }
  return grid[i+1][j] === 'M' && grid[i+2][j] === 'A' && grid[i+3][j] === 'S'
}
function bottomLeftXmas(i,j) {
  if (i > grid.length - 4|| j < 3) {
    return false
  }
  return grid[i+1][j-1] === 'M' && grid[i+2][j-2] === 'A' && grid[i+3][j-3] === 'S'
}
function leftXmas(i,j) {
  if (j < 3) {
    return false
  }
  return grid[i][j-1] === 'M' && grid[i][j-2] === 'A' && grid[i][j-3] === 'S'
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
