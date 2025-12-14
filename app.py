from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import os

app = Flask(__name__)
app.secret_key = 'rahasia-kunci-ezydraw'  # Kunci rahasia untuk session

# Route untuk halaman utama/dashboard
@app.route('/')
@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

# Route untuk halaman design
@app.route('/design')
def design():
    return render_template('design.html')

# Route untuk mode offline
@app.route('/mode-offline')
def mode_offline():
    return render_template('mode_offline.html')

# Route untuk about us
@app.route('/about-us')
def about_us():
    return render_template('about_us.html')

# Route untuk aset
@app.route('/aset')
def aset():
    return render_template('aset.html')

# Route untuk contributor
@app.route('/contributor')
def contributor():
    return render_template('contributor.html')

# Route untuk ezylearn
@app.route('/ezy-learn')
def ezy_learn():
    return render_template('ezylearn.html')

# Route untuk login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        # Simulasi login sederhana
        if username == 'admin' and password == 'admin':
            flash('Login berhasil!', 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('Username atau password salah!', 'error')
    
    return render_template('login.html')

# Route untuk plugins
@app.route('/plugins')
def plugins():
    return render_template('plugins.html')

# Route untuk rate
@app.route('/rate')
def rate():
    return render_template('rate.html')

# Route untuk register
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')
        
        # Validasi sederhana
        if password != confirm_password:
            flash('Password tidak cocok!', 'error')
        elif len(password) < 6:
            flash('Password minimal 6 karakter!', 'error')
        else:
            # Simpan data user (dalam implementasi nyata, simpan ke database)
            flash('Registrasi berhasil! Silakan login.', 'success')
            return redirect(url_for('login'))
    
    return render_template('register.html')

# Route untuk templates
@app.route('/templates')
def templates():
    return render_template('templates.html')

# Route untuk logout
@app.route('/logout')
def logout():
    flash('Anda telah logout.', 'info')
    return redirect(url_for('login'))

# API untuk mendapatkan data proyek (jika diperlukan)
@app.route('/api/projects')
def get_projects():
    projects = [
        {
            "id": 1,
            "title": "Poster Coming Soon",
            "description": "Poster acara webinar dari PII FAM ITH",
            "status": "dalam-proses",
            "date": "2024-03-15",
            "favorite": True
        },
        {
            "id": 2,
            "title": "Poster Spiderman",
            "description": "Poster film superhero dengan efek visual",
            "status": "draft",
            "date": "2024-03-14",
            "favorite": False
        },
        # Tambahkan data proyek lainnya
    ]
    return jsonify(projects)

# Route untuk menangani 404
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

# Route untuk testing
@app.route('/test')
def test():
    return "Server berjalan dengan baik!"

if __name__ == '__main__':
    # Buat folder static jika belum ada
    if not os.path.exists('static'):
        os.makedirs('static')
        os.makedirs('static/img')
        os.makedirs('static/css')
        os.makedirs('static/js')
    
    # Jalankan aplikasi
    app.run(debug=True, port=5000)