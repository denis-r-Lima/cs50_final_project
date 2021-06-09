import sqlite3
import sys


class SQL:

    def connect(self,url):
        self.url = url

    def execute(self,query, arg = ()):
        with sqlite3.connect(self.url) as con:
            cur = con.cursor()

            try:
                cur.execute(query, arg)

                if 'SELECT' in query:
                    rows = cur.fetchall()
                    columns = []
                    data = []

                    for column in cur.description:
                        columns.append(column[0])

                    for row in rows:
                        dict = {}
                        for i in range(len(row)):
                            dict[columns[i]] = row[i]
                        data.append(dict)

                    return data

                if 'INSERT' or 'DELETE' in query:
                    con.commit()
                    return cur.lastrowid
                
            
            except BaseException:
                raise sys.exc_info()[0]

    def test(self):
        print(self.url)
                

