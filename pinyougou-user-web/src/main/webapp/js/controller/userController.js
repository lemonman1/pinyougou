app.controller("userController",function ($scope,$controller,userService) {
    $controller('baseController',{$scope:$scope});//继承

    //1.在后台获取验证码
    $scope.getValidCode=()=>{
        userService.getValidCode($scope.entity.phone).success(response=>{
            if(response.success){

            }else{
                alert(response.message);
            }
        })
    };
    //2.用户注册
    $scope.add=()=>{
        //2.1)比较两次密码是否一致
        if($scope.entity.password !== $scope.repassword){
            alert("两次输入的密码不一致！");
            return;
        }
        alert($scope.checkedBox)
        if (!$scope.checkedBox) {
            alert("请先同意品优购用户协议！");
            return;
        }
        //2.2) 进行用户注册
        userService.add($scope.entity,$scope.validCode).success(response=>{
            if(response.success){
                $scope.entity = {};
            }else{
                alert("注册失败！");
            }
        })
    };

    //3.判断用户名是否已经存在
     $scope.hasUserName = ()=>{
        if ($scope.entity.username) {
            userService.hasUserName($scope.entity.username).success(response=>{
                if (!response.success){
                    alert(response.message);
                    return false;
                }
                return true;
            })
        }else {
            alert("请输入用户名！");
            return false;
        }
    };
});