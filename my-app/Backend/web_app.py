import json
import urllib

import flask
from flask import Flask, request, url_for, jsonify
import requests
#from react  import 'react'
#from react.render import render_component
from werkzeug.utils import redirect
from sqlalchemy import create_engine, text
import pyodbc

app = Flask("comp491")

## response = requests.get('https://httpbin.org/ip')
## print('Your IP is {0}'.format(response.json()['origin']))

# Trusted Connection to Named Instance
connection = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server}; SERVER=localhost\SQLEXPRESS;DATABASE=master;Trusted_Connection=yes;')
conn=connection.cursor()

@app.route("/")
def start():
    return "Welcome to our COMP-491 project web page"

@app.route("/index")
def index():
    return "welcome mefe's web page"


@app.route("/deneme-sayfası")
def deneme():
    return "BU BİR DENEME SAYFASIDIR"

@app.route("/anasayfa")
def anasayfa():
    return redirect(url_for('http://localhost:3000/'))


@app.route("/add",  methods=['GET', 'POST'])
def add():
    try:
        print("debug1")
        print(request)
        print("debug2")
        print(request.data)
        print("debug3")
        a = json.loads(request.data)
        deneme = a['data']
        print(deneme)
        print("debug4")
        print(deneme[0])
        numbers = deneme[0]
        print("debug5")
        print(numbers['num1'])
        print("debug6")
        num1 = int(numbers['num1'])
        num2 = int(numbers['num2'])

        number1 = conn.execute(f"SELECT val FROM Numbers where id = {num1};").fetchall()
        number2 = conn.execute(f"SELECT val FROM Numbers where id = {num2};").fetchall()
        print(number1[0][0])
        print(number2[0][0])
        sum = number1[0][0] + number2[0][0]
        print(sum)
        return json.dumps(sum)
    except Exception as e:
        print(e)
        return 'Bad Request '


app.run()