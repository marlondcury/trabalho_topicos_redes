import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }) 
      })
      const data = await response.json()
      if (response.ok) {
        alert(`✅ Usuário cadastrado! ID: ${data.userId}`)
        setName(''); setEmail(''); setPassword('')
      } else {
        alert('❌ Erro: ' + (data.error || JSON.stringify(data)))
      }
    } catch (error) {
      alert('❌ Erro de conexão com Auth Service')
    }
  }

  const handleCreateEvent = async (e) => {
    e.preventDefault()
    if (!date) return alert("⚠️ Selecione uma data!")

    try {
      const dataFormatada = `${date} 12:00:00`
      const response = await fetch('http://localhost:3301/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title, 
          description, 
          event_date: dataFormatada, 
          location: "UFES - Alegre" 
        })
      })
      
      const data = await response.json()
      if (response.ok) {
        alert('🎉 Evento criado com sucesso!')
        setTitle(''); setDescription(''); setDate('')
      } else {
        alert('❌ Erro: ' + (data.error || JSON.stringify(data)))
      }
    } catch (error) {
      alert('❌ Erro de conexão com Events Service')
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>🎓 Sistema CA-SI</h1>
        <p>Gerenciamento Integrado de Membros e Eventos</p>
      </header>
      
      <div className="grid">
        
        {/* CARD CADASTRO */}
        <div className="card card-blue">
          <div className="card-header">
            <h2>👤 Novo Membro</h2>
          </div>
          <form onSubmit={handleRegister}>
            <div className="input-group">
              <label>Nome Completo</label>
              <input value={name} onChange={e => setName(e.target.value)} required placeholder="Ex: Marlon Cury" />
            </div>
            
            <div className="input-group">
              <label>Email Institucional</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="nome@casi.ufes.br" />
            </div>

            <div className="input-group">
              <label>Senha</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
            </div>
            
            <div className="input-group">
              <label>Cargo</label>
              <select value={role} onChange={e => setRole(e.target.value)}>
                <option value="user">Aluno (User)</option>
                <option value="member">Membro (Member)</option>
                <option value="admin">Presidente (Admin)</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">Cadastrar Usuário</button>
          </form>
        </div>

        {/* CARD EVENTOS */}
        <div className="card card-green">
          <div className="card-header">
            <h2>📅 Novo Evento</h2>
          </div>
          <form onSubmit={handleCreateEvent}>
            <div className="input-group">
              <label>Título do Evento</label>
              <input value={title} onChange={e => setTitle(e.target.value)} required placeholder="Ex: Hackathon 2026" />
            </div>

            <div className="input-group">
              <label>Descrição</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} rows="3" placeholder="Detalhes do evento..." />
            </div>
            
            <div className="input-group">
              <label>Data</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
            </div>
            
            <button type="submit" className="btn btn-success">Criar Evento</button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default App