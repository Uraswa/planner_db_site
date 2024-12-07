const exampleField = {
    fieldName: "Название",
    field: "name",
    type: "text",
    maxlen: "256",
    not_empty: true
}

let _modalOnSuccess = null;

function RenderModal(title, fields, url, entity_id, father_entity_id, on_success){
    _modalOnSuccess = on_success;
    let content = `<div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ${fields ? renderFields(fields) : ''}
        ${entity_id ? `<input type="hidden" class="modal-input" name="entity_id" value="${entity_id}">` : ''}
        ${father_entity_id ? `<input type="hidden" class="modal-input" name="father_entity_id" value="${father_entity_id}">` : ''}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button>
        <button type="button" class="btn btn-primary" onclick="submitModal('${url}')">Подтвердить</button>
      </div>`

    $('#exampleModal').modal('show');
    $('#modal-content').html(content);
}

function renderFields(fields){
    return fields.map((v,i,a) => {
        return renderField(v)
    }).join("")
}

function renderField(field){

    let fieldId = 'modal-field-' + field.field;
    if (field.type == "varchar") {
        return `
             <div class="form-group">
                <label for="${fieldId}">${field.fieldName}</label>
                <input minlength="${field.not_empty ? 1 : 0}" 
                        maxlength="${field.maxlen ? field.maxlen : 256}" 
                        type="text" 
                        class="form-control modal-input" 
                        name="${field.field}" 
                        ${field.value ? `value="${field.value}"` : ''}
                        id="${fieldId}">
              </div>
        `
    }

    if (field.type == "text") {
        return `
              <div class="form-group">
                <label for="${fieldId}">${field.fieldName}</label>
                <textarea 
                maxlength="${field.maxlen ? field.maxlen : 5000}" 
                class="form-control modal-input" 
                id="${fieldId}" 
                name="${field.field}" 
                rows="3">${field.value ? field.value : ''}</textarea>
              </div>
        `
    }

    return ``;

}

function submitModal(url){

    let sendJson = {};

    $('.modal-input').each(function(){
        let field = $(this).attr('name');
        let val = $(this).val();

        sendJson[field] = val;
    });

    if ("entity_id" in sendJson){
        sendJson["entity_id"] = Number.parseInt(sendJson["entity_id"])
    }

    if ("father_entity_id" in sendJson) {
        sendJson["father_entity_id"] = Number.parseInt(sendJson["father_entity_id"])
    }



    sendAjax(url, sendJson, 'POST', (d) => {
        _modalOnSuccess(sendJson, d)
         $('#exampleModal').modal('hide');
    })
}

const IS_AJAX_TESTING = false;

function sendAjax(url, data, method, onsuccess, TEST_DATA){
    fetch("/api?controller="+url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "data/json; charset=UTF-8"
            }
        }).then(resp => resp.json()).then(r => {
            if ("success" in r && !r['success']){
                if ('err' in r) {
                     alert(r['err'])
                } else if ('error' in r) {
                     alert(r['error'])
                }
                return;
            }
            onsuccess(r)
        })
}