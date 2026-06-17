<?php namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\API\ResponseTrait;
use Config\Services;

class AuthFilter implements FilterInterface
{
    use ResponseTrait;

    public function before(RequestInterface $request, $arguments = null)
    {
        $header = $request->getHeaderLine("Authorization");
        $token = null;

        // Mengekstrak token dari header
        if (!empty($header)) {
            if (preg_match('/Bearer\s(\S+)/', $header, $matches)) {
                $token = $matches[1];
            }
        }

        // Jika token tidak ada
        if (is_null($token) || empty($token)) {
            $response = Services::response();
            $response->setJSON(['status' => false, 'message' => 'Akses ditolak. Token tidak ditemukan.']);
            $response->setStatusCode(401);
            return $response;
        }

        // Mengecek validitas token ke tabel users di database
        $db = \Config\Database::connect();
        $user = $db->table('users')->where('token', $token)->get()->getRow();

        // Jika token salah atau sesi habis
        if (!$user) {
            $response = Services::response();
            $response->setJSON(['status' => false, 'message' => 'Token tidak valid atau sesi habis.']);
            $response->setStatusCode(401);
            return $response;
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null) {}
}