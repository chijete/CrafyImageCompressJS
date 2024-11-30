<?php
header("Cross-Origin-Opener-Policy: same-origin");
header("Cross-Origin-Embedder-Policy: credentialless");
header("Cross-Origin-Resource-Policy: cross-origin");
echo 'Cross-Origin Isolation ENABLED';
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="CrafyImageCompressJS.js"></script>
  <title>CrafyImageCompressJS</title>
</head>
<body>

  <h1>CrafyImageCompressJS</h1>

  <div>
    <p>Target quality:</p>
    <input type="range" id="targetQuality" min="0" max="1" value="0.6" step="0.1">
    <span id="targetQualityViewer">0.6</span>
    <p>Target dimensions:</p>
    <span>Max width:</span>
    <input type="number" id="targetWidth" value="">
    <span>Max height:</span>
    <input type="number" id="targetHeight" value="">
    <p>Target dimensions for GIF:</p>
    <span>Max GIF width:</span>
    <input type="number" id="targetGIFWidth" value="">
    <span>Max GIF height:</span>
    <input type="number" id="targetGIFHeight" value="">
  </div>
  <p>Select image (PNG, JPG, WEBP, GIF):</p>
  <input type="file" id="archivoInput" accept="image/*">
  <p>Compressed image:</p>
  <p id="loadingText"><b>Loading...</b></p>
  <img src="" id="resultImage">
  <p>Result size: <span id="resultSize"></span></p>
  <img src="" id="secondaryImage">

  <h2>Documentation</h2>
  <p>Docs in: <a href="https://github.com/chijete/CrafyImageCompressJS">https://github.com/chijete/CrafyImageCompressJS</a></p>

  <h2>Used libraries:</h2>
  <ul>
    <li><a href="https://github.com/fengyuanchen/compressorjs">compressorjs</a> for image compression and resize.</li>
    <li><a href="https://github.com/matt-way/gifuct-js">gifuct-js</a> for GIF decode.</li>
    <li><a href="https://github.com/jnordberg/gif.js">gif.js</a> for GIF encode.</li>
  </ul>

  <p>Made with ❤️ by <a href="https://github.com/chijete/">Crafy Holding</a></p>

  <script>
    var instance_CrafyImageCompressJS;
    var resultImage = document.getElementById('resultImage');
    var secondaryImage = document.getElementById('secondaryImage');
    var loadingText = document.getElementById('loadingText');
    var resultSize = document.getElementById('resultSize');
    var targetQuality = document.getElementById('targetQuality');
    var targetQualityViewer = document.getElementById('targetQualityViewer');
    var targetWidth = document.getElementById('targetWidth');
    var targetHeight = document.getElementById('targetHeight');
    var targetGIFWidth = document.getElementById('targetGIFWidth');
    var targetGIFHeight = document.getElementById('targetGIFHeight');
    loadingText.style.display = 'none';

    targetQuality.addEventListener('input', function () {
      targetQualityViewer.innerText = targetQuality.value;
    });

    function getParamsFor_compressImage() {
      var q = parseFloat(targetQuality.value);
      var w = false;
      if (targetWidth.value.length > 0 && targetWidth.value > 0) {
        w = targetWidth.value;
      }
      var h = false;
      if (targetHeight.value.length > 0 && targetHeight.value > 0) {
        h = targetHeight.value;
      }
      var wg = false;
      if (targetGIFWidth.value.length > 0 && targetGIFWidth.value > 0) {
        wg = targetGIFWidth.value;
      }
      var hg = false;
      if (targetGIFHeight.value.length > 0 && targetGIFHeight.value > 0) {
        hg = targetGIFHeight.value;
      }
      return {
        'q': q,
        'w': w,
        'h': h,
        'wg': wg,
        'hg': hg,
      };
    }

    // Agrega un evento de cambio al input de archivo
    document.getElementById('archivoInput').addEventListener('change', function (event) {
      // Obtiene el archivo seleccionado
      const archivo = event.target.files[0];

      // Verifica si se seleccionó un archivo
      if (archivo) {
        loadingText.style.display = 'block';
        // Crea un objeto FileReader
        const lector = new FileReader();

        // Define el evento de carga cuando se completa la lectura
        lector.onload = function (e) {
          // El resultado de la lectura es un objeto Blob
          const blob = new Blob([e.target.result], { type: archivo.type });

          // Aquí puedes hacer lo que quieras con el Blob (por ejemplo, enviarlo al servidor)
          console.log('Archivo convertido a Blob:', blob);

          instance_CrafyImageCompressJS = new CrafyImageCompressJS(blob, archivo.type, 'gif.worker.php');
          instance_CrafyImageCompressJS.blobGifContainsTransparency(blob).then(function (res) {
            console.log('blobGifContainsTransparency:', res);
          });
          var params = getParamsFor_compressImage();
          instance_CrafyImageCompressJS.compressImage(params.q, params.w, params.h, params.wg, params.hg).then(function (compressedImage) {
            console.log('compressedImage', compressedImage);
            resultImage.src = URL.createObjectURL(compressedImage);
            resultSize.innerText = compressedImage.size + ' bytes = ' + (compressedImage.size / 1000).toFixed(5) + ' KB = ' + (compressedImage.size / 1000000).toFixed(5) + ' MB.';
            loadingText.style.display = 'none';
          });
        };

        // Lee el contenido del archivo como un ArrayBuffer
        lector.readAsArrayBuffer(archivo);
      }
    });
  </script>
  
</body>
</html>