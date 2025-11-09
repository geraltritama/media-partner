(() => {
  // Ganti URL ini dengan URL Web App dari Apps Script kamu
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyQs4o762fNu2OsbW24ChS5WLf6cFChJAtlPbeUdBFio9qyn6lbS17h6gRrk2HIVcvU-w/exec'

  const form = document.querySelector('.form-container form');
  const uploadArea = document.querySelector('.upload-area');
  const browseBtn = document.querySelector('.browse-btn');
  const submitBtn = document.querySelector('.submit-btn');

  // Buat input file tersembunyi untuk browse
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
  fileInput.style.display = 'none';
  document.body.appendChild(fileInput);

  // Event: klik Browse
  browseBtn.addEventListener('click', () => fileInput.click());

  // Event: drag/drop file
  ['dragenter', 'dragover'].forEach(eventName => {
    uploadArea.addEventListener(eventName, e => {
      e.preventDefault();
      uploadArea.classList.add('dragover');
    });
  });
  ['dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, e => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
    });
  });

  let selectedFile = null;
  uploadArea.addEventListener('drop', e => {
    selectedFile = e.dataTransfer.files[0];
    uploadArea.querySelector('p').textContent = `File dipilih: ${selectedFile.name}`;
  });
  fileInput.addEventListener('change', e => {
    selectedFile = e.target.files[0];
    uploadArea.querySelector('p').textContent = `File dipilih: ${selectedFile.name}`;
  });

  // Submit form
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Mengirim...';

    try {
      const inputs = form.querySelectorAll('input');
      const email = inputs[0].value.trim();
      const no_telepon = inputs[1].value.trim();
      const alamat_instansi = inputs[2].value.trim();
      const link_drive = inputs[3].value.trim();

      if (!email || !no_telepon || !alamat_instansi || !link_drive) {
        // Show error without enabling click-to-close
        const errorPopup = document.getElementById('errorPopup');
        errorPopup.classList.add('show');
        
        // Auto hide after 3 seconds
        setTimeout(() => {
          errorPopup.classList.remove('show');
        }, 3000);
        return;
      }

      let mouDataUrl = '';
      let mouFileName = '';

      if (selectedFile) {
        mouDataUrl = await readFileAsDataURL(selectedFile);
        mouFileName = selectedFile.name;
      }

      // Siapkan payload
      const payload = new URLSearchParams();
      payload.append('email', email);
      payload.append('no_telepon', no_telepon);
      payload.append('alamat_instansi', alamat_instansi);
      payload.append('link_drive', link_drive);
      if (mouDataUrl) {
        payload.append('mou_file', mouDataUrl);
        payload.append('mou_file_filename', mouFileName);
      }

      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: payload.toString()
      });

      const text = await response.text();
      const result = JSON.parse(text);

      if (result.result === 'success') {
        // Show success without enabling click-to-close
        const successPopup = document.getElementById('successPopup');
        successPopup.classList.add('show');
        
        // Auto hide after 3 seconds
        setTimeout(() => {
          successPopup.classList.remove('show');
        }, 3000);
        
        form.reset();
        uploadArea.querySelector('p').textContent = 'Seret dokumen MoU Anda ke sini untuk mulai mengunggah';
      } else {
        // Show error without enabling click-to-close
        const errorPopup = document.getElementById('errorPopup');
        errorPopup.classList.add('show');
        
        // Auto hide after 3 seconds
        setTimeout(() => {
          errorPopup.classList.remove('show');
        }, 3000);
      }

    } catch (err) {
      // Show error without enabling click-to-close
      const errorPopup = document.getElementById('errorPopup');
      errorPopup.classList.add('show');
      
      // Auto hide after 3 seconds
      setTimeout(() => {
        errorPopup.classList.remove('show');
      }, 3000);
      
      console.error('Error:', err);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Kirim Sekarang';
    }
  });

  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

})();