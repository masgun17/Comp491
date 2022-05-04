import json
import urllib
from xml.etree.ElementTree import tostring

import flask
from flask import Flask, request, url_for, jsonify
import requests
#from react  import 'react'
#from react.render import render_component
from werkzeug.utils import redirect
from sqlalchemy import create_engine, text
import pyodbc
from dal.model_assessment_session import AssessmentSession
from dal.model_question import Question
from dal.model_part import Part
from dal import hashingPassword
from dal import sendingEmail
import codecs
from dal.model_user import Users
from dal.model_images import Images

from dal.model_answer import Answer

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
            return json.dumps(data)
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
            return 'Question added Successfully'
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
            return json.dumps(data)
    except Exception as e:
        print(e)
        return 'Bad Request Exception'

@app.route("/deleteQuestion", methods=['GET', 'POST'])
def deleteQuestion():
    try:
        a = json.loads(request.data)
        data = a['data']
        parameters = data[0]
        Id = int(parameters['Id'])

        result_code = Question.delete_item(Id)
        if result_code:
            return "Question removed successfully"
        else:
            return 'Bad Request '
    except Exception as e:
        print(e)
        return 'Bad Request Exception'

@app.route("/creatingNewAccount",  methods=['POST'])
def creatingNewAccount():
    try:
        result_code = False
        form = json.loads(request.data)
        accountInfo = form['data']
        personInfo = accountInfo[0]
        name = personInfo['name']
        if len(name)==0:
            return "Lütfen isminizi giriniz!"
        surname = personInfo['surname']
        if len(surname)==0:
            return "Lütfen soyadınızı giriniz!"
        email = personInfo['email']
        phoneNumber = personInfo['phone']
        if email==None and phoneNumber==None:
            return "Lütfen email adresinizi ya da telefon numaranızı giriniz!"
        if len(email)==0 and len(phoneNumber)==0:
            return "Lütfen email adresinizi ya da telefon numaranızı giriniz!"
        if phoneNumber!=None: 
            if len(phoneNumber)!=0:
                if len(phoneNumber)!=10:
                    return "Telefon numaranız 10 haneli olmak zorundadır!"
        if phoneNumber!=None:
            print("debug1")
            if len(phoneNumber)==10:
                if phoneNumber[0]=='0':
                    return "Telefon numaranızı başında 0 olmadan giriniz!"
        password = personInfo['password']
        if len(password)==0:
            return "Lütfen bir şifre belirleyiniz!"
        if len(password)<8:
            return "Şifreniz en az 8 haneli olmak zorundadır!"    
        salt, hashedPassword = hashingPassword.hashingPasswordWithSalting(password,email,phoneNumber,conn)
        if salt!=False and hashedPassword!=False:
            result_code=Users.add_item([1,name,surname,email,phoneNumber,salt,hashedPassword,1])
            if result_code:
                return 'User added Successfully'
            else:
                return 'Bad Request'
        else:
            return 'User is already in the db'
    except Exception as e:
        print(e)
        return "Bad Request"
   
@app.route("/loginAccount",  methods=['POST'])
def loginAccount():
    form = json.loads(request.data)
    accountInfo = form['data']
    personInfo = accountInfo[0]
    email = personInfo['email']
    phoneNumber = personInfo['phone']
    if len(email)==0 and len(phoneNumber)==0 :
        return "Email ya da telefon numaranızı giriniz!"
    password = personInfo['password']
    if len(password)==0:
        return "Lütfen Şifrenizi Giriniz!"
    return hashingPassword.checkingPasswordWithDatabase(password,email,phoneNumber)

@app.route("/createNewAdminAccount",  methods=['POST'])
def createNewAdminAccount():
    try:
        result_code = False
        form = json.loads(request.data)
        accountInfo = form['data']
        personInfo = accountInfo[0]
        name = personInfo['name']
        if len(name)==0:
            return "Lütfen isminizi giriniz!"
        surname = personInfo['surname']
        if len(surname)==0:
            return "Lütfen soyadınızı giriniz!"
        email = personInfo['email']
        phoneNumber = personInfo['phone']
        if len(email)==0 and len(phoneNumber)==0:
            return "Lütfen email adresinizi ya da telefon numaranızı giriniz!"
        password = personInfo['password']
        if len(password)==0:
            return "Lütfen bir şifre belirleyiniz!"
        if len(password)<8:
            return "Şifreniz en az 8 haneli olmak zorundadır!"    
        salt, hashedPassword = hashingPassword.hashingPasswordWithSalting(password,email,phoneNumber,conn)
        if salt!=False and hashedPassword!=False:
            result_code=Users.add_item([2,name,surname,email,phoneNumber,salt,hashedPassword,1])
            if result_code:
                return 'User added Successfully'
            else:
                return 'Bad Request'
        else:
            return 'User is already in the db'
    except Exception as e:
        print(e)
        return "Bad Request"

@app.route("/createNewSuperAdminAccount",  methods=['POST'])
def createNewSuperAdminAccount():
    try:
        result_code = False
        form = json.loads(request.data)
        accountInfo = form['data']
        personInfo = accountInfo[0]
        name = personInfo['name']
        if len(name)==0:
            return "Lütfen isminizi giriniz!"
        surname = personInfo['surname']
        if len(surname)==0:
            return "Lütfen soyadınızı giriniz!"
        email = personInfo['email']
        phoneNumber = personInfo['phone']
        if len(email)==0 and len(phoneNumber)==0:
            return "Lütfen email adresinizi ya da telefon numaranızı giriniz!"
        password = personInfo['password']
        if len(password)==0:
            return "Lütfen bir şifre belirleyiniz!"
        if len(password)<8:
            return "Şifreniz en az 8 haneli olmak zorundadır!"    
        salt, hashedPassword = hashingPassword.hashingPasswordWithSalting(password,email,phoneNumber,conn)
        if salt!=False and hashedPassword!=False:
            result_code=Users.add_item([3,name,surname,email,phoneNumber,salt,hashedPassword,1])
            if result_code:
                return 'User added Successfully'
            else:
                return 'Bad Request'
        else:
            return 'User is already in the db'
    except Exception as e:
        print(e)
        return "Bad Request"

@app.route("/changePassword",  methods=['POST'])
def changePassword():
    try:
        result_code = False
        form = json.loads(request.data)
        accountInfo = form['data']
        personInfo = accountInfo[0]
        id = personInfo['id']
        password = personInfo['password']
        passwordNew = personInfo['passwordNew']
        passwordNewAgain = personInfo['passwordNewAgain']
        result_code = hashingPassword.changingPassword(id,password,passwordNew)
        if result_code=="Current Password is not correct":
            return "Current Password is not correct"
        elif result_code:
            return 'Password Changed'
        else:
            return 'Bad Request'
    except Exception as e:
        print(e)
        return "Bad Request"

@app.route("/submitNewPassword",  methods=['POST'])
def submitNewPassword():
    form = json.loads(request.data)
    accountInfo = form['data']
    personInfo = accountInfo[0]
    email = personInfo['email']
    randomPassword, recordStatus, name = hashingPassword.getUsersDetailFromEmail(email)
    if randomPassword=='User is not registered':
        return'User is not registered'
    sendingEmail.sendNewPassword(randomPassword,email, name)
    if recordStatus:
        return 'Password Changed'
    else:
        return 'Bad Request'

@app.route("/createAssessmentSession",  methods=['GET', 'POST'])
def createAssessmentSession():
    try:
        a = json.loads(request.data)
        data = a['data']
        parameters = data[0]
        UserId = parameters['UserId']

        result_code = AssessmentSession.add_item(UserId)
        if result_code:
            result, item = AssessmentSession.get_last()
            if result:
                return str(item[0])
            else:
                return 'New assessment session is created / could not fetch sessionId'
        else:
            return 'Bad Request '
    except Exception as e:
        print(e)
        return 'Bad Request Exception'

@app.route("/saveImage",  methods=['GET', 'POST'])
def saveImage():
    try:
        a = json.loads(request.data)
        data = a['data']
        parameters = data[0]
        data_url = parameters['data_url']
        index = parameters['index']

        result_code = Images.add_item(data_url,index)
        if result_code:
            return "Image saved successfully"
        else:
            return 'Bad Request '
    except Exception as e:
        print(e)
        return 'Bad Request Exception'


@app.route("/getImages",  methods=['GET', 'POST'])
def getImages():
    try:
        data = []
        result_code, images = Images.get_all()
        print(result_code)
        if result_code:
            for row in images:
                line = dict()
                
                line["data_url"] = row[1]
                line["index"] = row[2]

                data.append(line)
            return json.dumps(data)
        else:
            return json.dumps(data)
    except Exception as e:
        print(e)
        return 'Bad Request Exception'



@app.route("/deleteImageFromIndex",  methods=['GET', 'POST'])
def deleteImageFromIndex():
    try:
        a = json.loads(request.data)
        data = a['data']
        parameters = data[0]
        index = int(parameters['Index'])

        result_code = Images.delete_item(index)
        if result_code:
            return "Image removed successfully"
        else:
            return 'Bad Request '
    except Exception as e:
        print(e)
        return 'Bad Request Exception'



@app.route("/getImageFromIndex",  methods=['GET', 'POST'])
def getImageFromIndex():
    try:
        a = json.loads(request.data)
        data = a['data']
        parameters = data[0]
        index = int(parameters['Index'])

        result_code, items = Images.has_item_by_column("ind", index)
        if result_code:
            photo = items[0]
            return photo
        else:
            return 'Bad Request'
    except Exception as e:
        print(e)
        return 'Bad Request Exception'



@app.route("/updateImageFromIndex",  methods=['GET', 'POST'])
def updateImageFromIndex():
    try:
        a = json.loads(request.data)
        data = a['data']
        parameters = data[0]
        index = int(parameters['Index'])
        img_base64 = parameters['Img_base64']

        result_code = Images.update_item(img_base64,index)
        if result_code:
            return "Image updated successfully"
        else:
            return 'Bad Request'
    except Exception as e:
        print(e)
        return 'Bad Request Exception'


@app.route("/uploadUserAnswers",  methods=['GET', 'POST'])
def uploadUserAnswers():
    try:
        errList = []
        a = json.loads(request.data)
        data = a['data']
        parameters = data[0]
        AssessmentSessionId = parameters['AssessmentSessionId']
        AnswerList = parameters['AnswerList']
        for userAnswer in AnswerList:
            try:
                questionId = userAnswer[0]
                answer = userAnswer[1]
                answerItem = [AssessmentSessionId, questionId, answer]
                Answer.add_item(answerItem)
            except Exception as e:
                errItem = [e,AssessmentSessionId,userAnswer]
                errList.append(errItem)
    except Exception as e:
        print(e)
        print(request)
        return 'Bad Request Exception'
    print("Total error count: ", len(errList))
    print(errList)
    return json.dumps("Answers are uploaded for AssessmentSessionId " + str(AssessmentSessionId))



@app.route("/evaluate",  methods=['GET', 'POST'])
def Evaluate():
    try:
        import evaluation as eval
        errList = []
        a = json.loads(request.data)
        data = a['data']
        parameters = data[0]
        questionAnswerList = parameters['questionAnswerList']
        anslist = {}
        partScores = {}
        for userAnswer in questionAnswerList:
            try:
                questionId = userAnswer[0]
                answer = userAnswer[1]
                questionItem = Question.has_item(questionId)
                anslist[questionItem[2]] = answer
            except Exception as e:
                errList.append(e)
        partScores["Agesex"] = eval.Agesex(anslist)
        # partScores["Education"] = eval.Education(anslist)
        # partScores["BMI"] = eval.BMI(anslist)
        # partScores["Cholesterol"] = eval.Cholesterol(anslist)
        # partScores["Diabetes"] = eval.Diabetes(anslist)
        return json.dumps(partScores)
    except Exception as e:
        print(e)
        print(request)
        return 'Bad Request Exception'
    print("Total error count: ", len(errList))
    print(errList)
    return json.dumps("Answers are uploaded for Evaluate")




app.run()