const Histori = {
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
                    <router-link to="/dashboard" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition mb-2">
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
                    <router-link to="/histori" class="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/20 text-primary font-medium mb-2">
                        <i class="fas fa-history"></i>
                        Histori
                    </router-link>
                </nav>
                
                <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                    <button @click="handleLogout" class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 rounded-xl transition font-medium">
                        <i class="fas fa-sign-out-alt"></i>
                        Logout
                    </button>
                </div>
            </aside>
            
            <!-- Main Content -->
            <main class="flex-1 ml-64 p-8">
                <div class="flex justify-between items-center mb-8">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-800">Histori Transaksi</h1>
                        <p class="text-gray-600 mt-1">Riwayat barang masuk dan keluar</p>
                    </div>
                    <button @click="openModal()" class="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition transform hover:scale-105 flex items-center gap-2">
                        <i class="fas fa-plus"></i>
                        Catat Transaksi
                    </button>
                </div>

                <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left">
                            <thead>
                                <tr class="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                    <th class="p-4 font-semibold text-gray-700">Tanggal</th>
                                    <th class="p-4 font-semibold text-gray-700">Nama Barang</th>
                                    <th class="p-4 font-semibold text-gray-700">Jenis</th>
                                    <th class="p-4 font-semibold text-gray-700">Jumlah</th>
                                    <th class="p-4 font-semibold text-gray-700">Keterangan</th>
                                    <th class="p-4 font-semibold text-gray-700 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in histori" :key="item.id" class="border-b border-gray-100 hover:bg-gray-50 transition">
                                    <td class="p-4">
                                        <div class="flex items-center gap-2">
                                            <i class="fas fa-calendar-alt text-primary"></i>
                                            {{ item.tanggal }}
                                        </div>
                                    </td>
                                    <td class="p-4 font-semibold text-primary">{{ item.nama_barang }}</td>
                                    <td class="p-4">
                                        <span class="px-3 py-1 rounded-full text-sm font-bold" :class="item.jenis_transaksi === 'Masuk' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'">
                                            <i :class="item.jenis_transaksi === 'Masuk' ? 'fas fa-arrow-down' : 'fas fa-arrow-up'" class="mr-1"></i>
                                            {{ item.jenis_transaksi }}
                                        </span>
                                    </td>
                                    <td class="p-4 font-bold text-gray-800">{{ item.jumlah }}</td>
                                    <td class="p-4 text-gray-600">{{ item.keterangan || '-' }}</td>
                                    <td class="p-4 text-center">
                                        <button @click="deleteData(item.id)" class="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition flex items-center gap-1 inline-flex">
                                            <i class="fas fa-trash"></i>
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                                <tr v-if="histori.length === 0">
                                    <td colspan="6" class="p-12 text-center">
                                        <div class="flex flex-col items-center">
                                            <i class="fas fa-clipboard-list text-6xl text-gray-300 mb-4"></i>
                                            <p class="text-gray-500 text-lg">Belum ada histori transaksi</p>
                                            <p class="text-gray-400 text-sm mt-1">Silakan catat transaksi baru</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div v-if="showModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
                        <div class="bg-gradient-to-r from-primary to-secondary p-6">
                            <h3 class="text-xl font-bold text-white flex items-center gap-2">
                                <i class="fas fa-exchange-alt"></i>
                                Catat Transaksi
                            </h3>
                        </div>
                        <form @submit.prevent="saveData" class="p-6">
                            <div class="mb-4">
                                <label class="block text-sm font-bold text-gray-700 mb-2">
                                    <i class="fas fa-box mr-2 text-primary"></i>Pilih Barang
                                </label>
                                <select v-model="form.barang_id" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition" required>
                                    <option value="" disabled>Pilih Barang</option>
                                    <option v-for="brg in barangList" :value="brg.id">{{ brg.nama_barang }}</option>
                                </select>
                            </div>
                            <div class="mb-4">
                                <label class="block text-sm font-bold text-gray-700 mb-2">
                                    <i class="fas fa-exchange-alt mr-2 text-primary"></i>Jenis Transaksi
                                </label>
                                <select v-model="form.jenis_transaksi" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition" required>
                                    <option value="Masuk">Barang Masuk (+)</option>
                                    <option value="Keluar">Barang Keluar (-)</option>
                                </select>
                            </div>
                            <div class="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">
                                        <i class="fas fa-sort-numeric-up mr-2 text-primary"></i>Jumlah
                                    </label>
                                    <input v-model="form.jumlah" type="number" min="1" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition" placeholder="1" required>
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">
                                        <i class="fas fa-calendar mr-2 text-primary"></i>Tanggal
                                    </label>
                                    <input v-model="form.tanggal" type="date" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition" required>
                                </div>
                            </div>
                            <div class="mb-6">
                                <label class="block text-sm font-bold text-gray-700 mb-2">
                                    <i class="fas fa-align-left mr-2 text-primary"></i>Keterangan
                                </label>
                                <textarea v-model="form.keterangan" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition" rows="2" placeholder="Keterangan transaksi (opsional)"></textarea>
                            </div>
                            <div class="flex justify-end gap-3">
                                <button type="button" @click="showModal = false" class="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-medium hover:bg-gray-300 transition flex items-center gap-2">
                                    <i class="fas fa-times"></i>
                                    Batal
                                </button>
                                <button type="submit" class="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium hover:shadow-lg transition flex items-center gap-2">
                                    <i class="fas fa-save"></i>
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    `,
    data() {
        return {
            histori: [],
            barangList: [],
            showModal: false,
            form: { barang_id: '', jenis_transaksi: 'Masuk', jumlah: 1, tanggal: '', keterangan: '' }
        }
    },
    mounted() {
        this.loadData();
        this.loadBarang();
    },
    methods: {
        async loadData() {
            const res = await axios.get('http://localhost:8080/api/histori');
            this.histori = res.data.data;
        },
        async loadBarang() {
            const res = await axios.get('http://localhost:8080/api/barang');
            this.barangList = res.data.data;
        },
        openModal() {
            // Set tanggal hari ini sebagai default
            const today = new Date().toISOString().split('T')[0];
            this.form = { barang_id: '', jenis_transaksi: 'Masuk', jumlah: 1, tanggal: today, keterangan: '' };
            this.showModal = true;
        },
        async saveData() {
            try {
                await axios.post('http://localhost:8080/api/histori', this.form);
                this.showModal = false;
                this.loadData();
            } catch (error) {
                alert('Gagal menyimpan histori transaksi.');
            }
        },
        async deleteData(id) {
            if (confirm('Yakin ingin menghapus histori ini?')) {
                await axios.delete('http://localhost:8080/api/histori/' + id);
                this.loadData();
            }
        },
        handleLogout() {
            localStorage.clear();
            this.$router.push('/login');
        }
    }
}