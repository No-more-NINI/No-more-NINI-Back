PGHOST='ec2-54-72-155-238.eu-west-1.compute.amazonaws.com'
PGUSER='ucdxvwsgshoxav'
PGDATABASE='dekvjpb85ghung'
PGPASSWORD='c7d356887a7d3cd0dcf82e27ed09b9a6ab53ec9bbb23de6922c6f0ed91c7ce2c'
PGPORT=5432


const { Client } = require('pg');
const connectionData = {
    user: PGUSER,
    host: PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: 5432,
    ssl: { rejectUnauthorized: false }
  
}


function check_usr(str){
    const con = new Client(connectionData);
    
    var obj = JSON.parse(str);
    sql='SELECT id FROM m_user where email='+obj.email+' and password='+obj.password;
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Result: " + result);
            //return result
        });
    }); 
}
/*function update_profile(str){
    var obj=JSON.parse(str);
    sql='update from m_user set '
}*/
function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
    return Value * Math.PI / 180;
}
//0 = buscar feina
//1= buscar gent per treballar
function near_by(json) {
    const con = new Client(connectionData);

    var obj=JSON.parse(json);
    if(obj.type=='0'){
        sql="select * from m_company c JOIN m_user u on c.usrId=u.id";
    }else{
        sql="select * from m_employee e JOIN m_user u on e.usrId=u.id";
    }
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query(sql, function (err, result) {
            if (err) throw err;
            Object.keys(result).forEach(function(key) {
                var row = result[key];
                console.log(row.name)
              });
        });
    }); 
}

function get_offers(json){
    const con = new Client(connectionData);
    console.log(json);
    var obj = JSON.parse(json);
    sql = 'SELECT * FROM m_offer WHERE idcomp='+obj.id;

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query(sql, function (err, result) {
            if (err) throw err;
            con.end();
            return result.rows;
        });
    });
}

exports.get_offers=get_offers;
//module.export={check_usr, get_offers};