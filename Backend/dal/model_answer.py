from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, SmallInteger, Float, \
    BLOB, Boolean, Index, BigInteger, and_, text, ForeignKey, REAL, or_, FLOAT, TEXT, asc, desc
from sqlalchemy.dialects.mysql import pymysql

from app_globals import connection

class Answer():
    __tablename__ = 'Answer'
    Id = Column(BigInteger, primary_key=True, autoincrement=True)
    AssessmentSessionId = Column(BigInteger)
    QuestionId = Column(BigInteger)
    UserAnswer = Column(String)

    @classmethod
    def has_item(cls, answer_id):
        conn = connection.cursor()
        query_item = None
        result_code = False
        try:
            query_item = conn.execute(f"select * from Answer where Id = {answer_id}").fetchall()[0]
            if query_item is not None:
                ## item = {"Id": query_item[0][0], "UserId": query_item[0][1], "AddDate": query_item[0][2]}
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
                items = conn.execute(f"select * from Answer where {column_name} = '{column_value}'").fetchall()
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
    def has_item_by_multipple_columns(cls, column_names, column_values, first_n=None):
        conn = connection.cursor()
        items = []
        result_code = False
        try:
            if column_values is not None and column_names is not None \
                    and len(column_names) > 0 and len(column_names)==len(column_values):
                query = "select * from Answer where " + column_names[0] + " = '" + column_values[0] + "' "
                for i in range(len(column_names)-1):
                    query = query + " and " + column_names[i] + " = '" + column_values[i] + "' "
                items = conn.execute(query).fetchall()
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
            items = conn.execute("select * from Answer").fetchall()
            if items is not None and len(items) > 0:
                result_code = True
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items


    ## Input will be: (AssessmentSessionId, QuestionId, UserAnswer)
    @classmethod
    def add_item(cls, answer_item):
        conn = connection.cursor()
        result_code = False
        if answer_item is not None and len(answer_item)==3:
            try:
                conn.execute(f"""
                    insert into Answer
                       ([AssessmentSessionId]
                       ,[QuestionId]
                       ,[UserAnswer])
                    values
                       ({answer_item[0]}
                        ,{answer_item[1]}
                       ,'{answer_item[2]}')""")
                result_code = True
                conn.commit()
            except Exception as e:
                print(e)
            finally:
                conn.close()
                return result_code
        else:
            print(len(answer_item))
            return result_code, None


    # deletes given item from db
    @classmethod
    def delete_item(cls, item_id):
        conn = connection.cursor()
        result_code = False
        try:
            conn.execute(f"delete from Answer where Id={item_id}")
            result_code = True
            conn.commit()
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code

    ## Input will be: Id and (AssessmentSessionId, QuestionId, UserAnswer)
    @classmethod
    def update_item(cls, answer_id, answer_item):
        conn = connection.cursor()
        result_code = False
        if answer_id is not None and answer_item is not None and len(answer_item)==5:
            try:
                conn.execute(f"""
                    update Answer set
                       AssessmentSessionId = {answer_item[0]}
                       ,QuestionId = {answer_item[1]}
                       ,UserAnswer = '{answer_item[2]}'
                    where Id = {answer_id}
                       """)
                result_code = True
                conn.commit()
            except Exception as e:
                print(e)
            finally:
                conn.close()
                return result_code
        else:
            print(len(answer_item))
            return result_code, None

    @classmethod
    def get_all_by_assessmentId(cls, assessmentId):
        conn = connection.cursor()
        items = None
        result_code = False
        try:
            items = conn.execute(f"select * from Answer where AssessmentSessionId = {assessmentId}").fetchall()
            if items is not None and len(items) > 0:
                result_code = True
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items

"""
result_code1, one_item = Users.has_item(2)
result_code1, all_items = Users.has_item_by_column("KvkkCheck",1)

print(one_item)
print(all_items)"""

"""## UserType.update_item(2 , ["Admin", 1, 1, 0])
UserType.add_item(["Admin", 1, 1, 0])



result_code1, all_items = UserType.has_item_by_column("Role","Aadmin")
print(all_items)"""
