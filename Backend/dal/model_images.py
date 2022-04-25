from datetime import datetime
from tkinter import Image

from sqlalchemy import Column, Integer, String, DateTime, SmallInteger, Float, \
    BLOB, Boolean, Index, BigInteger, and_, text, ForeignKey, REAL, or_, FLOAT, TEXT, asc, desc
from sqlalchemy.dialects.mysql import pymysql

from app_globals import connection

class Images():
    __tablename__ = 'Images'
    Id = Column(BigInteger, primary_key=True, autoincrement=True)
    image = Column(String)
    index = Column(BigInteger)

    @classmethod
    def add_item(cls, image_url, index):
        conn = connection.cursor()
        result_code = False
        if image_url is not None:
            try:
                conn.execute(f"""
                    insert into Images
                       ([image]
                       ,[ind])
                    values
                       ('{image_url}'
                       ,'{index}')""")
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
    def get_all(cls):
        conn = connection.cursor()
        items = None
        result_code = False
        try:
            items = conn.execute("select * from Images").fetchall()
            if items is not None and len(items) > 0:
                result_code = True
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items