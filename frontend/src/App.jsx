import { useState } from 'react'
import { z } from 'zod';

import './App.css'


// Definindo o esquema de validação com Zod
const schema = z.object({
  name: z.string().min(3, { message: "O nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "O e-mail deve ser válido." }),
});


function App() {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({ name: '', email: '' });
  
  // Estado para armazenar os erros de validação
  const [errors, setErrors] = useState({});

  // Função para lidar com alterações nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Função para validar o formulário e capturar os erros
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validando os dados do formulário com o esquema definido
    const result = schema.safeParse(formData);

    // Se houver erros, eles serão exibidos
    if (!result.success) {
      const fieldErrors = result.error.format();
      setErrors({
        name: fieldErrors.name?._errors[0],
        email: fieldErrors.email?._errors[0],
      });
    } else {
      // Se passar na validação, pode enviar os dados ou executar outras ações
      console.log("Dados válidos", result.data);
      setErrors({}); // Limpa os erros se a validação for bem-sucedida
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}  // Controlando o valor do input
          onChange={handleChange} // Chamando a função handleChange
        />
        {/* Exibe a mensagem de erro do campo nome, se houver */}
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}  // Controlando o valor do input
          onChange={handleChange} // Chamando a função handleChange
        />
        {/* Exibe a mensagem de erro do campo email, se houver */}
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
};

export default App
