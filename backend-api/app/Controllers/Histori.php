<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Histori extends ResourceController
{
    protected $modelName = 'App\Models\HistoriModel';
    protected $format    = 'json';

    public function index()
    {
        // Join tabel histori dengan tabel barang agar nama barang muncul
        $db = \Config\Database::connect();
        $builder = $db->table('histori_transaksi');
        $builder->select('histori_transaksi.*, barang.nama_barang');
        $builder->join('barang', 'barang.id = histori_transaksi.barang_id', 'left');
        $builder->orderBy('histori_transaksi.tanggal', 'DESC');
        
        $data = $builder->get()->getResult();
        return $this->respond(['status' => true, 'data' => $data]);
    }

    public function create()
    {
        $data = $this->request->getJSON();
        if($this->model->insert($data)){
            return $this->respondCreated(['status' => true, 'message' => 'Histori tersimpan']);
        }
        return $this->fail('Gagal menyimpan histori');
    }

    public function delete($id = null)
    {
        if($this->model->delete($id)){
            return $this->respondDeleted(['status' => true, 'message' => 'Histori dihapus']);
        }
        return $this->fail('Gagal menghapus');
    }
}