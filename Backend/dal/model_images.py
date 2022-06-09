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
    ind = Column(BigInteger)

    ## model_answer and model_assessment_session documents have similar functions with more comments

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

    @classmethod
    def has_item(cls, image_id):
        conn = connection.cursor()
        query_item = None
        result_code = False
        try:
            query_item = conn.execute(f"select * from Images where Id = {image_id}").fetchall()[0]
            if query_item is not None:
                result_code = True
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, query_item


    @classmethod
    def has_item_by_column(cls, column_name, column_value, first_n=None):
        conn = connection.cursor()
        items = []
        result_code = False
        try:
            if column_value is not None and column_name is not None and len(column_name) > 0:
                items = conn.execute(f"select * from Images where {column_name} = '{column_value}'").fetchall()
                if items is not None and len(items) > 0:
                    result_code = True
                    if first_n is not None:
                        items = items[:first_n]
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items



    # Takes index of the Image
    # deletes given item from db
    @classmethod
    def delete_item(cls, index_id):
        conn = connection.cursor()
        result_code = False
        try:
            conn.execute(f"delete from Images where ind ={index_id}")
            result_code = True
            conn.commit()
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code


    # Takes index of the Image
    # update_item item from db
    @classmethod
    def update_item(cls, img_base64, index):
        conn = connection.cursor()
        result_code = False
        try:
            conn.execute(f"update Images set image = '{img_base64}' where ind ={index}")
            result_code = True
            conn.commit()
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code

    @classmethod
    def delete_all(cls):
        conn = connection.cursor()
        result_code = False
        try:
            conn.execute(f"delete from Images")
            result_code = True
            conn.commit()
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code