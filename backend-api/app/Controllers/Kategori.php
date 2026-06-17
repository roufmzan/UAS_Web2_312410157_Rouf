<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\KategoriModel;

class Kategori extends ResourceController
{
    use ResponseTrait;

    protected $format = 'json';

    // GET: Menampilkan semua data kategori (untuk dropdown pilihan di form barang & tabel)
    public function index()
    {
        $model = new KategoriModel();
        $data = $model->findAll();
        
        return $this->respond([
            'status' => true,
            'data'   => $data
        ], 200);
    }

    // GET: Menampilkan satu data kategori secara spesifik berdasarkan ID
    public function show($id = null)
    {
        $model = new KategoriModel();
        $data = $model->find($id);
        
        if ($data) {
            return $this->respond([
                'status' => true,
                'data'   => $data
            ], 200);
        }
        
        return $this->failNotFound('Kategori tidak ditemukan.');
    }

    // POST: Menambahkan data kategori baru ke database
    public function create()
    {
        $model = new KategoriModel();
        
        // Membaca data, baik dalam format JSON raw maupun Form Data biasa
        $json = $this->request->getJSON(true);
        $data = [
            'nama_kategori' => $json ? $json['nama_kategori'] : $this->request->getVar('nama_kategori'),
            'deskripsi'     => $json ? $json['deskripsi'] : $this->request->getVar('deskripsi'),
        ];

        // Validasi input sederhana agar tidak kosong
        if (empty($data['nama_kategori'])) {
            return $this->failValidationErrors('Nama kategori wajib diisi.');
        }

        $model->insert($data);
        
        return $this->respondCreated([
            'status'  => true,
            'message' => 'Kategori baru berhasil ditambahkan.'
        ]);
    }

    // PUT: Mengubah/memperbarui data kategori yang sudah ada
    public function update($id = null)
    {
        $model = new KategoriModel();
        
        // Memastikan data kategori yang mau diubah memang ada di database
        $cekData = $model->find($id);
        if (!$cekData) {
            return $this->failNotFound('Kategori tidak ditemukan.');
        }

        // Membaca input raw JSON dari Axios PUT request
        $json = $this->request->getJSON(true);
        $data = [
            'nama_kategori' => $json ? $json['nama_kategori'] : $this->request->getRawInput()['nama_kategori'],
            'deskripsi'     => $json ? $json['deskripsi'] : $this->request->getRawInput()['deskripsi'],
        ];

        if (empty($data['nama_kategori'])) {
            return $this->failValidationErrors('Nama kategori tidak boleh kosong.');
        }

        $model->update($id, $data);
        
        return $this->respond([
            'status'  => true,
            'message' => 'Data kategori berhasil diperbarui.'
        ], 200);
    }

    // DELETE: Menghapus data kategori berdasarkan ID
    public function delete($id = null)
    {
        $model = new KategoriModel();
        $data = $model->find($id);
        
        if ($data) {
            $model->delete($id);
            return $this->respondDeleted([
                'status'  => true,
                'message' => 'Kategori berhasil dihapus.'
            ]);
        }
        
        return $this->failNotFound('Kategori tidak ditemukan.');
    }
}