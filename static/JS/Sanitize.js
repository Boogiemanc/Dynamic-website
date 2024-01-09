
var Inputs_TextBox = document.getElementsByClassName('sm_Input').value;
 var Messages_Box = document.getElementsByClassName('Big_msg').value;
const sanitize = new Sanitizer()
Inputs_TextBox = Inputs_TextBox



//SEND Messages to the DB

function timeout_sub(){
  document.getElementById("Big_TxT_Sub").disabled = true;
   
    
  setTimeout(()=> {
    document.getElementById("Big_TxT_Sub").disabled = false;
   
   
    document.getElementById("Big_TxT_Sub").style.pointerEvents= 'auto';
 
  },5000)
  
  document.getElementById("Big_TxT_Sub").style.pointerEvents= 'none';
 
}

  window.onload = function(){
    //Send info to flask mail......
  const Form_EM = document.getElementById('Email_Form');
  const Form_MSG = document.getElementById('MSG_Form');
  
   //remove submit btn 
  Form_EM .onsubmit = function(event){
    event.preventDefault();
    document.getElementById('Email_Query').disabled = true;
    document.getElementById('Email_Query').style.pointerEvents= 'none';
    setTimeout(()=> {
      
      document.getElementById('Email_Query').disabled = false;
     
      
      document.getElementById('Email_Query').style.pointerEvents= 'auto';
    },5000)
 var SusBot =document.getElementById("Sus_Name").value;
 var Name = document. getElementById("Name").value;
 var Email = document. getElementById("email").value;
 var Msg = document. getElementById("message").value;


 
 if(SusBot.length>0 ){
//CHECK if the honey pot catches input 
   
    document.getElementsByClassName("social_msg").value = 'ER0R: Beep  Bot Detected';
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
    timeout_sub();
    var xhttp = new XMLHttpRequest();
    var para_Msg = 'Msg='+Msg;
    xhttp.open('POST', 'Socials', true); 
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onload = function() {
      if (xhttp.readyState === 4 ) {

        if (xhttp.status === 200) {
        
         
         document. getElementById("Msg_Board").value ='Sent! Please wait for 5 seconds';
         
        }
      } else {
        console.error(xhttp.statusText);
      }
      
    };
    xhttp.send(para_Msg);
    return false;
   
}
}