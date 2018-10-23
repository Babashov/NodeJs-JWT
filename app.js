const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api',(req,res)=>{

  res.json({
    name:'Mahammad Babashov',
    message:'Welcome to the API'
  });
});

app.post('/api/posts',validateToken,(req,res)=>{
  jwt.verify(req.token,'secret',(err,authData)=>{
    if(err)
    {
      res.sendStatus(403);
    }else{

      res.json({

        message:'Post Created',
        authData
      })
    }
  })
});

app.post('/api/login',(req,res)=>{

  const user = {
    id:1,
    username:'Mahammad',
    email:'m@babashov.info'
  }

  jwt.sign({user},'secret',{expiresIn:'30s'},(err,token)=>{
    if(err)
    {
      console.log(`Error: ${err}`);
      throw err;
    }
    res.json({
      token
    });
  });

});

// Verify Token
function validateToken(req,res,next)
{
  // Get auth header value
  const authHeader = req.headers['authorization'];
  // Check token is null or not
  if(typeof authHeader !== 'undefined')
  {
    const auth = authHeader.split(' ');
    const token = auth[1];

    req.token = token;
    next();

  }else{
    // Forbidden
    res.sendStatus(403);
  }

}

const port = 5000;

app.listen(port,() => console.log(`Server Listening on ${port}`));