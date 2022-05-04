from datetime import datetime
from tkinter import Image

from sqlalchemy import Column, Integer, String, DateTime, SmallInteger, Float, \
    BLOB, Boolean, Index, BigInteger, and_, text, ForeignKey, REAL, or_, FLOAT, TEXT, asc, desc
from sqlalchemy.dialects.mysql import pymysql

from app_globals import connection

class Videos():
    __tablename__ = 'Videos'
    Id = Column(BigInteger, primary_key=True, autoincrement=True)
    video = Column(String)
    ind = Column(BigInteger)
    page = Column(String)

    @classmethod
    def add_item(cls, video, ind, page):
        conn = connection.cursor()
        result_code = False
        if video is not None:
            try:
                items = conn.execute(f"select count(*) from Videos where ind={ind} and page = '{page}'")  # O sayfadaki o indexli bir video kaydı var mı diye bakılması
                for row in items:
                    if(row[0]==0): #Kayıt yok ise database'e kayıt atılması 
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
                    else: #Kayıt var ise o kaydın video linkinin güncellenmesi 
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
            items = conn.execute(f"select count(*) from Videos where ind={ind} and page = '{page}'") # O sayfadaki o indexli bir video kaydı var mı diye bakılması
            for row in items:
                if(row[0]==1):
                    video = conn.execute(f"select * from Videos where ind={ind} and page = '{page}'").fetchall() #Kayıt var ise o kaydın çekilmes
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

   