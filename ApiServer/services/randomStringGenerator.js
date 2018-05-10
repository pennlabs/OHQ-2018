// converts a number from 0 to 20^4 - 1 to a unique length 4 alphabetical string
// consisting of only alphabetical characters excluding vowels (AEIOUY)
// to avoid the possibility of offensive or inappropriate words.
function convertNumber(n) {
  const arr = Array(4)
  const consonants = 'bcdfghjklmnpqrstvwxz'
  for (let i = 3; i >= 0; i--) {
    const remainder = n % 20
    arr[i] = consonants[remainder]
    n -= remainder
    n /= 20
  }
  return arr.join('')
}

// This algorithm generates a pseudorandom length 4 string consisting of alphabetical characters
// excluding vowels each time it is called (e.g. FGHZ, JHQP).  It is guaranteed that there will be
// no repeats until all options have been exhausted.
// the algorithm is inspired by double hashing (for open addressing)

// i represents our iteration number. We set it to -1 so it is zero for the first value.
let i = -1
// This is the first prime number before 20^4 - 1.  By making the length prime, we ensure
// we can pick any offset we want and we will not produce a cycle less than the
// length of the entire output space. The tradeoff is that we lose some possible values
// (in this case, 20 possible values)
const length = 159979
// we pick a random starting point
const startingPos = Math.floor(Math.random() * length)
// and a random offset of value at least 1.
const offset = 1 + Math.floor(Math.random() * (length / 2))

module.exports = function() {
  i += 1
  return convertNumber((startingPos + offset * i) % length)
}
