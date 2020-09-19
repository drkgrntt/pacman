import { DIRECTIONS, OBJECT_TYPE } from './setup'

// Primitive random movement
export const randomMovement = (position, direction, objectExist) => {
  let dir = direction
  let nextMovePos = position + dir.movement

  // Create an array from the directions object keys
  const keys = Object.keys(DIRECTIONS)

  while (
    objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
    objectExist(nextMovePos, OBJECT_TYPE.GHOST)
  ) {
    // Check to see if the ghost can actually move
    const canMove = keys.some((key) => {
      const direction = DIRECTIONS[key]
      return (
        objectExist(position + direction.movement, OBJECT_TYPE.WALL) ||
        objectExist(position + direction.movement, OBJECT_TYPE.GHOST)
      )
    })

    if (!canMove) {
      nextMovePos = position
      break
    }

    // Get a random key from the key array
    const key = keys[Math.floor(Math.random() * keys.length)]
    // Set the next move
    dir = DIRECTIONS[key]
    // Set the next move
    nextMovePos = position + dir.movement
  }

  return { nextMovePos, direction: dir }
}
