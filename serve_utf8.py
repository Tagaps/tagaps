import sys
import http.server
import socketserver

port = int(sys.argv[1]) if len(sys.argv) > 1 else 8899

class UTF8Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        if self.path.endswith('.html') or self.path == '/':
            self.send_header('Content-Type', 'text/html; charset=utf-8')
        super().end_headers()

with socketserver.TCPServer(("", port), UTF8Handler) as httpd:
    print(f"Serving on port {port}")
    httpd.serve_forever()
