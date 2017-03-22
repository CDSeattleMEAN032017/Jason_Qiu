var app = angular.module('myApp', ['ngRoute','ngCookies']);
app.config(function ($routeProvider) {
// Routes to load your new and edit pages with new and edit controllers attached to them!
$routeProvider
  .when('/',{
      templateUrl: '../partials/regandlogin.html',
  })
  .when('/profile/:userid',{
      templateUrl: '../partials/profile.html',
  })
  .otherwise({
    redirectTo: '/'
  });
});
app.factory('userFactory',['$http', function($http){
   var factory = {};
   factory.register = function(newuser,callback){
     $http.post('/register',newuser).then(
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
   factory.login = function(user,callback){
     $http.post('/login',user).then(
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
   factory.logout = function(user,callback){
     $http.post('logout',user).then(
       function(res){
         console.log(res);
         callback(res.data)
       },
       function(response){
         console.log(response);
         callback(res.data)
       }
     )
   }
  //  factory.profile=function (userid,callback){
  //    url='/users/'+userid
  //    $http.get(url).then(
  //      function(response){
  //        factory.user=response.data.user
  //        callback(factory.user)
  //      },
  //      function(response){
  //        console.log(response);
  //      }
  //    )
  //  }
  //  factory.checkInput=function(newuser){
  //   //  console.log(newuser);
  //     if(typeof(newuser)==='undefined'){
  //       return true;
  //     }
  //     else if (!newuser.firstname ||!newuser.lastname || !newuser.birthday ){
  //       return true;
  //     }
  //     else{
  //       return false;
  //     }
  //  }
   return factory;
}])

app.controller('UsersController',['$scope','userFactory','$location','$routeParams','$cookies',function ($scope,userFactory,$location,$routeParams,$cookies) {
  if($cookies.get('message')){
      $scope.message=$cookies.get('message')
      $cookies.remove('message')
  }
  console.log("enter controller");
  $scope.register=function(){
    userFactory.register($scope.newuser,function (data){
      if(data.user){
        $scope.user = data.user;
        $scope.newuser={}
        $cookies.put('message', data.info)
        url='/profile/'+$scope.user._id
        $location.url(url)
        }
        else {
          console.log(data.info);
          $scope.message=''
          for(key in data.info){
            // console.log(key);
            $scope.message+=data.info[key] +'  '
          }
          console.log($scope.message)
        }
      })
  };
  $scope.login=function(){
    userFactory.login($scope.user,function (data){
      if(data.user){
        $scope.user = data.user;
        $cookies.put('message', data.info)
        url='/profile/'+$scope.user._id
        $location.url(url)
        }
        else {
          console.log(data.info);
          $scope.message=''
          for(key in data.info){
            console.log(key);
            $scope.message+=data.info[key] +'  '
          }
          console.log($scope.message)
        }
    })
  };
  $scope.logout=function(){
    userFactory.logout($scope.user,function (data){
      if(data.info){
        $scope.user = {}
        $cookies.put('message', data.info)
        url='/'
        $location.url(url)
        }
        else {
          $scope.message=''
          for(key in data.errors){
            console.log(key);
            $scope.message+=data.errors[key] +'  '
          }
          console.log($scope.message)
        }
      })
  };
  // $scope.profile=function(userid){
  //   userFactory.show(userid,function (data){
  //       $scope.user = data;
  //       console.log($scope.user);
  //     });
  // };
  // if($routeParams){
  //   if($routeParams.userid){
  //     $scope.userid=$routeParams.userid
  //     $scope.profile($scope.userid)
  //   }
  // }
  // $scope.checkCreateInput=function(){
  //   return userFactory.checkInput($scope.newuser)
  // }
  // $scope.checkUpdateInput=function(){
  //   return userFactory.checkInput($scope.user)
  // }
  // $scope.new=function(){
  //   $location.url('/users/new')
  // }
}])
