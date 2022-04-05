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




def hashingPasswordWithSalting(password,email,phone,conn):
    recordEmail = None
    recordPhone = None
    try:
        print("hashingPasswordWithSalt Başladı")
        print(email)
        print(phone)
        print("hashingPasswordWithSalt Bitti")
        if len(email)!=0:
            recordEmail = Users.has_item_by_multipple_columns(["Email"],[email])
        if len(phone)!=0:
            recordPhone = Users.has_item_by_multipple_columns(["Phone"],[phone])
        print(recordEmail[0])
        print(recordPhone)
        #userIdFromEmail = conn.execute(f"SELECT Id FROM Users where Email = {email};").fetchall()
        #userIdFromPhone = conn.execute(f"SELECT Id FROM Users where Phone = {phone};").fetchall()
    except Exception as e:
        print(e)
    if recordEmail!=None:
        if recordPhone!=None:
            if recordEmail[0] == False and recordPhone[0] == False:
                print("debug3")
                salt = os.urandom(32) #Random 32-bytes long salt used in hashing
                print(type(salt))
                print(salt)
                plaintext = password.encode()
                print("debug5")
                digest_password = hashlib.pbkdf2_hmac('sha256', plaintext, salt, 10000)
                hex_hashed_password = digest_password.hex()
                print(hex_hashed_password)
                return b64encode(salt).decode('utf-8'), hex_hashed_password
            else:
                return False,False    
        else:
            if recordEmail[0] == False:
                print("debug3")
                salt = os.urandom(32) #Random 32-bytes long salt used in hashing
                print(type(salt))
                print(salt)
                plaintext = password.encode()
                print("debug5")
                digest_password = hashlib.pbkdf2_hmac('sha256', plaintext, salt, 10000)
                hex_hashed_password = digest_password.hex()
                print(hex_hashed_password)
                return b64encode(salt).decode('utf-8'), hex_hashed_password
            else:
                return False, False
    elif recordPhone!=None:
        if recordPhone[0] ==False:
            print("debug3")
            salt = os.urandom(32) #Random 32-bytes long salt used in hashing
            print(type(salt))
            print(salt)
            plaintext = password.encode()
            print("debug5")
            digest_password = hashlib.pbkdf2_hmac('sha256', plaintext, salt, 10000)
            hex_hashed_password = digest_password.hex()
            print(hex_hashed_password)
            return b64encode(salt).decode('utf-8'), hex_hashed_password
        else:
            return False, False
    else: 
        return False, False


def checkingPasswordWithDatabase(password,email,phoneNumber):
    recordEmail = None
    recordPhone = None
    print("inputlar")
    print(email)
    print(phoneNumber)
    print("inputlar bitti")

    if len(email)==0 and len(phoneNumber)==0:
        return "This account is not in the database"
    else:
        if len(email)!=0:
            recordEmail = Users.has_item_by_multipple_columns(["Email"],[email])
        if len(phoneNumber)!=0:
            recordPhone = Users.has_item_by_multipple_columns(["Phone"],[phoneNumber])
        #print(recordEmail[1][0])
    if recordEmail!= None and recordEmail[0]:   
        record = recordEmail[1][0]
        salt = record[6]
        salt_bytes=salt.encode('utf-8')
        salt = base64.b64decode(salt_bytes)
        #salt = salt.decode('utf-8')
        #salt = bytes(record[6], 'utf-8')
        print(salt)
        plaintext = password.encode()
        digest_password = hashlib.pbkdf2_hmac('sha256', plaintext, salt, 10000)
        hex_hashed_password = digest_password.hex()
        hex_hashed_password_from_database = record[7]
    elif recordPhone!= None and recordPhone[0]:
        record = recordPhone[1][0]
        salt = record[6]
        salt_bytes=salt.encode('utf-8')
        salt = base64.b64decode(salt_bytes)
        #salt = salt.decode('utf-8')
        #salt = bytes(record[6], 'utf-8')
        print(salt)
        plaintext = password.encode()
        digest_password = hashlib.pbkdf2_hmac('sha256', plaintext, salt, 10000)
        hex_hashed_password = digest_password.hex()
        hex_hashed_password_from_database = record[7]
    else:
        return "This account is not in the database"
    if hex_hashed_password == hex_hashed_password_from_database:
        if recordEmail!=None and recordEmail[0]:
            response = dict()
            response["Login"] = True
            response["Id"]=recordEmail[1][0][0]
            response["UserTypeId"]=recordEmail[1][0][1]
            response["Name"]=recordEmail[1][0][2]
            response["Surname"]=recordEmail[1][0][3]
            response["Email"]=recordEmail[1][0][4]
            response["Phone"]=recordEmail[1][0][5]
            print(response)
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
            return "Login unsuccessful"
    else:
        return "Login unsuccessful"
    
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
