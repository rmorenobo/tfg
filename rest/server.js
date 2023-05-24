var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override");

  const FabricCAServices = require('fabric-ca-client');
  const { Gateway, Wallets } = require('fabric-network');
  const fs = require('fs');
  const path = require('path');

mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();



router.get("/alumnos/", function (req, res) {
  queryByType('Alumno')
  .then(txt => {
      res.setHeader('Content-Type', 'application/json');
      res.json(JSON.parse(txt));
  })
  .catch(error => {
      res.status(500).send(error.toString());
  });
});
router.get("/asignaturas/", function (req, res) {
  queryByType('Asignatura')
  .then(txt => {
      res.setHeader('Content-Type', 'application/json');
      res.json(JSON.parse(txt));
  })
  .catch(error => {
      res.status(500).send(error.toString());
  });
});
router.get("/carreras/", function (req, res) {
  queryByType('Carrera')
  .then(txt => {
      res.setHeader('Content-Type', 'application/json');
      res.json(JSON.parse(txt));
  })
  .catch(error => {
      res.status(500).send(error.toString());
  });
}); 

router.get("/misasignaturas/:idAlumno", function (req, res) {
    queryByIdxObjId("alumno.idAlumno", "index_idAlumno",req.params.idAlumno)
    .then(txt => {
        res.setHeader('Content-Type', 'application/json');
        res.json(JSON.parse(txt));
    })
    .catch(error => {
        res.status(500).send(error.toString());
    });
  });

  router.get("/misasignaturas/Agrupadas/:idAlumno", function (req, res) {
    queryByIdxObjId("alumno.idAlumno", "index_idAlumno",req.params.idAlumno)
    .then(txt => {
        res.setHeader('Content-Type', 'application/json');
        const datos = JSON.parse(txt);
        const datosAgrupados = agrupaPorUniversidadYCarrera(datos);
        console.log("Estan agrupados");
        console.log(datosAgrupados);
        res.json(datosAgrupados);
    })
    .catch(error => {
        res.status(500).send(error.toString());
    });
  });
  router.get("/misalumnos/:idProfesor", function (req, res) {
    queryByIdxObjId("profesor.idProfesor", "index_idProfesor",req.params.idProfesor)
    .then(txt => {
        res.setHeader('Content-Type', 'application/json');

        res.json(JSON.parse(txt));
    })
    .catch(error => {
        res.status(500).send(error.toString());
    });
  });

router.get("/profesor/:idProfesor", function (req, res) {
  queryByObjId('Profesor',req.params.idProfesor)
  .then(txt => {
      res.setHeader('Content-Type', 'application/json');
      res.json(JSON.parse(txt));
  })
  .catch(error => {
      res.status(500).send(error.toString());
  });
});

router.get("/createAdmin/", function (req, res) {
  createAdmin()
  .then(txt => {
      res.send(txt);
  })
  .catch(error => {
      res.status(500).send(error.toString());
  });
});
router.get("/createUser/", function (req, res) {
  createUser()
  .then(txt => {
      res.send(txt);
  })
  .catch(error => {
      res.status(500).send(error.toString());
  });
});
router.get("/queryAllByType/:objType", function (req, res) {
    queryByType(req.params.objType)
    .then(txt => {
        res.send(txt);
    })
    .catch(error => {
        res.status(500).send(error.toString());
    });
  });
router.get("/queryByObjId/:objType/:idobj", function (req, res) {
    queryByObjId(req.params.objType,req.params.idobj)
    .then(txt => {
        res.send(txt);
    })
    .catch(error => {
        res.status(500).send(error.toString());
    });
});
router.get("/validausuario/:user", function (req, res) {
    console.log("Usuario?");
    console.log(req.params.user);
    queryByObjId("Usuario",req.params.user)
    .then(txt => {
        res.send(txt);
    })
    .catch(error => {
        res.status(500).send(error.toString());
    });
});

router.get("/misaalumnos/:idProfesor", function (req, res) {
    queryByIdxObjId("profesor.idProfesor", "index_idProfesor",req.params.idProfesor)
    .then(txt => {
        res.setHeader('Content-Type', 'application/json');
        res.json(JSON.parse(txt));
    })
    .catch(error => {
        res.status(500).send(error.toString());
    });
  });
  router.post("/mycareerSetNote_/:myCarrerID/:pec1/:pec2/:pec3/:pac1/:pac2/:final", async function (req, res) {
    try {
        const txt = await SetNote(req.params.myCarrerID,req.params.pec1,req.params.pec2,req.params.pec3,req.params.pac1,req.params.pac2,req.params.final,)
        try {
            const data = JSON.parse(txt);
            res.json(data);
        } catch (error) {
            res.send(txt);
        }
    } catch (error) {
        // Error al intentar ejecutar la función SetNote.
        console.error('Error al establecer las notas', error);
        res.status(500).send(error.toString());
    }
});

router.post("/mycareerSetNote/:myCarrerID/:pec1/:pec2/:pec3/:pac1/:pac2/:final", function (req, res) {
    SetNote(req.params.myCarrerID,req.params.pec1,req.params.pec2,req.params.pec3,req.params.pac1,req.params.pac2,req.params.final,)
    .then(txt => {
        try {
            const data = JSON.parse(txt);
            res.json(data);
        } catch (error) {
            res.send(txt);
        }
    })
    .catch(error => {
        res.status(500).send(error.toString());
    });
});

async function SetNote(myCarrerID, pec1, pec2, pec3, pac1, pac2, final) {
    try {
      const ccpPath = path.resolve(__dirname, 'connection-uoc.json');
      const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
  
      const walletPath = path.join(process.cwd(), 'wallet');
      const wallet = await Wallets.newFileSystemWallet(walletPath);
      console.log(`Wallet path: ${walletPath}`);
  
      const identity = await wallet.get('appUser');
      if (!identity) {
          console.log('An identity for the user "appUser" does not exist in the wallet');
          console.log('Run the registerUser.js application before retrying');
          return 'An identity for the user "appUser" does not exist in the wallet';
      }
  
      const gateway = new Gateway();
      await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });
  
      const network = await gateway.getNetwork('universidadeschannel');
      const contract = network.getContract('univesidades');
  
      // Submit the specified transaction.
      await contract.submitTransaction('setNote', myCarrerID, pec1, pec2, pec3, pac1, pac2, final);
      console.log('Transaction has been submitted');
  
      await gateway.disconnect();
      return 'Transaction has been submitted';
    } catch (error) {
      console.error(`Failed to submit transaction: ${error}`);
      //process.exit(1);
      throw error;
    }
  }
  
function agrupaPorUniversidadYCarrera (datos) {
  let resultado = {};
  console.log("Llamada a agrupar");

  console.log("Llamada a agrupar");
  datos.forEach(item => {
    if (item !== null && item.asignatura !== null) {
        let universidad = item.asignatura.universidadId;
        let carrera = item.carrera.data.nombre;
        let creditos = item.carrera.data.creditos;
        let idCarrera = item.carrera.data.idCarrera;
        
        let totalAsignaturasCarrera = item.carrera.data.totalAsignaturas;
        let carreraFinalizada = item.carreraFinalizada;
        let profe = item.profesor.nombre + ' ' + item.profesor.apellido;
        let emailprofe = item.profesor.email;

        let key = `${universidad}-${carrera}`;

        if (!resultado[key]) {
            resultado[key] = {
                universidad,
                carrera,
                idCarrera,
                asignaturas: [],
                creditos,
                totalAsignaturasCarrera,
                totalCreditosSuperados: 0,
                totalAsignaturas: 0,
                carreraFinalizada,
                totalAsignaturasFinalizadas: 0,
                profe,
                emailprofe,
            };
        }

        resultado[key].asignaturas.push(item.asignatura);
        
        resultado[key].totalAsignaturas += 1;
        if (item.finalizada == "true")
        {
            resultado[key].totalAsignaturasFinalizadas += 1;  
            resultado[key].totalCreditosSuperados += parseInt(item.asignatura.creditos);
        }
    }
});

  return Object.values(resultado);
  
}
async function createAdmin() {
  try {
      console.log("primero");
      // load the network configuration
      const ccpPath = path.resolve(__dirname, 'connection-uoc.json');
      //const ccpPath = path.resolve(__dirname, '..',   'organizations', 'peerOrganizations', 'uoc.universidades.com', 'connection-uoc.json');
      
      const ccp = require('/home/rober/TFG/rest/connection-uoc.json'); 
      //JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

      // Create a new CA client for interacting with the CA.
      const caInfo = ccp.certificateAuthorities['ca.uoc.universidades.com'];
      const caTLSCACerts = caInfo.tlsCACerts.pem;
      const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

      // Create a new file system based wallet for managing identities.
      const walletPath = path.join(process.cwd(), 'wallet');
      const wallet = await Wallets.newFileSystemWallet(walletPath);
      console.log(`Wallet path: ${walletPath}`);

      // Check to see if we've already enrolled the admin user.
      const identity = await wallet.get('admin');
      if (identity) {
          console.log('An identity for the admin user "admin" already exists in the wallet');
          return 'An identity for the admin user "admin" already exists in the wallet';
      }

      // Enroll the admin user, and import the new identity into the wallet.
      const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
      const x509Identity = {
          credentials: {
              certificate: enrollment.certificate,
              privateKey: enrollment.key.toBytes(),
          },
          mspId: 'uocMSP',
          type: 'X.509',
      };
      await wallet.put('admin', x509Identity);
      console.log('Successfully enrolled admin user "admin" and imported it into the wallet');
      return 'Successfully enrolled admin user "admin" and imported it into the wallet';

  } catch (error) {
      console.error(`Failed to enroll admin user "admin": ${error}`);
      //process.exit(1);
      throw error;
      //return `Failed to enroll admin user "admin": ${error}`;
      
     
  }
}
async function createUser() {
  try {
      // load the network configuration
      const ccpPath = path.resolve(__dirname,  'connection-uoc.json');
      const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

      // Create a new CA client for interacting with the CA.
      const caURL = ccp.certificateAuthorities['ca.uoc.universidades.com'].url;
      const ca = new FabricCAServices(caURL);

      // Create a new file system based wallet for managing identities.
      const walletPath = path.join(process.cwd(), 'wallet');
      const wallet = await Wallets.newFileSystemWallet(walletPath);
      console.log(`Wallet path: ${walletPath}`);

      // Check to see if we've already enrolled the user.
      const userIdentity = await wallet.get('appUser');
      if (userIdentity) {
          console.log('An identity for the user "appUser" already exists in the wallet');
          return 'An identity for the user "appUser" already exists in the wallet';
      }

      // Check to see if we've already enrolled the admin user.
      const adminIdentity = await wallet.get('admin');
      if (!adminIdentity) {
          console.log('An identity for the admin user "admin" does not exist in the wallet');
          console.log('Run the enrollAdmin.js application before retrying');
          return 'An identity for the admin user "admin" does not exist in the wallet';
      }

      // build a user object for authenticating with the CA
      const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
      const adminUser = await provider.getUserContext(adminIdentity, 'admin');

      // Register the user, enroll the user, and import the new identity into the wallet.
      const secret = await ca.register({
          affiliation: 'org1.department1',
          enrollmentID: 'appUser2',
          role: 'client'
      }, adminUser);
      const enrollment = await ca.enroll({
          enrollmentID: 'appUser2',
          enrollmentSecret: secret
      });
      const x509Identity = {
          credentials: {
              certificate: enrollment.certificate,
              privateKey: enrollment.key.toBytes(),
          },
          mspId: 'uocMSP',
          type: 'X.509',
      };
      await wallet.put('appUser', x509Identity);
      console.log('Successfully registered and enrolled admin user "appUser" and imported it into the wallet');
      return 'Successfully registered and enrolled admin user "appUser" and imported it into the wallet';

  } catch (error) {
      console.error(`Failed to register user "appUser": ${error}`);
      //process.exit(1);
      throw error;
  }
}
async function queryByType( objectType) {
  try {
      // load the network configuration
      const ccpPath = path.resolve(__dirname, 'connection-uoc.json');
      const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

      // Create a new file system based wallet for managing identities.
      const walletPath = path.join(process.cwd(), 'wallet');
      const wallet = await Wallets.newFileSystemWallet(walletPath);
      console.log(`Wallet path-->: ${walletPath}`);

      // Check to see if we've already enrolled the user.
      const identity = await wallet.get('appUser');
      
      if (!identity) {
          console.log('An identity for the user "appUser" does not exist in the wallet');
          console.log('Run the registerUser.js application before retrying');
          
          return 'An identity for the user "appUser" does not exist in the wallet';
      }
      //console.log(identity)
      // Create a new gateway for connecting to our peer node.
      
      const gateway = new Gateway();
      
      await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });
      
      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork('universidadeschannel');
     
      // Get the contract from the network.
      const contract = network.getContract('univesidades');

      // Evaluate the specified transaction.
      const result = await contract.evaluateTransaction('queryAllByType',objectType);
      console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
      // Disconnect from the gateway.
      await gateway.disconnect();
      return JSON.stringify(JSON.parse(result.toString()));
      
  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      //process.exit(1);
      throw error;
  }
}
async function queryByObjId( objectType,objectId) {
    try {
        
        const ccpPath = path.resolve(__dirname, 'connection-uoc.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path-->: ${walletPath}`);

        const identity = await wallet.get('appUser');
        
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            
            return 'An identity for the user "appUser" does not exist in the wallet';
        }

        const gateway = new Gateway();
        
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork('universidadeschannel');
        const contract = network.getContract('univesidades');
        const result = await contract.evaluateTransaction('queryByObjId', objectType,objectId);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        await gateway.disconnect();
        return JSON.stringify(JSON.parse(result.toString()));
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return `Failed to evaluate transaction: ${error}`;
    }
}
async function queryByIdxObjId( indexSelector,indexName, objectId, carreraFinalizada="false", asignaturaFinalizada="false") {
    try {

        const ccpPath = path.resolve(__dirname, 'connection-uoc.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
  
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path-->: ${walletPath}`);
  
        const identity = await wallet.get('appUser');
        
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            
            return 'An identity for the user "appUser" does not exist in the wallet';
        }
       
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork('universidadeschannel');

        const contract = network.getContract('univesidades');
  
        const result = await contract.evaluateTransaction('queryMyCarrerByIndex', indexSelector,indexName,objectId);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        await gateway.disconnect();

        const datosOrdenados = result.sort((a, b) => {
            // Ordenar por idUniversidad
            if(a.idUniversidad < b.idUniversidad) {
                return -1;
            }
            if(a.idUniversidad > b.idUniversidad) {
                return 1;
            }
        
            // Si idUniversidad es igual, ordenar por idCarrera
            if(a.idCarrera < b.idCarrera) {
                return -1;
            }
            if(a.idCarrera > b.idCarrera) {
                return 1;
            }
        
            // Si idUniversidad y idCarrera son iguales, ordenar por idAsignatura
            if(a.idAsignatura < b.idAsignatura) {
                return -1;
            }
            if(a.idAsignatura > b.idAsignatura) {
                return 1;
            }
        
            // Si idUniversidad, idCarrera y idAsignatura son iguales, ordenar por idAlumno
            if(a.idAlumno < b.idAlumno) {
                return -1;
            }
            if(a.idAlumno > b.idAlumno) {
                return 1;
            }
        
            return 0; // Si todos son iguales
        });
        
        return datosOrdenados;
        //return JSON.stringify(JSON.parse(result.toString()));
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return `Failed to evaluate transaction: ${error}`;
    }
}


app.use(router);

app.listen(3000, function () {
  console.log("Node server running on http://localhost:3000");
});