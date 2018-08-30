export const numToIcon = {
  0: 'music',
  1: 'umbrella',
  2: 'bolt',
  3: 'paw',
  4: 'taxi',
  5: 'home',
  6: 'plus',
  7: 'motorcycle'
}

export const shuffleArray = arr => {
  for (let i = arr.length - 1; i >= 0; i--){
    let j = Math.floor(Math.random() * i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const timeFormatter = num => num <= 9 ? '0' + num : num;