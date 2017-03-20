function formatDate(datestr) {
  var date=new Date(datestr)
  var monthNames = [
    "January", "February", "March","April", "May", "June", "July", "August", "September", "October","November", "December"];
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var hour=date.getHours();
  if (hour<10){ hour='0'+hour};
  var min=date.getMinutes();
  if (min<10){ min='0'+min};
  var sec=date.getSeconds();
  var noon=''
  if(hour<12){
    hour=hour
    noon='am'
  } else{
    hour=hour-12
    noon='pm'
  }
  return  monthNames[monthIndex] + ' '+ day + ' ' + year;
}
var app = angular.module('myApp', ['ngRoute','ngCookies']);
app.config(function ($routeProvider) {
// Routes to load your new and edit pages with new and edit controllers attached to them!
$routeProvider
  .when('/',{
      templateUrl: '../partials/all.html',
  })
  .when('/friends/new',{
      templateUrl: '../partials/new.html',
  })
  .when('/friends/:friendid/edit',{
      templateUrl: '../partials/edit.html',
  })
  .when('/friends/:friendid',{
      templateUrl: '../partials/detail.html',
  })
  .otherwise({
    redirectTo: '/'
  });
});
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

app.controller('FriendsController',['$scope','friendFactory','$location','$routeParams','$cookies',function ($scope,friendFactory,$location,$routeParams,$cookies) {
  $scope.friends = []
  if($cookies.get('errormessage')){
      $scope.errormessage=$cookies.get('errormessage')
      $cookies.remove('errormessage')
  }
  $scope.friendid=null
  console.log("enter controller");
  var index=function(){
    friendFactory.index(function (data){
        $scope.friends = data;
    });
  }
  index()
  $scope.create=function(){
    friendFactory.create($scope.newfriend,function (data){
      if(data.friend){
        $scope.friend = data.friend;
        $scope.newfriend={}
        $cookies.put('errormessage', data.info)
        url='/friends/'+$scope.friend._id
        $location.url(url)
        }
        else {
          console.log('**************');
          $scope.errormessage=''
          for(key in data.info){
            console.log(key);
            $scope.errormessage+=data.info[key] +'  '
          }
          console.log($scope.errormessage)
        }
      })
  };
  $scope.show=function(friendid){
    friendFactory.show(friendid,function (data){
        $scope.friend = data;
        console.log($scope.friend);
      });
  };
  if($routeParams){
    if($routeParams.friendid){
      $scope.friendid=$routeParams.friendid
      $scope.show($scope.friendid)
    }
  }
  $scope.delete=function(friendid){
    // console.log(friendid);
    friendFactory.delete(friendid,function (data){
        $scope.errormessage = data;});
    index()
  };
  $scope.update=function(){
    friendFactory.update($scope.friend,function (data){
        $scope.updatefriend={}
        if($scope.friend){
          $cookies.put('errormessage', data)
          url='/friends/'+$scope.friend._id
          $location.url(url)
        }
        else {
          $scope.errormessage = data;
        }
    })
  };
  $scope.checkCreateInput=function(){
    return friendFactory.checkInput($scope.newfriend)
  }
  $scope.checkUpdateInput=function(){
    return friendFactory.checkInput($scope.friend)
  }
  $scope.new=function(){
    $location.url('/friends/new')
  }
}])
