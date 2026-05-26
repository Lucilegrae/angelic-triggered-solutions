import plotext as plt
import psycopg2, os, pandas as pd

conn = psycopg2.connect(
    host=os.environ['SUPABASE_HOST'],
    dbname=os.environ['SUPABASE_DB'],
    user=os.environ['SUPABASE_USER'],
    password=os.environ['SUPABASE_PASS'],
    port=5432
)

df = pd.read_sql("SELECT role FROM miner_workforce;", conn)
counts = df['role'].value_counts()

plt.bar(counts.index.tolist(), counts.values.tolist(), color="yellow")
plt.title("Miner Workforce Roll")
plt.show()
