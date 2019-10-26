//192.168.100.9
const server = 'http://localhost:2000'
const ip = 'http://localhost:2001'

function showError(err) {
    alert('Ocorreu um problema', `Mensagem: ${err}`)
}

export { server, ip, showError }
