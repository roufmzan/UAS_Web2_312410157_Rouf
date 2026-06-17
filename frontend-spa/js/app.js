// ==========================================
// 1. AXIOS GLOBAL INTERCEPTORS
// ==========================================

// Request Interceptor: Otomatis menyuntikkan token ke setiap request
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Response Interceptor: Otomatis menangkap error 401 secara global
axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401) {
        alert('Sesi Anda telah habis atau akses ditolak. Silakan login kembali.');
        localStorage.clear();
        window.location.hash = '#/login'; // Menendang user ke halaman login
    }
    return Promise.reject(error);
});

// ==========================================
// 2. VUE ROUTER & NAVIGATION GUARDS
// ==========================================
const routes = [
    { path: '/', component: Home }, // Halaman Public (Tidak perlu login)
    { path: '/login', component: Login },
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/kategori', component: Kategori, meta: { requiresAuth: true } },
    { path: '/barang', component: Barang, meta: { requiresAuth: true } },
    { path: '/histori', component: Histori, meta: { requiresAuth: true } }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
});

// Navigation Guard: Mencegat user ilegal
router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('token');
    
    // Jika rute butuh login TAPI user belum login -> Lempar ke /login
    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
        next('/login');
    } 
    // Jika user sudah login TAPI mencoba akses halaman /login atau / -> Lempar ke Dashboard
    else if ((to.path === '/login' || to.path === '/') && loggedIn) {
        next('/dashboard');
    } 
    // Izinkan akses normal
    else {
        next();
    }
});

// ==========================================
// 3. INISIALISASI VUE APP
// ==========================================
const app = Vue.createApp({});
app.use(router);
app.mount('#app');