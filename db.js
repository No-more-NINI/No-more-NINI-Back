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


const con = new Client(connectionData);
con.connect();

async function check_usr(str){
    // const con = new Client(connectionData);
    var obj = JSON.parse(str);
    sql='SELECT id FROM m_user where email=\''+obj.email+'\' and password=\''+obj.pass+'\';';
    // con.connect();
    var x= await con.query(sql);
    // console.log(x)
    if(x.rowCount==1){
        sql='SELECT usrId FROM m_employee where usrId=\''+x.rows[0].id+'\';';
        var y =await con.query(sql);
        if(y.rowCount==1)
            x.rows[0].type=0;
        else
            x.rows[0].type=1;
    }
    return x.rows; 
}
/*function update_profile(str){
    var obj=JSON.parse(str);
    sql='update from m_user set '
}*/
/*function calcCrow(lat1, lon1, lat2, lon2) {
    if(lat1==0&&lon1==0&&lat2==0&&lon2==0)
        return 0
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
}*/
function calcCrow(latitude1, latitude2, longitude1, longitude2){
    var dist1 = Math.sqrt(latitude1*latitude1 + longitude1*longitude1);
    var dist2 = Math.sqrt(latitude2*latitude2 + longitude2*longitude2);
    console.log(dist1==null);
    if(isNaN(dist1)&&isNaN(dist2))
        return 1;
    return Math.abs(dist2-dist1);
}
// Converts numeric degrees to radians
function toRad(Value) {
    return Value * Math.PI / 180;
}
//0 = buscar feina
//1= buscar gent per treballar
const MAX_DIST=1;
async function near_by(json) {
    // const con = new Client(connectionData);

    var obj=JSON.parse(json);
    if(obj.type=='0'){
        sql="select * from m_company c JOIN m_user u on c.usrId=u.id";
    }else{
        sql="select * from m_employee e JOIN m_user u on e.usrId=u.id";
    }
    // con.connect();
    var x=await con.query(sql);
    sql="select latitude,longitude from m_user where id="+obj.id;
    var y=await con.query(sql);
    var res=[];
    //if(y.longitude!=null && y.latitude!=null){
        for(var i = 0; i < x.rowCount; i++) {
            var obj = x.rows[i];
            //if(obj.latitude!=null && obj.longitude!=null){
                console.log(obj);
                d=calcCrow(obj.latitude,obj.longitude,y.latitude,y.longitude);
                // d=calcCrow(10,5,30,20);
                console.log(d);
                if(d<=MAX_DIST)
                    res.push(obj);
                // console.log(obj.id);
            //}
        }
    //}
    return res;
}

async function get_offers(json){
    // const con = new Client(connectionData);
    // console.log(json);
    var obj = JSON.parse(json);
    sql = 'SELECT * FROM m_offer WHERE idcomp='+obj.id+';';
    // con.connect();
    var x= await con.query(sql);
    return x.rows;
}

async function accept_offer(json){
    // const con = new Client(connectionData);

    // console.log(json);
    var obj = JSON.parse(json);
    sql = 'INSERT INTO m_user_offer(idoffer, idcomp, iduser, acc_date) VALUES('+obj.idoffer+', '+obj.idcomp+', '+obj.iduser+', '+'current_timestamp)';// current_timestamp  --> data acutal sql

    // con.connect();
    if (err) throw err;
    // console.log("Connected!");
    var x= await con.query(sql);
    return x.rows;
}
async function decline_offer(json){
    // const con = new Client(connectionData);

    // console.log(json);
    var obj = JSON.parse(json);
    sql = 'INSERT INTO m_user_offer(idoffer, idcomp, iduser, acc_date) VALUES('+obj.idoffer+', '+obj.idcomp+', '+obj.iduser+', '+'current_timestamp)';// current_timestamp  --> data acutal sql

    // con.connect();
    if (err) throw err;
    // console.log("Connected!");
    var x= await con.query(sql);
    return x.rows;
}
async function location(json){
    // console.log(json);
    var obj = JSON.parse(json);
    sql= 'select latitude,longitude from m_user where id='+obj.id+';';
    var y= await con.query(sql);
    if(y.rows[0].latitude!=obj.latitude || y.rows[0].longitude!=obj.longitude){

        sql = 'UPDATE m_user set latitude='+obj.latitude+',longitude='+obj.longitude+' WHERE id='+obj.id+';';
        // console.log(x);
        var x= await con.query(sql);
        // console.log(x);
        return x.rowCount;
    }
    return 1;
}
exports.location = location;
exports.get_offers = get_offers;
exports.check_usr = check_usr;
exports.accept_offer = accept_offer;
exports.check_usr = check_usr;
exports.near_by = near_by;
