$(document).ready(function () {

  var idReg = /^[a-zA-Z0-9]{6,10}$/;
  var pwReg = /^[a-zA-Z0-9]{6,10}$/;
  var nameReg = /^[가-힣]+$/;
  var orgReg = /^[가-힣\s]+$/; //한글+공백   
  var nicknameReg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*]+$/;
  var emailReg = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  var phnumReg = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;

  $('.join-submit').on('click', function (event) {    
    
    // 아아디 비어있으면 안된다.
    if ($("#id").val() == "") {
      alert("아이디를 입력해주세요!!");
      $("#id").focus();
      return false;
    }
    
    // 아이디 형식 검사
    if (!idReg.test($("#id").val())) {
      alert("아이디를 다시 입력해주세요!!");
      $("#id").focus();
      return false;
    }


    // 비밀번호 
    if($("#password").val()==""){
      alert("비밀번호를 입력해주세요!!");
      $("#password").foucus();
      return false;
    }//if

    // 비밀번호 형식검사
    if (!pwReg.test($("#password").val())) {
      alert("비밀번호를 입력해주세요!!");
      $("#password").focus();
      return false;
    }

    //비밀번호 확인 빈칸 검사
    if($("#passwordCheck").val()==""){
      alert("비밀번호 확인을 입력해주세요!");
      $("#passwordCheck").focus();
      return false;
    }    

    // 비밀번호 재확인
    if ($("#password").val() !== $("#passwordCheck").val()) {
      alert("비밀번호 확인을 다시 입력해주세요!!!");
      $("#passwordCheck").focus();
      return false;
    }

    // // 아이디랑 비밀번호랑 같은지
    // if ($("#id").val() == ($("#password").val())) {
    //   $("#password").focus();
    //   return false;
    // }


    // 이름
    if($("#name").val()==""){
      alert("이름을 입력해주세요.");
      $("#name").focus();
      return false;
    }//if

    // 이름 형식 검사
    if (!nameReg.test($("#name").val())) {
      alert("이름을 다시 입력해주세요!!");
      $("#name").focus();
      return false;
    }

    // 닉네임
    if($("#nickname").val()==""){
      alert("닉네임을 입력해주세요.")
      $("#nickname").focus();
      return false;
    }//if

    // 닉네임 형식 검사
    if(!nicknameReg.test($("#nickname").val())){
      alert("닉네임을 다시 입력해주세요!!");
      return false;
    }

    //기관명
    if($("#org_name").val()==""){
      alert("기관명을 입력해주세요!!");
      $("#org_name").focus();
      return false;
    }

    // 휴대폰 번호 빈칸 검사
    if($("#phnum").val()==""){
      alert("휴대폰 번호를 입력해주세요!");
      $("#phnum").focus();
      return false;
    }//if

    // 휴대폰 번호 형식 검사
    if (!phnumReg.test($("#phnum").val())) {
      alert("휴대폰 번호를 입력해주세요!!");
      $("#phnum").focus();
      return false;
    }

    //이메일
    if($("#email").val()==""){
      alert("이메일을 입력해주세요!!");
      $("#email").focus();
      return false;      
    }//if


    if (!emailReg.test($("#email").val())) {
      alert("이메일을 다시 입력해주세요!!");
      $("#email").focus()
      return false;
    }

    //     if ($("#CertiFicationNumber").val() == "") {
    //       $("#CertiFicationNumber").focus();
    //       return false;
    //     } else {
    //       $("#emailMessage").hide();
    //     }

    //   if ($("#CertiFicationNumber").val() !== "") {
    //     var authenNum = $('#CertiFicationNumber').val();
    //     $.ajax({
    //       url: "/member/authen",
    //       type: "post",
    //       data: {
    //         "authenNum": authenNum
    //       },
    //       success: function (data) {
    //         if (data == 1) {

    //           $('.join-form').submit();
    //         } else {
    //           $("#CertiFicationNumber").val("");
    //           alert("인증번호를 정확히 입력해주세요.");
    //           return false;
    //         }
    //       },
    //       error: function () {
    //         console.log("실패")
    //       }
    //     })
    //   }
  }); //submit

  //======================================================================================================================//

  $('#id').on('blur', function (event) {
    var user_id = $('#id').val();
    console.log("user_id:", user_id);
    if (user_id == "") {
      $("#idMessage").show();
      $("#idMessage").text("아이디를 입력해주세요.");
      return false;
    }
    $.ajax({
      url: '/member/idcheck',
      type: 'post',
      data: {
        id: user_id
      },
      dataType: 'json',
      success: function (userId) {
        console.log("userId:", userId);
        console.log("user_id:", user_id);
        if (userId == 1) {
          $("#idMessage").show();
          $("#idMessage").text("이미 가입된 아이디입니다.");
          $("#id").val("");
          return false;
        } else if (!idReg.test(user_id)) {
          $("#idMessage").show();
          $("#idMessage").text("아이디는 숫자 문자 포함 6~10자로 입력해주세요.");
          return false;
        } else {
          $("#idMessage").hide();
          return false;
        }
      }, //end-success
      error: function () {
        console.log("실패");
      } //end-error
    }); //ajax
  });

  $('#nickname').on('blur', function (event) {
    var user_nick = $("#nickname").val();
    console.log("user_nick : ", user_nick);
    if (user_nick == "") {
      $("#nicknameMessage").show();
      $("#nicknameMessage").text("닉네임을 입력해주세요.");
      return false;
    }
    $.ajax({
      url: '/member/nickcheck',
      type: 'post',
      data: {
        nickname: user_nick
      },
      dataType: 'json',
      success: function (nick) {
        console.log("nick cnt ::: ", nick);
        if (nick == 1) {
          $("#nicknameMessage").show();
          $("#nicknameMessage").text("이미 가입된 별명입니다.");
          $("#nickname").val("");
          return false;
        } else if (!nicknameReg.test(user_nick)) {
          $("#nicknameMessage").show();
          $("#nicknameMessage").text("별명은 한글 영어 숫자로 이루어진 5~10글자로 입력해주세요.");
          return false;
        } else {
          $("#nicknameMessage").hide();
          return false;
        }
      }, //end-success
      error: function () {
        console.log("닉네임에서 에러발생")
      } //end-error
    }); //ajax
  }); //nick
  
  $("#org_name").on("blur", function(event){
    if($("#org_name").val()===""){
      $("#org_nameMessage").show();
      $("#org_nameMessage").text("기관명을 입력해주세요.");
      return false;
    }else if(!orgReg.test($("#org_name").val())){
      $("#org_nameMessage").show();
      $("#org_nameMessage").text("빈칸을 포함한 한글을 입력해주세요.");
      return false;
    }else{
      $("#org_nameMessage").hide();
      return false;
    }
  });

  $('#password').on('blur', function (event) {
    if ($('#password').val() === "") {
      $("#pwMessage").show();
      $("#pwMessage").text("비밀번호를 입력해주세요.");
      return false;
    } else if (!pwReg.test($("#password").val())) {
      $("#pwMessage").show();
      $("#pwMessage").text("비밀번호는 숫자 문자 포함 6~10자로 입력해주세요.");
      return false;
    } else if ($("#id").val() == ($("#password").val())) {
      $("#pwMessage").show();
      $("#password").val("");
      $("#pwMessage").text("비밀번호가 아이디랑 같습니다.");
      return false;
    } else {
      $("#pwMessage").hide();
      return false;
    }
  });

  $('#passwordCheck').on('blur', function (event) {
    if ($('#passwordCheck').val() == "") {
      $("#pwCheckMessage").show();
      $("#pwCheckMessage").text("비밀번호 확인을 입력해주세요.");
      return false;
    } else if ($("#password").val() !== $("#passwordCheck").val()) {
      $("#passwordCheck").val("");
      $("#pwCheckMessage").show();
      $("#pwCheckMessage").text("비밀번호랑 비밀번호 확인이 다릅니다.");
      return false;
    } else {
      $("#pwCheckMessage").hide();
      return false;
    }
  });

  $('#name').on('blur', function (event) {
    if ($('#name').val() == "") {
      $("#nameMessage").show();
      $("#nameMessage").text("이름을 입력해주세요.");
      return false;
    } else if (!nameReg.test($("#name").val())) {
      $("#nameMessage").show();
      $("#nameMessage").text("이름이 형식에 맞지 않습니다.");
      return false;
    } else {
      $("#nameMessage").hide();
      return false;
    }
  });

  $('#phnum').on('blur', function (event) {
    if ($('#phnum').val() == "") {
      $("#phnumMessage").show();
      $("#phnumMessage").text("휴대폰 번호를 입력해주세요.");
      return false;
    } else if (!phnumReg.test($("#phnum").val())) {
      $("#phnumMessage").show();
      $("#phnumMessage").text("휴대폰 번호 형식에 맞지 않습니다.");
      return false;
    } else {
      $("#phnumMessage").hide();
      return false;
    }
  });

  $('#email').on('blur', function (event) {
    var user_email = $('#email').val();
    console.log("user_email : ", user_email);

    if (user_email === "") {
      $("#emailMessage").show();
      $("#emailMessage").text("이메일을 입력해주세요.");
      return false;
    }
    $.ajax({
      url: '/member/emailcheck',
      type: 'post',
      data: {
        email: user_email
      },
      dataType: 'json',
      success: function (data) {
        console.log(data);
        if (data == 1) {
          $("#emailMessage").show();
          $("#emailMessage").text("사용 중인 이메일입니다.");
          $("#email").val("");
          return false;
        } else if (!emailReg.test(user_email)) {
          $("#emailMessage").show();
          $("#emailMessage").text("이메일 형식이 틀립니다.");
          $("#email").val("");
          return false;
        } //if
        else {
          $("#emailMessage").hide();
        }

      }, //end-success
      error: function () {
        console.log("실패");
      } //end-error
    }) //ajax
  });




  function emailAuthentiCation() {
    var email = $('#email').val();
    console.log(email);
    $.ajax({
      url: "/member/emailAuthen",
      type: "post",
      data: {
        "email": email
      },
      success: function (data) {
        alert("이메일로 인증번호를 보냈습니다");
      },
      error: function () {
        alert("이메일을 정확히 입력해주세요.");
      }
    })
  }

  function authentiCation() {
    var authenNum = $('#CertiFicationNumber').val();
    $.ajax({
      url: "/member/authen",
      type: "post",
      data: {
        "authenNum": authenNum
      },
      success: function (data) {
        if (data == 1) {
          $('#CertiFicationNumber').attr("disabled", true);
          $("#CertiFicationMessage").show();
          $("#CertiFicationMessage").css("color", "blue").text("인증완료");
          alert("인증이 확인되었습니다.");
          $('#CertiFicationConfirm').remove();
        } else {
          $("#CertiFicationNumber").val("");
          alert("인증번호를 정확히 입력해주세요.");
        }
      },
      error: function () {
        console.log("실패")
      }
    })
  }
  $('#emailAuthentiCation').on('click', emailAuthentiCation);
  $('#CertiFicationConfirm').on('click', authentiCation);
});