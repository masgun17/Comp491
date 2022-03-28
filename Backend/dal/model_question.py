from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, SmallInteger, Float, \
    BLOB, Boolean, Index, BigInteger, and_, text, ForeignKey, REAL, or_, FLOAT, TEXT, asc, desc
from sqlalchemy.dialects.mysql import pymysql

from Backend.app_globals import connection

class UserType():
    __tablename__ = 'Question'
    Id = Column(BigInteger, primary_key=True, autoincrement=True)
    PartId = Column(BigInteger)
    Weight = Column(Float)
    QuestionType = Column(String)
    Options = Column(String)

    @classmethod
    def has_item(cls, question_id):
        conn = connection.cursor()
        query_item = None
        result_code = False
        try:
            query_item = conn.execute(f"select * from Question where Id = {question_id}").fetchall()[0]
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
                items = conn.execute(f"select * from Question where {column_name} = '{column_value}'").fetchall()
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
                query = "select * from Question where " + column_names[0] + " = '" + column_values[0] + "' "
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
            items = conn.execute("select * from Question").fetchall()
            if items is not None and len(items) > 0:
                result_code = True
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items


    ## Input will be: (PartId, QuestionText, Weight, QuestionType, Options)
    @classmethod
    def add_item(cls, question_item):
        conn = connection.cursor()
        result_code = False
        if question_item is not None and len(question_item)==5:
            try:
                conn.execute(f"""
                    insert into Question
                       ([PartId]
                       ,[QuestionText]
                       ,[Weight]
                       ,[QuestionType]
                       ,[Options])
                    values
                       ({question_item[0]}
                       ,'{question_item[1]}'
                       ,{question_item[2]}
                       ,'{question_item[3]}'
                       ,'{question_item[4]}')""")
                result_code = True
                conn.commit()
            except Exception as e:
                print(e)
            finally:
                conn.close()
                return result_code
        else:
            print(len(question_item))
            return result_code, None


    # deletes given item from db
    @classmethod
    def delete_item(cls, item_id):
        conn = connection.cursor()
        result_code = False
        try:
            conn.execute(f"delete from Question where Id={item_id}")
            result_code = True
            conn.commit()
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code

    ## Input will be: Id and (PartId, QuestionText, Weight, QuestionType, Options)
    @classmethod
    def update_item(cls, question_id, question_item):
        conn = connection.cursor()
        result_code = False
        if question_id is not None and question_item is not None and len(question_item)==5:
            try:
                conn.execute(f"""
                    update Question set
                       PartId = {question_item[0]}
                       ,QuestionText = '{question_item[1]}'
                       ,Weight = {question_item[2]}
                       ,QuestionType = '{question_item[3]}'
                       ,Options = '{question_item[4]}'
                    where Id = {question_id}
                       """)
                result_code = True
                conn.commit()
            except Exception as e:
                print(e)
            finally:
                conn.close()
                return result_code
        else:
            print(len(question_item))
            return result_code, None


"""
result_code1, one_item = Users.has_item(2)
result_code1, all_items = Users.has_item_by_column("KvkkCheck",1)

print(one_item)
print(all_items)"""

"""## UserType.update_item(2 , ["Admin", 1, 1, 0])
UserType.add_item(["Admin", 1, 1, 0])



result_code1, all_items = UserType.has_item_by_column("Role","Aadmin")
print(all_items)"""
