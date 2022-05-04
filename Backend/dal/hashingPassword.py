import os
import hashlib
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
from dal.model_user import Users
from base64 import b64encode
import base64
import string
import random



def hashingPasswordWithSalting(password,email,phone,conn): #Yeni kullanıcı yaratılırken şifrenin salt ile beraber hashlenmesi
    recordEmail = None
    recordPhone = None
    try: 
        if len(email)!=0:
            recordEmail = Users.has_item_by_multipple_columns(["Email"],[email])
        if len(phone)!=0:
            recordPhone = Users.has_item_by_multipple_columns(["Phone"],[phone])
    except Exception as e:
        print(e)
    if recordEmail!=None:
        if recordPhone!=None:
            if recordEmail[0] == False and recordPhone[0] == False:
                salt = os.urandom(32) #Random 32-bytes long salt used in hashing
                plaintext = password.encode()
                digest_password = hashlib.pbkdf2_hmac('sha256', plaintext, salt, 10000)
                hex_hashed_password = digest_password.hex()
                return b64encode(salt).decode('utf-8'), hex_hashed_password
            else:
                return False,False    
        else:
            if recordEmail[0] == False:
                salt = os.urandom(32) #Random 32-bytes long salt used in hashing
                plaintext = password.encode()
                digest_password = hashlib.pbkdf2_hmac('sha256', plaintext, salt, 10000)
                hex_hashed_password = digest_password.hex()
                return b64encode(salt).decode('utf-8'), hex_hashed_password
            else:
                return False, False
    elif recordPhone!=None:
        if recordPhone[0] ==False:
            salt = os.urandom(32) #Random 32-bytes long salt used in hashing
            plaintext = password.encode()
            digest_password = hashlib.pbkdf2_hmac('sha256', plaintext, salt, 10000)
            hex_hashed_password = digest_password.hex()
            return b64encode(salt).decode('utf-8'), hex_hashed_password
        else:
            return False, False
    else: 
        return False, False


def checkingPasswordWithDatabase(password,email,phoneNumber): #Girilen şifre database'deki şifreyle uyumlu mu kontrolü
    recordEmail = None
    recordPhone = None
    if len(email)==0 and len(phoneNumber)==0: #Email ve telefon numarası girmediyse kontrol yapılamıyor.
        return "This account is not in the database"
    else:
        if len(email)!=0:
            recordEmail = Users.has_item_by_multipple_columns(["Email"],[email]) #Email'i girilmişse database'den o kullanıcının dönülmesi
        if len(phoneNumber)!=0:
            recordPhone = Users.has_item_by_multipple_columns(["Phone"],[phoneNumber]) #Telefon numarası girilmişse database'den o kullanıcının dönülmesi
    if recordEmail!= None and recordEmail[0]: #Database'den dönen kullanıcı boş değilse hashli saklanan şifreyi al.
        record = recordEmail[1][0]
        salt = record[6]
        salt_bytes=salt.encode('utf-8')
        salt = base64.b64decode(salt_bytes)
        plaintext = password.encode()
        digest_password = hashlib.pbkdf2_hmac('sha256', plaintext, salt, 10000)
        hex_hashed_password = digest_password.hex()
        hex_hashed_password_from_database = record[7]
    elif recordPhone!= None and recordPhone[0]: #Database'den dönen kullanıcı boş değilse hashli saklanan şifreyi al.
        record = recordPhone[1][0]
        salt = record[6]
        salt_bytes=salt.encode('utf-8')
        salt = base64.b64decode(salt_bytes)
        plaintext = password.encode()
        digest_password = hashlib.pbkdf2_hmac('sha256', plaintext, salt, 10000)
        hex_hashed_password = digest_password.hex()
        hex_hashed_password_from_database = record[7]
    else:
        return "This account is not in the database"
    if hex_hashed_password == hex_hashed_password_from_database: #Eğer database'den dönen şifreyle girilen şifrenin hashli hali aynıysa kullanıcı bilgilerini dön
        if recordEmail!=None and recordEmail[0]:
            response = dict()
            response["Login"] = True
            response["Id"]=recordEmail[1][0][0]
            response["UserTypeId"]=recordEmail[1][0][1]
            response["Name"]=recordEmail[1][0][2]
            response["Surname"]=recordEmail[1][0][3]
            response["Email"]=recordEmail[1][0][4]
            response["Phone"]=recordEmail[1][0][5]
            return response
        elif recordPhone!=None and recordPhone[0]:
            response = dict()
            response["Login"] = True
            response["Id"]=recordPhone[1][0][0]
            response["UserTypeId"]=recordPhone[1][0][1]
            response["Name"]=recordPhone[1][0][2]
            response["Surname"]=recordPhone[1][0][3]
            response["Email"]=recordPhone[1][0][4]
            response["Phone"]=recordPhone[1][0][5]
            return response
        else:
            return "Login unsuccessful" #Eğer database'den dönen şifreyle girilen şifrenin hashli hali aynı değilse uyarı mesajı dön
    else:
        return "Login unsuccessful"
    
def getUsersDetailFromEmail(email): #Şifre sıfırlamak için girilen e-mailin adresinin validasyonunun yapılması.
    recordEmail = Users.has_item_by_multipple_columns(["Email"],[email])
    if len(recordEmail[1])==0: 
        return 'User is not registered', False, False
    record = recordEmail[1][0]
    id = record[0]
    name = record[2]
    salt = record[6]
    salt_bytes=salt.encode('utf-8')
    salt = base64.b64decode(salt_bytes)
    lower = string.ascii_lowercase
    upper = string.ascii_uppercase
    num = string.digits
    all = lower + upper + num
    temp = random.sample(all,8)
    randomPassword = "".join(temp) #Random şifre oluşturulması
    plaintext = randomPassword.encode() 
    digest_password = hashlib.pbkdf2_hmac('sha256', plaintext, salt, 10000) #Random şifrenin salt ile beraber hashlenmesi. 
    hex_hashed_password = digest_password.hex()
    recordStatus = Users.change_password(id,hex_hashed_password) #Kişinin şifresinin database'de güncellenmesi
    return randomPassword, recordStatus, name 

def changingPassword(id,passwordOld,passwordNew): #Profilim sayfasında şifre değiştir butonu ile çağırılan metot.
    recordId = Users.has_item_by_multipple_columns(["Id"],[str(id)])
    record = recordId[1][0]
    salt = record[6]
    salt_bytes=salt.encode('utf-8')
    salt = base64.b64decode(salt_bytes)
    plaintext = passwordOld.encode()
    digest_password = hashlib.pbkdf2_hmac('sha256', plaintext, salt, 10000)
    hex_hashed_password = digest_password.hex()
    hex_hashed_password_from_database = record[7]
    if hex_hashed_password == hex_hashed_password_from_database: #Database'den çekilen hashli şifre ile girilen güncel şifrenin hash'i aynı ise yeni şifreyi hashleyip kullanıcının şifresini güncelleme
        plaintext_new = passwordNew.encode()
        digest_password_new = hashlib.pbkdf2_hmac('sha256', plaintext_new, salt, 10000)
        hex_hashed_password_new = digest_password_new.hex()
        recordStatus = Users.change_password(id,hex_hashed_password_new)
        if recordStatus:
            return "Password changed"
        else:
            return "Password Couldn't changed"
    else:
        return "Current Password is not correct"

    #@app.route("/creatingNewAccount",  methods=['GET', 'POST'])
    def creatingNewAccount():
        conn = connection.cursor()
        print("debug1")
        result_code = False
        form = json.loads(request.data)
        accountInfo = a['data']
        personInfo = data[0]
        name = personInfo['name']
        surname = personInfo['surname']
        email = personInfo['email']
        phoneNumber = personInfo['phoneNumber']
        password = personInfo['password']
        kvkk = personInfo['kvkk']
        salt, hashedPassword = hashingPasswordWithSalting(password)
        if salt!=False and hashedPassword!=False:
            try:
                    conn.execute(f"""
                        insert into User
                        ([UserTypeId]
                        ,[Name]
                        ,[Surname]
                        ,[Email]
                        ,[Phone]
                        ,[Salting]
                        ,[Password]
                        ,[KvkkCheck])
                        values
                        ({1}
                            ,{name}
                        ,{surname}
                        ,{email}
                        ,{phoneNumber}
                        ,{Salting}
                        ,{hashedPassword}
                        ,{kvkk}')""")
                    result_code = True
                    conn.commit()
            except Exception as e:
                print(e)
            finally:
                conn.close()
                return result_code
