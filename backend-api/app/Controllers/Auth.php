<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\UsersModel;

class Auth extends ResourceController
{
    protected $format = 'json';

    public function login()
    {
        $usersModel = new UsersModel();
        
        // Mengambil data dari request frontend
        $json = $this->request->getJSON();
        $username = $json ? $json->username : $this->request->getVar('username');
        $password = $json ? $json->password : $this->request->getVar('password');

        $user = $usersModel->where('username', $username)->first();

 // Cek apakah user ada dan password cocok (mendukung teks biasa atau hash)
        if (!$user || ($password !== $user['password'] && !password_verify($password, $user['password']))) {
            return $this->failUnauthorized('Username atau password salah.');
        }

        // Generate token acak yang aman
        $token = bin2hex(random_bytes(32));
        
        // Simpan token ke database
        $usersModel->update($user['id'], ['token' => $token]);

        return $this->respond([
            'status' => true,
            'message' => 'Login berhasil',
            'token' => $token,
            'user' => [
                'nama_lengkap' => $user['nama_lengkap']
            ]
        ]);
    }
}