
const Inputs_TextBox = document.getElementsByClassName('sm_Input').value;
const Messages_Box = document.getElementsByClassName('Big_msg').value;
const Pushbutton_MsgB = document.getElementById("Big_TxT_Sub");


function sendMsgtoDB(){


}


  window.onload = function(){
  const Form_EM = document.getElementById('Email_Form');
  const Form_MSG = document.getElementById('MSG_Form');
  //Send info to flask mail......
  Form_EM .onsubmit = function(event){
    event.preventDefault();
  

 var SusBot =document.getElementById("Sus_Name").value;
 var Name = document. getElementById("Name").value;
 var Email = document. getElementById("email").value;
 var Msg = document. getElementById("message").value;


 
 if(SusBot.length>0 ){

   
    document.getElementsByClassName("social_msg").innerHTML = 'ER0R: Beep  Bot Detected';
    return false
 }else{
    
    var xhttp = new XMLHttpRequest();
    var params = 'Name='+Name+"&Email="+Email+"&Message="+Msg;
    xhttp.open('POST', 'Socials', true); 
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onload = function() {
      if (xhttp.readyState === 4 ) {

        if (xhttp.status === 200) {
        
         
         document. getElementById("Name").value =' ';
         document. getElementById("email").value =' ';
         document. getElementById("message").value =' ';
         console.log(document. getElementById("Name").innerHTML);
        }
      } else {
        console.error(xhttp.statusText);
      }
      
    };
    xhttp.send(params);
    return false;
 }

  }
//Send Info to DataBase and use as whspers in Introduction....
 Form_MSG.onsubmit = function(event){
    var Msg = document. getElementById("Msg_Board").value;
    
    var xhttp = new XMLHttpRequest();
    var para_Msg = 'Msg='+Msg;
    xhttp.open('POST', 'Socials', true); 
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onload = function() {
      if (xhttp.readyState === 4 ) {

        if (xhttp.status === 200) {
        
         
         document. getElementById("Msg_Board").value =' ';
        
        }
      } else {
        console.error(xhttp.statusText);
      }
      
    };
    xhttp.send(para_Msg);
    return false;
   
}
}