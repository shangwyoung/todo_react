import {addTodo, findById, toggleTodo, updateTodo, removeTodo, filterTodos} from './todoHelpers'

// Test follows a standard structure: arrange, act, assert
test.skip('addTodo should add the passed todo to the list', () => {
  // Arrange
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: false}
  ]
  const newTodo = {id:3, name: 'three', isComplete: false}
  const expected = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: false},
    {id:3, name: 'three', isComplete: false}
  ]

  // Act
  const result = addTodo(startTodos, newTodo)

  // Assert
  expect(result).toEqual(expected)
})


test.skip('addTodo should not mutate the existing todo array', () => {
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: false}
  ]
  const newTodo = {id:3, name: 'three', isComplete: false}
  const expected = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: false},
    {id:3, name: 'three', isComplete: false}
  ]

  const result = addTodo(startTodos, newTodo)

  expect(result).not.toBe(startTodos)

})

// Tests for changing the isCompleted property
// Use test.skip to skip that test

test.skip('findById should return the expected item from an array', () => {
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: false},
    {id:3, name: 'three', isComplete: false}
  ]
  const expected = {id:2, name: 'two', isComplete: false}
  const result = findById(2, startTodos)
  expect(result).toEqual(expected)
})

test.skip('toggleTodo should toggle the isComplete prop of a todo', () => {
  const startTodo = {id:2, name: 'two', isComplete: false}
  const expected = {id:2, name: 'two', isComplete: true}
  const result = toggleTodo(startTodo)
  expect(result).toEqual(expected)
})

test.skip('toggleTodo should not mutate the original todo', () => {
  const startTodo = {id:2, name: 'two', isComplete: false}
  const result = toggleTodo(startTodo)
  expect(result).not.toBe(startTodo)
})

test.skip('updateTodo should update an item by id', () => {
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: false},
    {id:3, name: 'three', isComplete: false}
  ]
  const updatedTodo = {id:2, name: 'two', isComplete: true}
  const expectedTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: true},
    {id:3, name: 'three', isComplete: false}
  ]

  const result = updateTodo(startTodos, updatedTodo)

  expect(result).toEqual(expectedTodos)
})

test.skip('updateTodo should not mutate the original array', () => {
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: false},
    {id:3, name: 'three', isComplete: false}
  ]
  const updatedTodo = {id:2, name: 'two', isComplete: true}

  const result = updateTodo(startTodos, updatedTodo)

  expect(result).not.toBe(startTodos)
})

// Tests for removeTodos

test.skip('removeTodo should remove an item by id', () => {
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: false},
    {id:3, name: 'three', isComplete: false}
  ]
  const targetId = 2
  const expectedTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:3, name: 'three', isComplete: false}
  ]
  const result = removeTodo(startTodos, targetId)

  expect(result).toEqual(expectedTodos)
})

test.skip('removeTodo should not mutate the original array', () => {
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: false},
    {id:3, name: 'three', isComplete: false}
  ]
  const targetId = 2
  const result = removeTodo(startTodos, targetId)

  expect(result).not.toBe(startTodos)
})

// Test for filterTodos
test('filterTodos should return all items for the root route', () => {
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: true},
    {id:3, name: 'three', isComplete: false}
  ]

  const result = filterTodos(startTodos, '/')

  expect(result).toEqual(startTodos)
})

test('filterTodos should return only completed items for the complete route', () => {
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: true},
    {id:3, name: 'three', isComplete: false}
  ]
  const expected = [
    {id:2, name: 'two', isComplete: true}
  ]

  const result = filterTodos(startTodos, '/complete')

  expect(result).toEqual(expected)
})

test('filterTodos should return only incompleted items for the active route', () => {
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: true},
    {id:3, name: 'three', isComplete: false}
  ]
  const expected = [
    {id:1, name: 'one', isComplete: false},
    {id:3, name: 'three', isComplete: false}
  ]

  const result = filterTodos(startTodos, '/active')

  expect(result).toEqual(expected)
})
