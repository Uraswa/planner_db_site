import psycopg2

# Database connection parameters
db_config = {
    'dbname': 'planner',
    'user': 'Oper',
    'password': '123',
    'host': 'localhost',  # e.g., 'localhost' or a remote IP
    'port': '5432'  # Default PostgreSQL port
}

def query(q, params = None):


    try:
        # Establish the connection
        conn = psycopg2.connect(**db_config)

        # Create a cursor object to interact with the database
        cursor = conn.cursor()

        # Execute a test query
        if params is not None:
            cursor.execute(q, params)
        else:
            cursor.execute(q)
        conn.commit()

        # Fetch the result
        res = cursor.fetchone()


        # Close the cursor and connection when done
        cursor.close()
        conn.close()

        return res

    except Exception as e:
        print("Error connecting to the database:", e)

def procedure(q, p1arams = None):


    try:
        # Establish the connection
        conn = psycopg2.connect(**db_config)
        conn.autocommit = True

        # Create a cursor object to interact with the database
        cursor = conn.cursor()

        # Execute a test query
        if p1arams is not None:
            cursor.execute(q, p1arams)
        else:
            cursor.execute(q)
        res = cursor.fetchone()[0]
        # Close the cursor and connection when done

        cursor.close()
        conn.close()

        return res

    except Exception as e:
        print("Error connecting to the database:", e)