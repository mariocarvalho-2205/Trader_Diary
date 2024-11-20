const mongoose = require('mongoose')

async function main() {
  await mongoose.connect('mongodb://localhost:27017/diario_trader')
}

main()
.then(() => {
  console.info('Conectou ao MongoDB')
})


//! Conexão com supabase
// const { Sequelize } = require('sequelize');

// // As credenciais do Supabase
// const db = new Sequelize('postgresql://postgres.vygadufekjiajtwanijs:Msct.142205.Ady@aws-0-sa-east-1.pooler.supabase.com:6543/postgres', {
//   dialect: 'postgres',
//   logging: false,  // para evitar logs excessivos no console
// });


// try {
//     db.authenticate()
//     console.log('Conectou ao supabase')

    
// } catch (error) {
    
// }

// module.exports = db;

module.exports = mongoose

