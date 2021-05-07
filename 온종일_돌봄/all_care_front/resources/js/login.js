$(document).ready(function(){

    $('.login-btn').on('click', function(event){
    	
        var user_id=$('#id').val();
        var user_pw=$("#password").val();
        console.log("userId:", user_id);
        console.log("userpw:", user_pw);
        
        if($("#id").val()==""){
            alert("아이디를 입력해주세요.");
            $("#id").focus();
            return false;
        }//if-#id

        if($("#password").val()==""){
            alert("비밀번호를 입력해주세요.");
            $("#password").focus();
            return false;
        }//if-#password

        $.ajax({
            url:"/login_check",
            type: 'post',
            data:{
                userid: user_id,
                userpw: user_pw
            },
            dataType:'json',
            success: function(dd, num){
            	console.log("num : " + num);
            	console.log("dd : " + dd);
                if(dd!==1){
                    alert("가입하지 않은 아이디이거나, 잘못된 비밀번호입니다");
                    $("#id").val("");
                    $("#password").val("");
                    return false;
                }else {
                    $("#idMessage").hide();
                    return false;
                  }
            },//success         

            error: function(dd, num){
            	console.log("num : " + num);
            	console.log("dd : " + dd);
                console.log("실패");
                // alert("가입하지 않은 아이디이거나, 잘못된 비밀번호입니다");
            }//end-error
            
        });//ajax
        
//        $('.membership-login-form>form').submit();
        $('.login-btn').submit();
        
    })//$.login-btn
    
});//$document