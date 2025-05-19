const auth = (req,res,next)=>{
    let userName = "arpit"
    let password = "1234"

    if(userName === "arpit" && password === "123"){
        next();
    }else{
        res.send("Unauthorized").status(404)
    }
}
module.exports = auth
