//192.168.100.9

const utils = {
    server: 'http://localhost:2000',
    ip: 'http://localhost:2001',
    URL_BASE_API: 'http://localhost/api',

    showError: (err) => {
        alert('Ocorreu um problema', `Mensagem: ${err}`)
    }
}

/*
const server = 'http://localhost:2000'
const ip = 'http://localhost:2001'
const URL_BASE_API = 'http://localhost/api/';

function showError(err) {
    alert('Ocorreu um problema', `Mensagem: ${err}`)
} */

export { utils } 
