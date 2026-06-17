const Login = {
    template: `
        <div class="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center relative overflow-hidden">
            <!-- Decorative Elements -->
            <div class="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
            <div class="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            
            <div class="bg-white/95 backdrop-blur-sm p-10 rounded-3xl shadow-2xl w-full max-w-md mx-4 z-10 border border-white/20">
                <div class="text-center mb-8">
                    <div class="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <i class="fas fa-user-shield text-4xl text-white"></i>
                    </div>
                    <h2 class="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Login Admin</h2>
                    <p class="text-gray-600 mt-2">Masuk ke Sistem Inventaris Sekolah</p>
                </div>
                
                <form @submit.prevent="handleLogin">
                    <div class="mb-5">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            <i class="fas fa-user mr-2 text-primary"></i>Username
                        </label>
                        <div class="relative">
                            <input v-model="username" type="text" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition" placeholder="Masukkan username" required>
                        </div>
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            <i class="fas fa-lock mr-2 text-primary"></i>Password
                        </label>
                        <div class="relative">
                            <input v-model="password" type="password" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition" placeholder="Masukkan password" required>
                        </div>
                    </div>
                    <button type="submit" class="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg transition transform hover:scale-[1.02] flex items-center justify-center gap-2">
                        <i class="fas fa-sign-in-alt"></i>
                        Masuk
                    </button>
                </form>
                
                <div class="mt-6 text-center">
                    <router-link to="/" class="text-primary hover:text-secondary transition flex items-center justify-center gap-2">
                        <i class="fas fa-arrow-left"></i>
                        Kembali ke Beranda
                    </router-link>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        async handleLogin() {
            try {
                // Menembak API Login Backend
                const response = await axios.post('http://localhost:8080/api/login', {
                    username: this.username,
                    password: this.password
                });
                
                if(response.data.status) {
                    // Menyimpan tanda pengenal dan token otentikasi ke localStorage
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    
                    alert(response.data.message);
                    this.$router.push('/dashboard');
                }
            } catch (error) {
                const msg = error.response ? error.response.data.message : 'Koneksi ke server gagal.';
                alert('Login Gagal: ' + msg);
            }
        }
    }
}