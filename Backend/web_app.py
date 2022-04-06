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
from dal.model_question import Question
from dal.model_part import Part

app = Flask("comp491")

## response = requests.get('https://httpbin.org/ip')
## print('Your IP is {0}'.format(response.json()['origin']))

# Trusted Connection to Named Instance
connection = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server}; SERVER=localhost\SQLEXPRESS;DATABASE=Comp491;Trusted_Connection=yes;')
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
        a = json.loads(request.data)
        data = a['data']
        numbers = data[0]
        num1 = int(numbers['num1'])
        num2 = int(numbers['num2'])

        number1 = conn.execute(f"SELECT Value FROM Numbers where Id = {num1};").fetchall()
        number2 = conn.execute(f"SELECT Value FROM Numbers where Id = {num2};").fetchall()
        sum = number1[0][0] + number2[0][0]
        print(sum)
        return json.dumps(sum)
    except Exception as e:
        print(e)
        return 'Bad Request '


@app.route("/fetchdb",  methods=['GET'])
def fetchDB():
    try:
        print("debug1")
        data = []
        out = conn.execute(f"SELECT Value FROM Numbers;").fetchall()
        for row in out:
            for x in row:
                data.append(x)
        return json.dumps(data)
        # return {"Values": data}
    except Exception as e:
        print(e)
        return 'Bad Request'


@app.route("/createPart",  methods=['GET', 'POST'])
def createPart():
    try:
        a = json.loads(request.data)
        data = a['data']
        parameters = data[0]
        PartName = parameters['PartName']
        ScoreLimit = int(parameters['ScoreLimit'])

        result_code = Part.add_item([PartName, ScoreLimit])
        if result_code:
            return 'Part added Successfully'
        else:
            return 'Bad Request '
    except Exception as e:
        print(e)
        return 'Bad Request Exception'


@app.route("/getAllParts",  methods=['GET'])
def getAllParts():
    try:
        data = []
        result_code, parts = Part.get_all()
        if result_code:
            for row in parts:
                line = []
                for x in row:
                    line.append(x)
                data.append(line)
            return json.dumps(data)
        else:
            return 'Bad Request '
    except Exception as e:
        print(e)
        return 'Bad Request Exception'


@app.route("/deletePart", methods=['GET', 'POST'])
def deletePart():
    try:
        a = json.loads(request.data)
        data = a['data']
        parameters = data[0]
        Id = int(parameters['Id'])
        print(Id)

        result_code = Part.delete_item(Id)
        if result_code:
            return "Part removed successfully"
        else:
            return 'Bad Request '
    except Exception as e:
        print(e)
        return 'Bad Request Exception'



@app.route("/createQuestion",  methods=['GET', 'POST'])
def createQuestion():
    try:
        a = json.loads(request.data)
        data = a['data']
        parameters = data[0]
        PartId = int(parameters['PartId'])
        QuestionText = parameters['QuestionText']
        Weight = float(parameters['Weight'])
        QuestionType = parameters['QuestionType']
        Options = json.dumps(parameters['Options'], ensure_ascii=False)

        result_code = Question.add_item([PartId, QuestionText, Weight, QuestionType, Options])

        if result_code:
            return 'Part added Successfully'
        else:
            return 'Bad Request '
    except Exception as e:
        print(e)
        return 'Bad Request Exception'


@app.route("/getAllQuestions",  methods=['GET'])
def getAllQuestions():
    try:
        data = []
        result_code, questions = Question.get_all()
        if result_code:
            for row in questions:
                line = []
                for x in row:
                    line.append(x)
                data.append(line)
            return json.dumps(data)
        else:
            return 'Bad Request '
    except Exception as e:
        print(e)
        return 'Bad Request Exception'

app.run()