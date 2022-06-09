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



def hashingPasswordWithSalting(password,email,phone,conn): #Creating new users by hashing the password with a salt
    recordEmail = None
    recordPhone = None
    try: 
        if len(email)!=0: #If the email is not empty, get the record of the user by using email from the database
            recordEmail = Users.has_item_by_multipple_columns(["Email"],[email])
        if len(phone)!=0: #If the phone number is not empty, get the record of the user by using phone number from the database
            recordPhone = Users.has_item_by_multipple_columns(["Phone"],[phone])
    except Exception as e:
        print(e)
    if recordEmail!=None: #If the return of recordEmail is not none and return value of recordPhone is not none, check whether there is a data corresponding to this phone number and email
        if recordPhone!=None:
            if recordEmail[0] == False and recordPhone[0] == False: #If there is not any record of these phone number and email, create hashed password and salt
                salt = os.urandom(32) #Random 32-bytes long salt used in hashing
                plaintext = password.encode()
                digest_password = hashlib.pbkdf2_hmac('sha256', plaintext, salt, 10000) #Hashing password with salt
                hex_hashed_password = digest_password.hex() 
                return b64encode(salt).decode('utf-8'), hex_hashed_password
            else:
                return False,False #If there is a record of this person in the database, return False, False
        else:
            if recordEmail[0] == False: #If there is not any record of the person with email, create hashed password and salt
                salt = os.urandom(32) #Random 32-bytes long salt used in hashing
                plaintext = password.encode()
                digest_password = hashlib.pbkdf2_hmac('sha256', plaintext, salt, 10000) #Hashing password with salt
                hex_hashed_password = digest_password.hex()
                return b64encode(salt).decode('utf-8'), hex_hashed_password
            else:
                return False, False #If there is a record of this person in the database, return False, False
    elif recordPhone!=None:
        if recordPhone[0] ==False: #If there is not any record of the person with phone number, create hashed password and salt
            salt = os.urandom(32) #Random 32-bytes long salt used in hashing
            plaintext = password.encode()
            digest_password = hashlib.pbkdf2_hmac('sha256', plaintext, salt, 10000) #Hashing password with salt
            hex_hashed_password = digest_password.hex()
            return b64encode(salt).decode('utf-8'), hex_hashed_password
        else:
            return False, False #If there is a record of this person in the database, return False, False
    else: 
        return False, False #If there is a record of this person in the database, return False, False


def checkingPasswordWithDatabase(password,email,phoneNumber): #Checking whether the entered password is same with the one from the database
    recordEmail = None
    recordPhone = None
    if len(email)==0 and len(phoneNumber)==0: #Checking whether email or phone number is given to the system.
        return "This account is not in the database"
    else:
        if len(email)!=0:
            recordEmail = Users.has_item_by_multipple_columns(["Email"],[email]) #If email is given, get record of the user by using email column from the database
        if len(phoneNumber)!=0:
            recordPhone = Users.has_item_by_multipple_columns(["Phone"],[phoneNumber]) #If phone number is given, get record of the user by using phone number column from the database
    if recordEmail!= None and recordEmail[0]: #If the record coming from the database is not empty, get the hashed password.
        record = recordEmail[1][0]
        salt = record[6]
        salt_bytes=salt.encode('utf-8')
        salt = base64.b64decode(salt_bytes)
        plaintext = password.encode()
        digest_password = hashlib.pbkdf2_hmac('sha256', plaintext, salt, 10000) #Hashing password with salt
        hex_hashed_password = digest_password.hex()
        hex_hashed_password_from_database = record[7]
    elif recordPhone!= None and recordPhone[0]: #If the record coming from the database is not empty, get the hashed password.
        record = recordPhone[1][0]
        salt = record[6]
        salt_bytes=salt.encode('utf-8')
        salt = base64.b64decode(salt_bytes)
        plaintext = password.encode()
        digest_password = hashlib.pbkdf2_hmac('sha256', plaintext, salt, 10000) #Hashing password with salt
        hex_hashed_password = digest_password.hex()
        hex_hashed_password_from_database = record[7]
    else:
        return "This account is not in the database"
    if hex_hashed_password == hex_hashed_password_from_database: # If the entered password, which is hashed with salt, is equal to the hashed password coming from the database, return user's information
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
            return "Login unsuccessful" #If the entered password, which is hashed with salt, is not equal to the hashed password coming from the database, return alert
    else:
        return "Login unsuccessful"
    
def getUsersDetailFromEmail(email): #Triggered when clicked "şifremi unuttum" button.
    recordEmail = Users.has_item_by_multipple_columns(["Email"],[email]) #Gets user's data from the database by using email entered
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
    randomPassword = "".join(temp) #Constructing random password
    plaintext = randomPassword.encode() 
    digest_password = hashlib.pbkdf2_hmac('sha256', plaintext, salt, 10000) #Hashing random password with salt. 
    hex_hashed_password = digest_password.hex()
    recordStatus = Users.change_password(id,hex_hashed_password) #Updating the password column in the database
    return randomPassword, recordStatus, name 

def changingPassword(id,passwordOld,passwordNew): #Triggered when "şifremi değiştir" button clicked in the Profile page
    recordId = Users.has_item_by_multipple_columns(["Id"],[str(id)])
    record = recordId[1][0]
    salt = record[6]
    salt_bytes=salt.encode('utf-8')
    salt = base64.b64decode(salt_bytes)
    plaintext = passwordOld.encode()
    digest_password = hashlib.pbkdf2_hmac('sha256', plaintext, salt, 10000) #Hashing the given current password
    hex_hashed_password = digest_password.hex()
    hex_hashed_password_from_database = record[7]
    if hex_hashed_password == hex_hashed_password_from_database: #Checks whether the given password and the password coming from the database are equal. If they are equal, hash the new password with a salt and update the password of the user in the database
        plaintext_new = passwordNew.encode()
        digest_password_new = hashlib.pbkdf2_hmac('sha256', plaintext_new, salt, 10000) #Hashing the new password to store in the database
        hex_hashed_password_new = digest_password_new.hex()
        recordStatus = Users.change_password(id,hex_hashed_password_new)
        if recordStatus:
            return "Password changed"
        else:
            return "Password Couldn't changed"
    else:
        return "Current Password is not correct"