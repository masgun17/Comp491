from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, SmallInteger, Float, \
    BLOB, Boolean, Index, BigInteger, and_, text, ForeignKey, REAL, or_, FLOAT, TEXT, asc, desc
from sqlalchemy.dialects.mysql import pymysql

from Backend.app_globals import connection

class PartScore():
    __tablename__ = 'PartScore'
    Id = Column(BigInteger, primary_key=True, autoincrement=True)
    AssessmentSessionId = Column(BigInteger)
    PartId = Column(BigInteger)
    Score = Column(Integer)

    ## model_answer and model_assessment_session documents have similar functions with more comments

    @classmethod
    def has_item(cls, part_score_id):
        conn = connection.cursor()
        query_item = None
        result_code = False
        try:
            query_item = conn.execute(f"select * from PartScore where Id = {part_score_id}").fetchall()[0]
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
                items = conn.execute(f"select * from PartScore where {column_name} = '{column_value}'").fetchall()
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
                query = "select * from PartScore where " + column_names[0] + " = '" + column_values[0] + "' "
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
            items = conn.execute("select * from PartScore").fetchall()
            if items is not None and len(items) > 0:
                result_code = True
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code, items


    ## Input will be: (AssessmentSessionId, PartId, Score)
    @classmethod
    def add_item(cls, part_score_item):
        conn = connection.cursor()
        result_code = False
        if part_score_item is not None and len(part_score_item)==3:
            try:
                conn.execute(f"""
                    insert into PartScore
                       ([AssessmentSessionId]
                       ,[PartId]
                       ,[Score])
                    values
                       ({part_score_item[0]}
                       ,'{part_score_item[1]}'
                       ,{part_score_item[2]})""")
                result_code = True
                conn.commit()
            except Exception as e:
                print(e)
            finally:
                conn.close()
                return result_code
        else:
            print(len(part_score_item))
            return result_code, None


    # deletes given item from db
    @classmethod
    def delete_item(cls, item_id):
        conn = connection.cursor()
        result_code = False
        try:
            conn.execute(f"delete from PartScore where Id={item_id}")
            result_code = True
            conn.commit()
        except Exception as e:
            print(e)
        finally:
            conn.close()
            return result_code

    ## Input will be: Id and (AssessmentSessionId, PartId, Score)
    @classmethod
    def update_item(cls, part_score_id, part_score_item):
        conn = connection.cursor()
        result_code = False
        if part_score_id is not None and part_score_item is not None and len(part_score_item)==3:
            try:
                conn.execute(f"""
                    update PartScore set
                       AssessmentSessionId = {part_score_item[0]}
                       ,PartId = {part_score_item[1]}
                       ,Score = {part_score_item[2]}
                    where Id = {part_score_id}
                       """)
                result_code = True
                conn.commit()
            except Exception as e:
                print(e)
            finally:
                conn.close()
                return result_code
        else:
            print(len(part_score_item))
            return result_code, None


