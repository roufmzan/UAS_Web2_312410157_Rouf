const Dashboard = {
    template: `
        <div class="min-h-screen bg-gray-50 flex">
            <!-- Sidebar -->
            <aside class="w-64 bg-gradient-to-b from-dark to-slate-800 text-white shadow-xl fixed h-full">
                <div class="p-6 border-b border-white/10">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                            <i class="fas fa-school text-xl"></i>
                        </div>
                        <div>
                            <h1 class="font-bold text-lg">SIS</h1>
                            <p class="text-xs text-gray-400">Sistem Inventaris Sekolah</p>
                        </div>
                    </div>
                </div>
                
                <nav class="p-4">
                    <router-link to="/dashboard" class="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/20 text-primary font-medium mb-2">
                        <i class="fas fa-home"></i>
                        Dashboard
                    </router-link>
                    <router-link to="/kategori" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition mb-2">
                        <i class="fas fa-tags"></i>
                        Kategori
                    </router-link>
                    <router-link to="/barang" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition mb-2">
                        <i class="fas fa-boxes"></i>
                        Barang
                    </router-link>
                    <router-link to="/histori" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition mb-2">
                        <i class="fas fa-history"></i>
                        Histori
                    </router-link>
                </nav>
                
                <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                    <div class="flex items-center gap-3 mb-4 px-4">
                        <div class="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                            <i class="fas fa-user"></i>
                        </div>
                        <div>
                            <p class="font-medium text-sm">{{ user.nama_lengkap || 'Admin' }}</p>
                            <p class="text-xs text-gray-400">Administrator</p>
                        </div>
                    </div>
                    <button @click="handleLogout" class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 rounded-xl transition font-medium">
                        <i class="fas fa-sign-out-alt"></i>
                        Logout
                    </button>
                </div>
            </aside>
            
            <!-- Main Content -->
            <main class="flex-1 ml-64 p-8">
                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-gray-800">Dashboard</h1>
                    <p class="text-gray-600 mt-1">Selamat datang kembali, {{ user.nama_lengkap || 'Admin' }}!</p>
                </div>
                
                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition">
                        <div class="flex items-center justify-between mb-4">
                            <div class="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                                <i class="fas fa-boxes text-white text-xl"></i>
                            </div>
                            <span class="text-sm text-gray-500">Total Barang</span>
                        </div>
                        <h3 class="text-3xl font-bold text-gray-800">{{ stats.totalBarang || 0 }}</h3>
                        <p class="text-sm text-green-600 mt-2"><i class="fas fa-arrow-up mr-1"></i>Inventaris aktif</p>
                    </div>
                    
                    <div class="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition">
                        <div class="flex items-center justify-between mb-4">
                            <div class="w-12 h-12 bg-gradient-to-br from-secondary to-secondary/70 rounded-xl flex items-center justify-center">
                                <i class="fas fa-tags text-white text-xl"></i>
                            </div>
                            <span class="text-sm text-gray-500">Kategori</span>
                        </div>
                        <h3 class="text-3xl font-bold text-gray-800">{{ stats.totalKategori || 0 }}</h3>
                        <p class="text-sm text-blue-600 mt-2"><i class="fas fa-folder mr-1"></i>Kelompok barang</p>
                    </div>
                    
                    <div class="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition">
                        <div class="flex items-center justify-between mb-4">
                            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                                <i class="fas fa-arrow-down text-white text-xl"></i>
                            </div>
                            <span class="text-sm text-gray-500">Barang Masuk</span>
                        </div>
                        <h3 class="text-3xl font-bold text-gray-800">{{ stats.barangMasuk || 0 }}</h3>
                        <p class="text-sm text-green-600 mt-2"><i class="fas fa-plus mr-1"></i>Transaksi masuk</p>
                    </div>
                    
                    <div class="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition">
                        <div class="flex items-center justify-between mb-4">
                            <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                                <i class="fas fa-arrow-up text-white text-xl"></i>
                            </div>
                            <span class="text-sm text-gray-500">Barang Keluar</span>
                        </div>
                        <h3 class="text-3xl font-bold text-gray-800">{{ stats.barangKeluar || 0 }}</h3>
                        <p class="text-sm text-red-600 mt-2"><i class="fas fa-minus mr-1"></i>Transaksi keluar</p>
                    </div>
                </div>
                
                <!-- Quick Actions -->
                <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
                    <h2 class="text-xl font-bold text-gray-800 mb-4">Aksi Cepat</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <router-link to="/barang" class="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl hover:from-primary/20 hover:to-primary/10 transition">
                            <div class="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                                <i class="fas fa-plus text-white"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-gray-800">Tambah Barang</h3>
                                <p class="text-sm text-gray-600">Input barang baru</p>
                            </div>
                        </router-link>
                        <router-link to="/kategori" class="flex items-center gap-4 p-4 bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-xl hover:from-secondary/20 hover:to-secondary/10 transition">
                            <div class="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                                <i class="fas fa-folder-plus text-white"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-gray-800">Tambah Kategori</h3>
                                <p class="text-sm text-gray-600">Buat kategori baru</p>
                            </div>
                        </router-link>
                        <router-link to="/histori" class="flex items-center gap-4 p-4 bg-gradient-to-r from-accent/10 to-accent/5 rounded-xl hover:from-accent/20 hover:to-accent/10 transition">
                            <div class="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                                <i class="fas fa-exchange-alt text-white"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-gray-800">Catat Transaksi</h3>
                                <p class="text-sm text-gray-600">Barang masuk/keluar</p>
                            </div>
                        </router-link>
                    </div>
                </div>
                
                <!-- Recent Activity -->
                <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <h2 class="text-xl font-bold text-gray-800 mb-4">Aktivitas Terbaru</h2>
                    <div class="text-gray-600">
                        <p class="flex items-center gap-3 py-3 border-b border-gray-100">
                            <i class="fas fa-info-circle text-primary"></i>
                            Selamat datang di panel admin Sistem Inventaris Sekolah. Gunakan menu di samping untuk mengelola inventaris.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    `,
    data() {
        return {
            user: JSON.parse(localStorage.getItem('user')) || {},
            stats: {
                totalBarang: 0,
                totalKategori: 0,
                barangMasuk: 0,
                barangKeluar: 0
            }
        }
    },
    mounted() {
        this.loadStats();
    },
    methods: {
        async loadStats() {
            try {
                // Load total barang
                const barangRes = await axios.get('http://localhost:8080/api/barang');
                if(barangRes.data.status) {
                    this.stats.totalBarang = barangRes.data.data.length;
                }
                
                // Load total kategori
                const kategoriRes = await axios.get('http://localhost:8080/api/kategori');
                if(kategoriRes.data.status) {
                    this.stats.totalKategori = kategoriRes.data.data.length;
                }
                
                // Load histori untuk barang masuk/keluar
                const historiRes = await axios.get('http://localhost:8080/api/histori');
                if(historiRes.data.status) {
                    const histori = historiRes.data.data;
                    this.stats.barangMasuk = histori.filter(h => h.jenis_transaksi === 'Masuk').length;
                    this.stats.barangKeluar = histori.filter(h => h.jenis_transaksi === 'Keluar').length;
                }
            } catch (error) {
                console.error('Gagal memuat statistik:', error);
            }
        },
        handleLogout() {
            // Menghapus seluruh sesi dari localStorage
            localStorage.clear();
            this.$router.push('/login');
        }
    }
}