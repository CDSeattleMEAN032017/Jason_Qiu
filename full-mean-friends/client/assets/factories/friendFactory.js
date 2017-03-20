//Factory
app.factory('friendFactory',['$http', function($http){
   var factory = {};
   factory.index=function(callback){
     $http.get('/friends').then(
       function(qresponse){
        //  console.log(qresponse);
         factory.friends=qresponse.data
         for(var i=0;i<factory.friends.length;i++){
           factory.friends[i].birthday=formatDate(factory.friends[i].birthday)
         }
         callback(factory.friends)
       },
       function(qresponse){
         console.log(qresponse);
       }
     )
   }
   factory.show=function (friendid,callback){
     url='/friends/'+friendid
     $http.get(url).then(
       function(response){
        //  console.log(response);
         factory.one=response.data.friend
         factory.one.birthdaystr=formatDate(factory.one.birthday)
         factory.one.birthday=new Date(factory.one.birthday)
         callback(factory.one)
       },
       function(response){
         console.log(response);
       }
     )
   }
   factory.create = function(newfriend,callback){
     $http.post('/friends',newfriend).then(
       function(res){
         console.log(res);
         callback(res.data)
       },
       function(res){
         console.log(res);
         callback(res.data)
       }
     )
   }
   factory.delete = function(friendid,callback){
     url='/friends/'+friendid
     $http.delete(url).then(
       function(response){
         console.log(response);
         callback(response.data.info)
       },
       function(response){
         console.log(response);
         callback(response.data.errors)
       }
     )
   }
   factory.update = function(friend,callback){
     var url='/friends/'+friend._id
     $http.put(url,friend).then(
       function(response){
         console.log('*********');
         console.log(response);
         callback(response.data.info)
       },
       function(response){
         console.log('%%%%%%%%%%%%%%%%');
         console.log(response);
         callback(response.data.errors)
       }
     )
   }
   factory.checkInput=function(newfriend){
    //  console.log(newfriend);
      if(typeof(newfriend)==='undefined'){
        return true;
      }
      else if (!newfriend.firstname ||!newfriend.lastname || !newfriend.birthday ){
        return true;
      }
      else{
        return false;
      }
   }
   return factory;
}])
