import sqlite3
from sqlite3.dbapi2 import IntegrityError, OperationalError
import sys


class SQL:

    def connect(self, url):
        self._url = url

    def execute(self,query, arg = ()):
        with sqlite3.connect(self._url) as con:
            cur = con.cursor()

            try:
                cur.execute(query, arg)

                if 'SELECT' in query:
                    rows = cur.fetchall()
                    columns = []
                    data = []


                    #Get columns name 
                    for column in cur.description:
                        columns.append(column[0])

                    print(columns)

                    #Transform rows in dictionaries
                    for row in rows:
                        dict = {}
                        for i in range(len(row)):
                            dict[columns[i]] = row[i]
                        data.append(dict)

                    return data

                if 'INSERT' or 'DELETE' in query:
                    con.commit()
                    return cur.lastrowid

            except IntegrityError as e:
                print(e)
                raise e

            except OperationalError as e:
                print(e)
            except:
                print(sys.exc_info()[0])
                

    def test(self):
        print(self.url)
                

