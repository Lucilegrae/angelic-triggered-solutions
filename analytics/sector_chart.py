import plotext as plt
import psycopg2, os, pandas as pd

conn = psycopg2.connect(
    host=os.environ['SUPABASE_HOST'],
    dbname=os.environ['SUPABASE_DB'],
    user=os.environ['SUPABASE_USER'],
    password=os.environ['SUPABASE_PASS'],
    port=5432
)

df = pd.read_sql("SELECT sector FROM covenant_profiles;", conn)
counts = df['sector'].value_counts()

plt.bar(counts.index.tolist(), counts.values.tolist(), color="yellow")
plt.title("Phoenix Rising: Sector Counts")
plt.show()
