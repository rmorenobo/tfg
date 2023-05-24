'use strict';

class Universidad {
    constructor(idUniversidad, nombre) {
        this.idUniversidad = idUniversidad;
        this.nombre = nombre;
    }
}

class Carrera {
    constructor(idCarrera, nombre,creditos,totalAsignaturas) {
        this.idCarrera = idCarrera;
        this.nombre = nombre;
        this.creditos=creditos;
        this.totalAsignaturas = totalAsignaturas;
    }
}
class Asignatura {
    constructor(idAsignatura,universidadId,  universidadNombre,carreraId,carreraNombre, nombre, creditos) {
        this.idAsignatura = idAsignatura;
        this.universidadId = universidadId;
        this.universidadNombre = universidadNombre;
        this.carreraId=carreraId;
        this.carreraNombre = carreraNombre;
        this.nombre = nombre;
        this.creditos = creditos;
    }
}
class Nota {
    constructor(idNota, idAsignaturaAlumno, nombre, titulo, nota)  {
        this.idNota = idNota;
        this.idAsignaturaAlumno = idAsignaturaAlumno;
        this.nombre = nombre;
        this.titulo = titulo;
        this.nota = nota;
    }
}
class Alumno {
    constructor(idAlumno, nombre, apellido, email) {
        this.idAlumno = idAlumno;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;

    }
}

class Profesor {
    constructor(idProfesor, nombre, apellido, email) {
        this.idProfesor = idProfesor;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email= email;
    }
}
class Usuario{
    constructor (IdUsuario,id, userType,nombre, apellido, email, activo, universidades){
        this.IdUsuario = IdUsuario;
        this.id = id;
        this.userType = userType;
        this.nombre =nombre;
        this.apellido = apellido;
        this.email = email;
        this.activo = activo;
        this.universidades = universidades;

    }
    
}
class MyCareer {
    constructor (idMyCareer,idAlumno,idProfesor,idUniversidad,idCarrera,idAsignatura, alumno,profesor,carrera, asignatura,pec1,pec2,pec3,pac1,pac2,final, finalizada,carreraFinalizada){
        this.idMyCareer = idMyCareer;
        this.idAlumno = idAlumno ,
        this.idProfesor = idProfesor,
        this.idUniversidad = idUniversidad,
        this.idCarrera = idCarrera,
        this.idAsignatura = idAsignatura,
        this.alumno = alumno;
        this.profesor = profesor;
        this.carrera = carrera;
        this.asignatura = asignatura;
        this.pec1 = pec1; 
        this.pec2 = pec2;
        this.pec3 = pec3;
        this.pac1 = pac1;
        this.pac2 = pac2;
        this.final = final;
        this.finalizada = finalizada;
        this.carreraFinalizada = carreraFinalizada; 
    }
}
class AlumnoAsignatura {
    constructor(id, idAsignatura, idAlumno, semestre, fechaini, fechafin, superada, nota=[] ) {
        this.id = id;
        this.idAsignatura = idAsignatura;
        this.idAlumno = idAlumno;
        this.semestre = semestre;
        this.fechaini = fechaini;
        this.fechafin = fechafin;
        this.superada = superada;
        this.nota = nota;
    }
}




module.exports = {Usuario, Universidad, Alumno, Profesor, Asignatura,MyCareer, AlumnoAsignatura, Nota, Carrera };
