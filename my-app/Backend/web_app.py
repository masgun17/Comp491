import urllib

import flask
from flask import Flask, request, url_for, jsonify
import requests
import react
from react.render import render_component
from werkzeug.utils import redirect
from sqlalchemy import create_engine, text
import pyodbc

app = Flask("comp491")

response = requests.get('https://httpbin.org/ip')
## print('Your IP is {0}'.format(response.json()['origin']))

# Trusted Connection to Named Instance
connection = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=localhost\SQLEXPRESS;DATABASE=Comp491;Trusted_Connection=yes;')
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


@app.route("/add",  methods=['GET'])
def add():
    num1 = int(request.form["num1"])
    num2 = int(request.form["num2"])
    print(num1)
    print(num2)
    number1 = conn.execute(f"SELECT value FROM Numbers where Id = {num1};").fetchall()
    number2 = conn.execute(f"SELECT value FROM Numbers where Id = {num2};").fetchall()
    print(number1[0][0])
    print(number2[0][0])
    sum = number1[0][0] + number2[0][0]
    print(sum)
    return {"Summation": sum}


app.run()