import os
import json
from flask import Flask, redirect, request,render_template, jsonify
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif','svg'])

app = Flask(__name__)

@app.route('/load')
def loading():
    return render_template("loading.html")
@app.route('/Home')
def show_Page():
    return render_template("Main_Index.html")
