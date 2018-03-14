var mysql = require('mysql');
var async = require('async');
let str = `Visitors enter new Chinese manned submersible, the "Shenhai Yongshi," as part of a public event in Sanya, Hainan Province, March 11, 2018. Created for the Chinese Academy of Sciences, the "Shenhai Yongshi" was successfully tested in October, 2017, reaching depths of 4,500 meters below the surface. "Shenhai Yongshi" is the second deep-sea submersible to be put into service after the "Jiaolong," which reached the bottom of the Mariana Trench, some 7 kilometers below the surface, in June, 2012. China's new manned submersible, the "Shenhai Yongshi" or "Deep-sea Warrior," has opened to the public in Sanya, Hainan Province, March 11, 2018. Created for the Chinese Academy of Sciences, the "Shenhai Yongshi" was successfully tested in October, 2017, reaching depths of 4,500 meters below the surface. "Shenhai Yongshi" is the second deep-sea submersible to be put into service after the "Jiaolong," which reached the bottom of the Mariana Trench, some 7 kilometers below the surface, in June, 2012. Visitors enter new Chinese manned submersible, the "Shenhai Yongshi," as part of a public event in Sanya, Hainan Province, March 11, 2018. Created for the Chinese Academy of Sciences, the "Shenhai Yongshi" was successfully tested in October, 2017, reaching depths of 4,500 meters below the surface. "Shenhai Yongshi" is the second deep-sea submersible to be put into service after the "Jiaolong," which reached the bottom of the Mariana Trench, some 7 kilometers below the surface, in June, 2012. `;
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'rm-uf6eptv2mue2xbxn0.mysql.rds.aliyuncs.com',
  user            : 'root',
  password        : 'Password1qaz',
  database        : 'test'
});

//str="1"
let valuses = [];
let value1 = "";
for(let i=6;i<400000;i++){
  if(i==6){
    value1 +='('+i+',"pangff'+i+'","1234567890","'+str+'")'
  }else{
    value1 +=',('+i+',"pangff'+i+'","1234567890","'+str+'")'
  }
}
valuses.push(value1);

let value2 = "";
for(let i=400000;i<800000;i++){
  if(i==400000){
    value2 +='('+i+',"pangff'+i+'","1234567890","'+str+'")'
  }else{
    value2 +=',('+i+',"pangff'+i+'","1234567890","'+str+'")'
  }
}
valuses.push(value2);



console.log(valuses.length)

pool.getConnection(function(err, connection) {
  // Use the connection
  async.eachOfSeries(valuses,(item,callback)=>{
    connection.query('INSERT INTO test.base (id ,name,phone, article ) VALUES '+item, function (error, results, fields) {

      console.log(results)
      // And done with the connection.
      connection.release();
      // Handle error after the release.
      if (error){
        console.error(error)
      }
      callback()

      // Don't use the connection here, it has been returned to the pool.
    });
  })
});