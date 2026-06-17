const Home = {
    template: `
        <div class="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent flex flex-col justify-center items-center relative overflow-hidden">
            <!-- Decorative Elements -->
            <div class="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
            <div class="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
            
            <nav class="absolute top-0 w-full bg-white/10 backdrop-blur-md p-4 text-white flex justify-between items-center shadow-lg z-10">
                <div class="flex items-center gap-3 ml-4">
                    <i class="fas fa-school text-2xl"></i>
                    <h1 class="text-xl font-bold">Sistem Inventaris Sekolah</h1>
                </div>
                <router-link to="/login" class="bg-white text-primary px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition shadow-lg mr-4 flex items-center gap-2">
                    <i class="fas fa-sign-in-alt"></i>
                    Login Admin
                </router-link>
            </nav>
            
            <div class="text-center bg-white/95 backdrop-blur-sm p-12 rounded-3xl shadow-2xl w-11/12 max-w-3xl mt-16 z-10 border border-white/20">
                <div class="mb-6">
                    <i class="fas fa-boxes-stacked text-6xl text-primary mb-4"></i>
                </div>
                <h1 class="text-5xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
                    Selamat Datang
                </h1>
                <h2 class="text-3xl font-bold text-gray-800 mb-6">Sistem Inventaris Sekolah</h2>
                <p class="text-gray-600 mb-8 leading-relaxed text-lg">
                    Sistem informasi modern untuk mengelola data inventaris barang sekolah secara digital dan efisien. 
                    Kelola kategori, monitor stok barang, dan lacak riwayat transaksi dengan mudah.
                </p>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div class="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-xl">
                        <i class="fas fa-tags text-3xl text-primary mb-2"></i>
                        <h3 class="font-bold text-gray-800">Manajemen Kategori</h3>
                        <p class="text-sm text-gray-600">Kelola kategori barang</p>
                    </div>
                    <div class="bg-gradient-to-br from-secondary/10 to-secondary/5 p-4 rounded-xl">
                        <i class="fas fa-cubes text-3xl text-secondary mb-2"></i>
                        <h3 class="font-bold text-gray-800">Kontrol Stok</h3>
                        <p class="text-sm text-gray-600">Monitor inventaris real-time</p>
                    </div>
                    <div class="bg-gradient-to-br from-accent/10 to-accent/5 p-4 rounded-xl">
                        <i class="fas fa-history text-3xl text-accent mb-2"></i>
                        <h3 class="font-bold text-gray-800">Riwayat Transaksi</h3>
                        <p class="text-sm text-gray-600">Lacak semua pergerakan</p>
                    </div>
                </div>
                
                <router-link to="/login" class="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition transform hover:scale-105 inline-flex items-center gap-2">
                    <i class="fas fa-rocket"></i>
                    Masuk ke Panel Admin
                </router-link>
            </div>
        </div>
    `
}