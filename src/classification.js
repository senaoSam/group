
const randomSortFn = () => Math.random() - 0.5;


const meow = 0;
const snow = 1;
const cola = 5;

function calGroup(joinList) {
  const leng = joinList.length;
  if (leng % 2 !== 0) {
    alert('人數不是偶數');

    return {
      'blue': [],
      'red': [],
    };
  }

  const joinSet = new Set(joinList);
  const hasMeow = joinSet.has(meow);
  const hasSnow = joinSet.has(snow);
  const hasCola = joinSet.has(cola);


  let randomSort = [];

  if (hasMeow && hasSnow && (Math.random() >= 0.2)) {
    joinSet.delete(meow);
    joinSet.delete(snow);
    hasCola && joinSet.delete(cola);
    randomSort = [ ...joinSet ].sort(randomSortFn);
    randomSort.unshift(meow);
    randomSort.unshift(snow);
    hasCola && randomSort.push(cola);
  }
  else {
    randomSort = [ ...joinList ].sort(randomSortFn);
  }
  const half = leng / 2;
  const team1 = randomSort.splice(Math.random() - 0.5 > 0 ? 0 : half, half).sort(randomSortFn);
  const team2 = randomSort.sort(randomSortFn);


  return {
    'blue': team1,
    'red': team2,
  };
}

export default calGroup;
