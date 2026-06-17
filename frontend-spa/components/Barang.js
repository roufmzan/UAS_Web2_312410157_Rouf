const Barang = {
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
                    <router-link to="/barang" class="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/20 text-primary font-medium mb-2">
                        <i class="fas fa-boxes"></i>
                        Barang
                    </router-link>
                    <router-link to="/histori" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition mb-2">
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
                        <h1 class="text-3xl font-bold text-gray-800">Manajemen Barang</h1>
                        <p class="text-gray-600 mt-1">Kelola inventaris barang sekolah</p>
                    </div>
                    <button @click="openModal()" class="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition transform hover:scale-105 flex items-center gap-2">
                        <i class="fas fa-plus"></i>
                        Tambah Barang
                    </button>
                </div>

                <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left">
                            <thead>
                                <tr class="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                    <th class="p-4 font-semibold text-gray-700">No</th>
                                    <th class="p-4 font-semibold text-gray-700">Kode</th>
                                    <th class="p-4 font-semibold text-gray-700">Nama Barang</th>
                                    <th class="p-4 font-semibold text-gray-700">Kategori</th>
                                    <th class="p-4 font-semibold text-gray-700">Stok</th>
                                    <th class="p-4 font-semibold text-gray-700">Supplier</th>
                                    <th class="p-4 font-semibold text-gray-700 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in barang" :key="item.id" class="border-b border-gray-100 hover:bg-gray-50 transition">
                                    <td class="p-4">
                                        <span class="bg-gradient-to-r from-primary to-secondary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                                            {{ index + 1 }}
                                        </span>
                                    </td>
                                    <td class="p-4 font-mono text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded">{{ item.kode_barang }}</td>
                                    <td class="p-4 font-semibold text-primary">{{ item.nama_barang }}</td>
                                    <td class="p-4">
                                        <span class="bg-gradient-to-r from-secondary/20 to-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium">
                                            {{ item.nama_kategori || 'Tanpa Kategori' }}
                                        </span>
                                    </td>
                                    <td class="p-4">
                                        <span class="font-bold px-3 py-1 rounded-full text-sm" :class="item.stok < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'">
                                            {{ item.stok }}
                                        </span>
                                    </td>
                                    <td class="p-4 text-gray-600">{{ item.supplier || '-' }}</td>
                                    <td class="p-4 text-center">
                                        <button @click="editData(item)" class="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition mr-2 flex items-center gap-1 inline-flex">
                                            <i class="fas fa-edit"></i>
                                            Edit
                                        </button>
                                        <button @click="deleteData(item.id)" class="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition flex items-center gap-1 inline-flex">
                                            <i class="fas fa-trash"></i>
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                                <tr v-if="barang.length === 0">
                                    <td colspan="7" class="p-12 text-center">
                                        <div class="flex flex-col items-center">
                                            <i class="fas fa-box-open text-6xl text-gray-300 mb-4"></i>
                                            <p class="text-gray-500 text-lg">Data barang masih kosong</p>
                                            <p class="text-gray-400 text-sm mt-1">Silakan tambahkan barang baru</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div v-if="showModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden">
                        <div class="bg-gradient-to-r from-primary to-secondary p-6">
                            <h3 class="text-xl font-bold text-white flex items-center gap-2">
                                <i class="fas fa-box"></i>
                                {{ form.id ? 'Edit Barang' : 'Tambah Barang' }}
                            </h3>
                        </div>
                        <form @submit.prevent="saveData" class="p-6">
                            <div class="grid grid-cols-2 gap-4">
                                <div class="col-span-2 mb-4">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">
                                        <i class="fas fa-cube mr-2 text-primary"></i>Nama Barang
                                    </label>
                                    <input v-model="form.nama_barang" type="text" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition" placeholder="Masukkan nama barang" required>
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">
                                        <i class="fas fa-barcode mr-2 text-primary"></i>Kode Barang (SKU)
                                    </label>
                                    <input v-model="form.kode_barang" type="text" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition" placeholder="Masukkan kode barang" required>
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">
                                        <i class="fas fa-tags mr-2 text-primary"></i>Kategori
                                    </label>
                                    <select v-model="form.kategori_id" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition" required>
                                        <option value="" disabled>Pilih Kategori</option>
                                        <option v-for="kat in kategoriList" :key="kat.id" :value="kat.id">{{ kat.nama_kategori }}</option>
                                    </select>
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">
                                        <i class="fas fa-warehouse mr-2 text-primary"></i>Stok Awal
                                    </label>
                                    <input v-model="form.stok" type="number" min="0" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition" placeholder="0" required>
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-bold text-gray-700 mb-2">
                                        <i class="fas fa-truck mr-2 text-primary"></i>Supplier
                                    </label>
                                    <input v-model="form.supplier" type="text" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition" placeholder="Nama supplier (opsional)">
                                </div>
                            </div>
                            <div class="flex justify-end gap-3 mt-6">
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
            barang: [],
            kategoriList: [], // Menyimpan data kategori untuk dropdown
            showModal: false,
            form: { id: null, kategori_id: '', kode_barang: '', nama_barang: '', stok: 0, supplier: '' }
        }
    },
    mounted() {
        this.loadData();
        this.loadKategori(); // Memanggil kategori saat halaman dimuat
    },
    methods: {
        async loadData() {
            try {
                const response = await axios.get('http://localhost:8080/api/barang');
                if(response.data.status) {
                    this.barang = response.data.data;
                }
            } catch (error) {
                console.error("Gagal memuat data barang");
            }
        },
        async loadKategori() {
            try {
                const response = await axios.get('http://localhost:8080/api/kategori');
                if(response.data.status) {
                    this.kategoriList = response.data.data;
                }
            } catch (error) {
                console.error("Gagal memuat data kategori");
            }
        },
        openModal() {
            this.form = { id: null, kategori_id: '', kode_barang: '', nama_barang: '', stok: 0, supplier: '' };
            this.showModal = true;
        },
        editData(item) {
            this.form = { 
                id: item.id, 
                kategori_id: item.kategori_id, 
                kode_barang: item.kode_barang, 
                nama_barang: item.nama_barang, 
                stok: item.stok, 
                supplier: item.supplier 
            };
            this.showModal = true;
        },
        async saveData() {
            try {
                if (this.form.id) {
                    await axios.put(`http://localhost:8080/api/barang/${this.form.id}`, this.form);
                } else {
                    await axios.post('http://localhost:8080/api/barang', this.form);
                }
                this.showModal = false;
                this.loadData();
            } catch (error) {
                alert('Gagal menyimpan data barang.');
            }
        },
        async deleteData(id) {
            if (confirm('Apakah kamu yakin ingin menghapus barang ini?')) {
                try {
                    await axios.delete(`http://localhost:8080/api/barang/${id}`);
                    this.loadData();
                } catch (error) {
                    alert('Gagal menghapus data.');
                }
            }
        },
        handleLogout() {
            localStorage.clear();
            this.$router.push('/login');
        }
    }
}