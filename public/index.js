document.getElementById('assetform').addEventListener('submit',
    function(event){
        event.preventDefault();

        const formData= new FormData(event.target);
                const data = Object.fromEntries(formData.entries());
                fetch('http://localhost:3000/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(resp => alert(resp.message))
                .catch(error => alert('error:' + error.message))
    }


)

document.getElementById('file').addEventListener('change',
    function(){
        const file=this.files[0];
        console.log(file);
        if(!file) return;

        const allowedTypes= ['application/pdf','image/jpeg','image/jpg'];
        if(!allowedTypes.includes(file.type)){
            alert('please upload a valid file type(pdf,jpg,jpeg)')
            this.value='';
        }
    }
)

// document.getElementById('uploadform').addEventListener('submit',async function(e){
//     e.preventDefault();
//     const formData = new FormData(this);

//     const response =await fetch('http://localhost:3000/submit',{
//         method: 'POST',
//         body: formData
//     });
//     const result = await response.json();
//     alert(result.message);
//     console.log(result);
// });

function searchAsset(){
 const assestCode=document.getElementById('searchAssestCode').value.trim();

 fetch('http://localhost:3000/search',{
    method:'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ assetCode: assestCode })

 }).then(async response => {
    const text = await response.text(); // safely read raw text
    const data = text ? JSON.parse(text) : {};
    
    const resultDiv= document.getElementById('assetResult')
     if (data.message) {
            resultDiv.innerHTML = `<p style="color: red;">${data.message}</p>`;
        } else {
            resultDiv.innerHTML = `
                <p><strong>Employee ID:</strong> ${data.employee_id}</p>
                <p><strong>Current User Name:</strong> ${data.current_user_name}</p>
                <p><strong>Employee Status:</strong> ${data.employee_status}</p>
                <p><strong>Department:</strong> ${data.department}</p>
            `;
        }
 }).catch(error=>{
     document.getElementById('assetResult').innerHTML = `<p style="color: red;">Search Error: ${error.message}</p>`;
 });

}


// function fileInput() {
//     const fileInput = document.getElementById('file');
//     const fileName = fileInput.files[0] ? fileInput.files[0].name : 'No file chosen';
//     document.getElementById('filename').innerText = fileName;
// }
// document.getElementById('selectedFileName').textContent = this.files[0] ? this.files[0].name : 'No file chosen';