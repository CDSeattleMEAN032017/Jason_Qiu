
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
