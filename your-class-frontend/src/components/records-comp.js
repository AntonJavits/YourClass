let previousRecord = '';
let counter = 0;
 for (let i=0; i<data.length; i++) {
     console.log(classes);
     console.log("i: " + i);
     console.log("data[i].classRecordName: " + data[i].classRecordName);
     console.log("Previous record: " + previousRecord);
     if ( data[i].classRecordName === previousRecord) {
          counter++;
          classes[previousRecord] = counter;
          console.log("classes[previousRecord]: " + classes[previousRecord]);
      } else {
          console.log("It's new!");
          counter = 1;
          // classes.push({ [data[i].classRecordName] : counter });
          previousRecord = data[i].classRecordName;
      }
  } 
  console.log(classes);