import plotext as plt
import psycopg2, os, pandas as pd

conn = psycopg2.connect(
    host=os.environ['SUPABASE_HOST'],
    dbname=os.environ['SUPABASE_DB'],
    user=os.environ['SUPABASE_USER'],
    password=os.environ['SUPABASE_PASS'],
    port=5432
)

df = pd.read_sql("SELECT community, pledge_amount FROM pledges;", conn)
totals = df.groupby("community")["pledge_amount"].sum()

plt.bar(totals.index.tolist(), totals.values.tolist(), orientation="horizontal", color="yellow")
plt.title("Community Pledges")
plt.show()
