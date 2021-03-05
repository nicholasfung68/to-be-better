const generateProjectCode = (n) => {
  if (!n || typeof n !== 'number') return;
  const arr = [];
  for (let i = 1; i <= n; i+=1) {
    arr.push(`Test${i}`);
  }
  return arr;
};

const projectCodeList = generateProjectCode(10);

const autoBreakWork = (arr, n) => {
  if (!n || typeof n !== 'number' || !arr || !arr.length) return;
  let temp = [], arrCopy = [...arr], res = [];
  if (n >= arr.length) {
    return arr;
  } else {
    while (arrCopy.length > n) {
      temp = arrCopy.splice(0, n);
      res.push(temp);
    }
    while (arrCopy.length && arrCopy.length < n) {
      temp = arrCopy.splice(0, arrCopy.length);
      res.push(temp);
    }
    return res;
  }
};

const bizParamsObj = (projectCodeList) => {
  const len = projectCodeList.length, res = {};
  for (let i = 0; i < len; i+=1) {
    res[`ARG_${2+i}`] = projectCodeList[i].join(',');
  }
  return res;
};

const res = {
  RETURN_1: 'userId',
  RETURN_2: 'Test1,Test2,Test3,',
  RETURN_3: 'Test4,Test5,Test6,',
  RETURN_4: 'Test7,Test8,Test9,',
  RETURN_5: 'Test10,'
}

const needDeleteProjectList = (obj) => {
  const keyArr = Object.keys(obj), result = [];
  const index = keyArr.findIndex(i => i === 'RETURN_1');
  keyArr.splice(index, 1);
  for (let i = 0; i < keyArr.length; i+=1) {
    const arr = res[keyArr[i]].split(',');
    arr.length && arr.forEach(element => {
      element && result.push(element);
    });
  }
  return result;
}
const sql = `
  DELETE FROM PROJECT WHERE RETURN_3 IN
  ('${needDeleteProjectList(res).join("','")}');
`;
console.log(sql)

// console.log(bizParamsObj(autoBreakWork(projectCodeList, 3)));

