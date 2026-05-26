import plotext as plt
import psycopg2, os, pandas as pd

conn = psycopg2.connect(
    host=os.environ['SUPABASE_HOST'],
    dbname=os.environ['SUPABASE_DB'],
    user=os.environ['SUPABASE_USER'],
    password=os.environ['SUPABASE_PASS'],
    port=5432
)

df = pd.read_sql("SELECT day, attendance FROM rollcall ORDER BY day;", conn)

plt.plot(df['day'].tolist(), df['attendance'].tolist(), marker="dot", color="yellow")
plt.title("Roll‑Call Timeline")
plt.show()
