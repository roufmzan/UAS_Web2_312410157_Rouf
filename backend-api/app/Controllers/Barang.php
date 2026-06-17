<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\BarangModel;

class Barang extends ResourceController
{
    protected $format = 'json';

    // GET: Tampil semua barang
    public function index()
    {
        $model = new BarangModel();
        // Mengambil data barang sekaligus nama kategorinya menggunakan query builder
        $data = $model->select('barang.*, kategori.nama_kategori')
                      ->join('kategori', 'kategori.id = barang.kategori_id', 'left')
                      ->findAll();
        return $this->respond(['status' => true, 'data' => $data]);
    }

    // GET: Tampil satu barang
    public function show($id = null)
    {
        $model = new BarangModel();
        $data = $model->find($id);
        if ($data) return $this->respond(['status' => true, 'data' => $data]);
        return $this->failNotFound('Data tidak ditemukan.');
    }

    // POST: Tambah barang baru
    public function create()
    {
        $model = new BarangModel();
        $data = $this->request->getJSON(true) ?? $this->request->getPost();
        
        $model->insert($data);
        return $this->respondCreated(['status' => true, 'message' => 'Barang berhasil ditambahkan']);
    }

    // PUT: Ubah data barang
    public function update($id = null)
    {
        $model = new BarangModel();
        $data = $this->request->getJSON(true) ?? $this->request->getRawInput();
        
        $model->update($id, $data);
        return $this->respond(['status' => true, 'message' => 'Barang berhasil diubah']);
    }

    // DELETE: Hapus barang
    public function delete($id = null)
    {
        $model = new BarangModel();
        if ($model->find($id)) {
            $model->delete($id);
            return $this->respondDeleted(['status' => true, 'message' => 'Barang berhasil dihapus']);
        }
        return $this->failNotFound('Data tidak ditemukan.');
    }
}