module.exports=function route(app){
  console.log('this is in seperate js file');
  app.get('/', function (req, res){
    res.render('index');
  });
  app.post('/result', function (req, res){
      console.log("POST DATA \n\n", req.body)
      context={info:req.body}
    res.render('result',context);
  });
  app.get("/result", function (req, res){
      res.redirect('/');
  })
}
