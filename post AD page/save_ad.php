<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  header('Location: index.php');
  exit;
}

$title = trim($_POST['title'] ?? '');
$category = trim($_POST['category'] ?? '');
$price = (float)($_POST['price'] ?? 0);
$itemCondition = trim($_POST['condition'] ?? '');
$location = trim($_POST['location'] ?? '');
$description = trim($_POST['description'] ?? '');

if (!$title || !$category || $price < 0 || !$itemCondition || !$location || !$description) {
  exit('Please fill in all required fields correctly.');
}

$pdo->beginTransaction();
try {
  $stmt = $pdo->prepare('INSERT INTO advertisements (title, category, price, item_condition, location, description) VALUES (?, ?, ?, ?, ?, ?)');
  $stmt->execute([$title, $category, $price, $itemCondition, $location, $description]);
  $advertisementId = $pdo->lastInsertId();

  $uploadDir = __DIR__ . '/uploads/';
  if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);
  $allowed = ['image/jpeg'=>'jpg','image/png'=>'png','image/webp'=>'webp'];
  $imageStmt = $pdo->prepare('INSERT INTO advertisement_images (advertisement_id, image_path) VALUES (?, ?)');

  if (!empty($_FILES['images']['name'][0])) {
    foreach ($_FILES['images']['tmp_name'] as $index => $tmpName) {
      if ($_FILES['images']['error'][$index] !== UPLOAD_ERR_OK || $_FILES['images']['size'][$index] > 5*1024*1024) continue;
      $mime = (new finfo(FILEINFO_MIME_TYPE))->file($tmpName);
      if (!isset($allowed[$mime])) continue;
      $filename = bin2hex(random_bytes(12)) . '.' . $allowed[$mime];
      if (move_uploaded_file($tmpName, $uploadDir . $filename)) {
        $imageStmt->execute([$advertisementId, 'uploads/' . $filename]);
      }
    }
  }
  $pdo->commit();
  echo '<h2>Ad submitted successfully.</h2><p>Your ad is waiting for admin approval.</p><p><a href="index.php">Return to Post an Ad</a></p>';
} catch (Throwable $e) {
  $pdo->rollBack();
  http_response_code(500);
  echo 'Could not save your ad. Please try again.';
}
