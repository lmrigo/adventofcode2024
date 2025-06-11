var input = [
`....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`
 ,puzzleInput
]

const directions = ['^', '>', 'v', '<']

var part1 = function() {

  for (let i = 0; i < input.length; i++) {
    const grid = input[i].split(/\n/).map(line => line.split(''))
    const guard = {x: 0, y: 0, direction: '^'}
    for (let y = 0; y < grid.length; y++) {
      let foundGuard = false
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === '^') {
          guard.x = x
          guard.y = y
          break
        }
      }
      if (foundGuard) {
        break
      }
    }
    // console.log(grid)
    // console.log(guard)
    let exit = false
    while (!exit) {
      grid[guard.y][guard.x] = 'X' // mark as visited
      if (canWalk(guard, grid)) {
        walk(guard, grid)
      } else {
        turnRight(guard, grid)
      }
      if (outOfBounds(guard, grid)) {
        exit = true
      }
    }


    const result = grid.reduce((acc, row) => {
      return acc + row.reduce((acc2, cell) => {
        return acc2 + (cell === 'X' ? 1 : 0)
      }, 0)
    }, 0)
    // console.log(result)
    $('#part1').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

var part2 = function () {

  for (let i = 0; i < input.length; i++) {
    const grid = input[i].split(/\n/).map(line => line.split(''))
    const guard = {x: 0, y: 0, direction: '^'}
    for (let y = 0; y < grid.length; y++) {
      let foundGuard = false
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === '^') {
          guard.x = x
          guard.y = y
          break
        }
      }
      if (foundGuard) {
        break
      }
    }
    const originalGuard = {...guard} // save original position and direction
    const originalGrid = grid.map(row => row.slice()) // save original grid state
    // console.log(grid)
    // console.log(guard)
    let exit = false
    while (!exit) {
      grid[guard.y][guard.x] = 'X' // mark as visited
      if (canWalk(guard, grid)) {
        walk(guard, grid)
      } else {
        turnRight(guard, grid)
      }
      if (outOfBounds(guard, grid)) {
        exit = true
      }
    }
    const possibleObstructions = []
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === 'X') {
          possibleObstructions.push({x: x, y: y})
        }
      }
    }
    // console.log(possibleObstructions)
    let obstructionCount = 0
    possibleObstructions.forEach((obst) => {
      const obGuard = {...originalGuard}
      const obGrid = originalGrid.map(row => row.slice())
      obGrid[obst.y][obst.x] = '#' // place obstruction

      let exit = false
      let loop = false
      while (!exit && !loop) {
        obGrid[obGuard.y][obGuard.x] += obGuard.direction // mark as visited
        if (canWalk(obGuard, obGrid)) {
          walk(obGuard, obGrid)
        } else {
          turnRight(obGuard, obGrid)
        }
        if (outOfBounds(obGuard, obGrid)) {
          exit = true
        } else if (isRepeated(obGuard, obGrid)) {
          loop = true
        }
      }
      if (loop) {
        obstructionCount++
      }
    })

    const result = obstructionCount
    // console.log(result)
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

function turnRight(guard, grid) {
  const index = directions.indexOf(guard.direction)
  guard.direction = directions[(index + 1) % directions.length]
}
function walk(guard, grid) {
  switch (guard.direction) {
    case '^':
      guard.y -= 1
      break
    case '>':
      guard.x += 1
      break
    case 'v':
      guard.y += 1
      break
    case '<':
      guard.x -= 1
      break
  }
}
function outOfBounds(guard, grid) {
  return guard.x < 0 || guard.x >= grid[0].length || guard.y < 0 || guard.y >= grid.length
}
function canWalk(guard, grid) {
  switch (guard.direction) {
    case '^':
      return !grid[guard.y - 1] || grid[guard.y - 1][guard.x] !== '#'
    case '>':
      return grid[guard.y][guard.x + 1] !== '#'
    case 'v':
      return !grid[guard.y + 1] || grid[guard.y + 1][guard.x] !== '#'
    case '<':
      return grid[guard.y][guard.x - 1] !== '#'
  }
}
function isRepeated(guard, grid) {
  return grid[guard.y][guard.x].includes(guard.direction)
}

$(function (){
  $('#main').append('<div id="part1"><h2>part 1</h2></div>')
  part1()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  part2()
  $('#main').append('<br>')
})
