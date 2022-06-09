from datetime import datetime
from tkinter import Image

from sqlalchemy import Column, Integer, String, DateTime, SmallInteger, Float, \
    BLOB, Boolean, Index, BigInteger, and_, text, ForeignKey, REAL, or_, FLOAT, TEXT, asc, desc
from sqlalchemy.dialects.mysql import pymysql

from app_globals import connection

class Videos():
    __tablename__ = 'Videos'
    Id = Column(BigInteger, primary_key=True, autoincrement=True)
    video = Column(String) #src of the video
    ind = Column(BigInteger) #index of the video (1=first video, 2=second video)
    page = Column(String) #which page this video is located

    @classmethod
    def add_item(cls, video, ind, page):
        conn = connection.cursor()
        result_code = False
        if video is not None:
            try:
                items = conn.execute(f"select count(*) from Videos where ind={ind} and page = '{page}'") #Checking whether there is a video in that page with that index
                for row in items:
                    if(row[0]==0): #If there is not any record, insert into the database  
                        conn.execute(f"""
                        insert into Videos
                        ([video]
                        ,[ind]
                        ,[page])
                        values
                        ('{video}'
                        ,'{ind}'
                        ,'{page}')""")
                        result_code = True
                        conn.commit()
                    else: #If there is a record, update the src of the record 
                        conn.execute(f"update Videos set video = '{video}' where ind ={ind} and page='{page}'")
                        result_code = True
                        conn.commit()
                    result_code = True
                    conn.commit()
            except Exception as e:
                print(e)
            finally:
                conn.close()
                return result_code
        else:
            return result_code, None

    @classmethod
    def get_all(cls,ind,page):
        conn = connection.cursor()
        result_code = False
        items = None
        try:
            items = conn.execute(f"select count(*) from Videos where ind={ind} and page = '{page}'") #Checking whether there is a video in that page with that index
            for row in items:
                if(row[0]==1):
                    video = conn.execute(f"select * from Videos where ind={ind} and page = '{page}'").fetchall() #If there is a record, return the record to the front-end
                    result_code = True
                    conn.commit()
                    items= video
                else:
                    items = None
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items

   