const generateRandom = (characters: string, length: number) => {
  var result = ""
  var charLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charLength))
  }
  return result
}

/**
 * Sinh chuỗi ngẫu nhiên theo độ dài
 * @param {int} length độ dài của chuỗi cần sinh
 */
export const makeRandomId = (length: number) =>
  generateRandom(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    length
  )
export const makeRandomSercetId = (length: number) =>
  generateRandom(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-!@#$%^&*()!",
    length
  )
