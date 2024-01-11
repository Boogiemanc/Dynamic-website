const col_elements = document.getElementsByClassName('column');

var l = col_elements.length
for(i = 0; i<l; i++){

    col_elements[i].style.flex = "30%"
}


function expandlist(){
   
 document.getElementById('DropDwnCon').classList.toggle("show");



}

    var sec = document.getElementById('DrpDwnDiv');
    var btns = sec.getElementsByClassName("TagBtn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
        
        for (var j = 0; j < btns.length; j++) {
            btns[j].classList.remove('active');
        }

        this.classList.toggle('active');
       } )
     
    }



   
    


///function to close filter menu if out of range i.e not inclued in .dropdown
window.onclick = function(event){
    if(!event.target.closest(".dropdown")){
        var drpDwn = document.getElementsByClassName('nav_filter');
        
        for(i = 0; i< drpDwn.length; i++){
            var opendrpdwn = drpDwn[i];
            if(opendrpdwn.classList.contains('show')){

                opendrpdwn.classList.remove('show');
                
            }

        }




    }


}

window.onload = function(){
//send tag froms to flask
    const Form_Ele = document.getElementById('Tag_form');




    
        Form_Ele.onsubmit = function(event){
            event.preventDefault();
            var all_tags = [];
        const TempTag = document.forms["Tag_form"];
        console.log(TempTag[4]);
        for(x = 0; x<TempTag.length; x++) {
            if(TempTag[x].classList.contains('active')){
                all_tags.push(TempTag[x].value);
            }
         
          if(all_tags[x] == 'All'){
            all_tags[x] = '*';
          }
         
    
        }
    
        
        
        console.log(all_tags);
        var xhttp = new XMLHttpRequest();
        xhttp.open('POST','/work_extended',true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        params = 'Tags=';
        for (j = 0; j< all_tags.length; j++){
            params += all_tags[j]+'&'
        }
        
         console.log(params);
        xhttp.onload = function() {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
              console.log(xhttp.responseText);
              
              
              document.getElementById("WorkListDis").innerHTML= xhttp.responseText ;
              
            } else {
              console.error(xhttp.statusText);
            }
          };
          xhttp.send(params);
          return false
        

        }
        
    
    }
    


