const Kategori = {
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
                    <router-link to="/kategori" class="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/20 text-primary font-medium mb-2">
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
                        <h1 class="text-3xl font-bold text-gray-800">Manajemen Kategori</h1>
                        <p class="text-gray-600 mt-1">Kelola kategori inventaris barang</p>
                    </div>
                    <button @click="openModal()" class="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition transform hover:scale-105 flex items-center gap-2">
                        <i class="fas fa-plus"></i>
                        Tambah Kategori
                    </button>
                </div>

                <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left">
                            <thead>
                                <tr class="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                    <th class="p-4 font-semibold text-gray-700">No</th>
                                    <th class="p-4 font-semibold text-gray-700">Nama Kategori</th>
                                    <th class="p-4 font-semibold text-gray-700">Deskripsi</th>
                                    <th class="p-4 font-semibold text-gray-700 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in kategori" :key="item.id" class="border-b border-gray-100 hover:bg-gray-50 transition">
                                    <td class="p-4">
                                        <span class="bg-gradient-to-r from-primary to-secondary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                                            {{ index + 1 }}
                                        </span>
                                    </td>
                                    <td class="p-4 font-semibold text-primary">{{ item.nama_kategori }}</td>
                                    <td class="p-4 text-gray-600">{{ item.deskripsi || '-' }}</td>
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
                                <tr v-if="kategori.length === 0">
                                    <td colspan="4" class="p-12 text-center">
                                        <div class="flex flex-col items-center">
                                            <i class="fas fa-folder-open text-6xl text-gray-300 mb-4"></i>
                                            <p class="text-gray-500 text-lg">Data kategori masih kosong</p>
                                            <p class="text-gray-400 text-sm mt-1">Silakan tambahkan kategori baru</p>
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
                                <i class="fas fa-folder-plus"></i>
                                {{ form.id ? 'Edit Kategori' : 'Tambah Kategori' }}
                            </h3>
                        </div>
                        <form @submit.prevent="saveData" class="p-6">
                            <div class="mb-5">
                                <label class="block text-sm font-bold text-gray-700 mb-2">
                                    <i class="fas fa-tag mr-2 text-primary"></i>Nama Kategori
                                </label>
                                <input v-model="form.nama_kategori" type="text" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition" placeholder="Masukkan nama kategori" required>
                            </div>
                            <div class="mb-6">
                                <label class="block text-sm font-bold text-gray-700 mb-2">
                                    <i class="fas fa-align-left mr-2 text-primary"></i>Deskripsi
                                </label>
                                <textarea v-model="form.deskripsi" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition" rows="3" placeholder="Masukkan deskripsi (opsional)"></textarea>
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
            kategori: [],
            showModal: false,
            form: { id: null, nama_kategori: '', deskripsi: '' }
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        // Fungsi pembantu untuk header Auth
        getAuthHeader() {
            return { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } };
        },
        async loadData() {
            try {
                const response = await axios.get('http://localhost:8080/api/kategori');
                if(response.data.status) {
                    this.kategori = response.data.data;
                }
            } catch (error) {
                console.error("Gagal memuat data", error);
            }
        },
        openModal() {
            this.form = { id: null, nama_kategori: '', deskripsi: '' };
            this.showModal = true;
        },
        editData(item) {
            this.form = { id: item.id, nama_kategori: item.nama_kategori, deskripsi: item.deskripsi };
            this.showModal = true;
        },
        async saveData() {
            try {
                // DIPERBAIKI: Mengirim header otentikasi agar tidak ditolak AuthFilter
                if (this.form.id) {
                    await axios.put('http://localhost:8080/api/kategori/' + this.form.id, this.form, this.getAuthHeader());
                } else {
                    await axios.post('http://localhost:8080/api/kategori', this.form, this.getAuthHeader());
                }
                this.showModal = false;
                this.loadData();
            } catch (error) {
                alert('Gagal menyimpan data. Pastikan Anda sudah login.');
            }
        },
        async deleteData(id) {
            if (confirm('Apakah kamu yakin ingin menghapus kategori ini?')) {
                try {
                    // DIPERBAIKI: Mengirim header otentikasi
                    await axios.delete('http://localhost:8080/api/kategori/' + id, this.getAuthHeader());
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