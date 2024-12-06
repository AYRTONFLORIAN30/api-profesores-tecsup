const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Valor predeterminado para el puerto

// Middleware para permitir el envío de datos en formato JSON
app.use(express.json());

// Base de datos simulada (con los datos proporcionados)
let teachers = [
  {
    id: 1,
    name: "Victor Alejandro",
    last_name: "Saico Justo",
    phone: "+51 925137361",
    email: "vsaico@tecsup.edu.pe",
    imageUrl: "https://raw.githubusercontent.com/victorskatepro/ContactList/master/app/src/main/res/drawable/vsaico.jpeg"
  },
  {
    id: 2,
    name: "Linder Hassinger",
    last_name: "Saico Justo",
    phone: "+51 925137362",
    email: "lhassinger@tecsup.edu.pe",
    imageUrl: "https://raw.githubusercontent.com/victorskatepro/ContactList/master/app/src/main/res/drawable/lhassinger.jpeg"
  },
  {
    id: 3,
    name: "Jaime",
    last_name: "Gomez",
    phone: "+51 925137363",
    email: "jgomez@tecsup.edu.pe",
    imageUrl: "https://raw.githubusercontent.com/victorskatepro/ContactList/master/app/src/main/res/drawable/jgomez.png"
  },
  {
    id: 4,
    name: "Jaime",
    last_name: "Farfan",
    phone: "+51 925137364",
    email: "jfarfan@tecsup.edu.pe",
    imageUrl: "https://raw.githubusercontent.com/victorskatepro/ContactList/master/app/src/main/res/drawable/jfarfan.png"
  }
];

// Rutas para la API

// Obtener todos los profesores
app.get('/teachers', (req, res) => {
  res.json(teachers);
});

// Obtener un profesor por su id
app.get('/teachers/:id', (req, res) => {
  const teacher = teachers.find(t => t.id === parseInt(req.params.id));
  if (!teacher) return res.status(404).send('Profesor no encontrado');
  res.json(teacher);
});

// Crear un nuevo profesor
app.post('/teachers', (req, res) => {
  const { name, last_name, phone, email, imageUrl } = req.body;
  const newTeacher = {
    id: teachers.length + 1,
    name,
    last_name,
    phone,
    email,
    imageUrl
  };
  teachers.push(newTeacher);
  res.status(201).json(newTeacher);
});

// Actualizar un profesor
app.put('/teachers/:id', (req, res) => {
  const teacher = teachers.find(t => t.id === parseInt(req.params.id));
  if (!teacher) return res.status(404).send('Profesor no encontrado');

  const { name, last_name, phone, email, imageUrl } = req.body;
  teacher.name = name || teacher.name;
  teacher.last_name = last_name || teacher.last_name;
  teacher.phone = phone || teacher.phone;
  teacher.email = email || teacher.email;
  teacher.imageUrl = imageUrl || teacher.imageUrl;

  res.json(teacher);
});

// Eliminar un profesor
app.delete('/teachers/:id', (req, res) => {
  const teacherIndex = teachers.findIndex(t => t.id === parseInt(req.params.id));
  if (teacherIndex === -1) return res.status(404).send('Profesor no encontrado');

  teachers.splice(teacherIndex, 1);
  res.status(204).send();
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
