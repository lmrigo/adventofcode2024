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

    updates.forEach((update, updIdx) => {
      let ordered = true
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
      updatesAnalysis.push({ ordered, updIdx })
    })
    // console.log(updatesAnalysis)
    const unordered = updatesAnalysis.filter(upd => !upd.ordered)
    const newAnalysis = []
    unordered.forEach((unord) => {
      const upd = updates[unord.updIdx]
      const updRules = {}
      Object.keys(rules).forEach(key => {
        if (upd.includes(Number(key))) {
          updRules[key] = {
            before: rules[key].before.filter(val => upd.includes(val)),
            after: rules[key].after.filter(val => upd.includes(val))
          }
        }
      })
      // console.log(rules, updRules)
      // return false

      let states = []
      upd.forEach(page => {
        // if it has pages that must go before it (page is after xxx), check before adding
        const filteredAfter = upd.filter(val => updRules[page].after.includes(val))
        if (filteredAfter.length > 0) {
          // if these pages can go after it (page is before xxx), add, otherwise skip
          const filteredBefore = filteredAfter.filter(val => updRules[page].before.includes(val))
          if (filteredBefore.length > 0) {
            states.push([page])
          }
        } else {
          states.push([page])
        }
      })
      const updSize = upd.length
      let found = false
      while (!found && states.length > 0) {
        const state = states.shift()
        // if (states.length % 1000 === 0) {
        //   console.log('states left:', states.length, 'current state:', state.join(','))
        // }
        // console.log(states.length, state.join(','))
        const newStates = genStates(state,updRules,upd)
        newStates.forEach((newState) => {
          states.push(newState)
          if (newState.length === updSize) {
            if (isOrdered(newState, updRules)) {
              found = true
              newAnalysis.push(newState[Math.floor(newState.length/2)])
              return false // break out of forEach
            }
          }
        })
      }

    })

    const result = newAnalysis.reduce((acc, val) => {
      return acc + val
    },0)
    // console.log(result)
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

function insertAt(arr, index, item) {
  return [...arr.slice(0, index), item, ...arr.slice(index)];
}
function isOrdered (update, rules) {
  let ordered = true
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
  return ordered
}
function genStates (state, rules, update) {
  if (state.length === update.length) { return [] } // limit reached
  const lastPage = state[state.length - 1]
  let newStates = []
  // candidates are all update pages
  // - last page
  // - state pages
  // - pages that have remaining as prerequisites
  let candidates = update.filter(page => {
    if (lastPage === page) { return false }
    if (state.includes(page)) { return false }
    return true
  })
  candidates = candidates.filter(page => {
    // if it has pages that must go before it (page is after xxx), check before adding
    const filteredAfter = candidates.filter(val => rules[page].after.includes(val))
    if (filteredAfter.length > 0) {
      // if these pages can go after it (page is before xxx), add, otherwise skip
      const filteredBefore = filteredAfter.filter(val => rules[page].before.includes(val))
      if (filteredBefore.length > 0) {
        return true
      }
    } else {
      return true
    }
  })
  newStates = candidates.map((page) => [...state, page])

  // rules[lastPage].before.forEach((page) => {
  //   if (!update.includes(page)) {
  //     return true // skip pages that are not in the update
  //   }
  //   if (state.includes(page)) { // if it's already there, skip it
  //     return true
  //   }
  //   // if it can't be there, skip it
  //   const filtered = state.filter(val => rules[page].before.includes(val))
  //   if (filtered.length > 0) {
  //     return true
  //   }
  //   // always push, check later
  //   newStates.push([...state, page])
  // })

  return newStates
}


$(function (){
  $('#main').append('<div id="part1"><h2>part 1</h2></div>')
  part1()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  part2()
  $('#main').append('<br>')
})
