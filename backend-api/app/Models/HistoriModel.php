<?php namespace App\Models;

use CodeIgniter\Model;

class HistoriModel extends Model
{
    protected $table      = 'histori_transaksi';
    protected $primaryKey = 'id';
    protected $allowedFields = ['barang_id', 'jenis_transaksi', 'jumlah', 'tanggal', 'keterangan'];
}