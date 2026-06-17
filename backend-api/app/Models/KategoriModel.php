<?php namespace App\Models;

use CodeIgniter\Model;

class KategoriModel extends Model
{
    protected $table      = 'kategori';
    protected $primaryKey = 'id';
    
    // BARIS INI WAJIB ADA AGAR DATA BISA DISIMPAN:
    protected $allowedFields = ['nama_kategori', 'deskripsi'];
}