import flask
from flask import Flask, request, url_for, jsonify
import requests
import react
from react.render import render_component
from werkzeug.utils import redirect

app = Flask("comp491")

response = requests.get('https://httpbin.org/ip')
print('Your IP is {0}'.format(response.json()['origin']))


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
    num1 = float(request.form["num1"])
    num2 = float(request.form["num2"])

    sum = num1 + num2
    print(sum)
    return {"Summation": sum}


app.run()