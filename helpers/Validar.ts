export const objValidado = { validado: true, mensaje: "" };
export const objValidadoInicial = { validado: false, mensaje: "" };

interface T {
  [key: string]: { validado: boolean; mensaje: string };
}

export const validarForm = (formValidacion: T) => {
  let key: keyof T;
  for (key in formValidacion) {
    if (Object.prototype.hasOwnProperty.call(formValidacion, key)) {
      const el = formValidacion[key];
      if (!el.validado) {
        return false;
      }
    }
  }
  return true;
};

interface U extends Object {
  [key: string]: any;
}

export const validarCamposLlenos = (form: U) => {
  let tempValidacion: T = {};
  for (const key in form) {
    if (Object.prototype.hasOwnProperty.call(form, key)) {
      const el = form[key];
      tempValidacion = { ...tempValidacion, [key]: validarVacio(el) };
    }
  }
  return tempValidacion;
};

const objInvalido = (mensaje: string): IValidacion => {
  return { validado: false, mensaje };
};

export const Validar = {
  general(texto: string, opcional: boolean = false): IValidacion {
    return opcional ? objValidado : validarVacio(texto);
  },

  texto(texto: string, opcional: boolean = false): IValidacion {
    let val = validarVacio(texto);
    if (!val.validado) {
      return opcional ? objValidado : val;
    } else {
      var expression = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
      return expression.test(texto) ? objValidado : objInvalido("Solo letras");
    }
  },

  numeros(texto: string, opcional: boolean = false): IValidacion {
    let val = validarVacio(texto);
    if (!val.validado) {
      return opcional ? objValidado : val;
    } else {
      var expression = /^[-+]?[0-9]{1,10000}([.]?[0-9]{1,10000})?$/;
      return expression.test(texto)
        ? objValidado
        : objInvalido("Solo números con punto");
    }
  },

  numerosPositivos(texto: string, opcional: boolean = false): IValidacion {
    let val = validarVacio(texto);
    if (!val.validado) {
      return opcional ? objValidado : val;
    } else {
      var expression = /^[+]?[0-9]{1,10000}([.]?[0-9]{1,10000})?$/;
      return expression.test(texto)
        ? objValidado
        : objInvalido("Solo números positivos con punto");
    }
  },

  numerosNegativos(texto: string, opcional: boolean = false): IValidacion {
    let val = validarVacio(texto);
    if (!val.validado) {
      return opcional ? objValidado : val;
    } else {
      var expression = /^[-+]?[0-9]{1,10000}([.]?[0-9]{1,10000})?$/;
      return expression.test(texto)
        ? objValidado
        : objInvalido("Solo números negativos con punto");
    }
  },

  cedula(texto: string, opcional: boolean = false): IValidacion {
    let val = validarVacio(texto);
    if (!val.validado) {
      return opcional ? objValidado : val;
    } else {
      var expression = /^[0-9]{10,13}?$/;
      return expression.test(texto)
        ? objValidado
        : objInvalido("Ingresa una cédula válida");
    }
  },

  direccion(texto: string, opcional: boolean = false): IValidacion {
    let val = validarVacio(texto);
    if (!val.validado) {
      return opcional ? objValidado : val;
    } else {
      var expression = /^.{1,100}$/;
      return expression.test(texto)
        ? objValidado
        : objInvalido("Máximo 100 caracteres");
    }
  },

  email(texto: string, opcional: boolean = false): IValidacion {
    let val = validarVacio(texto);
    if (!val.validado) {
      return opcional ? objValidado : val;
    } else {
      var expression = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      return expression.test(texto)
        ? objValidado
        : objInvalido("Ingresa un email válido");
    }
  },

  telefono(texto: string, opcional: boolean = false): IValidacion {
    let val = validarVacio(texto);
    if (!val.validado) {
      return opcional ? objValidado : val;
    } else {
      var expression =
        /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/im;
      // /^\+?\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/im;
      // var expression =
      //   /^[\+]?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{1,6}$/im;
      return expression.test(texto)
        ? objValidado
        : objInvalido("Ingresa un teléfono válido");
    }
  },

  noCero(texto: string, opcional: boolean = false): IValidacion {
    let val = validarVacio(texto);
    if (!val.validado) {
      return opcional ? objValidado : val;
    } else {
      return parseInt(texto, 10) !== 0
        ? objValidado
        : objInvalido("Selecciona una opción");
    }
  },

  placa(texto: string, opcional: boolean = false): IValidacion {
    let val = validarVacio(texto);
    if (!val.validado) {
      return opcional ? objValidado : val;
    } else {
      var expression = /^(?:[a-zA-Z][a-zA-Z-][a-zA-Z][0-9]{4})$/im;
      return expression.test(texto)
        ? objValidado
        : objInvalido("La placa debe ser de la forma XXX0001");
    }
  },

  ecuacion(texto: string, opcional: boolean = false): IValidacion {
    let val = validarVacio(texto);
    if (!val.validado) {
      return opcional ? objValidado : val;
    } else {
      var expression = /^[0-9^x*#+.-]+$/gm;
      return expression.test(texto)
        ? objValidado
        : objInvalido("La ecuación no es válida");
    }
  },

  contrasena(texto: string, opcional: boolean = false): IValidacion {
    let val = validarVacio(texto);
    if (!val.validado) {
      return opcional ? objValidado : val;
    } else {
      // var expression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gm;
      var expression =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d._$&!¡¿?-]{8,}$/gm;
      return expression.test(texto)
        ? objValidado
        : objInvalido(
            "Mínimo 8 caracteres, 1 mayúscula, 1 minúscula y 1 número"
          );
    }
  },

  website(texto: string, opcional: boolean = false): IValidacion {
    let val = validarVacio(texto);
    if (!val.validado) {
      return opcional ? objValidado : val;
    } else {
      var expression = /^[a-zA-Z0-9.]+$/g;
      return expression.test(texto)
        ? objValidado
        : objInvalido("Ingresa un website válido");
    }
  },
};


export interface IValidar {
  general: (texto: string, opcional?: boolean) => IValidacion;
  texto: (texto: string, opcional?: boolean) => IValidacion;
  numeros: (texto: string, opcional?: boolean) => IValidacion;
  numerosPositivos: (texto: string, opcional?: boolean) => IValidacion;
  numerosNegativos: (texto: string, opcional?: boolean) => IValidacion;
  cedula: (texto: string, opcional?: boolean) => IValidacion;
  direccion: (texto: string, opcional?: boolean) => IValidacion;
  email: (texto: string, opcional?: boolean) => IValidacion;
  telefono: (texto: string, opcional?: boolean) => IValidacion;
  noCero: (texto: string, opcional?: boolean) => IValidacion;
  placa: (texto: string, opcional?: boolean) => IValidacion;
  ecuacion: (texto: string, opcional?: boolean) => IValidacion;
  contrasena: (texto: string, opcional?: boolean) => IValidacion;
  website: (texto: string, opcional?: boolean) => IValidacion;
}

function validarVacio(texto: string): IValidacion {
  if (texto.length === 0) {
    return objInvalido("No puede estar vacío");
  } else {
    return objValidado;
  }
}

export interface IValidacion {
  validado: boolean;
  mensaje: string;
}
