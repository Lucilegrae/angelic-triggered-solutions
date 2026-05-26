from http.server import SimpleHTTPRequestHandler, HTTPServer

class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()

    def log_message(self, format, *args):
        print(f"[REQUEST] {self.address_string()} {self.requestline}")

if __name__ == "__main__":
    server = HTTPServer(("127.0.0.1", 8080), NoCacheHandler)
    print("✨ Serving chamber with no-cache headers on http://127.0.0.1:8080")
    server.serve_forever()
