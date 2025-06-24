
let currentAssetCode = '';
let OriginalData = {};



function fetchAsset() {
    const assetCode = document.getElementById('searchAssestCodeEdit').value.trim();
    if (!assetCode) return alert('Please Enter a Asset Code');

    fetch('http://localhost:3000/search', {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify({ assetCode: assetCode })

    }).then(async response => {
        const text = await response.text();
        const data = text ? JSON.parse(text) : {};

        console.log('Response Text', text);

        if (data.message) return alert(data.message);

        currentAssetCode = assetCode;
        OriginalData = data;
        document.getElementById('editForm').style.display = 'block';
        // console.log(document.getElementById('editForm'));
        // console.log(document.getElementById('employee_id'));
        // console.log("📦 Received asset data:", data);
        // console.log("👉 Calling fillFormFields now...");
        fillFormFields(data, true);
        document.getElementById('editBtn').style.display = 'inline-block';
        document.getElementById('editSubmitBtn').style.display = 'none';

    }).catch(err => alert('Error Fetching Asset' + err.message));

}


function fillFormFields(data, disable) {
    const fields = ["employee_id", "current_user_name", "site", "previous_user",
        "employee_status", "system_name", "system_model", "os_name", "make",
        "system_manufacturer", "serial_no","processor_config", "department", "upgradation_items", 
        "upgradation_date","upgradation_price",
        "remarks"];

    fields.forEach(field => {
        const input = document.getElementById(field);
        if (input) {
            console.log(`Setting field ${field} to:`, data[field]);
            input.value = data[field] || '';
            input.disabled = disable
        } else {
            console.warn(`Missing Input with id ${field}`)
        }

    });
}

function enableEditing() {
    fillFormFields(OriginalData, false);
    document.getElementById('editBtn').style.display = 'none';
    document.getElementById('editSubmitBtn').style.display = 'block';

    // const fields = ["employee_id", "current_user_name", "system_model"]

    // fields.forEach((field) => {
    //     const input = document.getElementById('field')

    //     if (input) {
    //         input.disabled = false;
    //         console.log(`Enable Field: ${field}`)
    //     } else {
    //         console.warn(`Missing Input with id ${field}`)
    //     }
    // })
    // document.getElementById('editBtn').style.display = 'none';
    // document.getElementById('editSubmitBtn').style.display = 'block';
}

document.getElementById('editForm').addEventListener('submit',
    function (e) {
        e.preventDefault();

        const updatedData = {
            assetCode: currentAssetCode,
            // 'slNo': document.getElementById('slNo').value,
            'employee_id': document.getElementById('employee_id').value,
            'current_user_name': document.getElementById('current_user_name').value,
            'site': document.getElementById('site').value,
            'previous_user': document.getElementById('previous_user').value,
            'employee_status': document.getElementById('employee_status').value,
            'system_name': document.getElementById('system_name').value,
            'system_model': document.getElementById('system_model').value,
            'os_name': document.getElementById('os_name').value,
            'make': document.getElementById('make').value,
            'system_manufacturer': document.getElementById('system_manufacturer').value,
            'serial_no': document.getElementById('serial_no').value,
            'processor_config':document.getElementById('processor_config').value,
            'department': document.getElementById('department').value,
            'upgradation_items': document.getElementById('upgradation_items').value,
            'upgradation_date': document.getElementById('upgradation_date').value,
            'upgradation_price':document.getElementById('upgradation_price').value,
            'remarks':document.getElementById('remarks').value
        }
        
        fetch('http://localhost:3000/update', {
            method: 'PUT',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        }).then(res => res.json())
            .then(resp => {
                alert(resp.message)
                document.getElementById('editBtn').style.display = 'none';
                document.getElementById('editSubmitBtn').style.display = 'inline-block';
                document.getElementById('editSubmitBtn').disabled=true;
                fillFormFields(updatedData, true);
            }).catch(err => alert('error updating Asset' + err.message));
        console.log(updatedData);
    });