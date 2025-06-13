document.getElementById('assetform').addEventListener('submit',
    function (event) {
        event.preventDefault();

        const formData = new FormData(event.target);
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
            event.target.reset()
            .catch(error => alert('error:' + error.message))

            
    }


)

document.getElementById('file').addEventListener('change',
    function () {
        const file = this.files[0];
        console.log(file);
        if (!file) return;

        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
            alert('please upload a valid file type(pdf,jpg,jpeg)')
            this.value = '';
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

// document.addEventListener("DOMContentLoaded",()=>{
//     const form=document.getElementById('uploadform');

//     if (!form) {
//         console.error('Form with id "uploadform" not found.');
//         return;
//     }
//     form.addEventListener('submit',async function(e){
//         e.preventDefault();
//         const formData = new FormData(form);

//         const response = await fetch ('http://localhost:3000/submit',{
//             method: 'POST',
//             body: formData
//         });
//         const result = await response.json();
//         alert(result.message);
//         console.log(result);
//     });
// });

function searchAsset() {
    const assestCode = document.getElementById('searchAssestCode').value.trim();
    const modal=document.getElementById('assetModal');
    const closeBtn=document.getElementById('closebtn');
    const resultDiv = document.getElementById('assetResult')


    fetch('http://localhost:3000/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ assetCode: assestCode })

    }).then(async response => {
        const text = await response.text(); // safely read raw text
        const data = text ? JSON.parse(text) : {};
        
        

        
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
        modal.style.display='block';

        closeBtn.onclick=()=>{
            modal.style.display='none';
        }
        window.onclick=(event)=>{
            if(event.target==modal)
            modal.style.display='none';
        }
        

    }).catch(error => {
        document.getElementById('assetResult').innerHTML = `<p style="color: red;">Search Error: ${error.message}</p>`;
    });

}

function verifyPasscode() {
    const password = 1000;

    const input = document.getElementById('passcodeInput').value;
    const errmsg = document.getElementById('errorMsg');

    if (Number(input) !== password) {
        errmsg.style.display = 'block';
    } else {
        errmsg.style.display = 'none';
        document.getElementById('passwordModal').style.display = 'none';
        window.location.href = 'http://localhost:3000/download';
    }
    if(input === ''){
        errmsg.style.display = 'block';
        errmsg.textContent = 'please enter the passcode';
    }
}

function downloadCSV() {
    // const password=1000;
    // const passcode=prompt('Enter the passcode to download ');

    // if(Number(passcode) !== password)
    // {
    //     alert('Incorrect passcode .Please try again.');
    //     return;
    // }else{
    //     window.location.href = 'http://localhost:3000/download';
    // }

    document.getElementById('passwordModal').style.display = 'flex';
    document.getElementById('errorMsg').style.display = 'none';
    document.getElementById('passcodeInput').value = '';
    

}

function closeBox(){
    document.getElementById('passwordModal').style.display='none';
    document.getElementById('errorMsg').style.display = 'none';
    document.getElementById('passcodeInput').value = '';
}


// function fileInput() {
//     const fileInput = document.getElementById('file');
//     const fileName = fileInput.files[0] ? fileInput.files[0].name : 'No file chosen';
//     document.getElementById('filename').innerText = fileName;
// }
// document.getElementById('selectedFileName').textContent = this.files[0] ? this.files[0].name : 'No file chosen';