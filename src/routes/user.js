const express = require('express')
const { UserSchema } = require('../models')
const router = express()
const errorMessage = 'An error has occurred'
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode'); 

router.get('/:id', async(req,res) => {
   try {
      const { id } = req.params
      const user = await UserSchema.findById(id)
      user ? res.status(200).send(user) : res.status(404).send('User not found')
   } catch (error) {
      console.log('ERROR GET USER ID')
      console.log(error)
      console.log('ERROR GET USER ID')
      res.status(400).send(errorMessage)
   }   
})

router.post('/login', async(req,res) => {
   const { email, password } = req.body;
   try{
      UserSchema.findOne({ email: email }, (err, user) => {
         // console.log(user);
         if (err) {
           res.status(500).send("Error al autenticar al usuario");
         }
         if (!user) {
           res.status(500).send("El usuario no existe");
         } else {
           if (user.softDelete) {
            //  console.log("jholaaa");
             res.status(500).send("No tiene permisos de ingreso");
           }
           !user.softDelete &&
             user.isCorrectPassword(password, (err, result) => {
               if (err) {
                 res.status(500).send("Error al autenticar");
               } else if (result) {
                 const accessToken = jwt.sign(
                   {
                     // Assigning data value
                     data: {
                       type: "User",
                       id: user._id,
                     },
                   },
                   "secretKey",
                   {
                     expiresIn: "10y",
                   }
                 );
                 res.status(200).send({ accessToken: accessToken });
               } else {
                 console.log("hola2222");
                 res.status(500).send("Usuario o contraseña incorrecta");
               }
             });
         }
       });
   } catch (error) {
      console.log('ERROR POST LOGIN')
      console.log(error)
      console.log('ERROR POST LOGIN')
      res.status(400).send(errorMessage)
   }
})


router.post('/', async(req, res) => {
   try {
      const { body } = req
      console.log(body)
      UserSchema.create(body)
      res.status(200).send('User created successfully')
   } catch (error) {
      console.log('ERROR POST USER')
      console.log(error)
      console.log('ERROR POST USER')
      res.status(400).send(errorMessage)
   }
})

router.put('/:id', async(req,res) => {
   try {
      const { id } = req.params
      const { ...body } = req.body
      if(body.password) {
         const hashedPassword = await bcrypt.hash(body.password, 10)
         body.password = hashedPassword
      }
      await UserSchema.findByIdAndUpdate(id, body)
      res.status(200).send('Profile updated saccessfully')
   } catch (error) {
      console.log('ERROR PUT USER')
      console.log(error)
      console.log('ERROR PUT USER')
      res.status(400).send(errorMessage)
   }
})

module.exports = router