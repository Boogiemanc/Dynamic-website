import os
import json
import gunicorn
import random, math, flask_mail,secrets, string
from flask_sqlalchemy import SQLAlchemy 
from flask_mail import Mail, Message
import sqlalchemy as  DB
from sqlalchemy import Table, Select, Column, Integer, String,Insert,Update
from sqlalchemy.sql import text
from flask import Flask, redirect, request,render_template, jsonify,current_app,g
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif','svg'])

app = Flask(__name__,template_folder = 'templates')
###############MAIL SETUP##################
app.config.update(dict(
    DEBUG = True,
    MAIL_SERVER = 'smtp.gmail.com',
    MAIL_PORT = 465,
    MAIL_USE_TLS = False,
    MAIL_USE_SSL = True,
    MAIL_USERNAME = 'pastawooloo766@gmail.com',
    MAIL_PASSWORD = "roih jtom vczb ymif",
))

#######################################DB SETUP####################################
db = SQLAlchemy()

db_Name = os.path.join(os.getcwd(), 'whispers.db')
engine = DB.create_engine('sqlite:///' + db_Name, echo= True)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_Name
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
connect = engine.connect()
MD = DB.MetaData()
 
WDB = DB.Table('Dialouge_Whispers', MD, autoload_with=engine)
ARTDB = DB.Table('My_Work_List', MD,autoload_with=engine)
TAG_LINK = DB.Table('Tag_List', MD,autoload_with=engine)
TAGDB = DB.Table('Tag_Table',MD,autoload_with=engine)
#Tagging Query Starts Here#############################################
def cleaning(Tar):
 newTar = [str(*x)for x in Tar]
 return newTar
#Turn Turple into String
db.init_app(app)
mail = Mail(app)

####################WEBSITE STARTS HERE####################################
@app.route('/')
def show_Main():
    return render_template('Main_Index.html')
###########################INTRODUCTION PAGE#########################
@app.route('/Intro',methods=['GET'])
def show_Page1():
    if request.method == 'GET':
     
     qureywhisp = Select(WDB.c.Text_Field)
     Res_whisp = connect.execute(qureywhisp).fetchall()  
     RS3 = Res_whisp
     RS3 = cleaning(RS3)
     Re_Text=["Fascinated by creatures designs from Japanese media, I had created various concepts for multiple worlds for my personal work which are inspired by JRPGS, anime and Tokusatsu. Born and lived in a city which was heavily reference in Cyberpunk genres also helped me to create unique worlds with mechanics and organic matters."," With the help of virtual Reality, I create 3d assets and characters for social VR games using Blender, Unity, Photoshop, and Substance Painter. Letting me express my creativity in a virtual world."]
     Lore_Index = round( random.triangular(0,1,0.1),2)
     print(Lore_Index)
     FakeText=["WʜɒɈ iʇ Ɉʜɘ ɔɿɘɒɈυɿɘƨ ʇɿom ɒnɔiɘnɈ ɈɘxɈ ɒɿɘ ɿɘɒl?I ʜɒb ɔɿɘɒɈɘb vɒɿioυƨ ɔonɔɘqɈƨ ʇoɿ mυlɈiqlɘ woɿlbƨ ʇoɿ mγ qɘɿƨonɒl woɿʞ, wʜiɔʜ ɒɿɘ inƨqiɿɘb dγ ɿɘɒl liʇɘ ɘvɘnɈƨ I ʜɒb ovɘɿ Ɉʜɘ γɘɒɿƨ. ઘoɿn ɒnb livɘb in ɒ bγƨɈoqiɒn ɔiɈγ wʜiɔʜ ʜɘɒvilγ ɿɘʇɘɿɘnɔɘ in Ɔγdɘɿqυnʞ ϱɘnɿɘƨ ɒlƨo ʜɘlqɘb mɘ Ɉo ɔɿɘɒɈɘ υnipυɘ woɿlbƨ wiɈʜ mɘɔʜɒniɔƨ ɒnb oɿϱɒniɔ mɒɈɈɘɿƨ. Ɔɒυƨɘ Ɉʜiƨ iƨ Ɉʜɘ onlγ mɘbiυm I ɔoυlb ɘxqɿɘƨƨ wiɈʜoυɈ dɘinϱ įυbϱɘb.","WiɈʜ Ɉʜɘ ʜɘlq oʇ viɿɈυɒl ЯɘɒliɈγ, I ɔɿɘɒɈɘ Ɛb ɒƨƨɘɈƨ ɒnb ɔʜɒɿɒɔɈɘɿƨ ʇoɿ ƨoɔiɒl VЯ ϱɒmɘƨ υƨinϱ ઘlɘnbɘɿ, UniɈγ, ԳʜoɈoƨʜoq, ɒnb ƧυdƨɈɒnɔɘ ԳɒinɈɘɿ. ⅃ɘɈɈinϱ mɘ ɘxqɿɘƨƨ mγ ɔɿɘɒɈiviɈγ in ɒ viɿɈυɒl woɿlb ɒnb qɿomoɈɘ mγ ɔυlɈυɿɘ wiɈʜoυɈ Ɉʜɘm noɈiɔinϱ."]
    
    return render_template('Introduction.html',Para_Real = Re_Text, Para_Alt=FakeText,Trigger_Index =Lore_Index,whispers_list =RS3)

###########################DISPLAY WORK PAGE#########################
@app.route('/work_extended',methods = ['POST'])
def show_Refresh():
    if request.method == 'POST':
        Tags = request.form.get('Tags',default = "Error")
        print(Tags)
        if "All"  in Tags:
         Tag_Name = Select(TAG_LINK.c.Tag_Name)
         ARTWK = Select(ARTDB.c.ImageLink)
         TagQuery = cleaning(connect.execute(ARTWK).fetchall())
         Tag_NameQuery = cleaning(connect.execute(Tag_Name).fetchall())
         return render_template('2D_work_Extended.html', testingQ =TagQuery,Tags = Tag_NameQuery)
        else:
        ###GET TAGED IMAGE LINKS##################
           ARTWK = Select(ARTDB.c.ImageLink ).join(TAGDB, ARTDB.c.Work_ID== TAGDB.c.Work_ID).join(TAG_LINK, TAG_LINK.c.Tag_Id==TAGDB.c.Tag_ID).where(TAG_LINK.c.Tag_Name == Tags)
           print(connect.execute(ARTWK).fetchall())
           TagQuery = cleaning(connect.execute(ARTWK).fetchall())
        return render_template('2D_Work_Extend.html', testingQ =TagQuery)
    
@app.route('/Work',methods = ['GET','POST'])
def show_Page3():
    if request.method == 'GET':
     Tag_Name = Select(TAG_LINK.c.Tag_Name)
     ARTWK = Select(ARTDB.c.ImageLink)
     TagQuery = cleaning(connect.execute(ARTWK).fetchall())
     Tag_NameQuery = cleaning(connect.execute(Tag_Name).fetchall())

     return render_template('2D_work.html', testingQ =TagQuery,Tags = Tag_NameQuery)
    
 ###########################SOCIALS PAGE#########################   
@app.route('/Socials',methods = ['GET','POST'])
def show_Page2():
    if request.method == "GET":
        return render_template("Socials.html")

    if request.method == 'POST':
        if 'Name' in request.form:
         Name = request.form.get('Name', default="Error")
         Email = request.form.get('Email', default="Error")
         Msg = request.form.get('Message', default="Error")
         msg = Message('Auto_Message from'+ Name,
                      sender=Email,
                      
                      recipients=["pastawooloo766@gmail.com"])
         msg.body = Msg + ' <<< From email:'+Email
         mail.connect()
        
         mail.send(msg)
        else:
            
         UID = ''.join(secrets.choice(string.ascii_letters)for _ in range(5))
         oRIGINAL_Msg = request.form.get('Msg',default="Error")
        
         BroKeN =list(oRIGINAL_Msg)
         random.shuffle(BroKeN)
         BroKeN = ''.join(BroKeN)
        
         print(UID,BroKeN)
            
         InsertDB = Insert(WDB).values(Username =UID, Text_Field = BroKeN)
         with engine.begin() as conn: 
             
              result = conn.execute(InsertDB)
              
        return render_template("Socials.html")
        
        
   

 
