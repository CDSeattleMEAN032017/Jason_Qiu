var app=angular.module('myApp',['ngRoute']);
app.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
        templateUrl: 'partials/players.html',
    })
    .when('/teams',{
        templateUrl: 'partials/teams.html',
    })
    .when('/associations',{
        templateUrl: 'partials/associations.html',
    })
    .otherwise({
      redirectTo: '/'
    });
});
app.factory('playerFactory', function(){
   var factory = {};
   var players = [{firstname:'Jason',lastname:'Qiu',id:0},{firstname:'Reed',lastname:'Denny',id:1},{firstname:'Tom',lastname:'Black',id:2}];
   factory.getplayers=function(callback){
     callback(players)
   }
   factory.add = function(newplayer,callback){
     newplayer.id=players[players.length-1].id+1
     players.push(newplayer)
     callback(players)
   }
   factory.delete = function(playertodelete,callback){
     var index=players.indexOf(playertodelete)
     players.splice(index,1)
     callback(players)
   }
   factory.addrelation = function(newrelation,callback){
    console.log(newrelation);
    var index
    for(var i=0;i<players.length;i++){
      if(players[i].id==newrelation.playerid){
        index=i
      }
    }
     players[index].team=newrelation.team
     callback(players)
   }
   factory.deleterelation = function(playerid,callback){
     console.log(playerid);
     var index
     for(var i=0;i<players.length;i++){
       if(players[i].id==playerid){
         index=i
       }
     }
     players[index].team=''
     callback(players)
   }
   factory.removeteam=function(teamtodelete){
     for(var i=0;i<players.length;i++){
       if(typeof(players[i].team)!='undefined' && players[i].team != ''){
         if(players[i].team.id==teamtodelete.id){
           players[i].team=''
         }
       }
     }
   }
   factory.checkInput=function(newplayer){
    //  console.log(newplayer);
    if(typeof(newplayer)==='undefined'){
      return true;
    }
    else if (typeof(newplayer.firstname)==='undefined' ||typeof(newplayer.lastname)==='undefined' ||newplayer.firstname ==''||newplayer.lastname =='' ){
      return true;
    }
    else{
      return false;
    }
   }
   return factory;
})
app.factory('teamFactory', function(){
   var factory = {};
   var teams = [{name:'Bull',id:0},{name:'Stone',id:1},{name:'Bad wolf',id:2}];
   factory.getteams=function(callback){
     callback(teams)
   }
   factory.add = function(newteam,callback){
     newteam.id=teams[teams.length-1].id+1
     teams.push(newteam)
     callback(teams)
   }
   factory.delete = function(teamtodelete,callback){
     var index=teams.indexOf(teamtodelete)
     teams.splice(index,1)
     callback(teams)
   }
   factory.checkInput=function(newteam){
    //  console.log(newteam);
    if(typeof(newteam)==='undefined'){
      return true;
    }
    else if (typeof(newteam.name)==='undefined' ||newteam.name =='' ){
      return true;
    }
    else{
      return false;
    }
   }
   return factory;
})
app.controller('PlayersController',['$scope','playerFactory','$location',function ($scope,playerFactory,$location) {
  // console.log($location);
  $scope.players = [];
  $scope.add=function(){
    playerFactory.add($scope.newplayer,function (data){
        $scope.players = data;})
    $scope.newplayer={}
    // $location.url('/playerlist');
  };
  $scope.delete=function(playertodelete){
    // console.log(playertodelete);
    playerFactory.delete(playertodelete,function (data){
        $scope.players = data;});
  };
  playerFactory.getplayers(function (data){
      $scope.players = data;
  });
  $scope.checkInput=function(){
    return playerFactory.checkInput($scope.newplayer)
  }
}])
app.controller('TeamsController',['$scope','teamFactory','playerFactory',function ($scope,teamFactory,playerFactory) {
  $scope.teams = [];
  $scope.add=function(){
    teamFactory.add($scope.newteam,function (data){
        $scope.teams = data;})
    $scope.newteam={}
    // $location.url('/teamlist');
  };
  $scope.delete=function(teamtodelete){
    teamFactory.delete(teamtodelete,function (data){
        $scope.teams = data;});
    playerFactory.removeteam(teamtodelete)
  };
  teamFactory.getteams(function (data){
      $scope.teams = data;
  });
  $scope.checkInput=function(){
    return teamFactory.checkInput($scope.newteam)
  }
}])
app.controller('AssociationsController',['$scope','teamFactory','playerFactory',function ($scope,teamFactory,playerFactory) {
  $scope.teams = [];
  $scope.players = [];
  $scope.dropdownplayers = [];
  $scope.tableplayers = [];
  $scope.displayplayers=function(){
    $scope.dropdownplayers = [];
    $scope.tableplayers = [];
    for (var i=0;i<$scope.players.length;i++){
      if(typeof($scope.players[i].team)==='undefined'|| $scope.players[i].team==''){
        $scope.dropdownplayers.push($scope.players[i])
      } else {
      // if(typeof($scope.players[i].team)!='undefined' && player.team !='' ){
        $scope.tableplayers.push($scope.players[i])
      }
    }
  }
  $scope.add=function(){
    for(var i=0;i<$scope.teams.length;i++){
      if ($scope.teams[i].id == $scope.newrelation.teamid){
        $scope.newrelation.team=$scope.teams[i]
      }
    }
    playerFactory.addrelation($scope.newrelation,function (data){
        $scope.players = data;})
    $scope.newrelatoin={}
    $scope.displayplayers();
  };
  $scope.delete=function(playerid){
    playerFactory.deleterelation(playerid,function (data){
        $scope.players = data;});
    $scope.displayplayers();
  };
  teamFactory.getteams(function (data){
      $scope.teams = data;
  });
  playerFactory.getplayers(function (data){
    $scope.players = data;
    // console.log($scope.players);
    $scope.displayplayers();
  });
  console.log('enter associations');
}])
