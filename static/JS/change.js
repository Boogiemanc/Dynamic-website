const c = document.getElementById("Drawing_Text");
c.width = window.innerWidth;
c.height = window.innerHeight;
var gh = document.getElementById("C_text").style.marginLeft = '0';

const ctx = c.getContext('2d',{ alpha: false });
ctx.fillStyle = '#0f0f0f';
ctx.fillRect(0,0,c.width,c.height)
x = c.width/2;
y = c.height/2;
var steps = 50;
var Interval = [5000,4000,6000]
minAng  = 30;
maxAng = 90;
angle = Math.floor(Math.random() *(maxAng -minAng)+minAng);
var testing = 'here';
var REalDB = Ws;
var Alpha =0.2;
var Font_Size;
var Is_Shown = false;
CoolDown = 0;
X = c.width/2
Y = c.height/2;
width = 14;
Rando_Index = 0;
function Draw(){
 
 
 ctx.clearRect(0,0,c.width,c.height);
 JumpS = setInterval(TextJumpScare, 50);
    function TextJumpScare(){
        
        
         
 //////////////Intialisation ///////////////////
       
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255,"+Alpha+")";
        ctx.font = Font_Size + " PT Serif";
        
            
        
        ctx.fillText (REalDB[Rando_Index],X,Y,width);
            Alpha = Alpha- 0.1;
            if(Alpha<=0){
                Alpha =0.2;
                Font_Size = Math.floor(Math.random(15)*(15-1)*1).toString() +"rem";
        CoolDown = Math.floor( Math.random()*(2)+1)
        width =Math.floor( Math.random(500)*(500-1)+1);
        X = Math.floor(Math.random() *c.width);
        Rando_Index =Math.floor( Math.random()*REalDB.length);
 Y = Math.floor(Math.random() *c.height);
            clearInterval(TextJumpScare);
            
            
          
            }
        
        
    }
  

    




}
requestAnimationFrame(Draw());

