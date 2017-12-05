// Part One - Approach One (Pattern Recognition / Math)

// Let's do some pattern finding and math:

// 1) There is a clear pattern along the upper-left to lower-right diagonal.
// 2) If number 1 is coordinate (0,0), then (1, -1) is 9, (2, -2) is 25, etc. The pattern is ((sqrt(oddSquare) - 1 / 2), -(sqrt(oddSquare) - 1 / 2)). These all lie on the lower half of the diagonal.
// 3) On the upper half of the diagonal (-1, 1) is 5, (-2, 2) is 17, etc. Directly to the right will always be the even square. So, the pattern is (-(sqrt(evenSquare) / 2) + 1), sqrt(evenSquare) / 2).
// 4) Using this information, if we know the nearest square of a number, we can calculate the starting position and count up from there.

const input = 361527;

function nearestSquare(num) {
  let i = 0;
  while (Math.pow(i + 1, 2) < num) {
    i++;
  }
  return i * i;
}

function startCoordinates(perfectSquare) {
  if (perfectSquare % 2 === 0) {
    return {
      x: -1 * Math.sqrt(perfectSquare) / 2 + 1,
      y: Math.sqrt(perfectSquare) / 2
    }
  } else {
    return {
      x: (Math.sqrt(perfectSquare) - 1) / 2,
      y: -1 * (Math.sqrt(perfectSquare) - 1) / 2
    }
  }
}

function crawlAlongSpiral(x, y, perfectSquare, input) {
  let squareRoot = Math.sqrt(perfectSquare);
  // distance between any two perfect squares is (sqrt * 2 + 1)
  let inflectionPoint = squareRoot + 1;
  let counter = 0;

  if (squareRoot % 2 === 0) {
    while (perfectSquare + counter !== input) {
      counter++;
      if (counter === 1) {
        x--;
      } else if (counter < inflectionPoint) {
        y--;
      } else {
        x++;
      }
    }
  } else {
    while (perfectSquare + counter !== input) {
      counter++;
      if (counter === 1) {
        x++;
      } else if (counter < inflectionPoint) {
        y++;
      } else {
        x--;
      }
    }
  }
  return [x, y];
}

function manhattanDistance(x, y) {
  return Math.abs(x) + Math.abs(y);
}

const perfectSquare = nearestSquare(input);
var {x,y} = startCoordinates(perfectSquare);
[finalX, finalY] = crawlAlongSpiral(x, y, perfectSquare, input);
console.log(manhattanDistance(finalX, finalY));

// Part One - Approach Two

// Since, as it turns out, the pattern/math approach is futile for Part Two, let's fill in the grid stepwise for Part One and tweak for Part Two.