'use strict';

const { Contract } = require('fabric-contract-api');
const {Usuario, Universidad, Carrera,Asignatura, Nota, Alumno, Profesor, MyCareer, AlumnoAsignatura } = require('./models');

class UniversidadesContract extends Contract {

    async addUniversidad(ctx, objectId, nombre) {
        const recordKey = ctx.stub.createCompositeKey("Universidad", [objectId]);
        const data = new Universidad(objectId, nombre);
        await ctx.stub.putState(recordKey, Buffer.from(JSON.stringify(data)));
        return JSON.stringify({ objectType: "Universidad", objectId, data });
    }

    async addCarrera(ctx, objectId, nombre,creditos,totalAsignaturas) {
        const recordKey = ctx.stub.createCompositeKey("Carrera", [objectId]);
        const data = new Carrera(objectId, nombre,creditos,totalAsignaturas);
        await ctx.stub.putState(recordKey, Buffer.from(JSON.stringify(data)));
        return JSON.stringify({ objectType: "Carrera", objectId, data });

    }
    // Agregar Asignatura 
    async addAsignatura(ctx, objectId, universidadId, universidadNombre,carreraId,carreraNombre,  nombre, creditos) {
        const recordKey = ctx.stub.createCompositeKey("Asignatura", [objectId]);
        const data = new Asignatura(objectId,universidadId, universidadNombre,carreraId,carreraNombre,  nombre, creditos);
        await ctx.stub.putState(recordKey, Buffer.from(JSON.stringify(data)));
        return JSON.stringify({ objectType: "Asignatura", objectId, data });
    }
    // Agregar Nota
    async addNota(ctx, objectId, idAsignaturaAlumno, nombre, titulo, nota) {
        const recordKey = ctx.stub.createCompositeKey("Nota", [objectId]);
        const data = new Nota(objectId, idAsignaturaAlumno, nombre, titulo, nota);
        await ctx.stub.putState(recordKey, Buffer.from(JSON.stringify(data)));
        return JSON.stringify({ objectType: "Nota", objectId, data });
    }
    //
    // Agregar Usuario
    async addUsuario(ctx, objectId,id, userType,nombre, apellido, email, activo, universidades) {
        const recordKey = ctx.stub.createCompositeKey("Usuario", [objectId]);
        const data = new Usuario(objectId,id, userType,nombre, apellido, email,activo, universidades);
        await ctx.stub.putState(recordKey, Buffer.from(JSON.stringify(data)));
        return JSON.stringify({ objectType: "Usuario", objectId, data });
    }

    // Agregar Alumno
    async addAlumno(ctx, objectId, nombre, apellido, email) {
        const recordKey = ctx.stub.createCompositeKey("Alumno", [objectId]);
        const data = new Alumno(objectId, nombre, apellido, email);
        await ctx.stub.putState(recordKey, Buffer.from(JSON.stringify(data)));
        return JSON.stringify({ objectType: "Alumno", objectId, data });
    }

    // Agregar Profesor
    async addProfesor(ctx, objectId, nombre, apellido, email) {
        const recordKey = ctx.stub.createCompositeKey("Profesor", [objectId]);
        const data = new Profesor(objectId, nombre, apellido, email);
        await ctx.stub.putState(recordKey, Buffer.from(JSON.stringify(data)));
        return JSON.stringify({ objectType: "Profesor", objectId, data });
    }
    // Agregar MyCareer
    async addMyCareer(ctx, objectId, alumno,profesor,carrera, asignatura,pec1,pec2,pec3,pac1,pac2,final, finalizada,carreraFinalizada) {
        const stringObjectId = String(objectId); 
        const recordKey = ctx.stub.createCompositeKey("MyCareer", [stringObjectId]);
        const data = new MyCareer(objectId,
            alumno.idAlumno,profesor.idProfesor, asignatura.universidadId, carrera.objectId, asignatura.idAsignatura,
            alumno,profesor,carrera, asignatura,pec1,pec2,pec3,pac1,pac2,final, finalizada,carreraFinalizada);
        await ctx.stub.putState(recordKey, Buffer.from(JSON.stringify(data)));
        return JSON.stringify({ objectType: "MyCareer", stringObjectId, data });
    }
    // Agregar AlumnoAsignatura
    async addAlumnoAsignatura_Old(ctx, objectId, idAsignatura, idAlumno, semestre, fechaini, fechafin, superada, nota) {
        const recordKey = ctx.stub.createCompositeKey("AlumnoAsignatura", [objectId]);
        const data = new AlumnoAsignatura(objectId, idAsignatura, idAlumno, semestre, fechaini, fechafin, superada, JSON.parse(nota));
        await ctx.stub.putState(recordKey, Buffer.from(JSON.stringify(data)));
        return JSON.stringify({ objectType: "AlumnoAsignatura", objectId, data });
    }
    async addAlumnoAsignatura(ctx, objectId, idAsignatura, idAlumno, semestre, fechaini, fechafin, superada, nota) {
        const recordKey = ctx.stub.createCompositeKey("AlumnoAsignatura", [objectId]);
        const data = new AlumnoAsignatura(objectId, idAsignatura, idAlumno, semestre, fechaini, fechafin, superada, JSON.parse(nota));
        
        // Añadir docType al objeto de datos.
        data.docType = "AlumnoAsignatura";
        
        await ctx.stub.putState(recordKey, Buffer.from(JSON.stringify(data)));
        return JSON.stringify({ objectType: "AlumnoAsignatura", objectId, data });
    }
    async queryMyCareerByIdAlumno(ctx, idAlumno) {
        return this.queryMyCarrerByIndex(ctx, "alumno.idAlumno", "index_idAlumno", idAlumno);
    }
    async queryMyCarrerByProfessorId(ctx, idProfesor) {
        const queryString = {
            selector: {
                "profesor.idProfesor": idProfesor
            },
            use_index: 'index_idProfesor'
        };
    
        const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
        const results = [];
        let result = await iterator.next();
    
        while (!result.done) {
            let record = JSON.parse(result.value.value.toString('utf8'));
            results.push(record);
            result = await iterator.next();
        }
    
        if(results.length === 0) {
            throw new Error(`Profesor con ID ${idProfesor} no existe.`);
        }
    
        return JSON.stringify(results);
    }
    async queryMyCarrerByIndex(ctx, indexSelector, indexName, id_) {
        const queryString = {
            selector: {
                [indexSelector]: id_
            },
            use_index: indexName
        };
    
        const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
        const results = [];
        let result = await iterator.next();
    
        while (!result.done) {
            let record = JSON.parse(result.value.value.toString('utf8'));
            //let keyComposite = result.value.key;
            //let keyComponents = keyComposite.split('\u0000').filter(component => component !== '');
    
            results.push( record  );
            result = await iterator.next();
        }
    
        if(results.length === 0) {
            throw new Error(`${indexName} con ID ${id_} no existe.`);
        }
    
        return JSON.stringify(results);
    }
    
    
    async queryBySubjectId(ctx, idAsignatura) {
        const queryString = {
            selector: {
                docType: 'AlumnoAsignatura',
                idAsignatura: idAsignatura
            },
            use_index: 'index_idAsignatura'
        };
    
        
        const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
        const results = [];
        let result = await iterator.next();
    
        while (!result.done) {
            let record = JSON.parse(result.value.value.toString('utf8'));
            results.push(record);
            result = await iterator.next();
        }
        
        if(results.length === 0) {
            throw new Error(`IdAsignatura con ID ${idAsignatura} no existe.`);
        }
    
        return JSON.stringify(results);
    }

    ///
    async queryCarrera(ctx, objectId) {
        const recordKey = ctx.stub.createCompositeKey("Carrera", [objectId]);
        const recordBytes = await ctx.stub.getState(recordKey);
    
        if (!recordBytes || recordBytes.length === 0) {
            throw new Error(`Carrera con ID ${objectId} no existe.`);
        }
    
        return recordBytes.toString('utf8');
    }
    async queryByObjId(ctx, objType, objId)
    {
        const recordKey = ctx.stub.createCompositeKey(objType, [objId]);
        const recordBytes = await ctx.stub.getState(recordKey);
    
        if (!recordBytes || recordBytes.length === 0) {
            throw new Error(`${objType} con ID ${objectId} no existe.`);
        }
    
        return recordBytes.toString('utf8'); 
    } 

    async queryAllByType(ctx, objType) 
    {
        const iterator = await ctx.stub.getStateByPartialCompositeKey(objType, []);
    
        const obj = [];
        let result = await iterator.next();
    
        while (!result.done) {
            const { key, value } = result.value;
            const objectType = ctx.stub.splitCompositeKey(key).objectType;
    
            if (objectType === objType) {
                const record = {
                    objectId: ctx.stub.splitCompositeKey(key).attributes[0],
                    data: JSON.parse(value.toString('utf8')),
                };
                obj.push(record);
            }    
            result = await iterator.next();
        }
    
        await iterator.close();
        return JSON.stringify(obj);       
    }
    async queryAllCarreras(ctx) {
        const iterator = await ctx.stub.getStateByPartialCompositeKey("Carrera", []);
    
        const carreras = [];
        let result = await iterator.next();
    
        while (!result.done) {
            const { key, value } = result.value;
            const objectType = ctx.stub.splitCompositeKey(key).objectType;
    
            if (objectType === "Carrera") {
                const record = {
                    objectId: ctx.stub.splitCompositeKey(key).attributes[0],
                    data: JSON.parse(value.toString('utf8')),
                };
                carreras.push(record);
            }
    
            result = await iterator.next();
        }
    
        await iterator.close();
        return JSON.stringify(carreras);
    }
    async setNote(ctx, myCarrerID,pec1,pec2,pec3,pac1,pac2,final) {
        console.info('============= START : SetNote  ===========');
        const recordKey = ctx.stub.createCompositeKey("MyCareer", [myCarrerID]);
        const myCareerAsBytes = await ctx.stub.getState(recordKey); 
        if (!myCareerAsBytes || myCareerAsBytes.length === 0) {
            throw new Error(`${myCarrerID} does not exist`);
        }
        const mycareer = JSON.parse(myCareerAsBytes.toString());
        mycareer.pec1 = pec1;
        mycareer.pec2 = pec2;
        mycareer.pec3 = pec3;
        mycareer.pac1 = pac1;
        mycareer.pac2 = pac2;
        mycareer.final = final;

        await ctx.stub.putState(recordKey, Buffer.from(JSON.stringify(mycareer)));
        console.info('============= END : setNote ===========');
    }

    getAsignaturaByIndex(asignatura, carrera, universidades,indexUni) {
        let asignaturaData = asignatura.data;
        return new Asignatura(
            asignaturaData.idAsignatura,
            universidades[indexUni].data.idUniversidad,
            universidades[indexUni].data.nombre,
            carrera.data.carreraId,
            carrera.data.carreraNombre,
            asignaturaData.nombre,
            asignaturaData.creditos
        );
    }
    async init(ctx) {
        console.info('Creando lista de datos');
        const usuarios=[
            {objectId:"usrJuan",id:"1", userType:"Alumno", nombre:"Juan", apellido:"Perez", email:"juan.perez@gmail.com",activo:"true", universidades:["UOC"]},
            {objectId:"usrAna",id:"2", userType:"Alumno",nombre:"Ana", apellido:"Martinez", email:"ana.martinez@gmail.com",activo:"true",universidades:["UOC","UPC","UIB","UAB"]},
            {objectId:"usrCarlos",id:"3", userType:"Alumno",nombre:"Carlos", apellido:"Rodriguez", email:"carlos.rodriguez@gmail.com",activo:"true",universidades:["UOC"]},
            {objectId:"usrSergio",id:"1", userType:"Profesor",nombre:"Sergio", apellido:"Lopez", email:"sanchez.lopez@gmail.com",activo:"true",universidades:["UOC","UPC","UAB"]},
            {objectId:"usrAngela",id:"2", userType:"Profesor",nombre:"Angela", apellido:"Gomez", email:"rodriguez.gomez@gmail.com",activo:"true",universidades:["UOC","UAB"]},
            {objectId:"usrGabriel",id:"3", userType:"Profesor",nombre:"Gabriel", apellido:"Martinez", email:"torres.martinez@gmail.com",activo:"true",universidades:["UIB"]},
            {objectId:"usrRober",id:"4", userType:"Alumno",nombre:"Roberto", apellido:"Moreno", email:"rmorenobo@uoc.edu",activo:"true",universidades:["UOC"]},
        ];

        const asignaturasInf = [
            {objectId:'1',data:{creditos:'6',idAsignatura:'1',nombre:'Administración y gestión de organizaciones'}},
            {objectId:'2',data:{creditos:'6',idAsignatura:'2',nombre:'Álgebra'}},
            {objectId:'3',data:{creditos:'6',idAsignatura:'3',nombre:'Análisis matemático'}},
            {objectId:'4',data:{creditos:'6',idAsignatura:'4',nombre:'Estadística'}},
            {objectId:'5',data:{creditos:'6',idAsignatura:'5',nombre:'Fundamentos de computadores'}},
            {objectId:'6',data:{creditos:'6',idAsignatura:'6',nombre:'Fundamentos de programación'}},
            {objectId:'7',data:{creditos:'6',idAsignatura:'7',nombre:'Fundamentos físicos de la informática'}},
            {objectId:'8',data:{creditos:'6',idAsignatura:'8',nombre:'Inteligencia artificai'}},
            {objectId:'9',data:{creditos:'6',idAsignatura:'9',nombre:'Lógica'}},
            {objectId:'10',data:{creditos:'6',idAsignatura:'10',nombre:'Prácticas de programación'}},
            {objectId:'11',data:{creditos:'6',idAsignatura:'11',nombre:'Trabajo en equipo en la red'}},
            {objectId:'12',data:{creditos:'6',idAsignatura:'12',nombre:'Administración de redes y sistemas operativos'}},
            {objectId:'13',data:{creditos:'6',idAsignatura:'13',nombre:'Competencia comunicativa para profesionales de las TIC'}},
            {objectId:'14',data:{creditos:'6',idAsignatura:'14',nombre:'Diseño de bases de datos'}},
            {objectId:'15',data:{creditos:'6',idAsignatura:'15',nombre:'Diseño y programación orientada a objetos'}},
            {objectId:'16',data:{creditos:'6',idAsignatura:'16',nombre:'Ingeniería del software'}},
            {objectId:'17',data:{creditos:'6',idAsignatura:'17',nombre:'Estructura de computadores'}},
            {objectId:'18',data:{creditos:'6',idAsignatura:'18',nombre:'Gestión de proyectos'}},
            {objectId:'19',data:{creditos:'6',idAsignatura:'19',nombre:'Grafos y complejidad'}},
            {objectId:'20',data:{creditos:'6',idAsignatura:'20',nombre:'Idioma moderno I: inglés'}},
            {objectId:'21',data:{creditos:'6',idAsignatura:'21',nombre:'Idioma moderno II: inglés'}},
            {objectId:'22',data:{creditos:'6',idAsignatura:'22',nombre:'Inteligencia artificial'}},
            {objectId:'23',data:{creditos:'6',idAsignatura:'23',nombre:'Interacción persona ordenador'}},
            {objectId:'24',data:{creditos:'6',idAsignatura:'24',nombre:'Sistemas distribuidos'}},
            {objectId:'25',data:{creditos:'6',idAsignatura:'25',nombre:'Sistemas operativos'}},
            {objectId:'26',data:{creditos:'6',idAsignatura:'26',nombre:'Uso de bases de datos'}},
            {objectId:'27',data:{creditos:'6',idAsignatura:'27',nombre:'Redes y aplicaciones Internet'}},
            {objectId:'28',data:{creditos:'6',idAsignatura:'28',nombre:'Análisis y diseño de patrones'}},
            {objectId:'29',data:{creditos:'6',idAsignatura:'29',nombre:'Aprendizaje computacional'}},
            {objectId:'30',data:{creditos:'6',idAsignatura:'30',nombre:'Arquitecturas de computadores avanzados'}},
            {objectId:'31',data:{creditos:'6',idAsignatura:'31',nombre:'Arquitectura de bases de datos'}},
            {objectId:'32',data:{creditos:'6',idAsignatura:'32',nombre:'Arquitectura de computadores'}},
            {objectId:'33',data:{creditos:'6',idAsignatura:'33',nombre:'Autómatas y gramáticas'}},
            {objectId:'34',data:{creditos:'6',idAsignatura:'34',nombre:'Comercio electrónico'}},
            {objectId:'35',data:{creditos:'6',idAsignatura:'35',nombre:'Compiladores'}},
            {objectId:'36',data:{creditos:'6',idAsignatura:'36',nombre:'Criptografía'}},
            {objectId:'37',data:{creditos:'6',idAsignatura:'37',nombre:'Planificación y uso estratégico de SI'}},
            {objectId:'38',data:{creditos:'6',idAsignatura:'38',nombre:'Diseño de estructuras de datos'}},
            {objectId:'39',data:{creditos:'6',idAsignatura:'39',nombre:'Diseño de sistemas operativos'}},
            {objectId:'40',data:{creditos:'12',idAsignatura:'55',nombre:'Trabajo final de grado'}}
        ];
        const asignaturasPsi = [
            //Psicología
            {objectId:"41",data:{creditos:"6",idAsignatura:"41",nombre:"Introducción a la Psicología"}},
            {objectId:"42",data:{creditos:"6",idAsignatura:"42",nombre:"Psicología del Desarrollo"}},
            {objectId:"43",data:{creditos:"6",idAsignatura:"43",nombre:"Psicología Social"}},
            {objectId:"44",data:{creditos:"6",idAsignatura:"44",nombre:"Psicobiología"}},
            {objectId:"45",data:{creditos:"6",idAsignatura:"45",nombre:"Psicología Clínica"}},
            {objectId:"46",data:{creditos:"6",idAsignatura:"46",nombre:"Psicología de la Personalidad"}},
            {objectId:"47",data:{creditos:"6",idAsignatura:"47",nombre:"Psicología Educativa"}},
            {objectId:"48",data:{creditos:"6",idAsignatura:"48",nombre:"Psicología Laboral"}},
            {objectId:"49",data:{creditos:"6",idAsignatura:"49",nombre:"Psicología Forense"}},
            {objectId:"50",data:{creditos:"6",idAsignatura:"50",nombre:"Psicología del Deporte"}},
            {objectId:"51",data:{creditos:"6",idAsignatura:"51",nombre:"Psicología de la Salud"}},
            {objectId:"52",data:{creditos:"6",idAsignatura:"52",nombre:"Psicología Evolutiva"}},
            {objectId:"53",data:{creditos:"6",idAsignatura:"53",nombre:"Psicología Experimental"}},
            {objectId:"54",data:{creditos:"6",idAsignatura:"54",nombre:"Psicología Cognitiva"}},
            {objectId:"55",data:{creditos:"6",idAsignatura:"55",nombre:"Psicología de la Motivación"}},
            {objectId:"56",data:{creditos:"6",idAsignatura:"56",nombre:"Psicología de la Emoción"}},
            {objectId:"57",data:{creditos:"6",idAsignatura:"57",nombre:"Psicología del Aprendizaje"}},
            {objectId:"58",data:{creditos:"6",idAsignatura:"58",nombre:"Psicología de la Memoria"}},
            {objectId:"59",data:{creditos:"6",idAsignatura:"59",nombre:"Psicología de la Percepción"}},
            {objectId:"60",data:{creditos:"6",idAsignatura:"60",nombre:"Psicología del Pensamiento"}},
            {objectId:"61",data:{creditos:"6",idAsignatura:"61",nombre:"Psicología del Lenguaje"}},
            {objectId:"62",data:{creditos:"6",idAsignatura:"62",nombre:"Psicología de la Inteligencia"}},
            {objectId:"63",data:{creditos:"6",idAsignatura:"63",nombre:"Psicología de la Creatividad"}},
            {objectId:"64",data:{creditos:"6",idAsignatura:"64",nombre:"Psicología de la Sexualidad"}},
            {objectId:"65",data:{creditos:"6",idAsignatura:"65",nombre:"Psicología de la Familia"}},
            {objectId:"66",data:{creditos:"6",idAsignatura:"66",nombre:"Psicología del Envejecimiento"}},
            {objectId:"67",data:{creditos:"6",idAsignatura:"67",nombre:"Psicología de la Adolescencia"}},
            {objectId:"68",data:{creditos:"6",idAsignatura:"68",nombre:"Psicología de la Niñez"}},
            {objectId:"69",data:{creditos:"6",idAsignatura:"69",nombre:"Psicología del Trauma"}},
            {objectId:"70",data:{creditos:"6",idAsignatura:"70",nombre:"Psicología y Cultura"}},
            {objectId:"71",data:{creditos:"6",idAsignatura:"71",nombre:"Psicología y Sociedad"}},
            {objectId:"72",data:{creditos:"6",idAsignatura:"72",nombre:"Psicología y Derechos Humanos"}},
            {objectId:"73",data:{creditos:"6",idAsignatura:"73",nombre:"Psicología y Religión"}},
            {objectId:"74",data:{creditos:"6",idAsignatura:"74",nombre:"Psicología y Medio Ambiente"}},
            {objectId:"75",data:{creditos:"6",idAsignatura:"75",nombre:"Psicología de la Comunicación"}},
            {objectId:"76",data:{creditos:"6",idAsignatura:"76",nombre:"Psicología de los Grupos"}},
            {objectId:"77",data:{creditos:"6",idAsignatura:"77",nombre:"Psicología y Tecnología"}},
            {objectId:"78",data:{creditos:"6",idAsignatura:"78",nombre:"Psicología y Arte"}},
            {objectId:"79",data:{creditos:"6",idAsignatura:"79",nombre:"Psicología y Música"}},
            {objectId:"80",data:{creditos:"6",idAsignatura:"80",nombre:"Psicología y Literatura"}},
            {objectId:"81",data:{creditos:"12",idAsignatura:"81",nombre:"Trabajo final de grado"}}
        ];
        const asignaturasEco = [
            //Economía
            {objectId:"82",data:{creditos:"6",idAsignatura:"82",nombre:"Análisis Financiero"}},
            {objectId:"83",data:{creditos:"6",idAsignatura:"83",nombre:"Gestión de Riesgos Financieros"}},
            {objectId:"84",data:{creditos:"6",idAsignatura:"84",nombre:"Estrategias de Inversión"}},
            {objectId:"84",data:{creditos:"6",idAsignatura:"84",nombre:"Introducción a la Economía"}},
            {objectId:"86",data:{creditos:"6",idAsignatura:"86",nombre:"Microeconomía"}},
            {objectId:"87",data:{creditos:"6",idAsignatura:"87",nombre:"Macroeconomía II"}},
            {objectId:"88",data:{creditos:"6",idAsignatura:"88",nombre:"Economía Internacional"}},
            {objectId:"89",data:{creditos:"6",idAsignatura:"89",nombre:"Economía del Trabajo"}},
            {objectId:"90",data:{creditos:"6",idAsignatura:"90",nombre:"Economía Industrial"}},
            {objectId:"91",data:{creditos:"6",idAsignatura:"91",nombre:"Economía Pública"}},
            {objectId:"92",data:{creditos:"6",idAsignatura:"92",nombre:"Economía de la Educación"}},
            {objectId:"93",data:{creditos:"6",idAsignatura:"93",nombre:"Economía del Medio Ambiente"}},
            {objectId:"94",data:{creditos:"6",idAsignatura:"94",nombre:"Economía del Desarrollo"}},
            {objectId:"95",data:{creditos:"6",idAsignatura:"95",nombre:"Economía Política"}},
            {objectId:"96",data:{creditos:"6",idAsignatura:"96",nombre:"Economía de la Salud"}},
            {objectId:"97",data:{creditos:"6",idAsignatura:"97",nombre:"Economía Agrícola"}},
            {objectId:"98",data:{creditos:"6",idAsignatura:"98",nombre:"Economía del Transporte"}},
            {objectId:"99",data:{creditos:"6",idAsignatura:"99",nombre:"Economía de la Empresa"}},
            {objectId:"100",data:{creditos:"6",idAsignatura:"100",nombre:"Economía de los Recursos Naturales"}},
            {objectId:"101",data:{creditos:"6",idAsignatura:"101",nombre:"Economía Urbana"}},
            {objectId:"102",data:{creditos:"6",idAsignatura:"102",nombre:"Economía de las Organizaciones"}},
            {objectId:"103",data:{creditos:"6",idAsignatura:"103",nombre:"Economía de la Innovación"}},
            {objectId:"104",data:{creditos:"6",idAsignatura:"104",nombre:"Economía del Consumo"}},
            {objectId:"105",data:{creditos:"6",idAsignatura:"105",nombre:"Economía de los Mercados Financieros"}},
            {objectId:"106",data:{creditos:"6",idAsignatura:"106",nombre:"Economía de la Regulación"}},
            {objectId:"107",data:{creditos:"6",idAsignatura:"107",nombre:"Economía de la Energía"}},
            {objectId:"108",data:{creditos:"6",idAsignatura:"108",nombre:"Economía de la Integración Económica"}},
            {objectId:"109",data:{creditos:"6",idAsignatura:"109",nombre:"Economía de la Información"}},
            {objectId:"110",data:{creditos:"6",idAsignatura:"110",nombre:"Economía del Bienestar"}},
            {objectId:"111",data:{creditos:"6",idAsignatura:"111",nombre:"Economía de la Cultura"}},
            {objectId:"112",data:{creditos:"6",idAsignatura:"132",nombre:"Economía de la Ciberseguridad"}},
            {objectId:"113",data:{creditos:"6",idAsignatura:"113",nombre:"Economía del Turismo"}},
            {objectId:"114",data:{creditos:"6",idAsignatura:"114",nombre:"Economía de la Competencia"}},
            {objectId:"115",data:{creditos:"6",idAsignatura:"115",nombre:"Economía del Deporte"}},
            {objectId:"116",data:{creditos:"6",idAsignatura:"116",nombre:"Economía de la Seguridad"}},
            {objectId:"117",data:{creditos:"6",idAsignatura:"117",nombre:"Economía del Comercio"}},
            {objectId:"118",data:{creditos:"6",idAsignatura:"118",nombre:"Economía del Sector Público"}},
            {objectId:"119",data:{creditos:"6",idAsignatura:"119",nombre:"Economía de la Distribución"}},
            {objectId:"120",data:{creditos:"12",idAsignatura:"112",nombre:"Trabajo final de grado"}}


        ];
        const universidades = [

            {objectId:"UAB",data:{idUniversidad:"UAB",nombre:"Universitat autònoma de Barcelona"}},
            {objectId:"UIB",data:{idUniversidad:"UIB",nombre:"Universitat de les Illes Balears"}},
            {objectId:"UOC",data:{idUniversidad:"UOC",nombre:"Universitat oberta de Catalunya"}},
            {objectId:"UPC",data:{idUniversidad:"UPC",nombre:"Universitat politècnica de Catalunya"}}
        ];
        const alumnos=[
            {objectId:"1",data:{idAlumno:"1", nombre:"Juan", apellido:"Perez", email:"juan.perez@gmail.com"}},
            {objectId:"2",data:{idAlumno:"2", nombre:"Ana", apellido:"Martinez", email:"ana.martinez@gmail.com"}},
            {objectId:"3",data:{idAlumno:"3", nombre:"Carlos", apellido:"Rodriguez", email:"carlos.rodriguez@gmail.com"}},
            {objectId:"4",data:{idAlumno:"4", nombre:"Roberto", apellido:"Moreno", email:"rmorenobo@uoc.edu"}},
        ];
        const profesores = [
            {objectId:"1", data:{idProfesor:"1", nombre:"Sergio", apellido:"Lopez", email:"sanchez.lopez@gmail.com"}},
            {objectId:"2", data:{idProfesor:"2", nombre:"Angela", apellido:"Gomez", email:"rodriguez.gomez@gmail.com"}},
            {objectId:"3", data:{idProfesor:"3", nombre:"Gabriel", apellido:"Martinez", email:"torres.martinez@gmail.com"}},
        ];
        const carreras = [
            {objectId:"1", data:{idCarrera:"1", nombre:"Grado de Ingeniería Informática", creditos:"240", totalAsignaturas:"40"}},
            {objectId:"2", data:{idCarrera:"2", nombre:"Grado de Psicología", creditos:"240", totalAsignaturas:"40"}},
            {objectId:"3", data:{idCarrera:"3", nombre:"Máster Universitario de Dirección Financiera", creditos:"60", totalAsignaturas:"10"}},
            {objectId:"4", data:{idCarrera:"4", nombre:"Grado de Economía", creditos:"240", totalAsignaturas:"40"}},
        ];
        
        console.info('Añadiendo Usuarios');
        for (const usuario of usuarios) {
            await this.addUsuario(ctx, usuario.objectId,usuario.id, usuario.userType, usuario.nombre,usuario.apellido,usuario.email,usuario.activo, usuario.universidades  );
        }

        console.info('Añadiendo Unis');
        for (const universidad of universidades) {
            await this.addUniversidad(ctx, universidad.objectId, universidad.data.nombre);
        }
        
        console.info('Añadiendo carreras');
        for (const carrera of carreras) {
            await this.addCarrera(ctx, carrera.objectId, carrera.data.nombre, carrera.data.creditos, carrera.data.totalAsignaturas);
        }
        console.info('Añadiendo asignaturasInf');
        for (const asignatura of asignaturasInf) {
            for (const universidad of universidades)
            {
                    await this.addAsignatura(ctx, asignatura.data.idAsignatura,universidad.data.idUniversidad, universidad.data.nombre, "1", "Grado de Ingeniería Informática", asignatura.data.nombre, asignatura.data.creditos);
            }
        }
        console.info('Añadiendo asignaturasPsi');
        for (const asignatura of asignaturasPsi) {
            for (const universidad of universidades)
            {
                await this.addAsignatura(ctx, asignatura.data.idAsignatura, universidad.data.idUniversidad, universidad.data.nombre,"2", "Grado de Psicología", asignatura.data.nombre, asignatura.data.creditos);
            }
        }
        console.info('Añadiendo asignaturasEco');
        for (const asignatura of asignaturasEco) {
            for (const universidad of universidades)
            {
                await this.addAsignatura(ctx, asignatura.data.idAsignatura,universidad.data.idUniversidad, universidad.data.nombre,"3", "Máster Universitario de Dirección Financiera", asignatura.data.nombre, asignatura.data.creditos);                
                await this.addAsignatura(ctx, asignatura.data.idAsignatura,universidad.data.idUniversidad, universidad.data.nombre,"4", "Grado de Economía", asignatura.data.nombre, asignatura.data.creditos);
            }
        }
        console.info('Añadiendo alumnos');
        for (const alumno of alumnos) {
            await this.addAlumno(ctx, alumno.objectId, alumno.data.nombre, alumno.data.apellido, alumno.data.email);
        }
        console.info('Añadiendo profesores');
        for (const profesor of profesores) {
            await this.addProfesor(ctx, profesor.objectId, profesor.data.nombre, profesor.data.apellido, profesor.data.email);
        }

        console.info('Añadiendo MyCareer');
        console.info('UOC');

        let i = 1;
        let totCreditos = 0;
        for (const carrera of carreras) {
            console.info('Añadiendo MyCareer');
            if (carrera.objectId === "1") // EL ALU 1 tiene 33 finalizadas y 4 matriculado inf
            { console.info('Añadiendo MyCaree Inf');
                for (const asignatura of asignaturasInf.slice(0, 33))    
                {
                    await this.addMyCareer(ctx, i, alumnos[1].data,profesores[1].data,carrera, this.getAsignaturaByIndex(asignatura,carrera , universidades, 2), "A","C","B","A","B","B", "true","false");
                    i++;
                }       
                for (const asignatura of asignaturasInf)    
                {   if (totCreditos<=198)
                    {
                        await this.addMyCareer(ctx, i, alumnos[3].data,profesores[1].data,carrera, this.getAsignaturaByIndex(asignatura,carrera , universidades, 2), "A","C","B","A","B","B", "true","false");
                        totCreditos+= asignatura.creditos;
                        i++;
                    } else if (totCreditos<=216)
                    {
                        await this.addMyCareer(ctx, i, alumnos[3].data,profesores[1].data,carrera, this.getAsignaturaByIndex(asignatura,carrera , universidades, 2), "A","A","B","A","-","-", "false","false");
                        totCreditos+= asignatura.creditos;
                        i++;

                    }
                } 
                await this.addMyCareer(ctx, i, alumnos[1].data,profesores[1].data,carrera, this.getAsignaturaByIndex(asignaturasInf[34],carrera , universidades, 2), "A","C","-","A","-","-", "false","false");i++;
                await this.addMyCareer(ctx, i, alumnos[1].data,profesores[0].data,carrera, this.getAsignaturaByIndex(asignaturasInf[35],carrera , universidades, 2), "A","C+","-","B","-","-", "false","false");i++;
                await this.addMyCareer(ctx, i, alumnos[1].data,profesores[1].data,carrera, this.getAsignaturaByIndex(asignaturasInf[36],carrera , universidades, 2), "A","B","-","C-","-","-", "false","false");i++;
                await this.addMyCareer(ctx, i, alumnos[1].data,profesores[0].data,carrera, this.getAsignaturaByIndex(asignaturasInf[37],carrera , universidades, 2), "B","A","-","C","-","-", "false","false");i++;

                await this.addMyCareer(ctx, i, alumnos[2].data,profesores[1].data,carrera, this.getAsignaturaByIndex(asignaturasInf[27],carrera , universidades, 2), "A","C","B","A","B","B", "true","false");i++;
                await this.addMyCareer(ctx, i, alumnos[2].data,profesores[0].data,carrera, this.getAsignaturaByIndex(asignaturasInf[28],carrera , universidades, 2), "B","C+","A","B","A","A", "true","false");i++;                
                await this.addMyCareer(ctx, i, alumnos[2].data,profesores[1].data,carrera, this.getAsignaturaByIndex(asignaturasInf[27],carrera , universidades, 2), "A","C","-","A","-","-", "false","false");i++;
                await this.addMyCareer(ctx, i, alumnos[2].data,profesores[0].data,carrera, this.getAsignaturaByIndex(asignaturasInf[28],carrera , universidades, 2), "C","C+","-","B","-","-", "false","false");i++;
                await this.addMyCareer(ctx, i, alumnos[2].data,profesores[1].data,carrera, this.getAsignaturaByIndex(asignaturasInf[29],carrera , universidades, 2), "A","B","-","C-","-","-", "false","false");i++;
                await this.addMyCareer(ctx, i, alumnos[2].data,profesores[0].data,carrera, this.getAsignaturaByIndex(asignaturasInf[30],carrera , universidades, 2), "B","A","-","C","-","-", "false","false");i++;

                await this.addMyCareer(ctx, i, alumnos[1].data,profesores[1].data,carrera, this.getAsignaturaByIndex(asignaturasInf[27],carrera , universidades, 2), "A","B","B","A","A","B", "true","false");i++;
                await this.addMyCareer(ctx, i, alumnos[1].data,profesores[0].data,carrera, this.getAsignaturaByIndex(asignaturasInf[28],carrera , universidades, 2), "B","C","A","B","B","C", "true","false");i++;                
                await this.addMyCareer(ctx, i, alumnos[1].data,profesores[1].data,carrera, this.getAsignaturaByIndex(asignaturasInf[27],carrera , universidades, 2), "A","C","C","A","-","-", "false","false");i++;
                await this.addMyCareer(ctx, i, alumnos[1].data,profesores[0].data,carrera, this.getAsignaturaByIndex(asignaturasInf[28],carrera , universidades, 2), "B","C+","B","B","-","-", "false","false");i++;
                await this.addMyCareer(ctx, i, alumnos[1].data,profesores[1].data,carrera, this.getAsignaturaByIndex(asignaturasInf[29],carrera , universidades, 2), "A","A","A","C-","-","-", "false","false");i++;
                await this.addMyCareer(ctx, i, alumnos[1].data,profesores[0].data,carrera, this.getAsignaturaByIndex(asignaturasInf[30],carrera , universidades, 2), "B","B","C","C","-","-", "false","false");i++;

                await this.addMyCareer(ctx, i, alumnos[0].data,profesores[0].data,carrera, this.getAsignaturaByIndex(asignaturasInf[28],carrera , universidades, 2), "A","C+","A","B","A","-", "true","false");i++;                
                await this.addMyCareer(ctx, i, alumnos[0].data,profesores[1].data,carrera, this.getAsignaturaByIndex(asignaturasInf[27],carrera , universidades, 2), "B","C","-","A","-","-", "false","false");i++;
                await this.addMyCareer(ctx, i, alumnos[0].data,profesores[0].data,carrera, this.getAsignaturaByIndex(asignaturasInf[28],carrera , universidades, 2), "C","C+","-","B","-","-", "false","false");i++;
                await this.addMyCareer(ctx, i, alumnos[0].data,profesores[1].data,carrera, this.getAsignaturaByIndex(asignaturasInf[29],carrera , universidades, 2), "B","B","-","C-","-","-", "false","false");i++;
                await this.addMyCareer(ctx, i, alumnos[0].data,profesores[0].data,carrera, this.getAsignaturaByIndex(asignaturasInf[30],carrera , universidades, 2), "C","A","-","C","-","-", "false","false");i++;

                
            }     
     
            if (carrera.objectId === "4") //Grado de Economía 
            {
                for (const asignatura of asignaturasEco)    
                {
                    await this.addMyCareer(ctx, i, alumnos[1].data,profesores[0].data,carrera, this.getAsignaturaByIndex(asignatura,carrera , universidades,3), "A","B","A","B","A","A", "true","true"); 
                    i++;
                }
            }
            if (carrera.objectId === "2" ) //pSICOLOGIA
            {
                console.info('Añadiendo MyCareer PSI');
                for (const asignatura of asignaturasPsi)  
                {
                    await this.addMyCareer(ctx, i, alumnos[1].data,profesores[2].data,carrera, this.getAsignaturaByIndex(asignatura,carrera , universidades, 1), "A","B","A","B","A","A", "true","true"); 
                    i++;
                }
                for (const asignatura of asignaturasPsi.slice(0, 15))    
                {
                    await this.addMyCareer(ctx, i, alumnos[2].data,profesores[0].data,carrera, this.getAsignaturaByIndex(asignatura,carrera , universidades, 2), "A","C","B","A","-","-", "false","false");
                    i++;
                }
                await this.addMyCareer(ctx, i, alumnos[2].data,profesores[1].data,carrera, this.getAsignaturaByIndex(asignaturasPsi[18],carrera , universidades, 2), "A","C","-","-","-","-", "false","false");
            }              
            if (carrera.objectId === "3") //Alumno tiene el Máster Universitario de Dirección Financiera
            {
                for (const asignatura of asignaturasEco.slice(0, 15))    
                {
                    await this.addMyCareer(ctx, i, alumnos[2].data,profesores[0].data,carrera, this.getAsignaturaByIndex(asignatura,carrera , universidades, 2), "A","C","B","A","B","B", "true","true");
                    i++;
                }
                await this.addMyCareer(ctx, i, alumnos[1].data,profesores[0].data,carrera, this.getAsignaturaByIndex(asignaturasEco[1],carrera , universidades, 2), "A","C","B","A","B","B", "true","false");
                await this.addMyCareer(ctx, i, alumnos[1].data,profesores[0].data,carrera, this.getAsignaturaByIndex(asignaturasEco[2],carrera , universidades, 2), "A","C","B","A","B","B", "true","false");
                await this.addMyCareer(ctx, i, alumnos[1].data,profesores[0].data,carrera, this.getAsignaturaByIndex(asignaturasEco[3],carrera , universidades, 2), "A","C","B","A","B","B", "true","false");

                await this.addMyCareer(ctx, i, alumnos[1].data,profesores[0].data,carrera, this.getAsignaturaByIndex(asignaturasEco[4],carrera , universidades, 0), "A","B","-","-","-","-", "false","false"); i++;
                await this.addMyCareer(ctx, i, alumnos[1].data,profesores[1].data,carrera, this.getAsignaturaByIndex(asignaturasEco[7],carrera , universidades, 0), "A","B","-","-","-","-", "false","false"); i++;
                
            }
        }        

        return 'Registros de ejemplo creados correctamente.';
    }
    




}

module.exports = UniversidadesContract;
