//create admin api app
const exp=require('express');
adminApp=exp.Router();


adminApp.get('/test-admin',(req,res)=>{
    res.send({message:"This from admin api"})
})

adminApp.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    //get cred obj from client
    const adminCred = req.body;
    //check for username
    const dbadmin = await usercollection.findOne({
      username: adminCred.username,
    });
    if (dbadmin === null) {
      res.send({ message: "Invalid username" });
    } else {
      //check for password
      const status = await bcryptjs.compare(adminCred.password, dbadmin.password);
      if (status === false) {
        res.send({ message: "Invalid password" });
      } else {
        //create jwt token and encode it
        const signedToken = jwt.sign(
          { username: dbadmin.username },
          process.env.SECRET_KEY,
          { expiresIn: '1d' }
        );
        //send res
        res.send({
          message: "login success",
          token: signedToken,
          user: dbadmin,
        });
      }
    }
  })
);


//export userApp
module.exports=adminApp;
