from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, SmallInteger, Float, \
    BLOB, Boolean, Index, BigInteger, and_, text, ForeignKey, REAL, or_, FLOAT, TEXT, asc, desc
from sqlalchemy.dialects.mysql import pymysql

from app_globals import connection

class AssessmentSession():
    __tablename__ = 'AssessmentSession'
    Id = Column(BigInteger, primary_key=True, autoincrement=True)
    UserId = Column(BigInteger)
    AddDate = Column(DateTime)
    Suggestions = Column(String)


    # search for a given id of an AssessmentSession entity from database
    @classmethod
    def has_item(cls, assessment_id):
        conn = connection.cursor()
        query_item = None
        result_code = False
        try:
            query_item = conn.execute(f"select * from AssessmentSession where Id = {assessment_id}").fetchall()[0]
            if query_item is not None:
                result_code = True
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, query_item

    # search for a given attribute of an AssessmentSession entity from database
    @classmethod
    def has_item_by_column(cls, column_name, column_value, first_n=None):
        conn = connection.cursor()
        items = []
        result_code = False
        try:
            if column_value is not None and column_name is not None and len(column_name) > 0:
                items = conn.execute(f"select * from AssessmentSession where {column_name} = '{column_value}'").fetchall()
                if items is not None and len(items) > 0:
                    result_code = True
                    if first_n is not None:
                        items = items[:first_n]
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items

    # gets all instances from database
    @classmethod
    def get_all(cls):
        conn = connection.cursor()
        items = None
        result_code = False
        try:
            items = conn.execute("select * from AssessmentSession").fetchall()
            if items is not None and len(items) > 0:
                result_code = True
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items

    # gets last instance from database
    @classmethod
    def get_last(cls):
        conn = connection.cursor()
        items = None
        result_code = False
        try:
            items = conn.execute("select * from AssessmentSession order by Id desc").fetchall()
            if items is not None and len(items) > 0:
                result_code = True
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items[0]

    # inserts a new AssessmentSession entity to database
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
                       ,'{datetime.now().strftime("%Y-%m-%d %H:%M:%S")}')""")
                result_code = True
                conn.commit()
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
            conn.commit()
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code

    # gets all instances from given id
    @classmethod
    def get_all_by_id(cls, userId):
        conn = connection.cursor()
        items = None
        result_code = False
        try:
            items = conn.execute(f"select * from AssessmentSession where UserId={userId}").fetchall()
            if items is not None and len(items) > 0:
                result_code = True
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items


    @classmethod
    def getAllDataAsExcel(cls):
        conn = connection.cursor()
        items = None
        result_code = False
        try:
            items = conn.execute(f"""select AssessmentSession.Id, AddDate, Users.Name, Users.Surname,Users.Email, Users.Phone,  QuestionText, Options, UserAnswer from [Comp491].[dbo].[AssessmentSession] join [Comp491].[dbo].[Answer] on AssessmentSession.Id = Answer.AssessmentSessionId
  join Question on Question.Id=Answer.QuestionId join Users on Users.Id=AssessmentSession.UserId""").fetchall()
            if items is not None and len(items) > 0:
                result_code = True
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items


    ## Input will be: Id and (UserId, AddDate, Suggestions)
    @classmethod
    def update_item(cls, assessmentSesison_id, assessmentSesison_item):
        conn = connection.cursor()
        result_code = False
        if assessmentSesison_id is not None and assessmentSesison_item is not None and len(assessmentSesison_item)==5:
            try:
                conn.execute(f"""
                    update AssessmentSession set
                       UserId = {assessmentSesison_item[0]}
                       ,AddDate = '{assessmentSesison_item[1]}'
                       ,Suggestions = '{assessmentSesison_item[2]}'
                    where Id = {assessmentSesison_id}
                       """)
                result_code = True
                conn.commit()
            except Exception as e:
                print(e)
            finally:
                conn.close()
                return result_code
        else:
            print(len(assessmentSesison_item))
            return result_code, None

    # returns recommendetion list for a given AssessmentSession
    @classmethod
    def get_suggestions_by_assessmentId(cls, assessmentId):
        conn = connection.cursor()
        items = []
        result_code = False
        try:
            if assessmentId is not None :
                items = conn.execute(f"select Suggestions from AssessmentSession where Id = {assessmentId}").fetchall()
                if items is not None and len(items) > 0:
                    result_code = True
                    
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items


    # saves / updates the recommendetions
    @classmethod
    def save_suggestionIds(cls, assessmentSesison_id, suggestionIds): 
        conn = connection.cursor()
        result_code = False
        if assessmentSesison_id is not None and suggestionIds is not None and len(suggestionIds)>0:
            try:
                conn.execute(f"""
                    update AssessmentSession set
                       Suggestions = '{suggestionIds}'
                    where Id = {assessmentSesison_id}
                       """)
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
    def total_participants(cls): #Getting total number of people who solved the assessment.
        conn = connection.cursor()
        items = []
        result_code = False
        try:
           
            items = conn.execute(f"select count(*) from AssessmentSession").fetchall()
            if items is not None and len(items) > 0:
                result_code = True
                    
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items

"""
result_code1, one_item = AssessmentSession.has_item(2)
result_code1, all_items = AssessmentSession.has_item_by_column("UserId",1)

print(one_item)
print(all_items)
"""

"""
AssessmentSession.delete_item(3)

result_code1, all_items = AssessmentSession.has_item_by_column("UserId",1)
print(all_items)"""
