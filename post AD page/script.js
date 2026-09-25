const form = document.querySelector('#adForm');
const title = document.querySelector('#title');
const price = document.querySelector('#price');
const condition = document.querySelector('#condition');
const locationInput = document.querySelector('#location');
const description = document.querySelector('#description');
const images = document.querySelector('#images');
const previewTitle = document.querySelector('#previewTitle');
const previewPrice = document.querySelector('#previewPrice');
const previewCondition = document.querySelector('#previewCondition');
const previewLocation = document.querySelector('#previewLocation');
const previewDescription = document.querySelector('#previewDescription');
const previewRow = document.querySelector('#imagePreviewRow');
const defaultImage = document.querySelector('#previewImage').src;

function money(value){return value ? '₦' + Number(value).toLocaleString('en-NG') : '₦0';}
function updatePreview(){
  previewTitle.textContent = title.value.trim() || 'HP Laptop 15.6-inch';
  previewPrice.textContent = money(price.value) === '₦0' ? '₦350,000' : money(price.value);
  previewCondition.textContent = condition.value || 'New';
  previewLocation.textContent = locationInput.value.trim() || 'Lagos';
  previewDescription.textContent = description.value.trim() || 'Clean HP laptop in good condition. 8GB RAM, 256GB SSD. Comes with charger. Perfect for work and study.';
}
[title,price,condition,locationInput,description].forEach(el=>el.addEventListener('input',updatePreview));

images.addEventListener('change',()=>{
  previewRow.querySelectorAll('.thumb').forEach(el=>el.remove());
  const files = [...images.files].slice(0,5);
  files.forEach((file,index)=>{
    if(file.size > 5*1024*1024){alert(`${file.name} is larger than 5MB.`);return;}
    const url = URL.createObjectURL(file);
    const thumb = document.createElement('div');
    thumb.className='thumb';
    thumb.innerHTML=`<img src="${url}" alt="Uploaded product ${index+1}"><button type="button" class="remove-image" aria-label="Remove image">×</button>`;
    thumb.querySelector('button').addEventListener('click',()=>thumb.remove());
    previewRow.appendChild(thumb);
    if(index===0) document.querySelector('#previewImage').src=url;
  });
  if(!files.length) document.querySelector('#previewImage').src=defaultImage;
});

form.addEventListener('submit', (event)=>{
  const message=document.querySelector('#formMessage');
  if(!form.checkValidity()) return;
  message.textContent='Your ad is being submitted...';
  message.style.color='#078d45';
});
updatePreview();
