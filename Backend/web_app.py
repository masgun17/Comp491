import json
import urllib
from xml.etree.ElementTree import tostring
import datetime
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
from dal.model_images_info_page import ImagesInfoPage
from dal.model_images_risk_page import ImagesRiskPage
from dal.model_videos import Videos
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
def creatingNewAccount(): #Yeni kullanıcının oluşturulması
    try:
        result_code = False
        form = json.loads(request.data)
        accountInfo = form['data']
        personInfo = accountInfo[0]
        name = personInfo['name']
        if len(name)==0: #Kullanıcının isminin girilip girilmediğinin kontrolü
            return "Lütfen isminizi giriniz!"
        surname = personInfo['surname']
        if len(surname)==0: #Kullanıcının soyadının girilip girilmediğinin kontrolü
            return "Lütfen soyadınızı giriniz!"
        email = personInfo['email']
        phoneNumber = personInfo['phone']
        if email==None and phoneNumber==None: #Kullanıcının email adresinin ya da telefon numarasının girilip girilmediğinin kontrolü
            return "Lütfen email adresinizi ya da telefon numaranızı giriniz!"
        if len(email)==0 and len(phoneNumber)==0:
            return "Lütfen email adresinizi ya da telefon numaranızı giriniz!"
        if phoneNumber!=None: 
            if len(phoneNumber)!=0:
                if len(phoneNumber)!=10: #Telefon numarasının 10 haline olması gerekliliğinin kontrolü
                    return "Telefon numaranız 10 haneli olmak zorundadır!"
        if phoneNumber!=None:
            if len(phoneNumber)==10:
                if phoneNumber[0]=='0': #Telefon numarasının başında sıfır olmadan girilmiş olmasının kontrolü
                    return "Telefon numaranızı başında 0 olmadan giriniz!"
        password = personInfo['password']
        if len(password)==0: #Herhangi bir şifre girilip girilmediğinin kontrolü
            return "Lütfen bir şifre belirleyiniz!"
        if len(password)<8: #Şifrenin en az 8 haneden olması gerekliliğinin kontrolü
            return "Şifreniz en az 8 haneli olmak zorundadır!"    
        salt, hashedPassword = hashingPassword.hashingPasswordWithSalting(password,email,phoneNumber,conn) #Şifrenin saltingle hashlenmesi
        if salt!=False and hashedPassword!=False:
            result_code=Users.add_item([1,name,surname,email,phoneNumber,salt,hashedPassword,1]) #Kullanıcının yaratılması
            if result_code:
                return 'User added Successfully'
            else:
                return 'Bad Request'
        else:
            return 'User is already in the db'
    except Exception as e:
        print(e)
        return "Bad Request"
   
@app.route("/loginAccount",  methods=['POST']) #Kullanıcının girilen bilgilerle sayfaya giriş yapılması
def loginAccount():
    form = json.loads(request.data)
    accountInfo = form['data']
    personInfo = accountInfo[0]
    email = personInfo['email']
    phoneNumber = personInfo['phone']
    if len(email)==0 and len(phoneNumber)==0 : #Telefon ya da email adresinin girilip girilmediğinin kontrolü
        return "Email ya da telefon numaranızı giriniz!"
    password = personInfo['password']
    if len(password)==0: #Şifrenin girilip girilmediğinin kontrolü
        return "Lütfen Şifrenizi Giriniz!"
    return hashingPassword.checkingPasswordWithDatabase(password,email,phoneNumber) #Databaseden gelen şifre ile girilen şifrenin aynı olmasının kontrolü

@app.route("/createNewAdminAccount",  methods=['POST']) #Super-admin tarafından admin kullanıcısının yaratılması
def createNewAdminAccount():
    try:
        result_code = False
        form = json.loads(request.data)
        accountInfo = form['data']
        personInfo = accountInfo[0]
        name = personInfo['name']
        if len(name)==0: #Kullanıcının isminin girilip girilmediğinin kontrolü
            return "Lütfen isminizi giriniz!"
        surname = personInfo['surname']
        if len(surname)==0: #Kullanıcının soyadının girilip girilmediğinin kontrolü
            return "Lütfen soyadınızı giriniz!"
        email = personInfo['email']
        phoneNumber = personInfo['phone']
        if len(email)==0 and len(phoneNumber)==0: #Kullanıcının email adresinin ya da telefon numarasının girilip girilmediğinin kontrolü
            return "Lütfen email adresinizi ya da telefon numaranızı giriniz!"
        password = personInfo['password']
        if len(password)==0: #Herhangi bir şifre girilip girilmediğinin kontrolü
            return "Lütfen bir şifre belirleyiniz!"
        if len(password)<8: #Şifrenin en az 8 haneden olması gerekliliğinin kontrolü
            return "Şifreniz en az 8 haneli olmak zorundadır!"    
        salt, hashedPassword = hashingPassword.hashingPasswordWithSalting(password,email,phoneNumber,conn) #Şifrenin saltingle hashlenmesi
        if salt!=False and hashedPassword!=False:
            result_code=Users.add_item([2,name,surname,email,phoneNumber,salt,hashedPassword,1]) #Admin kullanıcının yaratılması (UserTypeID = 2)
            if result_code:
                return 'User added Successfully'
            else:
                return 'Bad Request'
        else:
            return 'User is already in the db'
    except Exception as e:
        print(e)
        return "Bad Request"

@app.route("/createNewSuperAdminAccount",  methods=['POST']) #Super-admin tarafından super-admin kullanıcısının yaratılması
def createNewSuperAdminAccount():
    try:
        result_code = False
        form = json.loads(request.data)
        accountInfo = form['data']
        personInfo = accountInfo[0]
        name = personInfo['name']
        if len(name)==0: #Kullanıcının isminin girilip girilmediğinin kontrolü
            return "Lütfen isminizi giriniz!"
        surname = personInfo['surname']
        if len(surname)==0: #Kullanıcının soyadının girilip girilmediğinin kontrolü
            return "Lütfen soyadınızı giriniz!"
        email = personInfo['email']
        phoneNumber = personInfo['phone']
        if len(email)==0 and len(phoneNumber)==0: #Kullanıcının email adresinin ya da telefon numarasının girilip girilmediğinin kontrolü
            return "Lütfen email adresinizi ya da telefon numaranızı giriniz!"
        password = personInfo['password']
        if len(password)==0: #Herhangi bir şifre girilip girilmediğinin kontrolü
            return "Lütfen bir şifre belirleyiniz!"
        if len(password)<8: #Şifrenin en az 8 haneden olması gerekliliğinin kontrolü
            return "Şifreniz en az 8 haneli olmak zorundadır!"    
        salt, hashedPassword = hashingPassword.hashingPasswordWithSalting(password,email,phoneNumber,conn) #Şifrenin saltingle hashlenmesi
        if salt!=False and hashedPassword!=False:
            result_code=Users.add_item([3,name,surname,email,phoneNumber,salt,hashedPassword,1]) #Super-admin kullanıcının yaratılması (UserTypeID = 3)
            if result_code:
                return 'User added Successfully'
            else:
                return 'Bad Request'
        else:
            return 'User is already in the db'
    except Exception as e:
        print(e)
        return "Bad Request"

@app.route("/changePassword",  methods=['POST']) #Şifremi değiştir butonuna tıklandığında çağrılan metot
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
        result_code = hashingPassword.changingPassword(id,password,passwordNew) #Güncel şifre ile database'deki şifre karşılaştırılıp aynıysa şifrenin değiştirilmesi
        if result_code=="Current Password is not correct":
            return "Current Password is not correct"
        elif result_code:
            return 'Password Changed'
        else:
            return 'Bad Request'
    except Exception as e:
        print(e)
        return "Bad Request"

@app.route("/submitNewPassword",  methods=['POST']) #Şifre sıfırlama işlemi için çağırılan metot.
def submitNewPassword():
    form = json.loads(request.data)
    accountInfo = form['data']
    personInfo = accountInfo[0]
    email = personInfo['email']
    randomPassword, recordStatus, name = hashingPassword.getUsersDetailFromEmail(email) #Email ile şifre sıfırlama kısmında kişinin database'deki kaydının kontrol edilmesi.
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

@app.route("/saveImage",  methods=['GET', 'POST']) #Super-admin tarafından resimlerin kaydedilmesi (Anasayfa için)
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


@app.route("/getImages",  methods=['GET', 'POST']) #Resimlerin database'den çekilip ön yüze aktarılması (Anasayfa için)
def getImages():
    try:
        data = []
        result_code, images = Images.get_all()
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



@app.route("/deleteImageFromIndex",  methods=['GET', 'POST']) #Index'ine göre database'den resmin silinmesi (Anasayfa için)
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



@app.route("/getImageFromIndex",  methods=['GET', 'POST']) #Index'e göre database'den resimlerin getirilmesi (Anasayfa için)
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



@app.route("/updateImageFromIndex",  methods=['GET', 'POST']) #Index'e göre database'deki resimlerin güncellenmesi (Anasayfa için)
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

@app.route("/removeAllImages",  methods=['GET', 'POST']) #Tüm resimlerin database'den silinmesi (Anasayfa için)
def removeAllImages():
    try:
        result_code = Images.delete_all()
        return result_code
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


@app.route("/saveImageInfoPage",  methods=['GET', 'POST']) #Super-admin tarafından resimlerin kaydedilmesi (Demans Sayfası için)
def saveImageInfoPage():
    try:
        a = json.loads(request.data)
        data = a['data']
        parameters = data[0]
        data_url = parameters['data_url']
        index = parameters['index']

        result_code = ImagesInfoPage.add_item(data_url,index)
        if result_code:
            return "Image saved successfully"
        else:
            return 'Bad Request '
    except Exception as e:
        print(e)
        return 'Bad Request Exception'


@app.route("/getImagesInfoPage",  methods=['GET', 'POST']) #Resimlerin database'den çekilip ön yüze aktarılması (Demans Sayfası için)
def getImagesInfoPage():
    try:
        data = []
        result_code, images = ImagesInfoPage.get_all()
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



@app.route("/deleteImageFromIndexInfoPage",  methods=['GET', 'POST']) #Index'ine göre database'den resmin silinmesi (Demans Sayfası için)
def deleteImageFromIndexInfoPage():
    try:
        a = json.loads(request.data)
        data = a['data']
        parameters = data[0]
        index = int(parameters['Index'])

        result_code = ImagesInfoPage.delete_item(index)
        if result_code:
            return "Image removed successfully"
        else:
            return 'Bad Request '
    except Exception as e:
        print(e)
        return 'Bad Request Exception'



@app.route("/getImageFromIndexInfoPage",  methods=['GET', 'POST']) #Index'e göre database'den resimlerin getirilmesi (Demans Sayfası için)
def getImageFromIndexInfoPage():
    try:
        a = json.loads(request.data)
        data = a['data']
        parameters = data[0]
        index = int(parameters['Index'])

        result_code, items = ImagesInfoPage.has_item_by_column("ind", index)
        if result_code:
            photo = items[0]
            return photo
        else:
            return 'Bad Request'
    except Exception as e:
        print(e)
        return 'Bad Request Exception'



@app.route("/updateImageFromIndexInfoPage",  methods=['GET', 'POST']) #Index'e göre database'deki resimlerin güncellenmesi (Demans Sayfası için)
def updateImageFromIndexInfoPage():
    try:
        a = json.loads(request.data)
        data = a['data']
        parameters = data[0]
        index = int(parameters['Index'])
        img_base64 = parameters['Img_base64']
        result_code = ImagesInfoPage.update_item(img_base64,index)
        if result_code:
            return "Image updated successfully"
        else:
            return 'Bad Request'
    except Exception as e:
        print(e)
        return 'Bad Request Exception'

@app.route("/removeAllImagesInfoPage",  methods=['GET', 'POST']) #Tüm resimlerin database'den silinmesi (Demans Sayfası için)
def removeAllImagesInfoPage():
    try:
        result_code = ImagesInfoPage.delete_all()
        return result_code
    except Exception as e:
        print(e)
        return 'Bad Request Exception'

@app.route("/saveImageRiskPage",  methods=['GET', 'POST']) #Super-admin tarafından resimlerin kaydedilmesi (Risk Faktörleri Sayfası için)
def saveImageRiskPage():
    try:
        a = json.loads(request.data)
        data = a['data']
        parameters = data[0]
        data_url = parameters['data_url']
        index = parameters['index']

        result_code = ImagesRiskPage.add_item(data_url,index)
        if result_code:
            return "Image saved successfully"
        else:
            return 'Bad Request '
    except Exception as e:
        print(e)
        return 'Bad Request Exception'


@app.route("/getImagesRiskPage",  methods=['GET', 'POST']) #Resimlerin database'den çekilip ön yüze aktarılması (Risk Faktörleri Sayfası için)
def getImagesRiskPage():
    try:
        data = []
        result_code, images = ImagesRiskPage.get_all()
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



@app.route("/deleteImageFromIndexRiskPage",  methods=['GET', 'POST']) #Index'e göre database'den resimlerin getirilmesi (Risk Faktörleri Sayfası için)
def deleteImageFromIndexRiskPage():
    try:
        a = json.loads(request.data)
        data = a['data']
        parameters = data[0]
        index = int(parameters['Index'])

        result_code = ImagesRiskPage.delete_item(index)
        if result_code:
            return "Image removed successfully"
        else:
            return 'Bad Request '
    except Exception as e:
        print(e)
        return 'Bad Request Exception'



@app.route("/getImageFromIndexRiskPage",  methods=['GET', 'POST']) #Index'e göre database'den resimlerin getirilmesi (Risk Faktörleri Sayfası için)
def getImageFromIndexRiskPage():
    try:
        a = json.loads(request.data)
        data = a['data']
        parameters = data[0]
        index = int(parameters['Index'])

        result_code, items = ImagesRiskPage.has_item_by_column("ind", index)
        if result_code:
            photo = items[0]
            return photo
        else:
            return 'Bad Request'
    except Exception as e:
        print(e)
        return 'Bad Request Exception'



@app.route("/updateImageFromIndexRiskPage",  methods=['GET', 'POST']) #Index'e göre database'deki resimlerin güncellenmesi (Risk Faktörleri Sayfası için)
def updateImageFromIndexRiskPage():
    try:
        a = json.loads(request.data)
        data = a['data']
        parameters = data[0]
        index = int(parameters['Index'])
        img_base64 = parameters['Img_base64']
        result_code = ImagesRiskPage.update_item(img_base64,index)
        if result_code:
            return "Image updated successfully"
        else:
            return 'Bad Request'
    except Exception as e:
        print(e)
        return 'Bad Request Exception'

@app.route("/removeAllImagesRiskPage",  methods=['GET', 'POST']) #Tüm resimlerin database'den silinmesi (Risk Faktörleri Sayfası için)
def removeAllImagesRiskPage():
    try:
        result_code = ImagesRiskPage.delete_all()
        return result_code
    except Exception as e:
        print(e)
        return 'Bad Request Exception'

@app.route("/saveVideo",  methods=['GET', 'POST']) #Videoların youtube linkiyle database'e kaydedilmesi
def saveVideo():
    try:
        a = json.loads(request.data)
        data = a['data']
        parameters = data[0]
        data_url = parameters['video'] #Youtube linki
        index = parameters['ind'] #Hangi indexte olacağı
        page = parameters['page'] #Hangi sayfada olduğu (d=anasayfa, i=demans, r=risk faktörler)
        result_code = Videos.add_item(data_url,index, page)
        if result_code:
            return "Image saved successfully"
        else:
            return 'Bad Request '
    except Exception as e:
        print(e)
        return 'Bad Request Exception'

@app.route("/getVideos",  methods=['GET', 'POST']) #Videoların databaseden çekilmesi (sayfalara göre değişiyor)
def getVideos():
    try:
        a = json.loads(request.data)
        data = a['data']
        parameters = data[0]
        index = parameters['ind']
        page = parameters['page']
        data = []
        result_code, video = Videos.get_all(index,page)
        if result_code:
            line = dict()  
            line["data_url"] = video[0][1]
            data.append(line)
            return json.dumps(data)
        else:
            return json.dumps(data)
    except Exception as e:
        print(e)
        return 'Bad Request Exception'

def default(o):
    if isinstance(o, (datetime.date, datetime.datetime)):
        return o.isoformat()

@app.route("/getAssessments",  methods=['GET', 'POST']) 
def getAssessments():
    try:
        a = json.loads(request.data)
        data = a['data']
        parameters = data[0]
        userId = parameters['UserId']
        data = []
        result_code, assessments = AssessmentSession.get_all_by_id(userId)
        if result_code:
            for row in assessments:
                line = dict()
                line["id"] = row[0]
                line["date"] = row[2].strftime("%H:%M:%S, %d/%m/%Y")
                data.append(line)
            return json.dumps(data,sort_keys=True,indent=1,default=default)
        else:
            return json.dumps(data)
    except Exception as e:
        print(e)
        return 'Bad Request Exception'

@app.route("/getAllAssessments",  methods=['GET', 'POST']) 
def getAllAssessments():
    try:
        data = []
        result_code, assessments = AssessmentSession.get_all()
        if result_code:
            for row in assessments:
                line = dict()
                line["id"] = row[0]
                line["date"] = row[2].strftime("%H:%M:%S, %d/%m/%Y")
                userIdInfo = row[1]
                result_code_user, userInformation=Users.get_all_by_id(userIdInfo)
                if result_code_user:
                    for row_user_info in userInformation:
                        line["name"]=row_user_info[2]
                        line["surname"]=row_user_info[3]
                        line["phone"] = row_user_info[5]
                        line["email"]=row_user_info[4]

                data.append(line)
            return json.dumps(data,sort_keys=True,indent=1,default=default)
        else:
            return json.dumps(data)
    except Exception as e:
        print(e)
        return 'Bad Request Exception'

@app.route("/getAllAnswers",  methods=['GET', 'POST']) 
def getAllAnswers():
    try:
        a = json.loads(request.data)
        data = a['data']
        parameters = data[0]
        assessmentId = parameters['assessmentId']
        data = []
        result_code, answers = Answer.get_all_by_assessmentId(assessmentId)
        userAnswers=[]
        qID = []
        if result_code:
            line = dict()

            for row in answers:
                qID.append(row[2])
                userAnswers.append(row[3])
                
            line["qID"]=qID
            line["userAnswers"]=userAnswers
            data.append(line)
            return json.dumps(data)
        else:
            return json.dumps(data)
    except Exception as e:
        print(e)
        return 'Bad Request Exception'
@app.route("/evaluate",  methods=['GET', 'POST'])
def Evaluate():
    try:
        import evaluation as eval
        errList = []
        a = json.loads(request.data)
        data = a['data']
        parameters = data[0]
        questionAnswerList = parameters['AnswerList']
        anslist = {}
        partScores = {}
        for userAnswer in questionAnswerList:
            try:
                questionId = userAnswer[0]
                answer = userAnswer[1]
                questionItem = Question.has_item(questionId)
                anslist[questionItem[1][3]] = answer
            except Exception as e:
                errList.append(e)
        partScores["Agesex"] = eval.Agesex(anslist)
        partScores["Education"] = eval.Education(anslist)
        partScores["BMI"] = eval.BMI(anslist)
        partScores["Cholesterol"] = eval.Cholesterol(anslist)
        partScores["Diabetes"] = eval.Diabetes(anslist)
        return json.dumps(partScores)
    except Exception as e:
        print(e)
        print(request)
        return 'Bad Request Exception'
    print("Total error count: ", len(errList))
    print(errList)
    return json.dumps("Answers are uploaded for Evaluate")




app.run()