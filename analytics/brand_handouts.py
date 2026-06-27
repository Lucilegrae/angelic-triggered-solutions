def brand_handout(filename, header, footer):
    with open(filename, "r+") as f:
        content = f.read()
        f.seek(0, 0)
        f.write(header + "\n\n" + content + "\n" + footer + "\n")
