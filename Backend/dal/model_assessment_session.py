from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, SmallInteger, Float, \
    BLOB, Boolean, Index, BigInteger, and_, text, ForeignKey, REAL, or_, FLOAT, TEXT, asc, desc
from sqlalchemy.dialects.mysql import pymysql

from Backend.app_globals import connection

class AssessmentSession():
    __tablename__ = 'AssessmentSession'
    Id = Column(BigInteger, primary_key=True, autoincrement=True)
    UserId = Column(BigInteger)
    AddDate = Column(DateTime)

    """def __init__(self):
        self.Id = -1
        self.UserId = -1
        self.AddDate = '2022-01-01 00:00:00.000'"""

    @classmethod
    def has_item(cls, assessment_id):
        conn = connection.cursor()
        item = None
        result_code = False
        try:
            query_item = conn.execute(f"select * from AssessmentSession where Id = {assessment_id}").fetchall()
            if query_item is not None:
                item = {"Id": query_item[0][0], "UserId": query_item[0][1], "AddDate": query_item[0][2]}
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
                items = conn.execute(f"select * from AssessmentSession where {column_name} = {column_value}").fetchall()
                if items is not None and len(items) > 0:
                    result_code = True
                    if first_n is not None:
                        items = items[:first_n]
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items

    @classmethod
    def get_all(cls):
        conn = connection.cursor()
        items = None
        result_code = False
        try:
            items = conn.execute("select * from AssessmentSession")
            if items is not None and len(items) > 0:
                result_code = True
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items

    @classmethod
    def add_item(cls, UserId):
        conn = connection.cursor()
        result_code = False
        if UserId is not None:
            try:
                conn.execute(f"""
                    insert into AssessmentSession
                       ([UserId]
                       ,[AddDate])
                    values
                       ({UserId}
                       ,{datetime.now()})""")
                result_code = True
            except Exception as e:
                print(e)
            finally:
                conn.close()
                return result_code
        else:
            return result_code, None


    # deletes given item from db
    @classmethod
    def delete_item(cls, item_id):
        conn = connection.cursor()
        result_code = False
        try:
            conn.execute(f"delete from AssessmentSession where Id={item_id}")
            result_code = True
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code

"""result_code1, one_item = AssessmentSession.has_item(2)
result_code1, all_items = AssessmentSession.has_item_by_column("UserId",1)

print(one_item)
print(all_items)"""