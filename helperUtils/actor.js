const calculateTime = date => new Date(date).getTime();

module.exports = {
  orderEventsInDescendingOrder: data => {
    let result = data.sort((a,b) => Number(b.num_of_event) - Number(a.num_of_event));
    return result;
  },
  orderByLoginAlphabeticalOrder: data => {
    const result = data.sort((a, b) => {
      return a.login.localeCompare(b.login)
    });
    return result;
 },
 orderByNumberOfEvents: data => {
  const d = data;
  const actorEvents = [];
  let count = 1;
  
  for(let i =0; i < d.length; i++) {
    if(d.length - 1 == i) {
      d[i].num_of_event = count
      actorEvents.push(d[i])
      break;
    }
    if(d[i].login === d[i+1].login) {
      count++
    } else {
      d[i].num_of_event = count
      actorEvents.push(d[i])
      count = 1;
    }
  }
  return actorEvents;
 },


 orderByComplexity: data => {
  const result = data.sort((a,b) => {
    const a1 = Number(a.num_of_event);
    const b1 = Number(b.num_of_event);
  
    if (a1 === b1) {
      const a1time = calculateTime(a.createdAt)
      const b1time = calculateTime(b.createdAt)
  
      if(a1time === b1time) {
        return a.login.localeCompare(b.login)
      }
      return b1time - a1time;
    }
    return b1 - a1
  });
  return result;
 },

 removeStreakAndCreatedAtFromArray: data => {

   for(let i = 0; i < data.length; i++) {
    delete data[i].streak
    delete data[i].createdAt
   }

   return data;
 },

 removeEventCountAndCreatedAtFromArray: data => {
   const arr = [];

   for(let i = 0; i < data.length; i++) {
    delete data[i].num_of_event
    delete data[i].createdAt
    arr.push(data[i])
   }

   return arr;
 },

orderByStreak: data => {
  const d = data;
  const actorEvents = [];
  let count = 0;

  const aDayInMilsec = (1000 * 3600 * 24)
  const day = 86400000

  for (let i = 0; d.length > i; i++) {
    if (d.length - 1 == i) {
      d[i].streak = count
      actorEvents.push(d[i])
      break;
    }
    if (d[i].login === d[i + 1].login) {
      const dafirst = d[i].createdAt.split(' ')[0];
      const dbfirst = d[i + 1].createdAt.split(' ')[0];
      const datime = calculateTime(dafirst);
      const dbtime = calculateTime(dbfirst);


      let dif_in_days;
      let dif_in_time;
      if (Number(datime) > Number(dbtime)) {
        dif_in_time = datime - dbtime;

      } else if (Number(dbtime) > Number(datime)) {
        const temp1 = d[i]
        const temp2 = d[i + 1]
        d[i] = temp2
        d[i + 1] = temp1
        dif_in_time = dbtime - datime;
      } else {
        dif_in_time = dbtime - datime;
      }
      dif_in_days = dif_in_time / aDayInMilsec;

      if (dif_in_days === 1) {
        const dacaltime = calculateTime(d[i].createdAt);
        const dbcaltime = calculateTime(d[i + 1].createdAt);

        const timeDiff = dacaltime + day;
        if (Number(timeDiff) > Number(dbcaltime)) {
          count++
        }
      }
      const temp1 = d[i]
      const temp2 = d[i + 1]
      d[i] = temp2
      d[i + 1] = temp1
    } else {
      d[i].streak = count
      actorEvents.push(d[i])
      count = 0;
    }
  }

  let result = actorEvents.sort((a, b) => {
    if (a.streak === b.streak) {
      const a1time = calculateTime(a.createdAt)
      const b1time = calculateTime(b.createdAt)
      if (a1time === b1time) {
        return a.login.localeCompare(b.login);
      }
      return b1time - a1time
    }

    return b.streak - a.streak
  });
  const arrInd = []

  for (let i = 0; i < result.length; i++) {
    if (result.length - 1 == i) {
      break;
    }
    if (result[i].login === result[i + 1].login) {
      arrInd.push(i)
    }
  }
  for (let i = 0; i < arrInd.length; i++) {
    result.splice(arrInd[i], 1)
  }

  return result
  },
  sortbyDate : data => {
    const result = data.sort((a, b) => {
      if (a.login === b.login) {
        const a1time = calculateTime(a.createdAt)
        const b1time = calculateTime(b.createdAt)
        return b1time - a1time;
      }
      return a.login.localeCompare(b.login)
    })

    return result;
  }
}