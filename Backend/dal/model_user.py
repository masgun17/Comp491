from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, SmallInteger, Float, \
    BLOB, Boolean, Index, BigInteger, and_, text, ForeignKey, REAL, or_, FLOAT, TEXT, asc, desc
from sqlalchemy.dialects.mysql import pymysql

from app_globals import connection

class Users():
    __tablename__ = 'Users'
    Id = Column(BigInteger, primary_key=True, autoincrement=True)
    UserTypeId = Column(BigInteger)
    Name = Column(String)
    Surname = Column(String)
    Email = Column(String)
    Phone = Column(String)
    Password = Column(String)
    KvkkCheck = Column(Boolean)
    AddDate = Column(DateTime)

    ## model_answer and model_assessment_session documents have similar functions with more comments

    @classmethod
    def has_item(cls, user_id):
        conn = connection.cursor()
        query_item = None
        result_code = False
        try:
            query_item = conn.execute(f"select * from Users where Id = {user_id}").fetchall()[0]
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
                items = conn.execute(f"select * from Users where {column_name} = '{column_value}'").fetchall()
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
                query = "select * from Users where " + column_names[0] + " = '" + column_values[0] + "' "
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
            items = conn.execute("select * from Users").fetchall()
            if items is not None and len(items) > 0:
                result_code = True
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items


    ## Input will be: (UserTypeId, Name, Surname, Email, Phone, Password, KvkkCheck)
    @classmethod
    def add_item(cls, user_item):
        conn = connection.cursor()
        result_code = False
        if user_item is not None and len(user_item)==8:
            try:
                conn.execute(f"""
                    insert into Users
                       ([UserTypeId]
                       ,[Name]
                       ,[Surname]
                       ,[Email]
                       ,[Phone]
                       ,[Salting]
                       ,[Password]
                       ,[KvkkCheck])
                    values
                       ({user_item[0]}
                       ,'{user_item[1]}'
                       ,'{user_item[2]}'
                       ,'{user_item[3]}'
                       ,'{user_item[4]}'
                       ,'{user_item[5]}'
                       ,'{user_item[6]}'
                       ,{user_item[7]})""")
                result_code = True
                conn.commit()
            except Exception as e:
                print(e)
            finally:
                conn.close()
                return result_code
        else:
            print(len(user_item))
            return result_code, None


    # deletes given item from db
    @classmethod
    def delete_item(cls, item_id):
        conn = connection.cursor()
        result_code = False
        try:
            conn.execute(f"delete from Users where Id={item_id}")
            result_code = True
            conn.commit()
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code



    ## Input will be: Id and (UserTypeId, Name, Surname, Email, Phone, Password, KvkkCheck)
    @classmethod
    def update_item(cls, user_id, user_item):
        conn = connection.cursor()
        result_code = False
        if user_id is not None and user_item is not None and len(user_item) == 7:
            try:
                conn.execute(f"""
                            update Users set
                               UserTypeId = {user_item[0]}
                               ,Name = '{user_item[1]}'
                               ,Surname = '{user_item[2]}'
                               ,Email = '{user_item[3]}'
                               ,Phone = '{user_item[4]}'
                               ,Password = '{user_item[5]}'
                               ,KvkkCheck = {user_item[6]}
                            where Id = {user_id}
                            """)
                result_code = True
                conn.commit()
            except Exception as e:
                print(e)
            finally:
                conn.close()
                return result_code
        else:
            print(len(user_item))
            return result_code, None

    @classmethod
    def change_password(cls, user_id, newPassword): #Updating the password of the user
        conn = connection.cursor()
        result_code = False
        if user_id is not None and newPassword is not None:
            try:
                conn.execute(f"""
                            update Users set
                               Password = '{newPassword}'
                            where Id = {user_id}
                            """)
                result_code = True
                conn.commit()
            except Exception as e:
                print(e)
            finally:
                conn.close()
                return result_code
        else:
            print(len(user_id))
            return result_code, None

    @classmethod
    def get_all_by_id(cls, userId):
        conn = connection.cursor()
        items = None
        result_code = False
        try:
            items = conn.execute(f"select * from Users where Id={userId}").fetchall()
            conn.commit()
            print(items)
            if items is not None and len(items) > 0:
                result_code = True
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items


